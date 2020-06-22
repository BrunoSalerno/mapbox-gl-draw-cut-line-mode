## Mapbox GL Draw Cut Line Mode

This is a custom mode for Mapbox GL Draw 1.x that adds the LineString cutting/splitting functionality

### Install

`yarn add mapbox-gl-draw-cut-line-mode`

### Usage

```js
import CutLineMode from 'mapbox-gl-draw-cut-line-mode';

const modes = MapboxDraw.modes;
modes.cut_line = CutLineMode;

const draw = new MapboxDraw({
  modes: modes
});

draw.changeMode('cut_line');
```

Once a feature is splitted, 2 events are fired:
- `draw.delete` with the id of the deleted feature
- `draw.create` with the new (children) features

See a full example in the [example folder](example/).

### Build

`yarn build` will do it.

### License

MIT
