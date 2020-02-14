import * as React from 'react';
import DeckGL from '@deck.gl/react';
import {StaticMap} from 'react-map-gl';

export function GeoMapChart() {

    const [viewState, setViewState] = React.useState(INITIAL_VIEW_STATE);

    return (
        <DeckGL viewState={viewState} controller={true} width={'100%'} height={'100%'} layers={[]}  onViewStateChange={
            ({viewState, oldViewState, interactionState}) => {
                const newViewState = {...viewState};
                setViewState(newViewState);
            }}>

            <StaticMap width={'100%'} height={'100%'} mapStyle={MAPBOX_BASE_LAYER}/>
        </DeckGL>
    )
}

const MAX_ZOOM = 19;
const MIN_ZOOM = 2;
const INITIAL_VIEW_STATE = {
    latitude: 37.77,
    longitude: -122.42,
    zoom: 5,
    bearing: 0,
    pitch: 0,
    maxZoom: MAX_ZOOM,
    minZoom: MIN_ZOOM
};


const BASEMAP_TILE_SOURCE_NAME = 'simple-tiles';
const BASEMAP_TILE_SERVERS = [
    'http://a.tile.osm.org/{z}/{x}/{y}.png',
    'http://b.tile.osm.org/{z}/{x}/{y}.png',
    'http://c.tile.osm.org/{z}/{x}/{y}.png',
    //'//stamen-tiles-a.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg',
    //'//stamen-tiles-b.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg',
    //'//stamen-tiles-c.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg',
];
const BASEMAP_ATTRIBUTION = `Map tiles by <a href="http://stamen.com">Stamen Design</a>, under
<a href="http://creativecommons.org/licenses/by/3.0"> CC BY 3.0</a>. Data by
<a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">
ODbL</a>.`.replace(/\n/gm, '');
const COMMON_LAYER_CONFIG = {
    minZoom: 2,
    maxZoom: 17, // New data will be requested until this level
    pixelScaleFactor: 8,
    tileSize: 256,
    isTms: true,
    topoLayerClusteringSwithLevel: 13,
    maxVisibleRasterLayers: 3,
    maxConfigurableLayers: 26,
};
const MAP_CONFIG = {
    MIN_ZOOM: 1,
    MAX_ZOOM: 18,
    INITIAL_ZOOM: 9,
    SHOW_TILE_BOUNDARIES: false,
    DRAG_ROTATE: false,
    ZOOM_NO_DATA: 2,
    SEARCH_DEFAULT_ZOOM: 14,
};

const MAPBOX_BASE_LAYER = {
    version: 8,
    sources: {
        [BASEMAP_TILE_SOURCE_NAME]: {
            type: 'raster',
            tiles: BASEMAP_TILE_SERVERS,
            tileSize: COMMON_LAYER_CONFIG.tileSize,
            attribution: BASEMAP_ATTRIBUTION,
        }
    },
    layers: [
        {
            id: BASEMAP_TILE_SOURCE_NAME,
            type: 'raster',
            source: BASEMAP_TILE_SOURCE_NAME,
            minzoom: MAP_CONFIG.MIN_ZOOM,
            maxzoom: MAP_CONFIG.MAX_ZOOM,
        }
    ],
};
