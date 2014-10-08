# input-mouse

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

Convenience API for mouse inputs using signals.

This is primarily written for interactive graphical work which use webGL coordinates instead of pixel coordinates. In other words the center of the screen is [0,0], the top left is [-1,-1] and the bottom right is [1,1].

Futhermore a distinction is made between moving, dragging and hovering.
- Movement during mouseDown is dragging.
- Movement during mouseUp is hovering.
- Movement during either is moving.

Clicks are interpretted manually, and movement must be no more than 5 pixels to register as a click.

## Usage

[![NPM](https://nodei.co/npm/input-mouse.png)](https://nodei.co/npm/input-mouse/)

## License

MIT, see [LICENSE.md](http://github.com/bunnybones1/input-mouse/blob/master/LICENSE.md) for details.
