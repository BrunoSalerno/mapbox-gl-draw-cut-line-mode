"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _helpers = require("@turf/helpers");

var _nearestPointOnLine = require("@turf/nearest-point-on-line");

var _nearestPointOnLine2 = _interopRequireDefault(_nearestPointOnLine);

var _lineSplit = require("@turf/line-split");

var _lineSplit2 = _interopRequireDefault(_lineSplit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

    var actualFeature = this.getFeature(id);

    var line = (0, _helpers.lineString)(actualFeature.coordinates);
    var cursorAt = (0, _helpers.point)([e.lngLat.lng, e.lngLat.lat]);
    var snapped = (0, _nearestPointOnLine2.default)(line, cursorAt);
    var featureCollection = (0, _lineSplit2.default)(line, snapped);

    this.deleteFeature(id);

    var newFeatures = featureCollection.features.map(function (f) {
      f.properties = _extends({}, actualFeature.properties);
      _this.addFeature(_this.newFeature(f));
      return f;
    });

    setTimeout(function () {
      _this.map.fire('draw.create', {
        features: newFeatures
      });
    }, 10);

    this.exitMode();
  },

  toDisplayFeatures: function toDisplayFeatures(state, geojson, display) {
    display(geojson);
  },

  onMouseMove: function onMouseMove(state, e) {
    var features = this.featuresAt(e);
    this.map.getCanvas().style.cursor = features.length ? "crosshair" : "inherit";
  },

  onKeyUp: function onKeyUp(state, e) {
    if (e.keyCode === 27) return this.exitMode();
  },

  exitMode: function exitMode(state, e) {
    this.map.getCanvas().style.cursor = "inherit";
    return this.changeMode('simple_select');
  }
};

exports.default = CutLineMode;