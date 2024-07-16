import './style.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import ZoomSlider from 'ol/control/ZoomSlider.js';
import { defaults as defaultControls } from 'ol/control.js';
import proj4 from 'proj4';
import { get as getProjection } from 'ol/proj.js';
import { register } from 'ol/proj/proj4.js';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';

proj4.defs('EPSG:27700', '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 ' +
  '+x_0=400000 +y_0=-100000 +ellps=airy ' +
  '+towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 ' +
  '+units=m +no_defs');
register(proj4);
const proj27700 = getProjection('EPSG:27700');
proj27700.setExtent([0, 0, 700000, 1300000]);

const view = new View({
  projection: 'EPSG:27700',
  center: [310000, 800000],
  zoom: 2,
  extent: [120000, 650000, 500000, 950000]
})

const map = new Map({
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
  ],
  keyboardEventTarget: document,
  target: 'map',
  view: view,
  controls: defaultControls().extend([new ZoomSlider()]),
});

const sites = new VectorLayer({
  source: new VectorSource({
    url: './data/Mesolithic_Sites.geojson',
    format: new GeoJSON(),
  }),
  style: new Style({
    image: new Icon({
      src: 'assets/dot-circle.svg',
      scale: 0.02
    })
  }),
  visible: true,
  title: 'Sites'
})

const prediction = new VectorLayer({
  source: new VectorSource({
    url: 'data/Prediction_Area.geojson',
    format: new GeoJSON(),
  }),
  visible: true,
  title: 'Sites',
  style: new Style({
    stroke: new Stroke({
      color: 'rgba(220, 20, 60, 0.8)',
    }),
    fill: new Fill({
      color: 'rgba(220, 20, 60, 0.8)',
    }),
  })
})

map.addLayer(sites)
map.addLayer(prediction)


/*
//legacy view port for default projection
const view = new View({
  center: [-403405, 7766163],
  zoom: 2,
  extent: [-786647, 7315896, -123277, 8312670]
})
*/