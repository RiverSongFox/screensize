'use strict';

// Take a diagonal in any length unit and resX / resY in pixels, as the width
// and height of the screen, respectively.
// Return {width, height} of the screen in the same unit as diagonal.
var calculate = function (diagonal, resX, resY) {
  var pixelsInDiagonal = Math.sqrt(Math.pow(resX, 2) + Math.pow(resY, 2));
  var unitsPerPixel = diagonal / pixelsInDiagonal;

  return {
    width: unitsPerPixel * resX,
    height: unitsPerPixel * resY
  };
};

var meterPerInch = 0.0254;
var meterFromInch = function (length) {
  return length * meterPerInch;
};
var inchFromMeter = function (length) {
  return length / meterPerInch;
};

// width, height: screen resolution in pixels.
// diagonal: screen diagonal length in meters.
var Screen = function (width, height, diagonal) {
  this.width = width;
  this.height = height;
  this.diagonal = diagonal;
};

Screen.prototype = {
  // Pixels per meter.
  ppm: function () {
    var diagpx = Math.sqrt(this.width * this.width + this.height * this.height);
    return diagpx / this.diagonal;
  },
  pixelsPer: function (unit) {
    switch (unit) {
      case 'm': return this.ppm();
      case 'dm': return this.ppm() / 10;
      case 'cm': return this.ppm() / 100;
      case 'mm': return this.ppm() / 1000;
      case 'in': return this.ppm() * meterPerInch;
      case 'px': return 1;
    }
  },
  diagonalIn: function (unit) {
    switch (unit) {
      case 'm': return this.diagonal;
      case 'dm': return this.diagonal * 10;
      case 'cm': return this.diagonal * 100;
      case 'mm': return this.diagonal * 1000;
      case 'in': return inchFromMeter(this.diagonal);
      case 'px': return this.ppm() * this.diagonal;
    }
  },
  widthIn: function (unit) {
    switch (unit) {
      case 'm': return this.width / this.ppm();
      case 'dm': return this.width / this.ppm() * 10;
      case 'cm': return this.width / this.ppm() * 100;
      case 'mm': return this.width / this.ppm() * 1000;
      case 'in': return inchFromMeter(this.width / this.ppm());
      case 'px': return this.width;
    }
  },
  heightIn: function (unit) {
    switch (unit) {
      case 'm': return this.height / this.ppm();
      case 'dm': return this.height / this.ppm() * 10;
      case 'cm': return this.height / this.ppm() * 100;
      case 'mm': return this.height / this.ppm() * 1000;
      case 'in': return inchFromMeter(this.height / this.ppm());
      case 'px': return this.height;
    }
  }
};

