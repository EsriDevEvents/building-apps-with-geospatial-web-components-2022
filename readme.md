# Esri European Developer Summit 2022: Building Web Components Demo

## Description

A simple example that uses [Stencil](https://stenciljs.com/) to create a reusable [web component](https://developer.mozilla.org/en-US/docs/Web/Web_Components) using [Calcite](https://developers.arcgis.com/calcite-design-system/) and the [ArcGIS Maps SDK for JavaScript](https://developers.arcgis.com/javascript/latest/).

The web component uses a [Search](https://developers.arcgis.com/javascript/latest/api-reference/esri-webdoc-applicationProperties-Search.html) widget to find a location (a street, city etc.) then uses this location to run a spatial query on a [FeatureLayer](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html). The results of this are then shown in a set of Calcite [Cards](https://developers.arcgis.com/calcite-design-system/components/card/).

**Note**: this demo was built before the production release of Calcite was available and is locked to a specific _beta_ version. If you wish to use some of the code in your own components be careful to check for updates at https://developers.arcgis.com/calcite-design-system/components/.

## Live Demo

https://demos.alt.esriuk.com/esri-dev-summit-europe-2022/stencil-find-and-list-component/demo/

## Getting Started

To build this web component using Stencil, clone this repo to a new directory and run:

```bash
npm install
npm start
```

To build the component for production, run:

```bash
npm run build
```

More help on using Stencil is available [here](https://stenciljs.com/docs/my-first-component).

## Using this component

_These are the standard Stencil instructions - there are alternative deployment methods detailed in [output targets](https://stenciljs.com/docs/output-targets) on the Stencil help pages._

### Script tag

-   The first step is to [publish to NPM](https://docs.npmjs.com/getting-started/publishing-npm-packages).
-   Put a script tag similar to this `<script type='module' src='https://unpkg.com/stencil-find-and-list-component@0.0.1/dist/stencil-find-and-list-component.esm.js'></script>` in the head of your index.html
-   Then you can use the element anywhere in your template, JSX, html etc
