"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _turf = require("@turf/turf");

var CutLineMode = {
  onSetup: function onSetup(opts) {
    var state = {};
    return state;
  },

  onClick: function onClick(state, e) {
    var _this = this;

    var features = this.featuresAt(e);

    // We take the first LineString
    var feature = features.find(function (f) {
      return f.geometry.type == "LineString";
    });
    if (!feature) return;

    var id = feature.properties.id;
    var properties = _extends({}, this.getFeature(id).properties);

    var cursorAt = (0, _turf.point)([e.lngLat.lng, e.lngLat.lat]);

    var newFeature1 = (0, _turf.lineSlice)((0, _turf.point)(this.firstCoord(feature)), cursorAt, feature);
    var newFeature2 = (0, _turf.lineSlice)(cursorAt, (0, _turf.point)(this.lastCoord(feature)), feature);

    this.deleteFeature(id);

    var newFeatures = [newFeature1, newFeature2].map(function (f) {
      f.properties = _extends({}, f.properties, properties);
      _this.addFeature(_this.newFeature(f));
      return f;
    });

    setTimeout(function () {
      _this.map.fire('draw.create', {
        features: newFeatures
      });
    }, 10);

    this.changeMode('simple_select');
  },

  toDisplayFeatures: function toDisplayFeatures(state, geojson, display) {
    display(geojson);
  },

  onMouseMove: function onMouseMove(state, e) {
    var features = this.featuresAt(e);
    this.map.getCanvas().style.cursor = features.length ? "crosshair" : "inherit";
  },

  onKeyUp: function onKeyUp(state, e) {
    if (e.keyCode === 27) return this.changeMode('simple_select');
  },

  firstCoord: function firstCoord(line) {
    return line.geometry.coordinates[0];
  },
  lastCoord: function lastCoord(line) {
    return line.geometry.coordinates[line.geometry.coordinates.length - 1];
  }
};

exports.default = CutLineMode;