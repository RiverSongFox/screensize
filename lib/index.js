'use strict';

var calculate = function (diagonal, resX, resY) {
  var pixelsInDiagonal = Math.sqrt(Math.pow(resX, 2) + Math.pow(resY, 2));
  var unitsPerPixel = diagonal / pixelsInDiagonal;

  return {
    width: unitsPerPixel * resX,
    height: unitsPerPixel * resY
  };
};

module.exports = {
  calculate: calculate
};
