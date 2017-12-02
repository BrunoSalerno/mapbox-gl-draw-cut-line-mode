import {point, lineString, pointOnLine, lineSplit} from "@turf/turf";

const CutLineMode = {
  onSetup: function(opts) {
    const state = {}
    return state;
  },

  onClick: function(state, e) {
    const features = this.featuresAt(e);

    // We take the first LineString
    const feature = features.find(f => f.geometry.type == "LineString");
    if (!feature) return;

    const id = feature.properties.id;

    const actualFeature = this.getFeature(id);

    const line = lineString(actualFeature.coordinates);
    const cursorAt = point([e.lngLat.lng, e.lngLat.lat]);
    const snapped = pointOnLine(line, cursorAt);
    const featureCollection = lineSplit(line, snapped);

    this.deleteFeature(id);

    const newFeatures = featureCollection.features.map((f) => {
      f.properties = {...actualFeature.properties};
      this.addFeature(this.newFeature(f));
      return f;
    });

    setTimeout(() => {
      this.map.fire('draw.create', {
        features: newFeatures
      });
    }, 10)

    this.changeMode('simple_select');
  },

  toDisplayFeatures: function(state, geojson, display) {
    display(geojson);
  },

  onMouseMove: function(state, e) {
    const features = this.featuresAt(e);
    this.map.getCanvas().style.cursor = features.length ? "crosshair" : "inherit";
  },

  onKeyUp: function(state, e) {
    if (e.keyCode === 27) return this.changeMode('simple_select');
  }
}

export default CutLineMode
