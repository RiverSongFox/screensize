# screensize [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Calculate screen dimensions from diagonal and resolution

## Installation

```sh
$ npm install --save screensize
```

## Usage

```js
var screensize = require('screensize');

screensize.calculate(5.70, 2560, 1440);
// {width: 4.96798..., height: 2.79449...}

var screen = screensize.guess('Full HD, 21.5 inches');
screen.widthIn('in');    // 18.74 inches
screen.diagonalIn('cm'); // 54.61 centimeters
screen.pixelsPer('in');  // 102.46 pixels per inch
screen.pixelsPer('mm');  // 4.03 pixels per millimeter
```

Supported units: m, dm, cm, mm, in, px.

## License

MIT © [Nikolay Kim]()

[npm-image]: https://badge.fury.io/js/screensize.svg
[npm-url]: https://npmjs.org/package/screensize
[travis-image]: https://travis-ci.org/yaruson/screensize.svg?branch=master
[travis-url]: https://travis-ci.org/yaruson/screensize
[daviddm-image]: https://david-dm.org/yaruson/screensize.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/yaruson/screensize
[coveralls-image]: https://coveralls.io/repos/yaruson/screensize/badge.svg
[coveralls-url]: https://coveralls.io/r/yaruson/screensize
