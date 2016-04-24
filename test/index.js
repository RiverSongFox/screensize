'use strict';

var assert = require('assert');
var screensize = require('../lib');

function runTest(diagonal, resX, resY, width, height, precision) {
  var s = screensize.calculate(diagonal, resX, resY);
  assert.equal(width.toPrecision(precision), s.width.toPrecision(precision));
  assert.equal(height.toPrecision(precision), s.height.toPrecision(precision));
}

function checkNumbers(value0, value1) {
  assert.equal(value0.toFixed(2), value1.toFixed(2));
}

describe('screensize', function () {
  it('Nokia 105', function () {
    runTest(1.36, 68, 96, 0.78610, 1.10979, 5);
  });
  it('Huawei Nexus 6P', function () {
    runTest(5.70, 2560, 1440, 4.96798, 2.79449, 5);
  });
  it('Full HD, 21.5 inches', function () {
    var screen = screensize.guess('Full HD, 21.5 inches');
    checkNumbers(screen.widthIn('m'), 0.48);
    checkNumbers(screen.widthIn('dm'), 4.76);
    checkNumbers(screen.widthIn('cm'), 47.60);
    checkNumbers(screen.widthIn('mm'), 475.97);
    checkNumbers(screen.widthIn('in'), 18.74);
    checkNumbers(screen.widthIn('px'), 1920);
    checkNumbers(screen.heightIn('m'), 0.27);
    checkNumbers(screen.heightIn('dm'), 2.68);
    checkNumbers(screen.heightIn('cm'), 26.77);
    checkNumbers(screen.heightIn('mm'), 267.73);
    checkNumbers(screen.heightIn('in'), 10.54);
    checkNumbers(screen.heightIn('px'), 1080);
    checkNumbers(screen.diagonalIn('m'), 0.55);
    checkNumbers(screen.diagonalIn('dm'), 5.46);
    checkNumbers(screen.diagonalIn('cm'), 54.61);
    checkNumbers(screen.diagonalIn('mm'), 546.1);
    checkNumbers(screen.diagonalIn('in'), 21.5);
    checkNumbers(screen.diagonalIn('px'), 2202.91);
    checkNumbers(screen.pixelsPer('m'), 4033.89);
    checkNumbers(screen.pixelsPer('dm'), 403.39);
    checkNumbers(screen.pixelsPer('cm'), 40.34);
    checkNumbers(screen.pixelsPer('mm'), 4.03);
    checkNumbers(screen.pixelsPer('in'), 102.46);
    checkNumbers(screen.pixelsPer('px'), 1.00);
  });
});
