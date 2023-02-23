import { Component, Host, h, Prop, State, Fragment } from '@stencil/core';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import FeatureLayerView from '@arcgis/core/views/layers/FeatureLayerView';
import FeatureFilter from '@arcgis/core/layers/support/FeatureFilter';
import FeatureEffect from '@arcgis/core/layers/support/FeatureEffect';
import LayerSearchSource from '@arcgis/core/widgets/Search/LayerSearchSource';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Geometry from '@arcgis/core/geometry/Geometry';
import Search from '@arcgis/core/widgets/Search';
import '@esri/calcite-components/dist/components/calcite-button';
import '@esri/calcite-components/dist/components/calcite-card';
import '@esri/calcite-components/dist/components/calcite-loader';
import '@esri/calcite-components/dist/components/calcite-panel';
import '@esri/calcite-components/dist/components/calcite-chip';

@Component({
    tag: 'search-and-intersect-component',
    styleUrl: 'search-and-intersect-component.css',
    shadow: true
})
export class SearchAndIntersectComponent {
    /**
     * The title shown above the search box in the UI.
     */
    @Prop() searchTitle: string;
    /**
     * The URL of the feature service to use when searching for places. (Optional) If not supplied the search will default to the Esri World Geocoder.
     */
    @Prop() searchUrl: string;
    /**
     * The fields to be searched within the feature service to match places as a comma-delimited string.
     * (Optional) If not supplied uses the Esri World Geocoder defaults.
     */
    @Prop() searchFields: string;
    /**
     * The fields to display in the search drop-down list as a comma-delimited string. (Optional) If not supplied `searchFields` will be used.
     */
    @Prop() searchDisplayFields: string;
    /**
     * Placeholder text for the search input box. (Optional)
     */
    @Prop() searchPlaceholder: string;
    /**
     * The title shown above the intersected results list in the UI.
     */
    @Prop() intersectTitle: string;
    /**
     * The URL of the feature service to use when performing a spatial query (intersects) around a selected place. (Required)
     */
    @Prop() intersectUrl: string;
    /**
     * The fields to be fetched by the spatial query as a comma-delimited list. (Required)
     */
    @Prop() intersectFields: string;
    /**
     * Any fields to be displayed using a `<calcite-chip>` rather than as plain text as a comma-delimited list. (Optional)
     */
    @Prop() intersectChipFields: string;
    /**
     * The buffer distance to use for the spatial query. (Optional)
     */
    @Prop() intersectDistance: number = 1000;
    /**
     * The distance unit to use for the buffer. (Optional)
     */
    @Prop() intersectUnit:
        | 'meters'
        | 'feet'
        | 'miles'
        | 'nautical-miles'
        | 'us-nautical-miles'
        | 'kilometers' = 'meters';
    /**
     * Whether to show a map of the results or not. (Optional)
     */
    @Prop() useMap: boolean = false;
    /**
     * If a results map is used, the initial zoom level for that map. (Optional)
     */
    @Prop() mapAutoZoom: number = 7;
    /**
     * If a results map is used, the label to show for any buttons linking results to the map. (Optional)
     */
    @Prop() mapLinkLabel: string = 'Show on map';
    @State() intersectResults: any[] = [];
    @State() resultsView: 'results' | 'map' = 'results';
    searchContainer: HTMLDivElement;
    searchWidget: Search;
    calciteLoader: any;
    mapContainer: HTMLDivElement;
    mapViewWidget: MapView;
    actionsContainer: HTMLDivElement;

