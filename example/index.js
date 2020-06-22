import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw';
import CutLineMode from 'mapbox-gl-draw-cut-line-mode';

mapboxgl.accessToken = '';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/satellite-v9',
  center: [-58.381944,-34.599722],
  zoom: 13
});

var modes = MapboxDraw.modes;
modes.cut_line = CutLineMode;

window.draw = new MapboxDraw({
  displayControlsDefault: false,
  controls: {
    line_string: true,
  },
  modes: modes
});

map.addControl(window.draw);

map.on('load', function(){
  map.on('draw.create', handleEvent);
  map.on('draw.delete', handleEvent);

  function handleEvent(e) {
    console.log(e);
  }
});