// Larger number of lines first, unless justified.
// Source: https://en.wikipedia.org/wiki/Graphics_display_resolution
var formats = [
  { re: /\bwhuxga\b/i, v: { width: 7680, height: 4800 } },
  { re: /\bhuxga\b/i, v: { width: 6400, height: 4800 } },
  { re: /\b(8k\b|uhdtv-2)/i, v: { width: 7680, height: 4320 } },
  { re: /\bwhsxga\b/i, v: { width: 6400, height: 4096 } },
  { re: /\bhsxga\b/i, v: { width: 5120, height: 4096 } },
  { re: /\bwhxga\b/i, v: { width: 5120, height: 3200 } },
  { re: /\bhxga\b/i, v: { width: 4096, height: 3072 } },
  { re: /\b(5k\b|uhd\+)/i, v: { width: 5120, height: 2880 } },
  { re: /\bwquxga\b/i, v: { width: 3840, height: 2400 } },
  { re: /\bquxga\b/i, v: { width: 3200, height: 2400 } },
  { re: /\b(dci|cinema)\s+4k\b/i, v: { width: 4096, height: 2160 } },
  { re: /\b(4k|uhd|ultra\s+hd|uhdtv)\b/i, v: { width: 3840, height: 2160 } },
  { re: /\bwqsxga\b/i, v: { width: 3200, height: 2048 } },
  { re: /\bqsxga\b/i, v: { width: 2560, height: 2048 } },
  { re: /\bqHD\b/, v: { width: 960, height: 540 } },  // collision with QHD.
  { re: /\b(qhd\+|wqxga\+)/i, v: { width: 3200, height: 1800 } },
  { re: /\bwqxga\b/i, v: { width: 2560, height: 1600 } },
  { re: /\bqxga\b/i, v: { width: 2048, height: 1536 } },
  { re: /\buwqhd\b/i, v: { width: 3440, height: 1440 } },
  { re: /\b(qhd|quad\s+hd|wqhd|wide\s+quad\s+hd)\b/i, v: { width: 2560, height: 1440 } },
  { re: /\bfull\s+hd(\+|\s+plus\b)/i, v: { width: 2560, height: 1440 } },
  { re: /\b1440[pi]\b/, v: { width: 2560, height: 1440 } },
  { re: /\bwuxga\b/i, v: { width: 1920, height: 1200 } },
  { re: /\buxga\b/i, v: { width: 1600, height: 1200 } },
  { re: /\bqwxga\b/i, v: { width: 2048, height: 1152 } },
  { re: /\buw-uxga\b/i, v: { width: 2560, height: 1080 } },
  { re: /\b2k\b/i, v: { width: 2048, height: 1080 } },
  { re: /\bfhd\b/i, v: { width: 1920, height: 1080 } },
  { re: /\bfull\s+hd\b/i, v: { width: 1920, height: 1080 } },
  { re: /\b1080[pi]\b/, v: { width: 1920, height: 1080 } },
  { re: /\bwsxga\+/i, v: { width: 1680, height: 1050 } },
  { re: /\bsxga\+/i, v: { width: 1400, height: 1050 } },
  { re: /\bwsxga/i, v: { width: 1600, height: 1024 } },
  { re: /\bsxga/i, v: { width: 1280, height: 1024 } },
  { re: /\bfwxga(\+|\s+plus)/i, v: { width: 1440, height: 960 } },
  { re: /\buvga\b/i, v: { width: 1280, height: 960 } },
  { re: /\bhd(\+|\s+plus\b)/i, v: { width: 1600, height: 900 } },
  { re: /\b(wsxga\b|wxga\+)/i, v: { width: 1440, height: 900 } },
  { re: /\bxga\+/i, v: { width: 1152, height: 864 } },
  { re: /\b(wxga|wide\s+xga|fwxga)\b/i, v: { width: 1366, height: 768 } },
  { re: /\bxga\b/i, v: { width: 1024, height: 768 } },
  { re: /\b(hd|hdtv)\b/i, v: { width: 1280, height: 720 } },
  { re: /\b720[pi]\b/, v: { width: 1280, height: 720 } },
  { re: /\b(dvga|double-size\s+vga)\b/i, v: { width: 960, height: 640 } },
  { re: /\b(svga|super\s+vga|uvga|ultra\s+vga)\b/i, v: { width: 800, height: 600 } },
  { re: /\b(wsvga|wide\s+super\s+vga)\b/i, v: { width: 1024, height: 576 } },
  { re: /\b576[pi]\b/, v: { width: 720, height: 576 } },
  { re: /\bfwvga\b/i, v: { width: 854, height: 480 } },
  { re: /\b(wvga|wide\s+vga|wga)\b/i, v: { width: 768, height: 480 } },
  { re: /\b480[pi]\b/, v: { width: 720, height: 480 } },
  { re: /\b(sdtv|edtv)\b/i, v: { width: 720, height: 480 } },
  { re: /\bvga\b/i, v: { width: 640, height: 480 } },
  { re: /\bnHD\b/, v: { width: 640, height: 360 } },
  { re: /\b(mda|hgc)\b/i, v: { width: 720, height: 350 } },
  { re: /\bega\b/i, v: { width: 640, height: 350 } },
  { re: /\bhvga\b/i, v: { width: 480, height: 320 } },
  { re: /\bfwqvga\b/i, v: { width: 432, height: 240 } },
  { re: /\bwqvga\b/i, v: { width: 360, height: 240 } },
  { re: /\bqvga\b/i, v: { width: 320, height: 240 } },
  { re: /\bcga\b/i, v: { width: 320, height: 200 } },
  { re: /\bhqvga\b/i, v: { width: 240, height: 160 } },
  { re: /\bqqvga\b/i, v: { width: 160, height: 120 } }
];

var guessPixels = function (text, screen) {
  // Try to find exact pixel values.
  var match = /([\d\s]+)(?:px|pixels?)?\s*(?:[xX×]|by|par)\s*([\d\s]+)(?:px|pixels?)?/.exec(text);
  if (match != null) {
    screen.width = +match[1].replace(/\s/g, '');
    screen.height = +match[2].replace(/\s/g, '');
    return screen;
  }
  // Try to find a format.
  for (var i = 0, len = formats.length; i < len; i++) {
    if (formats[i].re.test(text)) {
      screen.width = formats[i].v.width;
      screen.height = formats[i].v.height;
      return screen;
    }
  }
  return screen;
};

var guessDiagonal = function (text, screen) {
  var match = /(\d+)(?:[,.](\d+))?\s*(?:in\b|inch\b|inches|"|″|''|’’|pouces?\b)/.exec(text);
  if (match != null) {
    var inchdec = +match[2];
    if (inchdec !== inchdec) {
      inchdec = '0';
    }
    var inches = +(match[1] + '.' + inchdec);
    screen.diagonal = meterFromInch(inches);
  }
  return screen;
};

// Input a textual description of the screen, output a Screen.
var guess = function (text) {
  var screen = new Screen(0, 0, 0);
  guessPixels(text, screen);
  guessDiagonal(text, screen);
  return screen;
};

module.exports = {
  calculate: calculate,
  guess: guess
};