    componentDidLoad = () => {
        if (this.searchWidget === undefined || this.searchWidget === null) {
            // Create a URL pointing to a feature service
            const featureLayerAddresses =
                    this.searchUrl !== undefined && this.searchUrl !== null && this.searchUrl !== ''
                        ? new FeatureLayer({
                              url: this.searchUrl,
                              id: 'searchQueryLayer'
                          })
                        : null,
                searchArgs: any = {
                    container: this.searchContainer,
                    includeDefaultSources: true
                };
            if (featureLayerAddresses !== null) {
                searchArgs.includeDefaultSources = false;
                searchArgs.sources = [
                    new LayerSearchSource({
                        layer: featureLayerAddresses,
                        searchFields: [...this.searchFields.split(',')],
                        suggestionTemplate: this.searchDisplayFields
                            .split(',')
                            .map((f) => `{${f}}`)
                            .join(', '),
                        exactMatch: false,
                        outFields: [...this.searchDisplayFields.split(',')],
                        placeholder: this.searchPlaceholder,
                        name: 'searchLayer'
                    })
                ];
            }
            this.searchWidget = new Search(searchArgs);
            this.searchWidget.when(() => {
                this.searchWidget.on('search-complete', (searchResponse) => {
                    if (searchResponse.results !== undefined && searchResponse.results !== null) {
                        const firstResults = searchResponse.results[0].results;
                        this.runGeometryQuery(firstResults[0].feature.geometry);
                    }
                });
            });
            if (this.useMap && (this.mapViewWidget === undefined || this.mapViewWidget === null)) {
                const map = new Map({
                    basemap: 'topo-vector',
                    layers:
                        featureLayerAddresses !== null
                            ? [
                                  featureLayerAddresses,
                                  new FeatureLayer({
                                      url: this.intersectUrl,
                                      id: 'intersectQueryLayer'
                                  })
                              ]
                            : [
                                  new FeatureLayer({
                                      url: this.intersectUrl,
                                      id: 'intersectQueryLayer'
                                  })
                              ]
                });
                this.mapViewWidget = new MapView({
                    container: this.mapContainer,
                    map: map // References the map object created in step above
                });
                const toggleBtn = this.actionsContainer.querySelector('calcite-action');
                toggleBtn.addEventListener('click', () => {
                    this.resultsView = this.resultsView === 'map' ? 'results' : 'map';
                });
            }
        }
    };

    runGeometryQuery = (queryGeometry: Geometry) => {
        const intersectionLayer = new FeatureLayer({
                url: this.intersectUrl
            }),
            lyrQuery = intersectionLayer.createQuery();
        lyrQuery.geometry = queryGeometry;
        lyrQuery.distance = this.intersectDistance;
        lyrQuery.units = this.intersectUnit;
        lyrQuery.spatialRelationship = 'intersects'; // this is the default
        lyrQuery.returnGeometry = true;
        lyrQuery.outFields = ['*'];
        this.calciteLoader.active = true;
        intersectionLayer
            .queryFeatures(lyrQuery)
            .then((lyrQueryResult) => {
                let featureSet: any[] = [];
                if (lyrQueryResult.features !== undefined) {
                    featureSet = featureSet.concat(lyrQueryResult.features);
                    // Pre-adjust attributes ready for render using field info
                    const flds = this.intersectFields.split(','),
                        fldTypes: any = {};
                    for (let f of flds) {
                        const af: any = lyrQueryResult.fields.find(
                            (ff) => ff.name.toLowerCase() === f.toLowerCase()
                        );
                        if (af !== undefined) fldTypes[f] = af.type;
                        else fldTypes[f] = 'string';
                    }
                    const fids: number[] = [],
                        fidKey = 'OBJECTID';
                    for (let f of featureSet) {
                        for (let k of Object.keys(f.attributes)) {
                            let v = f.attributes[k];
                            if (v !== null) {
                                if (fldTypes[k] === 'date') v = new Date(v).toUTCString();
                                else if (fldTypes[k] === 'double' || fldTypes[k] === 'single')
                                    v = v.toFixed(2);
                                f.attributes[k] = v;
                            }
                        }
                        if (f.attributes[fidKey] !== undefined) fids.push(f.attributes[fidKey]);
                    }
                    if (this.useMap) {
                        const qlyr = this.mapViewWidget.map.findLayerById('intersectQueryLayer');
                        this.mapViewWidget.whenLayerView(qlyr).then((qlyrView) => {
                            (qlyrView as FeatureLayerView).featureEffect = new FeatureEffect({
                                filter: new FeatureFilter({
                                    objectIds: fids
                                }),
                                excludedEffect: 'grayscale(100%) opacity(30%)'
                            });
                        });
                        console.log(this.mapAutoZoom); // DEBUG
                        this.mapViewWidget.goTo({
                            target: queryGeometry,
                            zoom: this.mapAutoZoom
                        });
                    }
                }
                this.intersectResults = featureSet;
            })
            .catch((ex) => {
                console.debug(`Error fetching intersect data: ${ex}`);
                this.intersectResults = [];
            })
            .finally(() => {
                this.calciteLoader.active = false;
            });
    };

