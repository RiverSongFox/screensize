# screensize [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Calculate screen dimensions from diagonal and resolution

## Installation

```sh
$ npm install --save screensize
```

## Usage

```js
var screensize = require('screensize');
var dimensions = screensize.calculate(5.70, 2560, 1440);

/*
 * dimensions
 *   .width = 4.96798...
 *   .height = 2.79449...
 */
```
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
