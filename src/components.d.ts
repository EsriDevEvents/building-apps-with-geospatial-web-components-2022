/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface SearchAndIntersectComponent {
        /**
          * Any fields to be displayed using a `<calcite-chip>` rather than as plain text as a comma-delimited list. (Optional)
         */
        "intersectChipFields": string;
        /**
          * The buffer distance to use for the spatial query. (Optional)
         */
        "intersectDistance": number;
        /**
          * The fields to be fetched by the spatial query as a comma-delimited list. (Required)
         */
        "intersectFields": string;
        /**
          * The title shown above the intersected results list in the UI.
         */
        "intersectTitle": string;
        /**
          * The distance unit to use for the buffer. (Optional)
         */
        "intersectUnit": | 'meters'
        | 'feet'
        | 'miles'
        | 'nautical-miles'
        | 'us-nautical-miles'
        | 'kilometers';
        /**
          * The URL of the feature service to use when performing a spatial query (intersects) around a selected place. (Required)
         */
        "intersectUrl": string;
        /**
          * If a results map is used, the initial zoom level for that map. (Optional)
         */
        "mapAutoZoom": number;
        /**
          * If a results map is used, the label to show for any buttons linking results to the map. (Optional)
         */
        "mapLinkLabel": string;
        /**
          * The fields to display in the search drop-down list as a comma-delimited string. (Optional) If not supplied `searchFields` will be used.
         */
        "searchDisplayFields": string;
        /**
          * The fields to be searched within the feature service to match places as a comma-delimited string. (Optional) If not supplied uses the Esri World Geocoder defaults.
         */
        "searchFields": string;
        /**
          * Placeholder text for the search input box. (Optional)
         */
        "searchPlaceholder": string;
        /**
          * The title shown above the search box in the UI.
         */
        "searchTitle": string;
        /**
          * The URL of the feature service to use when searching for places. (Optional) If not supplied the search will default to the Esri World Geocoder.
         */
        "searchUrl": string;
        /**
          * Whether to show a map of the results or not. (Optional)
         */
        "useMap": boolean;
    }
}
declare global {
    interface HTMLSearchAndIntersectComponentElement extends Components.SearchAndIntersectComponent, HTMLStencilElement {
    }
    var HTMLSearchAndIntersectComponentElement: {
        prototype: HTMLSearchAndIntersectComponentElement;
        new (): HTMLSearchAndIntersectComponentElement;
    };
    interface HTMLElementTagNameMap {
        "search-and-intersect-component": HTMLSearchAndIntersectComponentElement;
    }
}
declare namespace LocalJSX {
    interface SearchAndIntersectComponent {
        /**
          * Any fields to be displayed using a `<calcite-chip>` rather than as plain text as a comma-delimited list. (Optional)
         */
        "intersectChipFields"?: string;
        /**
          * The buffer distance to use for the spatial query. (Optional)
         */
        "intersectDistance"?: number;
        /**
          * The fields to be fetched by the spatial query as a comma-delimited list. (Required)
         */
        "intersectFields"?: string;
        /**
          * The title shown above the intersected results list in the UI.
         */
        "intersectTitle"?: string;
        /**
          * The distance unit to use for the buffer. (Optional)
         */
        "intersectUnit"?: | 'meters'
        | 'feet'
        | 'miles'
        | 'nautical-miles'
        | 'us-nautical-miles'
        | 'kilometers';
        /**
          * The URL of the feature service to use when performing a spatial query (intersects) around a selected place. (Required)
         */
        "intersectUrl"?: string;
        /**
          * If a results map is used, the initial zoom level for that map. (Optional)
         */
        "mapAutoZoom"?: number;
        /**
          * If a results map is used, the label to show for any buttons linking results to the map. (Optional)
         */
        "mapLinkLabel"?: string;
        /**
          * The fields to display in the search drop-down list as a comma-delimited string. (Optional) If not supplied `searchFields` will be used.
         */
        "searchDisplayFields"?: string;
        /**
          * The fields to be searched within the feature service to match places as a comma-delimited string. (Optional) If not supplied uses the Esri World Geocoder defaults.
         */
        "searchFields"?: string;
        /**
          * Placeholder text for the search input box. (Optional)
         */
        "searchPlaceholder"?: string;
        /**
          * The title shown above the search box in the UI.
         */
        "searchTitle"?: string;
        /**
          * The URL of the feature service to use when searching for places. (Optional) If not supplied the search will default to the Esri World Geocoder.
         */
        "searchUrl"?: string;
        /**
          * Whether to show a map of the results or not. (Optional)
         */
        "useMap"?: boolean;
    }
    interface IntrinsicElements {
        "search-and-intersect-component": SearchAndIntersectComponent;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "search-and-intersect-component": LocalJSX.SearchAndIntersectComponent & JSXBase.HTMLAttributes<HTMLSearchAndIntersectComponentElement>;
        }
    }
}