    handleZoomToClick = (index: number) => {
        const f: any = this.intersectResults[index];
        if (f !== undefined && f.geometry !== undefined) {
            this.mapViewWidget.goTo(
                f.geometry.type === 'polygon'
                    ? f.geometry
                    : {
                          target: f.geometry,
                          zoom: this.mapAutoZoom + 4
                      }
            );
            this.resultsView = 'map';
        }
    };

    render() {
        const flds = this.intersectFields.split(','),
            pills = (
                this.intersectChipFields !== undefined && this.intersectChipFields !== null
                    ? this.intersectChipFields
                    : ''
            ).split(','),
            resultsCards = this.intersectResults.map((f: any, i: number) => {
                const attValues: any[] = [];
                for (let j = 2; j < flds.length; j++) {
                    const fv = f.attributes[flds[j]];
                    if (fv !== undefined && fv !== null) {
                        if (
                            fv.toString().substring(0, 6) === 'https:' ||
                            fv.toString().substring(0, 5) === 'http:'
                        ) {
                            attValues.push(
                                <div>
                                    <calcite-link
                                        appearance="clear"
                                        scale="s"
                                        icon="link"
                                        href={fv}
                                    >
                                        {fv}
                                    </calcite-link>
                                </div>
                            );
                        } else if (pills.indexOf(flds[j]) >= 0) {
                            attValues.push(
                                <div>
                                    <calcite-chip appearance="solid" color="grey">
                                        {fv}
                                    </calcite-chip>
                                </div>
                            );
                        } else attValues.push(<div>{fv}</div>);
                    }
                }
                return (
                    <calcite-card id={`results-card-${i}`}>
                        <span slot="title">
                            <strong>{f.attributes[flds[0]]}</strong>
                        </span>
                        <span slot="subtitle">
                            <strong>{f.attributes[flds[1]]}</strong>
                        </span>
                        {attValues}
                        {this.useMap ? (
                            <calcite-button
                                appearance="outline"
                                color="neutral"
                                icon-start="layer-zoom-to"
                                slot="footer-trailing"
                                onClick={() => this.handleZoomToClick(i)}
                            >
                                {this.mapLinkLabel}
                            </calcite-button>
                        ) : null}
                    </calcite-card>
                );
            });
        return (
            <Host>
                <calcite-panel class="search-component-panel">
                    <calcite-panel class="flex-panel">
                        <calcite-panel heading={this.searchTitle} class="flex-fixed">
                            <div class="abs-placer">
                                <div
                                    ref={(el) => (this.searchContainer = el as HTMLDivElement)}
                                ></div>
                            </div>
                        </calcite-panel>
                        <calcite-panel heading={this.intersectTitle}>
                            <div
                                slot="header-actions-end"
                                ref={(el) => (this.actionsContainer = el as HTMLDivElement)}
                            >
                                {this.useMap ? (
                                    <calcite-action
                                        icon={
                                            this.resultsView === 'map' ? 'list-bullet' : 'map-pin'
                                        }
                                    ></calcite-action>
                                ) : null}
                            </div>
                            <div class="intersect-list-container">
                                <calcite-loader
                                    ref={(el) => (this.calciteLoader = el)}
                                    label="loading"
                                    text=""
                                    type="indeterminate"
                                ></calcite-loader>
                                {this.useMap ? (
                                    <Fragment>
                                        <div
                                            id="intersectResultsList"
                                            class={{
                                                'intersect-list': true,
                                                showing: this.resultsView === 'results'
                                            }}
                                        >
                                            {resultsCards}
                                        </div>
                                        <div
                                            class={{
                                                filler: true,
                                                showing: this.resultsView === 'map'
                                            }}
                                        >
                                            <div
                                                ref={(el) =>
                                                    (this.mapContainer = el as HTMLDivElement)
                                                }
                                            ></div>
                                        </div>
                                    </Fragment>
                                ) : (
                                    <div id="intersectResultsList" class="intersect-list showing">
                                        {resultsCards}
                                    </div>
                                )}
                            </div>
                        </calcite-panel>
                    </calcite-panel>
                </calcite-panel>
            </Host>
        );
    }
}
