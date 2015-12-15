'use strict';

var assert = require('assert');
var screensize = require('../lib');

function runTest(diagonal, resX, resY, width, height, precision) {
  var s = screensize.calculate(diagonal, resX, resY);
  assert.equal(width.toPrecision(precision), s.width.toPrecision(precision));
  assert.equal(height.toPrecision(precision), s.height.toPrecision(precision));
}

describe('screensize', function () {
  it('Nokia 105', function () {
    runTest(1.36, 68, 96, 0.78610, 1.10979, 5);
  });
  it('Huawei Nexus 6P', function () {
    runTest(5.70, 2560, 1440, 4.96798, 2.79449, 5);
  });
});
