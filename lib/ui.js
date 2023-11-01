var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __commonJS = (callback, module) => () => {
  if (!module) {
    module = {exports: {}};
    callback(module.exports, module);
  }
  return module.exports;
};
var __exportStar = (target, module, desc) => {
  if (module && typeof module === "object" || typeof module === "function") {
    for (let key of __getOwnPropNames(module))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module) => {
  return __exportStar(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? {get: () => module.default, enumerable: true} : {value: module, enumerable: true})), module);
};

// node_modules/color-name/index.js
var require_color_name = __commonJS((exports, module) => {
  "use strict";
  module.exports = {
    aliceblue: [240, 248, 255],
    antiquewhite: [250, 235, 215],
    aqua: [0, 255, 255],
    aquamarine: [127, 255, 212],
    azure: [240, 255, 255],
    beige: [245, 245, 220],
    bisque: [255, 228, 196],
    black: [0, 0, 0],
    blanchedalmond: [255, 235, 205],
    blue: [0, 0, 255],
    blueviolet: [138, 43, 226],
    brown: [165, 42, 42],
    burlywood: [222, 184, 135],
    cadetblue: [95, 158, 160],
    chartreuse: [127, 255, 0],
    chocolate: [210, 105, 30],
    coral: [255, 127, 80],
    cornflowerblue: [100, 149, 237],
    cornsilk: [255, 248, 220],
    crimson: [220, 20, 60],
    cyan: [0, 255, 255],
    darkblue: [0, 0, 139],
    darkcyan: [0, 139, 139],
    darkgoldenrod: [184, 134, 11],
    darkgray: [169, 169, 169],
    darkgreen: [0, 100, 0],
    darkgrey: [169, 169, 169],
    darkkhaki: [189, 183, 107],
    darkmagenta: [139, 0, 139],
    darkolivegreen: [85, 107, 47],
    darkorange: [255, 140, 0],
    darkorchid: [153, 50, 204],
    darkred: [139, 0, 0],
    darksalmon: [233, 150, 122],
    darkseagreen: [143, 188, 143],
    darkslateblue: [72, 61, 139],
    darkslategray: [47, 79, 79],
    darkslategrey: [47, 79, 79],
    darkturquoise: [0, 206, 209],
    darkviolet: [148, 0, 211],
    deeppink: [255, 20, 147],
    deepskyblue: [0, 191, 255],
    dimgray: [105, 105, 105],
    dimgrey: [105, 105, 105],
    dodgerblue: [30, 144, 255],
    firebrick: [178, 34, 34],
    floralwhite: [255, 250, 240],
    forestgreen: [34, 139, 34],
    fuchsia: [255, 0, 255],
    gainsboro: [220, 220, 220],
    ghostwhite: [248, 248, 255],
    gold: [255, 215, 0],
    goldenrod: [218, 165, 32],
    gray: [128, 128, 128],
    green: [0, 128, 0],
    greenyellow: [173, 255, 47],
    grey: [128, 128, 128],
    honeydew: [240, 255, 240],
    hotpink: [255, 105, 180],
    indianred: [205, 92, 92],
    indigo: [75, 0, 130],
    ivory: [255, 255, 240],
    khaki: [240, 230, 140],
    lavender: [230, 230, 250],
    lavenderblush: [255, 240, 245],
    lawngreen: [124, 252, 0],
    lemonchiffon: [255, 250, 205],
    lightblue: [173, 216, 230],
    lightcoral: [240, 128, 128],
    lightcyan: [224, 255, 255],
    lightgoldenrodyellow: [250, 250, 210],
    lightgray: [211, 211, 211],
    lightgreen: [144, 238, 144],
    lightgrey: [211, 211, 211],
    lightpink: [255, 182, 193],
    lightsalmon: [255, 160, 122],
    lightseagreen: [32, 178, 170],
    lightskyblue: [135, 206, 250],
    lightslategray: [119, 136, 153],
    lightslategrey: [119, 136, 153],
    lightsteelblue: [176, 196, 222],
    lightyellow: [255, 255, 224],
    lime: [0, 255, 0],
    limegreen: [50, 205, 50],
    linen: [250, 240, 230],
    magenta: [255, 0, 255],
    maroon: [128, 0, 0],
    mediumaquamarine: [102, 205, 170],
    mediumblue: [0, 0, 205],
    mediumorchid: [186, 85, 211],
    mediumpurple: [147, 112, 219],
    mediumseagreen: [60, 179, 113],
    mediumslateblue: [123, 104, 238],
    mediumspringgreen: [0, 250, 154],
    mediumturquoise: [72, 209, 204],
    mediumvioletred: [199, 21, 133],
    midnightblue: [25, 25, 112],
    mintcream: [245, 255, 250],
    mistyrose: [255, 228, 225],
    moccasin: [255, 228, 181],
    navajowhite: [255, 222, 173],
    navy: [0, 0, 128],
    oldlace: [253, 245, 230],
    olive: [128, 128, 0],
    olivedrab: [107, 142, 35],
    orange: [255, 165, 0],
    orangered: [255, 69, 0],
    orchid: [218, 112, 214],
    palegoldenrod: [238, 232, 170],
    palegreen: [152, 251, 152],
    paleturquoise: [175, 238, 238],
    palevioletred: [219, 112, 147],
    papayawhip: [255, 239, 213],
    peachpuff: [255, 218, 185],
    peru: [205, 133, 63],
    pink: [255, 192, 203],
    plum: [221, 160, 221],
    powderblue: [176, 224, 230],
    purple: [128, 0, 128],
    rebeccapurple: [102, 51, 153],
    red: [255, 0, 0],
    rosybrown: [188, 143, 143],
    royalblue: [65, 105, 225],
    saddlebrown: [139, 69, 19],
    salmon: [250, 128, 114],
    sandybrown: [244, 164, 96],
    seagreen: [46, 139, 87],
    seashell: [255, 245, 238],
    sienna: [160, 82, 45],
    silver: [192, 192, 192],
    skyblue: [135, 206, 235],
    slateblue: [106, 90, 205],
    slategray: [112, 128, 144],
    slategrey: [112, 128, 144],
    snow: [255, 250, 250],
    springgreen: [0, 255, 127],
    steelblue: [70, 130, 180],
    tan: [210, 180, 140],
    teal: [0, 128, 128],
    thistle: [216, 191, 216],
    tomato: [255, 99, 71],
    turquoise: [64, 224, 208],
    violet: [238, 130, 238],
    wheat: [245, 222, 179],
    white: [255, 255, 255],
    whitesmoke: [245, 245, 245],
    yellow: [255, 255, 0],
    yellowgreen: [154, 205, 50]
  };
});

// node_modules/color-parse/index.js
var require_color_parse = __commonJS((exports, module) => {
  "use strict";
  var names = require_color_name();
  module.exports = parse2;
  var baseHues = {
    red: 0,
    orange: 60,
    yellow: 120,
    green: 180,
    blue: 240,
    purple: 300
  };
  function parse2(cstr) {
    var m, parts = [], alpha = 1, space;
    if (typeof cstr === "string") {
      if (names[cstr]) {
        parts = names[cstr].slice();
        space = "rgb";
      } else if (cstr === "transparent") {
        alpha = 0;
        space = "rgb";
        parts = [0, 0, 0];
      } else if (/^#[A-Fa-f0-9]+$/.test(cstr)) {
        var base = cstr.slice(1);
        var size = base.length;
        var isShort = size <= 4;
        alpha = 1;
        if (isShort) {
          parts = [
            parseInt(base[0] + base[0], 16),
            parseInt(base[1] + base[1], 16),
            parseInt(base[2] + base[2], 16)
          ];
          if (size === 4) {
            alpha = parseInt(base[3] + base[3], 16) / 255;
          }
        } else {
          parts = [
            parseInt(base[0] + base[1], 16),
            parseInt(base[2] + base[3], 16),
            parseInt(base[4] + base[5], 16)
          ];
          if (size === 8) {
            alpha = parseInt(base[6] + base[7], 16) / 255;
          }
        }
        if (!parts[0])
          parts[0] = 0;
        if (!parts[1])
          parts[1] = 0;
        if (!parts[2])
          parts[2] = 0;
        space = "rgb";
      } else if (m = /^((?:rgb|hs[lvb]|hwb|cmyk?|xy[zy]|gray|lab|lchu?v?|[ly]uv|lms)a?)\s*\(([^\)]*)\)/.exec(cstr)) {
        var name = m[1];
        var isRGB = name === "rgb";
        var base = name.replace(/a$/, "");
        space = base;
        var size = base === "cmyk" ? 4 : base === "gray" ? 1 : 3;
        parts = m[2].trim().split(/\s*[,\/]\s*|\s+/).map(function(x, i) {
          if (/%$/.test(x)) {
            if (i === size)
              return parseFloat(x) / 100;
            if (base === "rgb")
              return parseFloat(x) * 255 / 100;
            return parseFloat(x);
          } else if (base[i] === "h") {
            if (/deg$/.test(x)) {
              return parseFloat(x);
            } else if (baseHues[x] !== void 0) {
              return baseHues[x];
            }
          }
          return parseFloat(x);
        });
        if (name === base)
          parts.push(1);
        alpha = isRGB ? 1 : parts[size] === void 0 ? 1 : parts[size];
        parts = parts.slice(0, size);
      } else if (cstr.length > 10 && /[0-9](?:\s|\/)/.test(cstr)) {
        parts = cstr.match(/([0-9]+)/g).map(function(value) {
          return parseFloat(value);
        });
        space = cstr.match(/([a-z])/ig).join("").toLowerCase();
      }
    } else if (!isNaN(cstr)) {
      space = "rgb";
      parts = [cstr >>> 16, (cstr & 65280) >>> 8, cstr & 255];
    } else if (Array.isArray(cstr) || cstr.length) {
      parts = [cstr[0], cstr[1], cstr[2]];
      space = "rgb";
      alpha = cstr.length === 4 ? cstr[3] : 1;
    } else if (cstr instanceof Object) {
      if (cstr.r != null || cstr.red != null || cstr.R != null) {
        space = "rgb";
        parts = [
          cstr.r || cstr.red || cstr.R || 0,
          cstr.g || cstr.green || cstr.G || 0,
          cstr.b || cstr.blue || cstr.B || 0
        ];
      } else {
        space = "hsl";
        parts = [
          cstr.h || cstr.hue || cstr.H || 0,
          cstr.s || cstr.saturation || cstr.S || 0,
          cstr.l || cstr.lightness || cstr.L || cstr.b || cstr.brightness
        ];
      }
      alpha = cstr.a || cstr.alpha || cstr.opacity || 1;
      if (cstr.opacity != null)
        alpha /= 100;
    }
    return {
      space,
      values: parts,
      alpha
    };
  }
});

// node_modules/color-convert/conversions.js
var require_conversions = __commonJS((exports, module) => {
  var cssKeywords = require_color_name();
  var reverseKeywords = {};
  for (const key of Object.keys(cssKeywords)) {
    reverseKeywords[cssKeywords[key]] = key;
  }
  var convert2 = {
    rgb: {channels: 3, labels: "rgb"},
    hsl: {channels: 3, labels: "hsl"},
    hsv: {channels: 3, labels: "hsv"},
    hwb: {channels: 3, labels: "hwb"},
    cmyk: {channels: 4, labels: "cmyk"},
    xyz: {channels: 3, labels: "xyz"},
    lab: {channels: 3, labels: "lab"},
    lch: {channels: 3, labels: "lch"},
    hex: {channels: 1, labels: ["hex"]},
    keyword: {channels: 1, labels: ["keyword"]},
    ansi16: {channels: 1, labels: ["ansi16"]},
    ansi256: {channels: 1, labels: ["ansi256"]},
    hcg: {channels: 3, labels: ["h", "c", "g"]},
    apple: {channels: 3, labels: ["r16", "g16", "b16"]},
    gray: {channels: 1, labels: ["gray"]}
  };
  module.exports = convert2;
  for (const model of Object.keys(convert2)) {
    if (!("channels" in convert2[model])) {
      throw new Error("missing channels property: " + model);
    }
    if (!("labels" in convert2[model])) {
      throw new Error("missing channel labels property: " + model);
    }
    if (convert2[model].labels.length !== convert2[model].channels) {
      throw new Error("channel and label counts mismatch: " + model);
    }
    const {channels, labels} = convert2[model];
    delete convert2[model].channels;
    delete convert2[model].labels;
    Object.defineProperty(convert2[model], "channels", {value: channels});
    Object.defineProperty(convert2[model], "labels", {value: labels});
  }
  convert2.rgb.hsl = function(rgb) {
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;
    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);
    const delta = max - min;
    let h;
    let s;
    if (max === min) {
      h = 0;
    } else if (r === max) {
      h = (g - b) / delta;
    } else if (g === max) {
      h = 2 + (b - r) / delta;
    } else if (b === max) {
      h = 4 + (r - g) / delta;
    }
    h = Math.min(h * 60, 360);
    if (h < 0) {
      h += 360;
    }
    const l = (min + max) / 2;
    if (max === min) {
      s = 0;
    } else if (l <= 0.5) {
      s = delta / (max + min);
    } else {
      s = delta / (2 - max - min);
    }
    return [h, s * 100, l * 100];
  };
  convert2.rgb.hsv = function(rgb) {
    let rdif;
    let gdif;
    let bdif;
    let h;
    let s;
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;
    const v = Math.max(r, g, b);
    const diff = v - Math.min(r, g, b);
    const diffc = function(c) {
      return (v - c) / 6 / diff + 1 / 2;
    };
    if (diff === 0) {
      h = 0;
      s = 0;
    } else {
      s = diff / v;
      rdif = diffc(r);
      gdif = diffc(g);
      bdif = diffc(b);
      if (r === v) {
        h = bdif - gdif;
      } else if (g === v) {
        h = 1 / 3 + rdif - bdif;
      } else if (b === v) {
        h = 2 / 3 + gdif - rdif;
      }
      if (h < 0) {
        h += 1;
      } else if (h > 1) {
        h -= 1;
      }
    }
    return [
      h * 360,
      s * 100,
      v * 100
    ];
  };
  convert2.rgb.hwb = function(rgb) {
    const r = rgb[0];
    const g = rgb[1];
    let b = rgb[2];
    const h = convert2.rgb.hsl(rgb)[0];
    const w = 1 / 255 * Math.min(r, Math.min(g, b));
    b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));
    return [h, w * 100, b * 100];
  };
  convert2.rgb.cmyk = function(rgb) {
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;
    const k = Math.min(1 - r, 1 - g, 1 - b);
    const c = (1 - r - k) / (1 - k) || 0;
    const m = (1 - g - k) / (1 - k) || 0;
    const y = (1 - b - k) / (1 - k) || 0;
    return [c * 100, m * 100, y * 100, k * 100];
  };
  function comparativeDistance(x, y) {
    return (x[0] - y[0]) ** 2 + (x[1] - y[1]) ** 2 + (x[2] - y[2]) ** 2;
  }
  convert2.rgb.keyword = function(rgb) {
    const reversed = reverseKeywords[rgb];
    if (reversed) {
      return reversed;
    }
    let currentClosestDistance = Infinity;
    let currentClosestKeyword;
    for (const keyword of Object.keys(cssKeywords)) {
      const value = cssKeywords[keyword];
      const distance = comparativeDistance(rgb, value);
      if (distance < currentClosestDistance) {
        currentClosestDistance = distance;
        currentClosestKeyword = keyword;
      }
    }
    return currentClosestKeyword;
  };
  convert2.keyword.rgb = function(keyword) {
    return cssKeywords[keyword];
  };
  convert2.rgb.xyz = function(rgb) {
    let r = rgb[0] / 255;
    let g = rgb[1] / 255;
    let b = rgb[2] / 255;
    r = r > 0.04045 ? ((r + 0.055) / 1.055) ** 2.4 : r / 12.92;
    g = g > 0.04045 ? ((g + 0.055) / 1.055) ** 2.4 : g / 12.92;
    b = b > 0.04045 ? ((b + 0.055) / 1.055) ** 2.4 : b / 12.92;
    const x = r * 0.4124 + g * 0.3576 + b * 0.1805;
    const y = r * 0.2126 + g * 0.7152 + b * 0.0722;
    const z = r * 0.0193 + g * 0.1192 + b * 0.9505;
    return [x * 100, y * 100, z * 100];
  };
  convert2.rgb.lab = function(rgb) {
    const xyz = convert2.rgb.xyz(rgb);
    let x = xyz[0];
    let y = xyz[1];
    let z = xyz[2];
    x /= 95.047;
    y /= 100;
    z /= 108.883;
    x = x > 8856e-6 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
    y = y > 8856e-6 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
    z = z > 8856e-6 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
    const l = 116 * y - 16;
    const a = 500 * (x - y);
    const b = 200 * (y - z);
    return [l, a, b];
  };
  convert2.hsl.rgb = function(hsl) {
    const h = hsl[0] / 360;
    const s = hsl[1] / 100;
    const l = hsl[2] / 100;
    let t2;
    let t3;
    let val;
    if (s === 0) {
      val = l * 255;
      return [val, val, val];
    }
    if (l < 0.5) {
      t2 = l * (1 + s);
    } else {
      t2 = l + s - l * s;
    }
    const t1 = 2 * l - t2;
    const rgb = [0, 0, 0];
    for (let i = 0; i < 3; i++) {
      t3 = h + 1 / 3 * -(i - 1);
      if (t3 < 0) {
        t3++;
      }
      if (t3 > 1) {
        t3--;
      }
      if (6 * t3 < 1) {
        val = t1 + (t2 - t1) * 6 * t3;
      } else if (2 * t3 < 1) {
        val = t2;
      } else if (3 * t3 < 2) {
        val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
      } else {
        val = t1;
      }
      rgb[i] = val * 255;
    }
    return rgb;
  };
  convert2.hsl.hsv = function(hsl) {
    const h = hsl[0];
    let s = hsl[1] / 100;
    let l = hsl[2] / 100;
    let smin = s;
    const lmin = Math.max(l, 0.01);
    l *= 2;
    s *= l <= 1 ? l : 2 - l;
    smin *= lmin <= 1 ? lmin : 2 - lmin;
    const v = (l + s) / 2;
    const sv = l === 0 ? 2 * smin / (lmin + smin) : 2 * s / (l + s);
    return [h, sv * 100, v * 100];
  };
  convert2.hsv.rgb = function(hsv) {
    const h = hsv[0] / 60;
    const s = hsv[1] / 100;
    let v = hsv[2] / 100;
    const hi = Math.floor(h) % 6;
    const f = h - Math.floor(h);
    const p = 255 * v * (1 - s);
    const q = 255 * v * (1 - s * f);
    const t = 255 * v * (1 - s * (1 - f));
    v *= 255;
    switch (hi) {
      case 0:
        return [v, t, p];
      case 1:
        return [q, v, p];
      case 2:
        return [p, v, t];
      case 3:
        return [p, q, v];
      case 4:
        return [t, p, v];
      case 5:
        return [v, p, q];
    }
  };
  convert2.hsv.hsl = function(hsv) {
    const h = hsv[0];
    const s = hsv[1] / 100;
    const v = hsv[2] / 100;
    const vmin = Math.max(v, 0.01);
    let sl;
    let l;
    l = (2 - s) * v;
    const lmin = (2 - s) * vmin;
    sl = s * vmin;
    sl /= lmin <= 1 ? lmin : 2 - lmin;
    sl = sl || 0;
    l /= 2;
    return [h, sl * 100, l * 100];
  };
  convert2.hwb.rgb = function(hwb) {
    const h = hwb[0] / 360;
    let wh = hwb[1] / 100;
    let bl = hwb[2] / 100;
    const ratio = wh + bl;
    let f;
    if (ratio > 1) {
      wh /= ratio;
      bl /= ratio;
    }
    const i = Math.floor(6 * h);
    const v = 1 - bl;
    f = 6 * h - i;
    if ((i & 1) !== 0) {
      f = 1 - f;
    }
    const n = wh + f * (v - wh);
    let r;
    let g;
    let b;
    switch (i) {
      default:
      case 6:
      case 0:
        r = v;
        g = n;
        b = wh;
        break;
      case 1:
        r = n;
        g = v;
        b = wh;
        break;
      case 2:
        r = wh;
        g = v;
        b = n;
        break;
      case 3:
        r = wh;
        g = n;
        b = v;
        break;
      case 4:
        r = n;
        g = wh;
        b = v;
        break;
      case 5:
        r = v;
        g = wh;
        b = n;
        break;
    }
    return [r * 255, g * 255, b * 255];
  };
  convert2.cmyk.rgb = function(cmyk) {
    const c = cmyk[0] / 100;
    const m = cmyk[1] / 100;
    const y = cmyk[2] / 100;
    const k = cmyk[3] / 100;
    const r = 1 - Math.min(1, c * (1 - k) + k);
    const g = 1 - Math.min(1, m * (1 - k) + k);
    const b = 1 - Math.min(1, y * (1 - k) + k);
    return [r * 255, g * 255, b * 255];
  };
  convert2.xyz.rgb = function(xyz) {
    const x = xyz[0] / 100;
    const y = xyz[1] / 100;
    const z = xyz[2] / 100;
    let r;
    let g;
    let b;
    r = x * 3.2406 + y * -1.5372 + z * -0.4986;
    g = x * -0.9689 + y * 1.8758 + z * 0.0415;
    b = x * 0.0557 + y * -0.204 + z * 1.057;
    r = r > 31308e-7 ? 1.055 * r ** (1 / 2.4) - 0.055 : r * 12.92;
    g = g > 31308e-7 ? 1.055 * g ** (1 / 2.4) - 0.055 : g * 12.92;
    b = b > 31308e-7 ? 1.055 * b ** (1 / 2.4) - 0.055 : b * 12.92;
    r = Math.min(Math.max(0, r), 1);
    g = Math.min(Math.max(0, g), 1);
    b = Math.min(Math.max(0, b), 1);
    return [r * 255, g * 255, b * 255];
  };
  convert2.xyz.lab = function(xyz) {
    let x = xyz[0];
    let y = xyz[1];
    let z = xyz[2];
    x /= 95.047;
    y /= 100;
    z /= 108.883;
    x = x > 8856e-6 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
    y = y > 8856e-6 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
    z = z > 8856e-6 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
    const l = 116 * y - 16;
    const a = 500 * (x - y);
    const b = 200 * (y - z);
    return [l, a, b];
  };
  convert2.lab.xyz = function(lab) {
    const l = lab[0];
    const a = lab[1];
    const b = lab[2];
    let x;
    let y;
    let z;
    y = (l + 16) / 116;
    x = a / 500 + y;
    z = y - b / 200;
    const y2 = y ** 3;
    const x2 = x ** 3;
    const z2 = z ** 3;
    y = y2 > 8856e-6 ? y2 : (y - 16 / 116) / 7.787;
    x = x2 > 8856e-6 ? x2 : (x - 16 / 116) / 7.787;
    z = z2 > 8856e-6 ? z2 : (z - 16 / 116) / 7.787;
    x *= 95.047;
    y *= 100;
    z *= 108.883;
    return [x, y, z];
  };
  convert2.lab.lch = function(lab) {
    const l = lab[0];
    const a = lab[1];
    const b = lab[2];
    let h;
    const hr = Math.atan2(b, a);
    h = hr * 360 / 2 / Math.PI;
    if (h < 0) {
      h += 360;
    }
    const c = Math.sqrt(a * a + b * b);
    return [l, c, h];
  };
  convert2.lch.lab = function(lch) {
    const l = lch[0];
    const c = lch[1];
    const h = lch[2];
    const hr = h / 360 * 2 * Math.PI;
    const a = c * Math.cos(hr);
    const b = c * Math.sin(hr);
    return [l, a, b];
  };
  convert2.rgb.ansi16 = function(args, saturation = null) {
    const [r, g, b] = args;
    let value = saturation === null ? convert2.rgb.hsv(args)[2] : saturation;
    value = Math.round(value / 50);
    if (value === 0) {
      return 30;
    }
    let ansi = 30 + (Math.round(b / 255) << 2 | Math.round(g / 255) << 1 | Math.round(r / 255));
    if (value === 2) {
      ansi += 60;
    }
    return ansi;
  };
  convert2.hsv.ansi16 = function(args) {
    return convert2.rgb.ansi16(convert2.hsv.rgb(args), args[2]);
  };
  convert2.rgb.ansi256 = function(args) {
    const r = args[0];
    const g = args[1];
    const b = args[2];
    if (r === g && g === b) {
      if (r < 8) {
        return 16;
      }
      if (r > 248) {
        return 231;
      }
      return Math.round((r - 8) / 247 * 24) + 232;
    }
    const ansi = 16 + 36 * Math.round(r / 255 * 5) + 6 * Math.round(g / 255 * 5) + Math.round(b / 255 * 5);
    return ansi;
  };
  convert2.ansi16.rgb = function(args) {
    let color = args % 10;
    if (color === 0 || color === 7) {
      if (args > 50) {
        color += 3.5;
      }
      color = color / 10.5 * 255;
      return [color, color, color];
    }
    const mult = (~~(args > 50) + 1) * 0.5;
    const r = (color & 1) * mult * 255;
    const g = (color >> 1 & 1) * mult * 255;
    const b = (color >> 2 & 1) * mult * 255;
    return [r, g, b];
  };
  convert2.ansi256.rgb = function(args) {
    if (args >= 232) {
      const c = (args - 232) * 10 + 8;
      return [c, c, c];
    }
    args -= 16;
    let rem;
    const r = Math.floor(args / 36) / 5 * 255;
    const g = Math.floor((rem = args % 36) / 6) / 5 * 255;
    const b = rem % 6 / 5 * 255;
    return [r, g, b];
  };
  convert2.rgb.hex = function(args) {
    const integer = ((Math.round(args[0]) & 255) << 16) + ((Math.round(args[1]) & 255) << 8) + (Math.round(args[2]) & 255);
    const string = integer.toString(16).toUpperCase();
    return "000000".substring(string.length) + string;
  };
  convert2.hex.rgb = function(args) {
    const match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
    if (!match) {
      return [0, 0, 0];
    }
    let colorString = match[0];
    if (match[0].length === 3) {
      colorString = colorString.split("").map((char) => {
        return char + char;
      }).join("");
    }
    const integer = parseInt(colorString, 16);
    const r = integer >> 16 & 255;
    const g = integer >> 8 & 255;
    const b = integer & 255;
    return [r, g, b];
  };
  convert2.rgb.hcg = function(rgb) {
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;
    const max = Math.max(Math.max(r, g), b);
    const min = Math.min(Math.min(r, g), b);
    const chroma = max - min;
    let grayscale;
    let hue;
    if (chroma < 1) {
      grayscale = min / (1 - chroma);
    } else {
      grayscale = 0;
    }
    if (chroma <= 0) {
      hue = 0;
    } else if (max === r) {
      hue = (g - b) / chroma % 6;
    } else if (max === g) {
      hue = 2 + (b - r) / chroma;
    } else {
      hue = 4 + (r - g) / chroma;
    }
    hue /= 6;
    hue %= 1;
    return [hue * 360, chroma * 100, grayscale * 100];
  };
  convert2.hsl.hcg = function(hsl) {
    const s = hsl[1] / 100;
    const l = hsl[2] / 100;
    const c = l < 0.5 ? 2 * s * l : 2 * s * (1 - l);
    let f = 0;
    if (c < 1) {
      f = (l - 0.5 * c) / (1 - c);
    }
    return [hsl[0], c * 100, f * 100];
  };
  convert2.hsv.hcg = function(hsv) {
    const s = hsv[1] / 100;
    const v = hsv[2] / 100;
    const c = s * v;
    let f = 0;
    if (c < 1) {
      f = (v - c) / (1 - c);
    }
    return [hsv[0], c * 100, f * 100];
  };
  convert2.hcg.rgb = function(hcg) {
    const h = hcg[0] / 360;
    const c = hcg[1] / 100;
    const g = hcg[2] / 100;
    if (c === 0) {
      return [g * 255, g * 255, g * 255];
    }
    const pure = [0, 0, 0];
    const hi = h % 1 * 6;
    const v = hi % 1;
    const w = 1 - v;
    let mg = 0;
    switch (Math.floor(hi)) {
      case 0:
        pure[0] = 1;
        pure[1] = v;
        pure[2] = 0;
        break;
      case 1:
        pure[0] = w;
        pure[1] = 1;
        pure[2] = 0;
        break;
      case 2:
        pure[0] = 0;
        pure[1] = 1;
        pure[2] = v;
        break;
      case 3:
        pure[0] = 0;
        pure[1] = w;
        pure[2] = 1;
        break;
      case 4:
        pure[0] = v;
        pure[1] = 0;
        pure[2] = 1;
        break;
      default:
        pure[0] = 1;
        pure[1] = 0;
        pure[2] = w;
    }
    mg = (1 - c) * g;
    return [
      (c * pure[0] + mg) * 255,
      (c * pure[1] + mg) * 255,
      (c * pure[2] + mg) * 255
    ];
  };
  convert2.hcg.hsv = function(hcg) {
    const c = hcg[1] / 100;
    const g = hcg[2] / 100;
    const v = c + g * (1 - c);
    let f = 0;
    if (v > 0) {
      f = c / v;
    }
    return [hcg[0], f * 100, v * 100];
  };
  convert2.hcg.hsl = function(hcg) {
    const c = hcg[1] / 100;
    const g = hcg[2] / 100;
    const l = g * (1 - c) + 0.5 * c;
    let s = 0;
    if (l > 0 && l < 0.5) {
      s = c / (2 * l);
    } else if (l >= 0.5 && l < 1) {
      s = c / (2 * (1 - l));
    }
    return [hcg[0], s * 100, l * 100];
  };
  convert2.hcg.hwb = function(hcg) {
    const c = hcg[1] / 100;
    const g = hcg[2] / 100;
    const v = c + g * (1 - c);
    return [hcg[0], (v - c) * 100, (1 - v) * 100];
  };
  convert2.hwb.hcg = function(hwb) {
    const w = hwb[1] / 100;
    const b = hwb[2] / 100;
    const v = 1 - b;
    const c = v - w;
    let g = 0;
    if (c < 1) {
      g = (v - c) / (1 - c);
    }
    return [hwb[0], c * 100, g * 100];
  };
  convert2.apple.rgb = function(apple) {
    return [apple[0] / 65535 * 255, apple[1] / 65535 * 255, apple[2] / 65535 * 255];
  };
  convert2.rgb.apple = function(rgb) {
    return [rgb[0] / 255 * 65535, rgb[1] / 255 * 65535, rgb[2] / 255 * 65535];
  };
  convert2.gray.rgb = function(args) {
    return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
  };
  convert2.gray.hsl = function(args) {
    return [0, 0, args[0]];
  };
  convert2.gray.hsv = convert2.gray.hsl;
  convert2.gray.hwb = function(gray) {
    return [0, 100, gray[0]];
  };
  convert2.gray.cmyk = function(gray) {
    return [0, 0, 0, gray[0]];
  };
  convert2.gray.lab = function(gray) {
    return [gray[0], 0, 0];
  };
  convert2.gray.hex = function(gray) {
    const val = Math.round(gray[0] / 100 * 255) & 255;
    const integer = (val << 16) + (val << 8) + val;
    const string = integer.toString(16).toUpperCase();
    return "000000".substring(string.length) + string;
  };
  convert2.rgb.gray = function(rgb) {
    const val = (rgb[0] + rgb[1] + rgb[2]) / 3;
    return [val / 255 * 100];
  };
});

// node_modules/color-convert/route.js
var require_route = __commonJS((exports, module) => {
  var conversions = require_conversions();
  function buildGraph() {
    const graph = {};
    const models = Object.keys(conversions);
    for (let len = models.length, i = 0; i < len; i++) {
      graph[models[i]] = {
        distance: -1,
        parent: null
      };
    }
    return graph;
  }
  function deriveBFS(fromModel) {
    const graph = buildGraph();
    const queue = [fromModel];
    graph[fromModel].distance = 0;
    while (queue.length) {
      const current = queue.pop();
      const adjacents = Object.keys(conversions[current]);
      for (let len = adjacents.length, i = 0; i < len; i++) {
        const adjacent = adjacents[i];
        const node = graph[adjacent];
        if (node.distance === -1) {
          node.distance = graph[current].distance + 1;
          node.parent = current;
          queue.unshift(adjacent);
        }
      }
    }
    return graph;
  }
  function link(from, to) {
    return function(args) {
      return to(from(args));
    };
  }
  function wrapConversion(toModel, graph) {
    const path = [graph[toModel].parent, toModel];
    let fn = conversions[graph[toModel].parent][toModel];
    let cur = graph[toModel].parent;
    while (graph[cur].parent) {
      path.unshift(graph[cur].parent);
      fn = link(conversions[graph[cur].parent][cur], fn);
      cur = graph[cur].parent;
    }
    fn.conversion = path;
    return fn;
  }
  module.exports = function(fromModel) {
    const graph = deriveBFS(fromModel);
    const conversion = {};
    const models = Object.keys(graph);
    for (let len = models.length, i = 0; i < len; i++) {
      const toModel = models[i];
      const node = graph[toModel];
      if (node.parent === null) {
        continue;
      }
      conversion[toModel] = wrapConversion(toModel, graph);
    }
    return conversion;
  };
});

// node_modules/color-convert/index.js
var require_color_convert = __commonJS((exports, module) => {
  var conversions = require_conversions();
  var route = require_route();
  var convert2 = {};
  var models = Object.keys(conversions);
  function wrapRaw(fn) {
    const wrappedFn = function(...args) {
      const arg0 = args[0];
      if (arg0 === void 0 || arg0 === null) {
        return arg0;
      }
      if (arg0.length > 1) {
        args = arg0;
      }
      return fn(args);
    };
    if ("conversion" in fn) {
      wrappedFn.conversion = fn.conversion;
    }
    return wrappedFn;
  }
  function wrapRounded(fn) {
    const wrappedFn = function(...args) {
      const arg0 = args[0];
      if (arg0 === void 0 || arg0 === null) {
        return arg0;
      }
      if (arg0.length > 1) {
        args = arg0;
      }
      const result = fn(args);
      if (typeof result === "object") {
        for (let len = result.length, i = 0; i < len; i++) {
          result[i] = Math.round(result[i]);
        }
      }
      return result;
    };
    if ("conversion" in fn) {
      wrappedFn.conversion = fn.conversion;
    }
    return wrappedFn;
  }
  models.forEach((fromModel) => {
    convert2[fromModel] = {};
    Object.defineProperty(convert2[fromModel], "channels", {value: conversions[fromModel].channels});
    Object.defineProperty(convert2[fromModel], "labels", {value: conversions[fromModel].labels});
    const routes = route(fromModel);
    const routeModels = Object.keys(routes);
    routeModels.forEach((toModel) => {
      const fn = routes[toModel];
      convert2[fromModel][toModel] = wrapRounded(fn);
      convert2[fromModel][toModel].raw = wrapRaw(fn);
    });
  });
  module.exports = convert2;
});

// node_modules/@ckeditor/ckeditor5-ui/src/bindings/clickoutsidehandler.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function clickOutsideHandler({emitter, activator, callback, contextElements}) {
  emitter.listenTo(document, "mousedown", (evt, domEvt) => {
    if (!activator()) {
      return;
    }
    const path = typeof domEvt.composedPath == "function" ? domEvt.composedPath() : [];
    const contextElementsList = typeof contextElements == "function" ? contextElements() : contextElements;
    for (const contextElement of contextElementsList) {
      if (contextElement.contains(domEvt.target) || path.includes(contextElement)) {
        return;
      }
    }
    callback();
  });
}

// node_modules/@ckeditor/ckeditor5-ui/src/bindings/injectcsstransitiondisabler.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function injectCssTransitionDisabler(view) {
  const decorated = view;
  decorated.set("_isCssTransitionsDisabled", false);
  decorated.disableCssTransitions = () => {
    decorated._isCssTransitionsDisabled = true;
  };
  decorated.enableCssTransitions = () => {
    decorated._isCssTransitionsDisabled = false;
  };
  decorated.extendTemplate({
    attributes: {
      class: [
        decorated.bindTemplate.if("_isCssTransitionsDisabled", "ck-transitions-disabled")
      ]
    }
  });
}

// node_modules/@ckeditor/ckeditor5-ui/src/bindings/csstransitiondisablermixin.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function CssTransitionDisablerMixin(view) {
  class Mixin extends view {
    disableCssTransitions() {
      this._isCssTransitionsDisabled = true;
    }
    enableCssTransitions() {
      this._isCssTransitionsDisabled = false;
    }
    constructor(...args) {
      super(...args);
      this.set("_isCssTransitionsDisabled", false);
      this.initializeCssTransitionDisablerMixin();
    }
    initializeCssTransitionDisablerMixin() {
      this.extendTemplate({
        attributes: {
          class: [
            this.bindTemplate.if("_isCssTransitionsDisabled", "ck-transitions-disabled")
          ]
        }
      });
    }
  }
  return Mixin;
}

// node_modules/@ckeditor/ckeditor5-ui/src/bindings/submithandler.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function submitHandler({view}) {
  view.listenTo(view.element, "submit", (evt, domEvt) => {
    domEvt.preventDefault();
    view.fire("submit");
  }, {useCapture: true});
}

// node_modules/@ckeditor/ckeditor5-ui/src/bindings/addkeyboardhandlingforgrid.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function addKeyboardHandlingForGrid({keystrokeHandler, focusTracker, gridItems, numberOfColumns, uiLanguageDirection}) {
  const getNumberOfColumns = typeof numberOfColumns === "number" ? () => numberOfColumns : numberOfColumns;
  keystrokeHandler.set("arrowright", getGridItemFocuser((focusedElementIndex, gridItems2) => {
    return uiLanguageDirection === "rtl" ? getLeftElementIndex(focusedElementIndex, gridItems2.length) : getRightElementIndex(focusedElementIndex, gridItems2.length);
  }));
  keystrokeHandler.set("arrowleft", getGridItemFocuser((focusedElementIndex, gridItems2) => {
    return uiLanguageDirection === "rtl" ? getRightElementIndex(focusedElementIndex, gridItems2.length) : getLeftElementIndex(focusedElementIndex, gridItems2.length);
  }));
  keystrokeHandler.set("arrowup", getGridItemFocuser((focusedElementIndex, gridItems2) => {
    let nextIndex = focusedElementIndex - getNumberOfColumns();
    if (nextIndex < 0) {
      nextIndex = focusedElementIndex + getNumberOfColumns() * Math.floor(gridItems2.length / getNumberOfColumns());
      if (nextIndex > gridItems2.length - 1) {
        nextIndex -= getNumberOfColumns();
      }
    }
    return nextIndex;
  }));
  keystrokeHandler.set("arrowdown", getGridItemFocuser((focusedElementIndex, gridItems2) => {
    let nextIndex = focusedElementIndex + getNumberOfColumns();
    if (nextIndex > gridItems2.length - 1) {
      nextIndex = focusedElementIndex % getNumberOfColumns();
    }
    return nextIndex;
  }));
  function getGridItemFocuser(getIndexToFocus) {
    return (evt) => {
      const focusedElement = gridItems.find((item) => item.element === focusTracker.focusedElement);
      const focusedElementIndex = gridItems.getIndex(focusedElement);
      const nextIndexToFocus = getIndexToFocus(focusedElementIndex, gridItems);
      gridItems.get(nextIndexToFocus).focus();
      evt.stopPropagation();
      evt.preventDefault();
    };
  }
  function getRightElementIndex(elementIndex, collectionLength) {
    if (elementIndex === collectionLength - 1) {
      return 0;
    } else {
      return elementIndex + 1;
    }
  }
  function getLeftElementIndex(elementIndex, collectionLength) {
    if (elementIndex === 0) {
      return collectionLength - 1;
    } else {
      return elementIndex - 1;
    }
  }
}

// node_modules/@ckeditor/ckeditor5-ui/src/viewcollection.js
import {CKEditorError, Collection} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var ViewCollection = class extends Collection {
  constructor(initialItems = []) {
    super(initialItems, {
      idProperty: "viewUid"
    });
    this.on("add", (evt, view, index) => {
      this._renderViewIntoCollectionParent(view, index);
    });
    this.on("remove", (evt, view) => {
      if (view.element && this._parentElement) {
        view.element.remove();
      }
    });
    this._parentElement = null;
  }
  destroy() {
    this.map((view) => view.destroy());
  }
  setParent(elementOrDocFragment) {
    this._parentElement = elementOrDocFragment;
    for (const view of this) {
      this._renderViewIntoCollectionParent(view);
    }
  }
  delegate(...events) {
    if (!events.length || !isStringArray(events)) {
      throw new CKEditorError("ui-viewcollection-delegate-wrong-events", this);
    }
    return {
      to: (dest) => {
        for (const view of this) {
          for (const evtName of events) {
            view.delegate(evtName).to(dest);
          }
        }
        this.on("add", (evt, view) => {
          for (const evtName of events) {
            view.delegate(evtName).to(dest);
          }
        });
        this.on("remove", (evt, view) => {
          for (const evtName of events) {
            view.stopDelegating(evtName, dest);
          }
        });
      }
    };
  }
  _renderViewIntoCollectionParent(view, index) {
    if (!view.isRendered) {
      view.render();
    }
    if (view.element && this._parentElement) {
      this._parentElement.insertBefore(view.element, this._parentElement.children[index]);
    }
  }
  remove(subject) {
    return super.remove(subject);
  }
};
var viewcollection_default = ViewCollection;
function isStringArray(arr) {
  return arr.every((a) => typeof a == "string");
}

// node_modules/@ckeditor/ckeditor5-ui/src/view.js
import {CKEditorError as CKEditorError2, Collection as Collection2, DomEmitterMixin, ObservableMixin, isIterable} from "es-ckeditor-lib/lib/utils";
import "@ckeditor/ckeditor5-ui/theme/globals/globals.css";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var View = class extends DomEmitterMixin(ObservableMixin()) {
  constructor(locale) {
    super();
    this.element = null;
    this.isRendered = false;
    this.locale = locale;
    this.t = locale && locale.t;
    this._viewCollections = new Collection2();
    this._unboundChildren = this.createCollection();
    this._viewCollections.on("add", (evt, collection) => {
      collection.locale = locale;
      collection.t = locale && locale.t;
    });
    this.decorate("render");
  }
  get bindTemplate() {
    if (this._bindTemplate) {
      return this._bindTemplate;
    }
    return this._bindTemplate = template_default.bind(this, this);
  }
  createCollection(views) {
    const collection = new viewcollection_default(views);
    this._viewCollections.add(collection);
    return collection;
  }
  registerChild(children) {
    if (!isIterable(children)) {
      children = [children];
    }
    for (const child of children) {
      this._unboundChildren.add(child);
    }
  }
  deregisterChild(children) {
    if (!isIterable(children)) {
      children = [children];
    }
    for (const child of children) {
      this._unboundChildren.remove(child);
    }
  }
  setTemplate(definition) {
    this.template = new template_default(definition);
  }
  extendTemplate(definition) {
    template_default.extend(this.template, definition);
  }
  render() {
    if (this.isRendered) {
      throw new CKEditorError2("ui-view-render-already-rendered", this);
    }
    if (this.template) {
      this.element = this.template.render();
      this.registerChild(this.template.getViews());
    }
    this.isRendered = true;
  }
  destroy() {
    this.stopListening();
    this._viewCollections.map((c) => c.destroy());
    if (this.template && this.template._revertData) {
      this.template.revert(this.element);
    }
  }
};
var view_default = View;

// node_modules/@ckeditor/ckeditor5-ui/src/template.js
import {CKEditorError as CKEditorError3, EmitterMixin, isNode, toArray} from "es-ckeditor-lib/lib/utils";
import {isObject, cloneDeepWith} from "lodash-es";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var xhtmlNs = "http://www.w3.org/1999/xhtml";
var Template = class extends EmitterMixin() {
  constructor(def) {
    super();
    Object.assign(this, normalize(clone(def)));
    this._isRendered = false;
    this._revertData = null;
  }
  render() {
    const node = this._renderNode({
      intoFragment: true
    });
    this._isRendered = true;
    return node;
  }
  apply(node) {
    this._revertData = getEmptyRevertData();
    this._renderNode({
      node,
      intoFragment: false,
      isApplying: true,
      revertData: this._revertData
    });
    return node;
  }
  revert(node) {
    if (!this._revertData) {
      throw new CKEditorError3("ui-template-revert-not-applied", [this, node]);
    }
    this._revertTemplateFromNode(node, this._revertData);
  }
  *getViews() {
    function* search(def) {
      if (def.children) {
        for (const child of def.children) {
          if (isView(child)) {
            yield child;
          } else if (isTemplate(child)) {
            yield* search(child);
          }
        }
      }
    }
    yield* search(this);
  }
  static bind(observable, emitter) {
    return {
      to(eventNameOrFunctionOrAttribute, callback) {
        return new TemplateToBinding({
          eventNameOrFunction: eventNameOrFunctionOrAttribute,
          attribute: eventNameOrFunctionOrAttribute,
          observable,
          emitter,
          callback
        });
      },
      if(attribute, valueIfTrue, callback) {
        return new TemplateIfBinding({
          observable,
          emitter,
          attribute,
          valueIfTrue,
          callback
        });
      }
    };
  }
  static extend(template, def) {
    if (template._isRendered) {
      throw new CKEditorError3("template-extend-render", [this, template]);
    }
    extendTemplate(template, normalize(clone(def)));
  }
  _renderNode(data) {
    let isInvalid;
    if (data.node) {
      isInvalid = this.tag && this.text;
    } else {
      isInvalid = this.tag ? this.text : !this.text;
    }
    if (isInvalid) {
      throw new CKEditorError3("ui-template-wrong-syntax", this);
    }
    if (this.text) {
      return this._renderText(data);
    } else {
      return this._renderElement(data);
    }
  }
  _renderElement(data) {
    let node = data.node;
    if (!node) {
      node = data.node = document.createElementNS(this.ns || xhtmlNs, this.tag);
    }
    this._renderAttributes(data);
    this._renderElementChildren(data);
    this._setUpListeners(data);
    return node;
  }
  _renderText(data) {
    let node = data.node;
    if (node) {
      data.revertData.text = node.textContent;
    } else {
      node = data.node = document.createTextNode("");
    }
    if (hasTemplateBinding(this.text)) {
      this._bindToObservable({
        schema: this.text,
        updater: getTextUpdater(node),
        data
      });
    } else {
      node.textContent = this.text.join("");
    }
    return node;
  }
  _renderAttributes(data) {
    if (!this.attributes) {
      return;
    }
    const node = data.node;
    const revertData = data.revertData;
    for (const attrName in this.attributes) {
      const domAttrValue = node.getAttribute(attrName);
      const attrValue = this.attributes[attrName];
      if (revertData) {
        revertData.attributes[attrName] = domAttrValue;
      }
      const attrNs = isNamespaced(attrValue) ? attrValue[0].ns : null;
      if (hasTemplateBinding(attrValue)) {
        const valueToBind = isNamespaced(attrValue) ? attrValue[0].value : attrValue;
        if (revertData && shouldExtend(attrName)) {
          valueToBind.unshift(domAttrValue);
        }
        this._bindToObservable({
          schema: valueToBind,
          updater: getAttributeUpdater(node, attrName, attrNs),
          data
        });
      } else if (attrName == "style" && typeof attrValue[0] !== "string") {
        this._renderStyleAttribute(attrValue[0], data);
      } else {
        if (revertData && domAttrValue && shouldExtend(attrName)) {
          attrValue.unshift(domAttrValue);
        }
        const value = attrValue.map((val) => val ? val.value || val : val).reduce((prev, next) => prev.concat(next), []).reduce(arrayValueReducer, "");
        if (!isFalsy(value)) {
          node.setAttributeNS(attrNs, attrName, value);
        }
      }
    }
  }
  _renderStyleAttribute(styles, data) {
    const node = data.node;
    for (const styleName in styles) {
      const styleValue = styles[styleName];
      if (hasTemplateBinding(styleValue)) {
        this._bindToObservable({
          schema: [styleValue],
          updater: getStyleUpdater(node, styleName),
          data
        });
      } else {
        node.style[styleName] = styleValue;
      }
    }
  }
  _renderElementChildren(data) {
    const node = data.node;
    const container = data.intoFragment ? document.createDocumentFragment() : node;
    const isApplying = data.isApplying;
    let childIndex = 0;
    for (const child of this.children) {
      if (isViewCollection(child)) {
        if (!isApplying) {
          child.setParent(node);
          for (const view of child) {
            container.appendChild(view.element);
          }
        }
      } else if (isView(child)) {
        if (!isApplying) {
          if (!child.isRendered) {
            child.render();
          }
          container.appendChild(child.element);
        }
      } else if (isNode(child)) {
        container.appendChild(child);
      } else {
        if (isApplying) {
          const revertData = data.revertData;
          const childRevertData = getEmptyRevertData();
          revertData.children.push(childRevertData);
          child._renderNode({
            intoFragment: false,
            node: container.childNodes[childIndex++],
            isApplying: true,
            revertData: childRevertData
          });
        } else {
          container.appendChild(child.render());
        }
      }
    }
    if (data.intoFragment) {
      node.appendChild(container);
    }
  }
  _setUpListeners(data) {
    if (!this.eventListeners) {
      return;
    }
    for (const key in this.eventListeners) {
      const revertBindings = this.eventListeners[key].map((schemaItem) => {
        const [domEvtName, domSelector] = key.split("@");
        return schemaItem.activateDomEventListener(domEvtName, domSelector, data);
      });
      if (data.revertData) {
        data.revertData.bindings.push(revertBindings);
      }
    }
  }
  _bindToObservable({schema, updater, data}) {
    const revertData = data.revertData;
    syncValueSchemaValue(schema, updater, data);
    const revertBindings = schema.filter((item) => !isFalsy(item)).filter((item) => item.observable).map((templateBinding) => templateBinding.activateAttributeListener(schema, updater, data));
    if (revertData) {
      revertData.bindings.push(revertBindings);
    }
  }
  _revertTemplateFromNode(node, revertData) {
    for (const binding of revertData.bindings) {
      for (const revertBinding of binding) {
        revertBinding();
      }
    }
    if (revertData.text) {
      node.textContent = revertData.text;
      return;
    }
    const element = node;
    for (const attrName in revertData.attributes) {
      const attrValue = revertData.attributes[attrName];
      if (attrValue === null) {
        element.removeAttribute(attrName);
      } else {
        element.setAttribute(attrName, attrValue);
      }
    }
    for (let i = 0; i < revertData.children.length; ++i) {
      this._revertTemplateFromNode(element.childNodes[i], revertData.children[i]);
    }
  }
};
var template_default = Template;
var TemplateBinding = class {
  constructor(def) {
    this.attribute = def.attribute;
    this.observable = def.observable;
    this.emitter = def.emitter;
    this.callback = def.callback;
  }
  getValue(node) {
    const value = this.observable[this.attribute];
    return this.callback ? this.callback(value, node) : value;
  }
  activateAttributeListener(schema, updater, data) {
    const callback = () => syncValueSchemaValue(schema, updater, data);
    this.emitter.listenTo(this.observable, `change:${this.attribute}`, callback);
    return () => {
      this.emitter.stopListening(this.observable, `change:${this.attribute}`, callback);
    };
  }
};
var TemplateToBinding = class extends TemplateBinding {
  constructor(def) {
    super(def);
    this.eventNameOrFunction = def.eventNameOrFunction;
  }
  activateDomEventListener(domEvtName, domSelector, data) {
    const callback = (evt, domEvt) => {
      if (!domSelector || domEvt.target.matches(domSelector)) {
        if (typeof this.eventNameOrFunction == "function") {
          this.eventNameOrFunction(domEvt);
        } else {
          this.observable.fire(this.eventNameOrFunction, domEvt);
        }
      }
    };
    this.emitter.listenTo(data.node, domEvtName, callback);
    return () => {
      this.emitter.stopListening(data.node, domEvtName, callback);
    };
  }
};
var TemplateIfBinding = class extends TemplateBinding {
  constructor(def) {
    super(def);
    this.valueIfTrue = def.valueIfTrue;
  }
  getValue(node) {
    const value = super.getValue(node);
    return isFalsy(value) ? false : this.valueIfTrue || true;
  }
};
function hasTemplateBinding(schema) {
  if (!schema) {
    return false;
  }
  if (schema.value) {
    schema = schema.value;
  }
  if (Array.isArray(schema)) {
    return schema.some(hasTemplateBinding);
  } else if (schema instanceof TemplateBinding) {
    return true;
  }
  return false;
}
function getValueSchemaValue(schema, node) {
  return schema.map((schemaItem) => {
    if (schemaItem instanceof TemplateBinding) {
      return schemaItem.getValue(node);
    }
    return schemaItem;
  });
}
function syncValueSchemaValue(schema, updater, {node}) {
  const values = getValueSchemaValue(schema, node);
  let value;
  if (schema.length == 1 && schema[0] instanceof TemplateIfBinding) {
    value = values[0];
  } else {
    value = values.reduce(arrayValueReducer, "");
  }
  if (isFalsy(value)) {
    updater.remove();
  } else {
    updater.set(value);
  }
}
function getTextUpdater(node) {
  return {
    set(value) {
      node.textContent = value;
    },
    remove() {
      node.textContent = "";
    }
  };
}
function getAttributeUpdater(el, attrName, ns) {
  return {
    set(value) {
      el.setAttributeNS(ns, attrName, value);
    },
    remove() {
      el.removeAttributeNS(ns, attrName);
    }
  };
}
function getStyleUpdater(el, styleName) {
  return {
    set(value) {
      el.style[styleName] = value;
    },
    remove() {
      el.style[styleName] = null;
    }
  };
}
function clone(def) {
  const clone2 = cloneDeepWith(def, (value) => {
    if (value && (value instanceof TemplateBinding || isTemplate(value) || isView(value) || isViewCollection(value))) {
      return value;
    }
  });
  return clone2;
}
function normalize(def) {
  if (typeof def == "string") {
    def = normalizePlainTextDefinition(def);
  } else if (def.text) {
    normalizeTextDefinition(def);
  }
  if (def.on) {
    def.eventListeners = normalizeListeners(def.on);
    delete def.on;
  }
  if (!def.text) {
    if (def.attributes) {
      normalizeAttributes(def.attributes);
    }
    const children = [];
    if (def.children) {
      if (isViewCollection(def.children)) {
        children.push(def.children);
      } else {
        for (const child of def.children) {
          if (isTemplate(child) || isView(child) || isNode(child)) {
            children.push(child);
          } else {
            children.push(new Template(child));
          }
        }
      }
    }
    def.children = children;
  }
  return def;
}
function normalizeAttributes(attributes) {
  for (const a in attributes) {
    if (attributes[a].value) {
      attributes[a].value = toArray(attributes[a].value);
    }
    arrayify(attributes, a);
  }
}
function normalizeListeners(listeners) {
  for (const l in listeners) {
    arrayify(listeners, l);
  }
  return listeners;
}
function normalizePlainTextDefinition(def) {
  return {
    text: [def]
  };
}
function normalizeTextDefinition(def) {
  def.text = toArray(def.text);
}
function arrayify(obj, key) {
  obj[key] = toArray(obj[key]);
}
function arrayValueReducer(prev, cur) {
  if (isFalsy(cur)) {
    return prev;
  } else if (isFalsy(prev)) {
    return cur;
  } else {
    return `${prev} ${cur}`;
  }
}
function extendObjectValueArray(obj, ext) {
  for (const a in ext) {
    if (obj[a]) {
      obj[a].push(...ext[a]);
    } else {
      obj[a] = ext[a];
    }
  }
}
function extendTemplate(template, def) {
  if (def.attributes) {
    if (!template.attributes) {
      template.attributes = {};
    }
    extendObjectValueArray(template.attributes, def.attributes);
  }
  if (def.eventListeners) {
    if (!template.eventListeners) {
      template.eventListeners = {};
    }
    extendObjectValueArray(template.eventListeners, def.eventListeners);
  }
  if (def.text) {
    template.text.push(...def.text);
  }
  if (def.children && def.children.length) {
    if (template.children.length != def.children.length) {
      throw new CKEditorError3("ui-template-extend-children-mismatch", template);
    }
    let childIndex = 0;
    for (const childDef of def.children) {
      extendTemplate(template.children[childIndex++], childDef);
    }
  }
}
function isFalsy(value) {
  return !value && value !== 0;
}
function isView(item) {
  return item instanceof view_default;
}
function isTemplate(item) {
  return item instanceof Template;
}
function isViewCollection(item) {
  return item instanceof viewcollection_default;
}
function isNamespaced(attrValue) {
  return isObject(attrValue[0]) && attrValue[0].ns;
}
function getEmptyRevertData() {
  return {
    children: [],
    bindings: [],
    attributes: {}
  };
}
function shouldExtend(attrName) {
  return attrName == "class" || attrName == "style";
}

// node_modules/@ckeditor/ckeditor5-ui/src/editorui/bodycollection.js
import {createElement} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var BodyCollection = class extends viewcollection_default {
  constructor(locale, initialItems = []) {
    super(initialItems);
    this.locale = locale;
  }
  get bodyCollectionContainer() {
    return this._bodyCollectionContainer;
  }
  attachToDom() {
    this._bodyCollectionContainer = new template_default({
      tag: "div",
      attributes: {
        class: [
          "ck",
          "ck-reset_all",
          "ck-body",
          "ck-rounded-corners"
        ],
        dir: this.locale.uiLanguageDirection
      },
      children: this
    }).render();
    let wrapper = document.querySelector(".ck-body-wrapper");
    if (!wrapper) {
      wrapper = createElement(document, "div", {class: "ck-body-wrapper"});
      document.body.appendChild(wrapper);
    }
    wrapper.appendChild(this._bodyCollectionContainer);
  }
  detachFromDom() {
    super.destroy();
    if (this._bodyCollectionContainer) {
      this._bodyCollectionContainer.remove();
    }
    const wrapper = document.querySelector(".ck-body-wrapper");
    if (wrapper && wrapper.childElementCount == 0) {
      wrapper.remove();
    }
  }
};
var bodycollection_default = BodyCollection;

// node_modules/@ckeditor/ckeditor5-ui/src/icon/iconview.js
import "@ckeditor/ckeditor5-ui/theme/components/icon/icon.css";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var IconView = class extends view_default {
  constructor() {
    super();
    const bind = this.bindTemplate;
    this.set("content", "");
    this.set("viewBox", "0 0 20 20");
    this.set("fillColor", "");
    this.set("isColorInherited", true);
    this.set("isVisible", true);
    this.setTemplate({
      tag: "svg",
      ns: "http://www.w3.org/2000/svg",
      attributes: {
        class: [
          "ck",
          "ck-icon",
          bind.if("isVisible", "ck-hidden", (value) => !value),
          "ck-reset_all-excluded",
          bind.if("isColorInherited", "ck-icon_inherit-color")
        ],
        viewBox: bind.to("viewBox")
      }
    });
  }
  render() {
    super.render();
    this._updateXMLContent();
    this._colorFillPaths();
    this.on("change:content", () => {
      this._updateXMLContent();
      this._colorFillPaths();
    });
    this.on("change:fillColor", () => {
      this._colorFillPaths();
    });
  }
  _updateXMLContent() {
    if (this.content) {
      const parsed = new DOMParser().parseFromString(this.content.trim(), "image/svg+xml");
      const svg = parsed.querySelector("svg");
      const viewBox = svg.getAttribute("viewBox");
      if (viewBox) {
        this.viewBox = viewBox;
      }
      for (const {name, value} of Array.from(svg.attributes)) {
        if (IconView.presentationalAttributeNames.includes(name)) {
          this.element.setAttribute(name, value);
        }
      }
      while (this.element.firstChild) {
        this.element.removeChild(this.element.firstChild);
      }
      while (svg.childNodes.length > 0) {
        this.element.appendChild(svg.childNodes[0]);
      }
    }
  }
  _colorFillPaths() {
    if (this.fillColor) {
      this.element.querySelectorAll(".ck-icon__fill").forEach((path) => {
        path.style.fill = this.fillColor;
      });
    }
  }
};
var iconview_default = IconView;
IconView.presentationalAttributeNames = [
  "alignment-baseline",
  "baseline-shift",
  "clip-path",
  "clip-rule",
  "color",
  "color-interpolation",
  "color-interpolation-filters",
  "color-rendering",
  "cursor",
  "direction",
  "display",
  "dominant-baseline",
  "fill",
  "fill-opacity",
  "fill-rule",
  "filter",
  "flood-color",
  "flood-opacity",
  "font-family",
  "font-size",
  "font-size-adjust",
  "font-stretch",
  "font-style",
  "font-variant",
  "font-weight",
  "image-rendering",
  "letter-spacing",
  "lighting-color",
  "marker-end",
  "marker-mid",
  "marker-start",
  "mask",
  "opacity",
  "overflow",
  "paint-order",
  "pointer-events",
  "shape-rendering",
  "stop-color",
  "stop-opacity",
  "stroke",
  "stroke-dasharray",
  "stroke-dashoffset",
  "stroke-linecap",
  "stroke-linejoin",
  "stroke-miterlimit",
  "stroke-opacity",
  "stroke-width",
  "text-anchor",
  "text-decoration",
  "text-overflow",
  "text-rendering",
  "transform",
  "unicode-bidi",
  "vector-effect",
  "visibility",
  "white-space",
  "word-spacing",
  "writing-mode"
];

// node_modules/@ckeditor/ckeditor5-ui/src/button/buttonlabelview.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var ButtonLabelView = class extends view_default {
  constructor() {
    super();
    this.set({
      style: void 0,
      text: void 0,
      id: void 0
    });
    const bind = this.bindTemplate;
    this.setTemplate({
      tag: "span",
      attributes: {
        class: [
          "ck",
          "ck-button__label"
        ],
        style: bind.to("style"),
        id: bind.to("id")
      },
      children: [
        {
          text: bind.to("text")
        }
      ]
    });
  }
};
var buttonlabelview_default = ButtonLabelView;

// node_modules/@ckeditor/ckeditor5-ui/src/button/buttonview.js
import {env, getEnvKeystrokeText, uid, delay} from "es-ckeditor-lib/lib/utils";
import "@ckeditor/ckeditor5-ui/theme/components/button/button.css";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var ButtonView = class extends view_default {
  constructor(locale, labelView = new buttonlabelview_default()) {
    super(locale);
    this._focusDelayed = null;
    const bind = this.bindTemplate;
    const ariaLabelUid = uid();
    this.set("ariaChecked", void 0);
    this.set("ariaLabel", void 0);
    this.set("ariaLabelledBy", `ck-editor__aria-label_${ariaLabelUid}`);
    this.set("class", void 0);
    this.set("labelStyle", void 0);
    this.set("icon", void 0);
    this.set("isEnabled", true);
    this.set("isOn", false);
    this.set("isVisible", true);
    this.set("isToggleable", false);
    this.set("keystroke", void 0);
    this.set("label", void 0);
    this.set("role", void 0);
    this.set("tabindex", -1);
    this.set("tooltip", false);
    this.set("tooltipPosition", "s");
    this.set("type", "button");
    this.set("withText", false);
    this.set("withKeystroke", false);
    this.children = this.createCollection();
    this.labelView = this._setupLabelView(labelView);
    this.iconView = new iconview_default();
    this.iconView.extendTemplate({
      attributes: {
        class: "ck-button__icon"
      }
    });
    this.keystrokeView = this._createKeystrokeView();
    this.bind("_tooltipString").to(this, "tooltip", this, "label", this, "keystroke", this._getTooltipString.bind(this));
    const template = {
      tag: "button",
      attributes: {
        class: [
          "ck",
          "ck-button",
          bind.to("class"),
          bind.if("isEnabled", "ck-disabled", (value) => !value),
          bind.if("isVisible", "ck-hidden", (value) => !value),
          bind.to("isOn", (value) => value ? "ck-on" : "ck-off"),
          bind.if("withText", "ck-button_with-text"),
          bind.if("withKeystroke", "ck-button_with-keystroke")
        ],
        role: bind.to("role"),
        type: bind.to("type", (value) => value ? value : "button"),
        tabindex: bind.to("tabindex"),
        "aria-label": bind.to("ariaLabel"),
        "aria-labelledby": bind.to("ariaLabelledBy"),
        "aria-disabled": bind.if("isEnabled", true, (value) => !value),
        "aria-checked": bind.to("isOn"),
        "aria-pressed": bind.to("isOn", (value) => this.isToggleable ? String(!!value) : false),
        "data-cke-tooltip-text": bind.to("_tooltipString"),
        "data-cke-tooltip-position": bind.to("tooltipPosition")
      },
      children: this.children,
      on: {
        click: bind.to((evt) => {
          if (this.isEnabled) {
            this.fire("execute");
          } else {
            evt.preventDefault();
          }
        })
      }
    };
    if (env.isSafari) {
      if (!this._focusDelayed) {
        this._focusDelayed = delay(() => this.focus(), 0);
      }
      template.on.mousedown = bind.to(() => {
        this._focusDelayed();
      });
      template.on.mouseup = bind.to(() => {
        this._focusDelayed.cancel();
      });
    }
    this.setTemplate(template);
  }
  render() {
    super.render();
    if (this.icon) {
      this.iconView.bind("content").to(this, "icon");
      this.children.add(this.iconView);
    }
    this.children.add(this.labelView);
    if (this.withKeystroke && this.keystroke) {
      this.children.add(this.keystrokeView);
    }
  }
  focus() {
    this.element.focus();
  }
  destroy() {
    if (this._focusDelayed) {
      this._focusDelayed.cancel();
    }
    super.destroy();
  }
  _setupLabelView(labelView) {
    labelView.bind("text", "style", "id").to(this, "label", "labelStyle", "ariaLabelledBy");
    return labelView;
  }
  _createKeystrokeView() {
    const keystrokeView = new view_default();
    keystrokeView.setTemplate({
      tag: "span",
      attributes: {
        class: [
          "ck",
          "ck-button__keystroke"
        ]
      },
      children: [
        {
          text: this.bindTemplate.to("keystroke", (text) => getEnvKeystrokeText(text))
        }
      ]
    });
    return keystrokeView;
  }
  _getTooltipString(tooltip, label, keystroke) {
    if (tooltip) {
      if (typeof tooltip == "string") {
        return tooltip;
      } else {
        if (keystroke) {
          keystroke = getEnvKeystrokeText(keystroke);
        }
        if (tooltip instanceof Function) {
          return tooltip(label, keystroke);
        } else {
          return `${label}${keystroke ? ` (${keystroke})` : ""}`;
        }
      }
    }
    return "";
  }
};
var buttonview_default = ButtonView;

// node_modules/@ckeditor/ckeditor5-ui/src/button/switchbuttonview.js
import "@ckeditor/ckeditor5-ui/theme/components/button/switchbutton.css";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var SwitchButtonView = class extends buttonview_default {
  constructor(locale) {
    super(locale);
    this.isToggleable = true;
    this.toggleSwitchView = this._createToggleView();
    this.extendTemplate({
      attributes: {
        class: "ck-switchbutton"
      }
    });
  }
  render() {
    super.render();
    this.children.add(this.toggleSwitchView);
  }
  _createToggleView() {
    const toggleSwitchView = new view_default();
    toggleSwitchView.setTemplate({
      tag: "span",
      attributes: {
        class: [
          "ck",
          "ck-button__toggle"
        ]
      },
      children: [
        {
          tag: "span",
          attributes: {
            class: [
              "ck",
              "ck-button__toggle__inner"
            ]
          }
        }
      ]
    });
    return toggleSwitchView;
  }
};
var switchbuttonview_default = SwitchButtonView;

// node_modules/@ckeditor/ckeditor5-ui/src/colorgrid/utils.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function getLocalizedColorOptions(locale, options) {
  const t = locale.t;
  const localizedColorNames = {
    Black: t("Black"),
    "Dim grey": t("Dim grey"),
    Grey: t("Grey"),
    "Light grey": t("Light grey"),
    White: t("White"),
    Red: t("Red"),
    Orange: t("Orange"),
    Yellow: t("Yellow"),
    "Light green": t("Light green"),
    Green: t("Green"),
    Aquamarine: t("Aquamarine"),
    Turquoise: t("Turquoise"),
    "Light blue": t("Light blue"),
    Blue: t("Blue"),
    Purple: t("Purple")
  };
  return options.map((colorOption) => {
    const label = localizedColorNames[colorOption.label];
    if (label && label != colorOption.label) {
      colorOption.label = label;
    }
    return colorOption;
  });
}
function normalizeColorOptions(options) {
  return options.map(normalizeSingleColorDefinition).filter((option) => !!option);
}
function normalizeSingleColorDefinition(color) {
  if (typeof color === "string") {
    return {
      model: color,
      label: color,
      hasBorder: false,
      view: {
        name: "span",
        styles: {
          color
        }
      }
    };
  } else {
    return {
      model: color.color,
      label: color.label || color.color,
      hasBorder: color.hasBorder === void 0 ? false : color.hasBorder,
      view: {
        name: "span",
        styles: {
          color: `${color.color}`
        }
      }
    };
  }
}

// node_modules/@ckeditor/ckeditor5-ui/theme/icons/color-tile-check.svg
var color_tile_check_default = '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path class="ck-icon__fill" d="M16.935 5.328a2 2 0 0 1 0 2.829l-7.778 7.778a2 2 0 0 1-2.829 0L3.5 13.107a1.999 1.999 0 1 1 2.828-2.829l.707.707a1 1 0 0 0 1.414 0l5.658-5.657a2 2 0 0 1 2.828 0z"/><path d="M14.814 6.035 8.448 12.4a1 1 0 0 1-1.414 0l-1.413-1.415A1 1 0 1 0 4.207 12.4l2.829 2.829a1 1 0 0 0 1.414 0l7.778-7.778a1 1 0 1 0-1.414-1.415z"/></svg>';

// node_modules/@ckeditor/ckeditor5-ui/src/colorgrid/colortileview.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var ColorTileView = class extends buttonview_default {
  constructor(locale) {
    super(locale);
    const bind = this.bindTemplate;
    this.set("color", void 0);
    this.set("hasBorder", false);
    this.icon = color_tile_check_default;
    this.extendTemplate({
      attributes: {
        style: {
          backgroundColor: bind.to("color")
        },
        class: [
          "ck",
          "ck-color-grid__tile",
          bind.if("hasBorder", "ck-color-selector__color-tile_bordered")
        ]
      }
    });
  }
  render() {
    super.render();
    this.iconView.fillColor = "hsl(0, 0%, 100%)";
  }
};
var colortileview_default = ColorTileView;

// node_modules/@ckeditor/ckeditor5-ui/src/colorgrid/colorgridview.js
import {FocusTracker, KeystrokeHandler} from "es-ckeditor-lib/lib/utils";
import "@ckeditor/ckeditor5-ui/theme/components/colorgrid/colorgrid.css";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var ColorGridView = class extends view_default {
  constructor(locale, options) {
    super(locale);
    const colorDefinitions = options && options.colorDefinitions ? options.colorDefinitions : [];
    this.columns = options && options.columns ? options.columns : 5;
    const viewStyleAttribute = {
      gridTemplateColumns: `repeat( ${this.columns}, 1fr)`
    };
    this.set("selectedColor", void 0);
    this.items = this.createCollection();
    this.focusTracker = new FocusTracker();
    this.keystrokes = new KeystrokeHandler();
    this.items.on("add", (evt, colorTile) => {
      colorTile.isOn = colorTile.color === this.selectedColor;
    });
    colorDefinitions.forEach((color) => {
      const colorTile = new colortileview_default();
      colorTile.set({
        color: color.color,
        label: color.label,
        tooltip: true,
        hasBorder: color.options.hasBorder
      });
      colorTile.on("execute", () => {
        this.fire("execute", {
          value: color.color,
          hasBorder: color.options.hasBorder,
          label: color.label
        });
      });
      this.items.add(colorTile);
    });
    this.setTemplate({
      tag: "div",
      children: this.items,
      attributes: {
        class: [
          "ck",
          "ck-color-grid"
        ],
        style: viewStyleAttribute
      }
    });
    this.on("change:selectedColor", (evt, name, selectedColor) => {
      for (const item of this.items) {
        item.isOn = item.color === selectedColor;
      }
    });
  }
  focus() {
    if (this.items.length) {
      this.items.first.focus();
    }
  }
  focusLast() {
    if (this.items.length) {
      this.items.last.focus();
    }
  }
  render() {
    super.render();
    for (const item of this.items) {
      this.focusTracker.add(item.element);
    }
    this.items.on("add", (evt, item) => {
      this.focusTracker.add(item.element);
    });
    this.items.on("remove", (evt, item) => {
      this.focusTracker.remove(item.element);
    });
    this.keystrokes.listenTo(this.element);
    addKeyboardHandlingForGrid({
      keystrokeHandler: this.keystrokes,
      focusTracker: this.focusTracker,
      gridItems: this.items,
      numberOfColumns: this.columns,
      uiLanguageDirection: this.locale && this.locale.uiLanguageDirection
    });
  }
  destroy() {
    super.destroy();
    this.focusTracker.destroy();
    this.keystrokes.destroy();
  }
};
var colorgridview_default = ColorGridView;

// node_modules/@ckeditor/ckeditor5-ui/src/colorpicker/utils.js
var import_color_parse = __toModule(require_color_parse());
var convert = __toModule(require_color_convert());
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function convertColor(color, outputFormat) {
  if (!color) {
    return "";
  }
  const colorObject = parseColorString(color);
  if (!colorObject) {
    return "";
  }
  if (colorObject.space === outputFormat) {
    return color;
  }
  if (!canConvertParsedColor(colorObject)) {
    return "";
  }
  const fromColorSpace = convert[colorObject.space];
  const toColorSpace = fromColorSpace[outputFormat];
  if (!toColorSpace) {
    return "";
  }
  const convertedColorChannels = toColorSpace(colorObject.space === "hex" ? colorObject.hexValue : colorObject.values);
  return formatColorOutput(convertedColorChannels, outputFormat);
}
function convertToHex(color) {
  if (!color) {
    return "";
  }
  const colorObject = parseColorString(color);
  if (!colorObject) {
    return "#000";
  }
  if (colorObject.space === "hex") {
    return colorObject.hexValue;
  }
  return convertColor(color, "hex");
}
function formatColorOutput(values, format) {
  switch (format) {
    case "hex":
      return `#${values}`;
    case "rgb":
      return `rgb( ${values[0]}, ${values[1]}, ${values[2]} )`;
    case "hsl":
      return `hsl( ${values[0]}, ${values[1]}%, ${values[2]}% )`;
    case "hwb":
      return `hwb( ${values[0]}, ${values[1]}, ${values[2]} )`;
    case "lab":
      return `lab( ${values[0]}% ${values[1]} ${values[2]} )`;
    case "lch":
      return `lch( ${values[0]}% ${values[1]} ${values[2]} )`;
    default:
      return "";
  }
}
function parseColorString(colorString) {
  if (colorString.startsWith("#")) {
    const parsedHex = (0, import_color_parse.default)(colorString);
    return {
      space: "hex",
      values: parsedHex.values,
      hexValue: colorString,
      alpha: parsedHex.alpha
    };
  }
  const parsed = (0, import_color_parse.default)(colorString);
  if (!parsed.space) {
    return null;
  }
  return parsed;
}
function canConvertParsedColor(parsedColor) {
  return Object.keys(convert).includes(parsedColor.space);
}

// node_modules/@ckeditor/ckeditor5-ui/src/colorpicker/colorpickerview.js
import {global as global4, env as env2} from "es-ckeditor-lib/lib/utils";
import {debounce} from "lodash-es";

// node_modules/@ckeditor/ckeditor5-ui/src/label/labelview.js
import {uid as uid2} from "es-ckeditor-lib/lib/utils";
import "@ckeditor/ckeditor5-ui/theme/components/label/label.css";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var LabelView = class extends view_default {
  constructor(locale) {
    super(locale);
    this.set("text", void 0);
    this.set("for", void 0);
    this.id = `ck-editor__label_${uid2()}`;
    const bind = this.bindTemplate;
    this.setTemplate({
      tag: "label",
      attributes: {
        class: [
          "ck",
          "ck-label"
        ],
        id: this.id,
        for: bind.to("for")
      },
      children: [
        {
          text: bind.to("text")
        }
      ]
    });
  }
};
var labelview_default = LabelView;

// node_modules/@ckeditor/ckeditor5-ui/src/labeledfield/labeledfieldview.js
import {uid as uid3} from "es-ckeditor-lib/lib/utils";
import "@ckeditor/ckeditor5-ui/theme/components/labeledfield/labeledfieldview.css";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var LabeledFieldView = class extends view_default {
  constructor(locale, viewCreator) {
    super(locale);
    const viewUid = `ck-labeled-field-view-${uid3()}`;
    const statusUid = `ck-labeled-field-view-status-${uid3()}`;
    this.fieldView = viewCreator(this, viewUid, statusUid);
    this.set("label", void 0);
    this.set("isEnabled", true);
    this.set("isEmpty", true);
    this.set("isFocused", false);
    this.set("errorText", null);
    this.set("infoText", null);
    this.set("class", void 0);
    this.set("placeholder", void 0);
    this.labelView = this._createLabelView(viewUid);
    this.statusView = this._createStatusView(statusUid);
    this.fieldWrapperChildren = this.createCollection([this.fieldView, this.labelView]);
    this.bind("_statusText").to(this, "errorText", this, "infoText", (errorText, infoText) => errorText || infoText);
    const bind = this.bindTemplate;
    this.setTemplate({
      tag: "div",
      attributes: {
        class: [
          "ck",
          "ck-labeled-field-view",
          bind.to("class"),
          bind.if("isEnabled", "ck-disabled", (value) => !value),
          bind.if("isEmpty", "ck-labeled-field-view_empty"),
          bind.if("isFocused", "ck-labeled-field-view_focused"),
          bind.if("placeholder", "ck-labeled-field-view_placeholder"),
          bind.if("errorText", "ck-error")
        ]
      },
      children: [
        {
          tag: "div",
          attributes: {
            class: [
              "ck",
              "ck-labeled-field-view__input-wrapper"
            ]
          },
          children: this.fieldWrapperChildren
        },
        this.statusView
      ]
    });
  }
  _createLabelView(id) {
    const labelView = new labelview_default(this.locale);
    labelView.for = id;
    labelView.bind("text").to(this, "label");
    return labelView;
  }
  _createStatusView(statusUid) {
    const statusView = new view_default(this.locale);
    const bind = this.bindTemplate;
    statusView.setTemplate({
      tag: "div",
      attributes: {
        class: [
          "ck",
          "ck-labeled-field-view__status",
          bind.if("errorText", "ck-labeled-field-view__status_error"),
          bind.if("_statusText", "ck-hidden", (value) => !value)
        ],
        id: statusUid,
        role: bind.if("errorText", "alert")
      },
      children: [
        {
          text: bind.to("_statusText")
        }
      ]
    });
    return statusView;
  }
  focus(direction) {
    this.fieldView.focus(direction);
  }
};
var labeledfieldview_default = LabeledFieldView;

// node_modules/@ckeditor/ckeditor5-ui/src/input/inputbase.js
import {FocusTracker as FocusTracker2} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var InputBase = class extends view_default {
  constructor(locale) {
    super(locale);
    this.set("value", void 0);
    this.set("id", void 0);
    this.set("placeholder", void 0);
    this.set("isReadOnly", false);
    this.set("hasError", false);
    this.set("ariaDescribedById", void 0);
    this.focusTracker = new FocusTracker2();
    this.bind("isFocused").to(this.focusTracker);
    this.set("isEmpty", true);
    const bind = this.bindTemplate;
    this.setTemplate({
      tag: "input",
      attributes: {
        class: [
          "ck",
          "ck-input",
          bind.if("isFocused", "ck-input_focused"),
          bind.if("isEmpty", "ck-input-text_empty"),
          bind.if("hasError", "ck-error")
        ],
        id: bind.to("id"),
        placeholder: bind.to("placeholder"),
        readonly: bind.to("isReadOnly"),
        "aria-invalid": bind.if("hasError", true),
        "aria-describedby": bind.to("ariaDescribedById")
      },
      on: {
        input: bind.to((...args) => {
          this.fire("input", ...args);
          this._updateIsEmpty();
        }),
        change: bind.to(this._updateIsEmpty.bind(this))
      }
    });
  }
  render() {
    super.render();
    this.focusTracker.add(this.element);
    this._setDomElementValue(this.value);
    this._updateIsEmpty();
    this.on("change:value", (evt, name, value) => {
      this._setDomElementValue(value);
      this._updateIsEmpty();
    });
  }
  destroy() {
    super.destroy();
    this.focusTracker.destroy();
  }
  select() {
    this.element.select();
  }
  focus() {
    this.element.focus();
  }
  reset() {
    this.value = this.element.value = "";
    this._updateIsEmpty();
  }
  _updateIsEmpty() {
    this.isEmpty = isInputElementEmpty(this.element);
  }
  _setDomElementValue(value) {
    this.element.value = !value && value !== 0 ? "" : value;
  }
};
var inputbase_default = InputBase;
function isInputElementEmpty(domElement) {
  return !domElement.value;
}

// node_modules/@ckeditor/ckeditor5-ui/src/input/inputview.js
import "@ckeditor/ckeditor5-ui/theme/components/input/input.css";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var InputView = class extends inputbase_default {
  constructor(locale) {
    super(locale);
    this.set("inputMode", "text");
    const bind = this.bindTemplate;
    this.extendTemplate({
      attributes: {
        inputmode: bind.to("inputMode")
      }
    });
  }
};
var inputview_default = InputView;

// node_modules/@ckeditor/ckeditor5-ui/src/inputtext/inputtextview.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var InputTextView = class extends inputview_default {
  constructor(locale) {
    super(locale);
    this.extendTemplate({
      attributes: {
        type: "text",
        class: [
          "ck-input-text"
        ]
      }
    });
  }
};
var inputtextview_default = InputTextView;

// node_modules/@ckeditor/ckeditor5-ui/src/inputnumber/inputnumberview.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var InputNumberView = class extends inputview_default {
  constructor(locale, {min, max, step} = {}) {
    super(locale);
    const bind = this.bindTemplate;
    this.set("min", min);
    this.set("max", max);
    this.set("step", step);
    this.extendTemplate({
      attributes: {
        type: "number",
        class: [
          "ck-input-number"
        ],
        min: bind.to("min"),
        max: bind.to("max"),
        step: bind.to("step")
      }
    });
  }
};
var inputnumberview_default = InputNumberView;

// node_modules/@ckeditor/ckeditor5-ui/src/textarea/textareaview.js
import {Rect, toUnit, getBorderWidths, global, CKEditorError as CKEditorError4} from "es-ckeditor-lib/lib/utils";
import "@ckeditor/ckeditor5-ui/theme/components/input/input.css";
import "@ckeditor/ckeditor5-ui/theme/components/textarea/textarea.css";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var TextareaView = class extends inputbase_default {
  constructor(locale) {
    super(locale);
    const toPx7 = toUnit("px");
    this.set("minRows", 2);
    this.set("maxRows", 5);
    this.set("_height", null);
    this.set("resize", "none");
    this.on("change:minRows", this._validateMinMaxRows.bind(this));
    this.on("change:maxRows", this._validateMinMaxRows.bind(this));
    const bind = this.bindTemplate;
    this.template.tag = "textarea";
    this.extendTemplate({
      attributes: {
        class: ["ck-textarea"],
        style: {
          height: bind.to("_height", (height) => height ? toPx7(height) : null),
          resize: bind.to("resize")
        },
        rows: bind.to("minRows")
      }
    });
  }
  render() {
    super.render();
    this.on("input", () => {
      this._updateAutoGrowHeight(true);
      this.fire("update");
    });
    this.on("change:value", () => {
      global.window.requestAnimationFrame(() => {
        this._updateAutoGrowHeight();
        this.fire("update");
      });
    });
  }
  reset() {
    super.reset();
    this._updateAutoGrowHeight();
    this.fire("update");
  }
  _updateAutoGrowHeight(shouldScroll) {
    const viewElement = this.element;
    const singleLineContentClone = getTextareaElementClone(viewElement, "1");
    const fullTextValueClone = getTextareaElementClone(viewElement, viewElement.value);
    const singleLineContentStyles = singleLineContentClone.ownerDocument.defaultView.getComputedStyle(singleLineContentClone);
    const verticalPaddings = parseFloat(singleLineContentStyles.paddingTop) + parseFloat(singleLineContentStyles.paddingBottom);
    const borders = getBorderWidths(singleLineContentClone);
    const lineHeight = parseFloat(singleLineContentStyles.lineHeight);
    const verticalBorder = borders.top + borders.bottom;
    const singleLineAreaDefaultHeight = new Rect(singleLineContentClone).height;
    const numberOfLines = Math.round((fullTextValueClone.scrollHeight - verticalPaddings) / lineHeight);
    const maxHeight = this.maxRows * lineHeight + verticalPaddings + verticalBorder;
    const minHeight = numberOfLines === 1 ? singleLineAreaDefaultHeight : this.minRows * lineHeight + verticalPaddings + verticalBorder;
    this._height = Math.min(Math.max(Math.max(numberOfLines, this.minRows) * lineHeight + verticalPaddings + verticalBorder, minHeight), maxHeight);
    if (shouldScroll) {
      viewElement.scrollTop = viewElement.scrollHeight;
    }
    singleLineContentClone.remove();
    fullTextValueClone.remove();
  }
  _validateMinMaxRows() {
    if (this.minRows > this.maxRows) {
      throw new CKEditorError4("ui-textarea-view-min-rows-greater-than-max-rows", {
        textareaView: this,
        minRows: this.minRows,
        maxRows: this.maxRows
      });
    }
  }
};
var textareaview_default = TextareaView;
function getTextareaElementClone(element, value) {
  const clone2 = element.cloneNode();
  clone2.style.position = "absolute";
  clone2.style.top = "-99999px";
  clone2.style.left = "-99999px";
  clone2.style.height = "auto";
  clone2.style.overflow = "hidden";
  clone2.style.width = element.ownerDocument.defaultView.getComputedStyle(element).width;
  clone2.tabIndex = -1;
  clone2.rows = 1;
  clone2.value = value;
  element.parentNode.insertBefore(clone2, element);
  return clone2;
}

// node_modules/@ckeditor/ckeditor5-ui/src/dropdown/dropdownpanelview.js
import {logWarning} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var DropdownPanelView = class extends view_default {
  constructor(locale) {
    super(locale);
    const bind = this.bindTemplate;
    this.set("isVisible", false);
    this.set("position", "se");
    this.children = this.createCollection();
    this.setTemplate({
      tag: "div",
      attributes: {
        class: [
          "ck",
          "ck-reset",
          "ck-dropdown__panel",
          bind.to("position", (value) => `ck-dropdown__panel_${value}`),
          bind.if("isVisible", "ck-dropdown__panel-visible")
        ],
        tabindex: "-1"
      },
      children: this.children,
      on: {
        selectstart: bind.to((evt) => {
          if (evt.target.tagName.toLocaleLowerCase() === "input") {
            return;
          }
          evt.preventDefault();
        })
      }
    });
  }
  focus() {
    if (this.children.length) {
      const firstChild = this.children.first;
      if (typeof firstChild.focus === "function") {
        firstChild.focus();
      } else {
        logWarning("ui-dropdown-panel-focus-child-missing-focus", {childView: this.children.first, dropdownPanel: this});
      }
    }
  }
  focusLast() {
    if (this.children.length) {
      const lastChild = this.children.last;
      if (typeof lastChild.focusLast === "function") {
        lastChild.focusLast();
      } else {
        lastChild.focus();
      }
    }
  }
};
var dropdownpanelview_default = DropdownPanelView;

// node_modules/@ckeditor/ckeditor5-ui/src/dropdown/dropdownview.js
import {KeystrokeHandler as KeystrokeHandler2, FocusTracker as FocusTracker3, getOptimalPosition} from "es-ckeditor-lib/lib/utils";
import "@ckeditor/ckeditor5-ui/theme/components/dropdown/dropdown.css";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var DropdownView = class extends view_default {
  constructor(locale, buttonView, panelView) {
    super(locale);
    const bind = this.bindTemplate;
    this.buttonView = buttonView;
    this.panelView = panelView;
    this.set("isOpen", false);
    this.set("isEnabled", true);
    this.set("class", void 0);
    this.set("id", void 0);
    this.set("panelPosition", "auto");
    this.keystrokes = new KeystrokeHandler2();
    this.focusTracker = new FocusTracker3();
    this.setTemplate({
      tag: "div",
      attributes: {
        class: [
          "ck",
          "ck-dropdown",
          bind.to("class"),
          bind.if("isEnabled", "ck-disabled", (value) => !value)
        ],
        id: bind.to("id"),
        "aria-describedby": bind.to("ariaDescribedById")
      },
      children: [
        buttonView,
        panelView
      ]
    });
    buttonView.extendTemplate({
      attributes: {
        class: [
          "ck-dropdown__button"
        ],
        "data-cke-tooltip-disabled": bind.to("isOpen")
      }
    });
  }
  render() {
    super.render();
    this.focusTracker.add(this.buttonView.element);
    this.focusTracker.add(this.panelView.element);
    this.listenTo(this.buttonView, "open", () => {
      this.isOpen = !this.isOpen;
    });
    this.panelView.bind("isVisible").to(this, "isOpen");
    this.on("change:isOpen", (evt, name, isOpen) => {
      if (!isOpen) {
        return;
      }
      if (this.panelPosition === "auto") {
        const optimalPanelPosition = DropdownView._getOptimalPosition({
          element: this.panelView.element,
          target: this.buttonView.element,
          fitInViewport: true,
          positions: this._panelPositions
        });
        this.panelView.position = optimalPanelPosition ? optimalPanelPosition.name : this._panelPositions[0].name;
      } else {
        this.panelView.position = this.panelPosition;
      }
    });
    this.keystrokes.listenTo(this.element);
    const closeDropdown = (data, cancel) => {
      if (this.isOpen) {
        this.isOpen = false;
        cancel();
      }
    };
    this.keystrokes.set("arrowdown", (data, cancel) => {
      if (this.buttonView.isEnabled && !this.isOpen) {
        this.isOpen = true;
        cancel();
      }
    });
    this.keystrokes.set("arrowright", (data, cancel) => {
      if (this.isOpen) {
        cancel();
      }
    });
    this.keystrokes.set("arrowleft", closeDropdown);
    this.keystrokes.set("esc", closeDropdown);
  }
  focus() {
    this.buttonView.focus();
  }
  get _panelPositions() {
    const {south, north, southEast, southWest, northEast, northWest, southMiddleEast, southMiddleWest, northMiddleEast, northMiddleWest} = DropdownView.defaultPanelPositions;
    if (this.locale.uiLanguageDirection !== "rtl") {
      return [
        southEast,
        southWest,
        southMiddleEast,
        southMiddleWest,
        south,
        northEast,
        northWest,
        northMiddleEast,
        northMiddleWest,
        north
      ];
    } else {
      return [
        southWest,
        southEast,
        southMiddleWest,
        southMiddleEast,
        south,
        northWest,
        northEast,
        northMiddleWest,
        northMiddleEast,
        north
      ];
    }
  }
};
var dropdownview_default = DropdownView;
DropdownView.defaultPanelPositions = {
  south: (buttonRect, panelRect) => {
    return {
      top: buttonRect.bottom,
      left: buttonRect.left - (panelRect.width - buttonRect.width) / 2,
      name: "s"
    };
  },
  southEast: (buttonRect) => {
    return {
      top: buttonRect.bottom,
      left: buttonRect.left,
      name: "se"
    };
  },
  southWest: (buttonRect, panelRect) => {
    return {
      top: buttonRect.bottom,
      left: buttonRect.left - panelRect.width + buttonRect.width,
      name: "sw"
    };
  },
  southMiddleEast: (buttonRect, panelRect) => {
    return {
      top: buttonRect.bottom,
      left: buttonRect.left - (panelRect.width - buttonRect.width) / 4,
      name: "sme"
    };
  },
  southMiddleWest: (buttonRect, panelRect) => {
    return {
      top: buttonRect.bottom,
      left: buttonRect.left - (panelRect.width - buttonRect.width) * 3 / 4,
      name: "smw"
    };
  },
  north: (buttonRect, panelRect) => {
    return {
      top: buttonRect.top - panelRect.height,
      left: buttonRect.left - (panelRect.width - buttonRect.width) / 2,
      name: "n"
    };
  },
  northEast: (buttonRect, panelRect) => {
    return {
      top: buttonRect.top - panelRect.height,
      left: buttonRect.left,
      name: "ne"
    };
  },
  northWest: (buttonRect, panelRect) => {
    return {
      top: buttonRect.top - panelRect.height,
      left: buttonRect.left - panelRect.width + buttonRect.width,
      name: "nw"
    };
  },
  northMiddleEast: (buttonRect, panelRect) => {
    return {
      top: buttonRect.top - panelRect.height,
      left: buttonRect.left - (panelRect.width - buttonRect.width) / 4,
      name: "nme"
    };
  },
  northMiddleWest: (buttonRect, panelRect) => {
    return {
      top: buttonRect.top - panelRect.height,
      left: buttonRect.left - (panelRect.width - buttonRect.width) * 3 / 4,
      name: "nmw"
    };
  }
};
DropdownView._getOptimalPosition = getOptimalPosition;

// node_modules/@ckeditor/ckeditor5-ui/theme/icons/dropdown-arrow.svg
var dropdown_arrow_default = '<svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"><path d="M.941 4.523a.75.75 0 1 1 1.06-1.06l3.006 3.005 3.005-3.005a.75.75 0 1 1 1.06 1.06l-3.549 3.55a.75.75 0 0 1-1.168-.136L.941 4.523z"/></svg>';

// node_modules/@ckeditor/ckeditor5-ui/src/dropdown/button/dropdownbuttonview.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var DropdownButtonView = class extends buttonview_default {
  constructor(locale) {
    super(locale);
    this.arrowView = this._createArrowView();
    this.extendTemplate({
      attributes: {
        "aria-haspopup": true,
        "aria-expanded": this.bindTemplate.to("isOn", (value) => String(value))
      }
    });
    this.delegate("execute").to(this, "open");
  }
  render() {
    super.render();
    this.children.add(this.arrowView);
  }
  _createArrowView() {
    const arrowView = new iconview_default();
    arrowView.content = dropdown_arrow_default;
    arrowView.extendTemplate({
      attributes: {
        class: "ck-dropdown__arrow"
      }
    });
    return arrowView;
  }
};
var dropdownbuttonview_default = DropdownButtonView;

// node_modules/@ckeditor/ckeditor5-ui/src/focuscycler.js
import {isVisible, EmitterMixin as EmitterMixin2} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var FocusCycler = class extends EmitterMixin2() {
  constructor(options) {
    super();
    this.focusables = options.focusables;
    this.focusTracker = options.focusTracker;
    this.keystrokeHandler = options.keystrokeHandler;
    this.actions = options.actions;
    if (options.actions && options.keystrokeHandler) {
      for (const methodName in options.actions) {
        let actions = options.actions[methodName];
        if (typeof actions == "string") {
          actions = [actions];
        }
        for (const keystroke of actions) {
          options.keystrokeHandler.set(keystroke, (data, cancel) => {
            this[methodName]();
            cancel();
          });
        }
      }
    }
    this.on("forwardCycle", () => this.focusFirst(), {priority: "low"});
    this.on("backwardCycle", () => this.focusLast(), {priority: "low"});
  }
  get first() {
    return this.focusables.find(isFocusable) || null;
  }
  get last() {
    return this.focusables.filter(isFocusable).slice(-1)[0] || null;
  }
  get next() {
    return this._getFocusableItem(1);
  }
  get previous() {
    return this._getFocusableItem(-1);
  }
  get current() {
    let index = null;
    if (this.focusTracker.focusedElement === null) {
      return null;
    }
    this.focusables.find((view, viewIndex) => {
      const focused = view.element === this.focusTracker.focusedElement;
      if (focused) {
        index = viewIndex;
      }
      return focused;
    });
    return index;
  }
  focusFirst() {
    this._focus(this.first, 1);
  }
  focusLast() {
    this._focus(this.last, -1);
  }
  focusNext() {
    const next = this.next;
    if (next && this.focusables.getIndex(next) === this.current) {
      return;
    }
    if (next === this.first) {
      this.fire("forwardCycle");
    } else {
      this._focus(next, 1);
    }
  }
  focusPrevious() {
    const previous = this.previous;
    if (previous && this.focusables.getIndex(previous) === this.current) {
      return;
    }
    if (previous === this.last) {
      this.fire("backwardCycle");
    } else {
      this._focus(previous, -1);
    }
  }
  _focus(view, direction) {
    if (view) {
      view.focus(direction);
    }
  }
  _getFocusableItem(step) {
    const current = this.current;
    const collectionLength = this.focusables.length;
    if (!collectionLength) {
      return null;
    }
    if (current === null) {
      return this[step === 1 ? "first" : "last"];
    }
    let index = (current + collectionLength + step) % collectionLength;
    do {
      const view = this.focusables.get(index);
      if (isFocusable(view)) {
        return view;
      }
      index = (index + collectionLength + step) % collectionLength;
    } while (index !== current);
    return null;
  }
};
var focuscycler_default = FocusCycler;
function isFocusable(view) {
  return !!("focus" in view && isVisible(view.element));
}

// node_modules/@ckeditor/ckeditor5-ui/src/toolbar/toolbarseparatorview.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var ToolbarSeparatorView = class extends view_default {
  constructor(locale) {
    super(locale);
    this.setTemplate({
      tag: "span",
      attributes: {
        class: [
          "ck",
          "ck-toolbar__separator"
        ]
      }
    });
  }
};
var toolbarseparatorview_default = ToolbarSeparatorView;

// node_modules/@ckeditor/ckeditor5-ui/src/toolbar/toolbarlinebreakview.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var ToolbarLineBreakView = class extends view_default {
  constructor(locale) {
    super(locale);
    this.setTemplate({
      tag: "span",
      attributes: {
        class: [
          "ck",
          "ck-toolbar__line-break"
        ]
      }
    });
  }
};
var toolbarlinebreakview_default = ToolbarLineBreakView;

// node_modules/@ckeditor/ckeditor5-ui/src/bindings/preventdefault.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function preventDefault(view) {
  return view.bindTemplate.to((evt) => {
    if (evt.target === view.element) {
      evt.preventDefault();
    }
  });
}

// node_modules/@ckeditor/ckeditor5-ui/src/toolbar/normalizetoolbarconfig.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function normalizeToolbarConfig(config) {
  if (Array.isArray(config)) {
    return {
      items: config,
      removeItems: []
    };
  }
  if (!config) {
    return {
      items: [],
      removeItems: []
    };
  }
  return Object.assign({
    items: [],
    removeItems: []
  }, config);
}

// node_modules/@ckeditor/ckeditor5-ui/src/toolbar/toolbarview.js
import {FocusTracker as FocusTracker4, KeystrokeHandler as KeystrokeHandler3, Rect as Rect2, ResizeObserver, global as global2, isVisible as isVisible2, logWarning as logWarning2} from "es-ckeditor-lib/lib/utils";
import {icons} from "es-ckeditor-lib/lib/core";
import {isObject as isObject2} from "lodash-es";
import "@ckeditor/ckeditor5-ui/theme/components/toolbar/toolbar.css";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var {threeVerticalDots} = icons;
var NESTED_TOOLBAR_ICONS = {
  alignLeft: icons.alignLeft,
  bold: icons.bold,
  importExport: icons.importExport,
  paragraph: icons.paragraph,
  plus: icons.plus,
  text: icons.text,
  threeVerticalDots: icons.threeVerticalDots,
  pilcrow: icons.pilcrow,
  dragIndicator: icons.dragIndicator
};
var ToolbarView = class extends view_default {
  constructor(locale, options) {
    super(locale);
    const bind = this.bindTemplate;
    const t = this.t;
    this.options = options || {};
    this.set("ariaLabel", t("Editor toolbar"));
    this.set("maxWidth", "auto");
    this.items = this.createCollection();
    this.focusTracker = new FocusTracker4();
    this.keystrokes = new KeystrokeHandler3();
    this.set("class", void 0);
    this.set("isCompact", false);
    this.itemsView = new ItemsView(locale);
    this.children = this.createCollection();
    this.children.add(this.itemsView);
    this.focusables = this.createCollection();
    const isRtl = locale.uiLanguageDirection === "rtl";
    this._focusCycler = new focuscycler_default({
      focusables: this.focusables,
      focusTracker: this.focusTracker,
      keystrokeHandler: this.keystrokes,
      actions: {
        focusPrevious: [isRtl ? "arrowright" : "arrowleft", "arrowup"],
        focusNext: [isRtl ? "arrowleft" : "arrowright", "arrowdown"]
      }
    });
    const classes = [
      "ck",
      "ck-toolbar",
      bind.to("class"),
      bind.if("isCompact", "ck-toolbar_compact")
    ];
    if (this.options.shouldGroupWhenFull && this.options.isFloating) {
      classes.push("ck-toolbar_floating");
    }
    this.setTemplate({
      tag: "div",
      attributes: {
        class: classes,
        role: "toolbar",
        "aria-label": bind.to("ariaLabel"),
        style: {
          maxWidth: bind.to("maxWidth")
        },
        tabindex: -1
      },
      children: this.children,
      on: {
        mousedown: preventDefault(this)
      }
    });
    this._behavior = this.options.shouldGroupWhenFull ? new DynamicGrouping(this) : new StaticLayout(this);
  }
  render() {
    super.render();
    this.focusTracker.add(this.element);
    for (const item of this.items) {
      this.focusTracker.add(item.element);
    }
    this.items.on("add", (evt, item) => {
      this.focusTracker.add(item.element);
    });
    this.items.on("remove", (evt, item) => {
      this.focusTracker.remove(item.element);
    });
    this.keystrokes.listenTo(this.element);
    this._behavior.render(this);
  }
  destroy() {
    this._behavior.destroy();
    this.focusTracker.destroy();
    this.keystrokes.destroy();
    return super.destroy();
  }
  focus() {
    this._focusCycler.focusFirst();
  }
  focusLast() {
    this._focusCycler.focusLast();
  }
  fillFromConfig(itemsOrConfig, factory, removeItems) {
    this.items.addMany(this._buildItemsFromConfig(itemsOrConfig, factory, removeItems));
  }
  _buildItemsFromConfig(itemsOrConfig, factory, removeItems) {
    const config = normalizeToolbarConfig(itemsOrConfig);
    const normalizedRemoveItems = removeItems || config.removeItems;
    const itemsToAdd = this._cleanItemsConfiguration(config.items, factory, normalizedRemoveItems).map((item) => {
      if (isObject2(item)) {
        return this._createNestedToolbarDropdown(item, factory, normalizedRemoveItems);
      } else if (item === "|") {
        return new toolbarseparatorview_default();
      } else if (item === "-") {
        return new toolbarlinebreakview_default();
      }
      return factory.create(item);
    }).filter((item) => !!item);
    return itemsToAdd;
  }
  _cleanItemsConfiguration(items, factory, removeItems) {
    const filteredItems = items.filter((item, idx, items2) => {
      if (item === "|") {
        return true;
      }
      if (removeItems.indexOf(item) !== -1) {
        return false;
      }
      if (item === "-") {
        if (this.options.shouldGroupWhenFull) {
          logWarning2("toolbarview-line-break-ignored-when-grouping-items", items2);
          return false;
        }
        return true;
      }
      if (!isObject2(item) && !factory.has(item)) {
        logWarning2("toolbarview-item-unavailable", {item});
        return false;
      }
      return true;
    });
    return this._cleanSeparatorsAndLineBreaks(filteredItems);
  }
  _cleanSeparatorsAndLineBreaks(items) {
    const nonSeparatorPredicate = (item) => item !== "-" && item !== "|";
    const count = items.length;
    const firstCommandItemIndex = items.findIndex(nonSeparatorPredicate);
    if (firstCommandItemIndex === -1) {
      return [];
    }
    const lastCommandItemIndex = count - items.slice().reverse().findIndex(nonSeparatorPredicate);
    return items.slice(firstCommandItemIndex, lastCommandItemIndex).filter((name, idx, items2) => {
      if (nonSeparatorPredicate(name)) {
        return true;
      }
      const isDuplicated = idx > 0 && items2[idx - 1] === name;
      return !isDuplicated;
    });
  }
  _createNestedToolbarDropdown(definition, componentFactory, removeItems) {
    let {label, icon, items, tooltip = true, withText = false} = definition;
    items = this._cleanItemsConfiguration(items, componentFactory, removeItems);
    if (!items.length) {
      return null;
    }
    const locale = this.locale;
    const dropdownView = createDropdown(locale);
    if (!label) {
      logWarning2("toolbarview-nested-toolbar-dropdown-missing-label", definition);
    }
    dropdownView.class = "ck-toolbar__nested-toolbar-dropdown";
    dropdownView.buttonView.set({
      label,
      tooltip,
      withText: !!withText
    });
    if (icon !== false) {
      dropdownView.buttonView.icon = NESTED_TOOLBAR_ICONS[icon] || icon || threeVerticalDots;
    } else {
      dropdownView.buttonView.withText = true;
    }
    addToolbarToDropdown(dropdownView, () => dropdownView.toolbarView._buildItemsFromConfig(items, componentFactory, removeItems));
    return dropdownView;
  }
};
var toolbarview_default = ToolbarView;
var ItemsView = class extends view_default {
  constructor(locale) {
    super(locale);
    this.children = this.createCollection();
    this.setTemplate({
      tag: "div",
      attributes: {
        class: [
          "ck",
          "ck-toolbar__items"
        ]
      },
      children: this.children
    });
  }
};
var StaticLayout = class {
  constructor(view) {
    const bind = view.bindTemplate;
    view.set("isVertical", false);
    view.itemsView.children.bindTo(view.items).using((item) => item);
    view.focusables.bindTo(view.items).using((item) => item);
    view.extendTemplate({
      attributes: {
        class: [
          bind.if("isVertical", "ck-toolbar_vertical")
        ]
      }
    });
  }
  render() {
  }
  destroy() {
  }
};
var DynamicGrouping = class {
  constructor(view) {
    this.resizeObserver = null;
    this.cachedPadding = null;
    this.shouldUpdateGroupingOnNextResize = false;
    this.view = view;
    this.viewChildren = view.children;
    this.viewFocusables = view.focusables;
    this.viewItemsView = view.itemsView;
    this.viewFocusTracker = view.focusTracker;
    this.viewLocale = view.locale;
    this.ungroupedItems = view.createCollection();
    this.groupedItems = view.createCollection();
    this.groupedItemsDropdown = this._createGroupedItemsDropdown();
    view.itemsView.children.bindTo(this.ungroupedItems).using((item) => item);
    this.ungroupedItems.on("change", this._updateFocusCycleableItems.bind(this));
    view.children.on("change", this._updateFocusCycleableItems.bind(this));
    view.items.on("change", (evt, changeData) => {
      const index = changeData.index;
      const added = Array.from(changeData.added);
      for (const removedItem of changeData.removed) {
        if (index >= this.ungroupedItems.length) {
          this.groupedItems.remove(removedItem);
        } else {
          this.ungroupedItems.remove(removedItem);
        }
      }
      for (let currentIndex = index; currentIndex < index + added.length; currentIndex++) {
        const addedItem = added[currentIndex - index];
        if (currentIndex > this.ungroupedItems.length) {
          this.groupedItems.add(addedItem, currentIndex - this.ungroupedItems.length);
        } else {
          this.ungroupedItems.add(addedItem, currentIndex);
        }
      }
      this._updateGrouping();
    });
    view.extendTemplate({
      attributes: {
        class: [
          "ck-toolbar_grouping"
        ]
      }
    });
  }
  render(view) {
    this.viewElement = view.element;
    this._enableGroupingOnResize();
    this._enableGroupingOnMaxWidthChange(view);
  }
  destroy() {
    this.groupedItemsDropdown.destroy();
    this.resizeObserver.destroy();
  }
  _updateGrouping() {
    if (!this.viewElement.ownerDocument.body.contains(this.viewElement)) {
      return;
    }
    if (!isVisible2(this.viewElement)) {
      this.shouldUpdateGroupingOnNextResize = true;
      return;
    }
    const initialGroupedItemsCount = this.groupedItems.length;
    let wereItemsGrouped;
    while (this._areItemsOverflowing) {
      this._groupLastItem();
      wereItemsGrouped = true;
    }
    if (!wereItemsGrouped && this.groupedItems.length) {
      while (this.groupedItems.length && !this._areItemsOverflowing) {
        this._ungroupFirstItem();
      }
      if (this._areItemsOverflowing) {
        this._groupLastItem();
      }
    }
    if (this.groupedItems.length !== initialGroupedItemsCount) {
      this.view.fire("groupedItemsUpdate");
    }
  }
  get _areItemsOverflowing() {
    if (!this.ungroupedItems.length) {
      return false;
    }
    const element = this.viewElement;
    const uiLanguageDirection = this.viewLocale.uiLanguageDirection;
    const lastChildRect = new Rect2(element.lastChild);
    const toolbarRect = new Rect2(element);
    if (!this.cachedPadding) {
      const computedStyle = global2.window.getComputedStyle(element);
      const paddingProperty = uiLanguageDirection === "ltr" ? "paddingRight" : "paddingLeft";
      this.cachedPadding = Number.parseInt(computedStyle[paddingProperty]);
    }
    if (uiLanguageDirection === "ltr") {
      return lastChildRect.right > toolbarRect.right - this.cachedPadding;
    } else {
      return lastChildRect.left < toolbarRect.left + this.cachedPadding;
    }
  }
  _enableGroupingOnResize() {
    let previousWidth;
    this.resizeObserver = new ResizeObserver(this.viewElement, (entry) => {
      if (!previousWidth || previousWidth !== entry.contentRect.width || this.shouldUpdateGroupingOnNextResize) {
        this.shouldUpdateGroupingOnNextResize = false;
        this._updateGrouping();
        previousWidth = entry.contentRect.width;
      }
    });
    this._updateGrouping();
  }
  _enableGroupingOnMaxWidthChange(view) {
    view.on("change:maxWidth", () => {
      this._updateGrouping();
    });
  }
  _groupLastItem() {
    if (!this.groupedItems.length) {
      this.viewChildren.add(new toolbarseparatorview_default());
      this.viewChildren.add(this.groupedItemsDropdown);
      this.viewFocusTracker.add(this.groupedItemsDropdown.element);
    }
    this.groupedItems.add(this.ungroupedItems.remove(this.ungroupedItems.last), 0);
  }
  _ungroupFirstItem() {
    this.ungroupedItems.add(this.groupedItems.remove(this.groupedItems.first));
    if (!this.groupedItems.length) {
      this.viewChildren.remove(this.groupedItemsDropdown);
      this.viewChildren.remove(this.viewChildren.last);
      this.viewFocusTracker.remove(this.groupedItemsDropdown.element);
    }
  }
  _createGroupedItemsDropdown() {
    const locale = this.viewLocale;
    const t = locale.t;
    const dropdown = createDropdown(locale);
    dropdown.class = "ck-toolbar__grouped-dropdown";
    dropdown.panelPosition = locale.uiLanguageDirection === "ltr" ? "sw" : "se";
    addToolbarToDropdown(dropdown, this.groupedItems);
    dropdown.buttonView.set({
      label: t("Show more items"),
      tooltip: true,
      tooltipPosition: locale.uiLanguageDirection === "rtl" ? "se" : "sw",
      icon: threeVerticalDots
    });
    return dropdown;
  }
  _updateFocusCycleableItems() {
    this.viewFocusables.clear();
    this.ungroupedItems.map((item) => {
      this.viewFocusables.add(item);
    });
    if (this.groupedItems.length) {
      this.viewFocusables.add(this.groupedItemsDropdown);
    }
  }
};

// node_modules/@ckeditor/ckeditor5-ui/src/list/listitemgroupview.js
import {uid as uid4} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var ListItemGroupView = class extends view_default {
  constructor(locale) {
    super(locale);
    const bind = this.bindTemplate;
    const groupLabelId = `ck-editor__label_${uid4()}`;
    const nestedList = new listview_default(locale);
    this.children = this.createCollection();
    this.children.addMany([this._createLabel(groupLabelId), nestedList]);
    this.set({
      label: "",
      isVisible: true
    });
    nestedList.set({
      role: "group",
      ariaLabelledBy: groupLabelId
    });
    nestedList.focusTracker.destroy();
    nestedList.keystrokes.destroy();
    this.items = nestedList.items;
    this.setTemplate({
      tag: "li",
      attributes: {
        role: "presentation",
        class: [
          "ck",
          "ck-list__group",
          bind.if("isVisible", "ck-hidden", (value) => !value)
        ]
      },
      children: this.children
    });
  }
  _createLabel(groupLabelId) {
    const labelView = new view_default(this.locale);
    const bind = this.bindTemplate;
    labelView.setTemplate({
      tag: "span",
      attributes: {
        id: groupLabelId
      },
      children: [
        {text: bind.to("label")}
      ]
    });
    return labelView;
  }
  focus() {
    if (this.items.first) {
      this.items.first.focus();
    }
  }
};
var listitemgroupview_default = ListItemGroupView;

// node_modules/@ckeditor/ckeditor5-ui/src/list/listview.js
import {FocusTracker as FocusTracker5, KeystrokeHandler as KeystrokeHandler4} from "es-ckeditor-lib/lib/utils";
import "@ckeditor/ckeditor5-ui/theme/components/list/list.css";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var ListView = class extends view_default {
  constructor(locale) {
    super(locale);
    this._listItemGroupToChangeListeners = new WeakMap();
    const bind = this.bindTemplate;
    this.focusables = new viewcollection_default();
    this.items = this.createCollection();
    this.focusTracker = new FocusTracker5();
    this.keystrokes = new KeystrokeHandler4();
    this._focusCycler = new focuscycler_default({
      focusables: this.focusables,
      focusTracker: this.focusTracker,
      keystrokeHandler: this.keystrokes,
      actions: {
        focusPrevious: "arrowup",
        focusNext: "arrowdown"
      }
    });
    this.set("ariaLabel", void 0);
    this.set("ariaLabelledBy", void 0);
    this.set("role", void 0);
    this.setTemplate({
      tag: "ul",
      attributes: {
        class: [
          "ck",
          "ck-reset",
          "ck-list"
        ],
        role: bind.to("role"),
        "aria-label": bind.to("ariaLabel"),
        "aria-labelledby": bind.to("ariaLabelledBy")
      },
      children: this.items
    });
  }
  render() {
    super.render();
    for (const item of this.items) {
      if (item instanceof listitemgroupview_default) {
        this._registerFocusableItemsGroup(item);
      } else {
        this._registerFocusableListItem(item);
      }
    }
    this.items.on("change", (evt, data) => {
      for (const removed of data.removed) {
        if (removed instanceof listitemgroupview_default) {
          this._deregisterFocusableItemsGroup(removed);
        } else {
          this._deregisterFocusableListItem(removed);
        }
      }
      for (const added of Array.from(data.added).reverse()) {
        if (added instanceof listitemgroupview_default) {
          this._registerFocusableItemsGroup(added, data.index);
        } else {
          this._registerFocusableListItem(added, data.index);
        }
      }
    });
    this.keystrokes.listenTo(this.element);
  }
  destroy() {
    super.destroy();
    this.focusTracker.destroy();
    this.keystrokes.destroy();
  }
  focus() {
    this._focusCycler.focusFirst();
  }
  focusFirst() {
    this._focusCycler.focusFirst();
  }
  focusLast() {
    this._focusCycler.focusLast();
  }
  _registerFocusableListItem(item, index) {
    this.focusTracker.add(item.element);
    this.focusables.add(item, index);
  }
  _deregisterFocusableListItem(item) {
    this.focusTracker.remove(item.element);
    this.focusables.remove(item);
  }
  _getOnGroupItemsChangeCallback(groupView) {
    return (evt, data) => {
      for (const removed of data.removed) {
        this._deregisterFocusableListItem(removed);
      }
      for (const added of Array.from(data.added).reverse()) {
        this._registerFocusableListItem(added, this.items.getIndex(groupView) + data.index);
      }
    };
  }
  _registerFocusableItemsGroup(groupView, groupIndex) {
    Array.from(groupView.items).forEach((child, childIndex) => {
      const registeredChildIndex = typeof groupIndex !== "undefined" ? groupIndex + childIndex : void 0;
      this._registerFocusableListItem(child, registeredChildIndex);
    });
    const groupItemsChangeCallback = this._getOnGroupItemsChangeCallback(groupView);
    this._listItemGroupToChangeListeners.set(groupView, groupItemsChangeCallback);
    groupView.items.on("change", groupItemsChangeCallback);
  }
  _deregisterFocusableItemsGroup(groupView) {
    for (const child of groupView.items) {
      this._deregisterFocusableListItem(child);
    }
    groupView.items.off("change", this._listItemGroupToChangeListeners.get(groupView));
    this._listItemGroupToChangeListeners.delete(groupView);
  }
};
var listview_default = ListView;

// node_modules/@ckeditor/ckeditor5-ui/src/list/listitemview.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var ListItemView = class extends view_default {
  constructor(locale) {
    super(locale);
    const bind = this.bindTemplate;
    this.set("isVisible", true);
    this.children = this.createCollection();
    this.setTemplate({
      tag: "li",
      attributes: {
        class: [
          "ck",
          "ck-list__item",
          bind.if("isVisible", "ck-hidden", (value) => !value)
        ],
        role: "presentation"
      },
      children: this.children
    });
  }
  focus() {
    if (this.children.first) {
      this.children.first.focus();
    }
  }
};
var listitemview_default = ListItemView;

// node_modules/@ckeditor/ckeditor5-ui/src/list/listseparatorview.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var ListSeparatorView = class extends view_default {
  constructor(locale) {
    super(locale);
    this.setTemplate({
      tag: "li",
      attributes: {
        class: [
          "ck",
          "ck-list__separator"
        ]
      }
    });
  }
};
var listseparatorview_default = ListSeparatorView;

// node_modules/@ckeditor/ckeditor5-ui/src/dropdown/button/splitbuttonview.js
import {KeystrokeHandler as KeystrokeHandler5, FocusTracker as FocusTracker6} from "es-ckeditor-lib/lib/utils";
import "@ckeditor/ckeditor5-ui/theme/components/dropdown/splitbutton.css";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var SplitButtonView = class extends view_default {
  constructor(locale) {
    super(locale);
    const bind = this.bindTemplate;
    this.set("class", void 0);
    this.set("labelStyle", void 0);
    this.set("icon", void 0);
    this.set("isEnabled", true);
    this.set("isOn", false);
    this.set("isToggleable", false);
    this.set("isVisible", true);
    this.set("keystroke", void 0);
    this.set("withKeystroke", false);
    this.set("label", void 0);
    this.set("tabindex", -1);
    this.set("tooltip", false);
    this.set("tooltipPosition", "s");
    this.set("type", "button");
    this.set("withText", false);
    this.children = this.createCollection();
    this.actionView = this._createActionView();
    this.arrowView = this._createArrowView();
    this.keystrokes = new KeystrokeHandler5();
    this.focusTracker = new FocusTracker6();
    this.setTemplate({
      tag: "div",
      attributes: {
        class: [
          "ck",
          "ck-splitbutton",
          bind.to("class"),
          bind.if("isVisible", "ck-hidden", (value) => !value),
          this.arrowView.bindTemplate.if("isOn", "ck-splitbutton_open")
        ]
      },
      children: this.children
    });
  }
  render() {
    super.render();
    this.children.add(this.actionView);
    this.children.add(this.arrowView);
    this.focusTracker.add(this.actionView.element);
    this.focusTracker.add(this.arrowView.element);
    this.keystrokes.listenTo(this.element);
    this.keystrokes.set("arrowright", (evt, cancel) => {
      if (this.focusTracker.focusedElement === this.actionView.element) {
        this.arrowView.focus();
        cancel();
      }
    });
    this.keystrokes.set("arrowleft", (evt, cancel) => {
      if (this.focusTracker.focusedElement === this.arrowView.element) {
        this.actionView.focus();
        cancel();
      }
    });
  }
  destroy() {
    super.destroy();
    this.focusTracker.destroy();
    this.keystrokes.destroy();
  }
  focus() {
    this.actionView.focus();
  }
  _createActionView() {
    const actionView = new buttonview_default();
    actionView.bind("icon", "isEnabled", "isOn", "isToggleable", "keystroke", "label", "tabindex", "tooltip", "tooltipPosition", "type", "withText").to(this);
    actionView.extendTemplate({
      attributes: {
        class: "ck-splitbutton__action"
      }
    });
    actionView.delegate("execute").to(this);
    return actionView;
  }
  _createArrowView() {
    const arrowView = new buttonview_default();
    const bind = arrowView.bindTemplate;
    arrowView.icon = dropdown_arrow_default;
    arrowView.extendTemplate({
      attributes: {
        class: [
          "ck-splitbutton__arrow"
        ],
        "data-cke-tooltip-disabled": bind.to("isOn"),
        "aria-haspopup": true,
        "aria-expanded": bind.to("isOn", (value) => String(value))
      }
    });
    arrowView.bind("isEnabled").to(this);
    arrowView.bind("label").to(this);
    arrowView.bind("tooltip").to(this);
    arrowView.delegate("execute").to(this, "open");
    return arrowView;
  }
};
var splitbuttonview_default = SplitButtonView;

// node_modules/@ckeditor/ckeditor5-ui/src/dropdown/utils.js
import {global as global3, priorities, logWarning as logWarning3} from "es-ckeditor-lib/lib/utils";
import "@ckeditor/ckeditor5-ui/theme/components/dropdown/toolbardropdown.css";
import "@ckeditor/ckeditor5-ui/theme/components/dropdown/listdropdown.css";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function createDropdown(locale, ButtonClass = dropdownbuttonview_default) {
  const buttonView = new ButtonClass(locale);
  const panelView = new dropdownpanelview_default(locale);
  const dropdownView = new dropdownview_default(locale, buttonView, panelView);
  buttonView.bind("isEnabled").to(dropdownView);
  if (buttonView instanceof splitbuttonview_default) {
    buttonView.arrowView.bind("isOn").to(dropdownView, "isOpen");
  } else {
    buttonView.bind("isOn").to(dropdownView, "isOpen");
  }
  addDefaultBehavior(dropdownView);
  return dropdownView;
}
function addToolbarToDropdown(dropdownView, buttonsOrCallback, options = {}) {
  dropdownView.extendTemplate({
    attributes: {
      class: ["ck-toolbar-dropdown"]
    }
  });
  if (dropdownView.isOpen) {
    addToolbarToOpenDropdown(dropdownView, buttonsOrCallback, options);
  } else {
    dropdownView.once("change:isOpen", () => addToolbarToOpenDropdown(dropdownView, buttonsOrCallback, options), {priority: "highest"});
  }
  if (options.enableActiveItemFocusOnDropdownOpen) {
    focusChildOnDropdownOpen(dropdownView, () => dropdownView.toolbarView.items.find((item) => item.isOn));
  }
}
function addToolbarToOpenDropdown(dropdownView, buttonsOrCallback, options) {
  const locale = dropdownView.locale;
  const t = locale.t;
  const toolbarView = dropdownView.toolbarView = new toolbarview_default(locale);
  const buttons = typeof buttonsOrCallback == "function" ? buttonsOrCallback() : buttonsOrCallback;
  toolbarView.ariaLabel = options.ariaLabel || t("Dropdown toolbar");
  if (options.maxWidth) {
    toolbarView.maxWidth = options.maxWidth;
  }
  if (options.class) {
    toolbarView.class = options.class;
  }
  if (options.isCompact) {
    toolbarView.isCompact = options.isCompact;
  }
  if (options.isVertical) {
    toolbarView.isVertical = true;
  }
  if (buttons instanceof viewcollection_default) {
    toolbarView.items.bindTo(buttons).using((item) => item);
  } else {
    toolbarView.items.addMany(buttons);
  }
  dropdownView.panelView.children.add(toolbarView);
  toolbarView.items.delegate("execute").to(dropdownView);
}
function addListToDropdown(dropdownView, itemsOrCallback, options = {}) {
  if (dropdownView.isOpen) {
    addListToOpenDropdown(dropdownView, itemsOrCallback, options);
  } else {
    dropdownView.once("change:isOpen", () => addListToOpenDropdown(dropdownView, itemsOrCallback, options), {priority: "highest"});
  }
  focusChildOnDropdownOpen(dropdownView, () => dropdownView.listView.items.find((item) => {
    if (item instanceof listitemview_default) {
      return item.children.first.isOn;
    }
    return false;
  }));
}
function addListToOpenDropdown(dropdownView, itemsOrCallback, options) {
  const locale = dropdownView.locale;
  const listView = dropdownView.listView = new listview_default(locale);
  const items = typeof itemsOrCallback == "function" ? itemsOrCallback() : itemsOrCallback;
  listView.ariaLabel = options.ariaLabel;
  listView.role = options.role;
  bindViewCollectionItemsToDefinitions(dropdownView, listView.items, items, locale);
  dropdownView.panelView.children.add(listView);
  listView.items.delegate("execute").to(dropdownView);
}
function focusChildOnDropdownOpen(dropdownView, childSelectorCallback) {
  dropdownView.on("change:isOpen", () => {
    if (!dropdownView.isOpen) {
      return;
    }
    const childToFocus = childSelectorCallback();
    if (!childToFocus) {
      return;
    }
    if (typeof childToFocus.focus === "function") {
      childToFocus.focus();
    } else {
      logWarning3("ui-dropdown-focus-child-on-open-child-missing-focus", {view: childToFocus});
    }
  }, {priority: priorities.low - 10});
}
function addDefaultBehavior(dropdownView) {
  closeDropdownOnClickOutside(dropdownView);
  closeDropdownOnExecute(dropdownView);
  closeDropdownOnBlur(dropdownView);
  focusDropdownContentsOnArrows(dropdownView);
  focusDropdownButtonOnClose(dropdownView);
  focusDropdownPanelOnOpen(dropdownView);
}
function closeDropdownOnClickOutside(dropdownView) {
  dropdownView.on("render", () => {
    clickOutsideHandler({
      emitter: dropdownView,
      activator: () => dropdownView.isOpen,
      callback: () => {
        dropdownView.isOpen = false;
      },
      contextElements: () => [
        dropdownView.element,
        ...dropdownView.focusTracker._elements
      ]
    });
  });
}
function closeDropdownOnExecute(dropdownView) {
  dropdownView.on("execute", (evt) => {
    if (evt.source instanceof switchbuttonview_default) {
      return;
    }
    dropdownView.isOpen = false;
  });
}
function closeDropdownOnBlur(dropdownView) {
  dropdownView.focusTracker.on("change:isFocused", (evt, name, isFocused) => {
    if (dropdownView.isOpen && !isFocused) {
      dropdownView.isOpen = false;
    }
  });
}
function focusDropdownContentsOnArrows(dropdownView) {
  dropdownView.keystrokes.set("arrowdown", (data, cancel) => {
    if (dropdownView.isOpen) {
      dropdownView.panelView.focus();
      cancel();
    }
  });
  dropdownView.keystrokes.set("arrowup", (data, cancel) => {
    if (dropdownView.isOpen) {
      dropdownView.panelView.focusLast();
      cancel();
    }
  });
}
function focusDropdownButtonOnClose(dropdownView) {
  dropdownView.on("change:isOpen", (evt, name, isOpen) => {
    if (isOpen) {
      return;
    }
    const element = dropdownView.panelView.element;
    if (element && element.contains(global3.document.activeElement)) {
      dropdownView.buttonView.focus();
    }
  });
}
function focusDropdownPanelOnOpen(dropdownView) {
  dropdownView.on("change:isOpen", (evt, name, isOpen) => {
    if (!isOpen) {
      return;
    }
    dropdownView.panelView.focus();
  }, {priority: "low"});
}
function bindViewCollectionItemsToDefinitions(dropdownView, listItems, definitions, locale) {
  listItems.bindTo(definitions).using((def) => {
    if (def.type === "separator") {
      return new listseparatorview_default(locale);
    } else if (def.type === "group") {
      const groupView = new listitemgroupview_default(locale);
      groupView.set({label: def.label});
      bindViewCollectionItemsToDefinitions(dropdownView, groupView.items, def.items, locale);
      groupView.items.delegate("execute").to(dropdownView);
      return groupView;
    } else if (def.type === "button" || def.type === "switchbutton") {
      const listItemView = new listitemview_default(locale);
      let buttonView;
      if (def.type === "button") {
        buttonView = new buttonview_default(locale);
      } else {
        buttonView = new switchbuttonview_default(locale);
      }
      buttonView.bind(...Object.keys(def.model)).to(def.model);
      buttonView.delegate("execute").to(listItemView);
      listItemView.children.add(buttonView);
      return listItemView;
    }
    return null;
  });
}

// node_modules/@ckeditor/ckeditor5-ui/src/labeledfield/utils.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var createLabeledInputText = (labeledFieldView, viewUid, statusUid) => {
  const inputView = new inputtextview_default(labeledFieldView.locale);
  inputView.set({
    id: viewUid,
    ariaDescribedById: statusUid
  });
  inputView.bind("isReadOnly").to(labeledFieldView, "isEnabled", (value) => !value);
  inputView.bind("hasError").to(labeledFieldView, "errorText", (value) => !!value);
  inputView.on("input", () => {
    labeledFieldView.errorText = null;
  });
  labeledFieldView.bind("isEmpty", "isFocused", "placeholder").to(inputView);
  return inputView;
};
var createLabeledInputNumber = (labeledFieldView, viewUid, statusUid) => {
  const inputView = new inputnumberview_default(labeledFieldView.locale);
  inputView.set({
    id: viewUid,
    ariaDescribedById: statusUid,
    inputMode: "numeric"
  });
  inputView.bind("isReadOnly").to(labeledFieldView, "isEnabled", (value) => !value);
  inputView.bind("hasError").to(labeledFieldView, "errorText", (value) => !!value);
  inputView.on("input", () => {
    labeledFieldView.errorText = null;
  });
  labeledFieldView.bind("isEmpty", "isFocused", "placeholder").to(inputView);
  return inputView;
};
var createLabeledTextarea = (labeledFieldView, viewUid, statusUid) => {
  const textareaView = new textareaview_default(labeledFieldView.locale);
  textareaView.set({
    id: viewUid,
    ariaDescribedById: statusUid
  });
  textareaView.bind("isReadOnly").to(labeledFieldView, "isEnabled", (value) => !value);
  textareaView.bind("hasError").to(labeledFieldView, "errorText", (value) => !!value);
  textareaView.on("input", () => {
    labeledFieldView.errorText = null;
  });
  labeledFieldView.bind("isEmpty", "isFocused", "placeholder").to(textareaView);
  return textareaView;
};
var createLabeledDropdown = (labeledFieldView, viewUid, statusUid) => {
  const dropdownView = createDropdown(labeledFieldView.locale);
  dropdownView.set({
    id: viewUid,
    ariaDescribedById: statusUid
  });
  dropdownView.bind("isEnabled").to(labeledFieldView);
  return dropdownView;
};

// node_modules/@ckeditor/ckeditor5-ui/src/colorpicker/colorpickerview.js
import "vanilla-colorful/hex-color-picker.js";
import "@ckeditor/ckeditor5-ui/theme/components/colorpicker/colorpicker.css";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var waitingTime = 150;
var ColorPickerView = class extends view_default {
  constructor(locale, config = {}) {
    super(locale);
    this.set({
      color: "",
      _hexColor: ""
    });
    this.hexInputRow = this._createInputRow();
    const children = this.createCollection();
    if (!config.hideInput) {
      children.add(this.hexInputRow);
    }
    this.setTemplate({
      tag: "div",
      attributes: {
        class: ["ck", "ck-color-picker"],
        tabindex: -1
      },
      children
    });
    this._config = config;
    this._debounceColorPickerEvent = debounce((color) => {
      this.set("color", color);
      this.fire("colorSelected", {color: this.color});
    }, waitingTime, {
      leading: true
    });
    this.on("set:color", (evt, propertyName, newValue) => {
      evt.return = convertColor(newValue, this._config.format || "hsl");
    });
    this.on("change:color", () => {
      this._hexColor = convertColorToCommonHexFormat(this.color);
    });
    this.on("change:_hexColor", () => {
      if (document.activeElement !== this.picker) {
        this.picker.setAttribute("color", this._hexColor);
      }
      if (convertColorToCommonHexFormat(this.color) != convertColorToCommonHexFormat(this._hexColor)) {
        this.color = this._hexColor;
      }
    });
  }
  render() {
    super.render();
    this.picker = global4.document.createElement("hex-color-picker");
    this.picker.setAttribute("class", "hex-color-picker");
    this.picker.setAttribute("tabindex", "-1");
    this._createSlidersView();
    if (this.element) {
      if (this.hexInputRow.element) {
        this.element.insertBefore(this.picker, this.hexInputRow.element);
      } else {
        this.element.appendChild(this.picker);
      }
      const styleSheetForFocusedColorPicker = document.createElement("style");
      styleSheetForFocusedColorPicker.textContent = '[role="slider"]:focus [part$="pointer"] {border: 1px solid #fff;outline: 1px solid var(--ck-color-focus-border);box-shadow: 0 0 0 2px #fff;}';
      this.picker.shadowRoot.appendChild(styleSheetForFocusedColorPicker);
    }
    this.picker.addEventListener("color-changed", (event) => {
      const customEvent = event;
      const color = customEvent.detail.value;
      this._debounceColorPickerEvent(color);
    });
  }
  focus() {
    /* istanbul ignore next -- @preserve */
    if (!this._config.hideInput && (env2.isGecko || env2.isiOS || env2.isSafari)) {
      const input = this.hexInputRow.children.get(1);
      input.focus();
    }
    const firstSlider = this.slidersView.first;
    firstSlider.focus();
  }
  _createSlidersView() {
    const colorPickersChildren = [...this.picker.shadowRoot.children];
    const sliders = colorPickersChildren.filter((item) => item.getAttribute("role") === "slider");
    const slidersView = sliders.map((slider) => {
      const view = new SliderView(slider);
      return view;
    });
    this.slidersView = this.createCollection();
    slidersView.forEach((item) => {
      this.slidersView.add(item);
    });
  }
  _createInputRow() {
    const hashView = new HashView();
    const colorInput = this._createColorInput();
    return new ColorPickerInputRowView(this.locale, [hashView, colorInput]);
  }
  _createColorInput() {
    const labeledInput = new labeledfieldview_default(this.locale, createLabeledInputText);
    const {t} = this.locale;
    labeledInput.set({
      label: t("HEX"),
      class: "color-picker-hex-input"
    });
    labeledInput.fieldView.bind("value").to(this, "_hexColor", (pickerColor) => {
      if (labeledInput.isFocused) {
        return labeledInput.fieldView.value;
      } else {
        return pickerColor.startsWith("#") ? pickerColor.substring(1) : pickerColor;
      }
    });
    labeledInput.fieldView.on("input", () => {
      const inputValue = labeledInput.fieldView.element.value;
      if (inputValue) {
        const trimmedValue = inputValue.trim();
        const hashlessInput = trimmedValue.startsWith("#") ? trimmedValue.substring(1) : trimmedValue;
        const isValidHexColor = [3, 4, 6, 8].includes(hashlessInput.length) && /(([0-9a-fA-F]{2}){3,4}|([0-9a-fA-F]){3,4})/.test(hashlessInput);
        if (isValidHexColor) {
          this._debounceColorPickerEvent("#" + hashlessInput);
        }
      }
    });
    return labeledInput;
  }
};
var colorpickerview_default = ColorPickerView;
function convertColorToCommonHexFormat(inputColor) {
  let ret = convertToHex(inputColor);
  if (!ret) {
    ret = "#000";
  }
  if (ret.length === 4) {
    ret = "#" + [ret[1], ret[1], ret[2], ret[2], ret[3], ret[3]].join("");
  }
  return ret.toLowerCase();
}
var SliderView = class extends view_default {
  constructor(element) {
    super();
    this.element = element;
  }
  focus() {
    this.element.focus();
  }
};
var HashView = class extends view_default {
  constructor(locale) {
    super(locale);
    this.setTemplate({
      tag: "div",
      attributes: {
        class: [
          "ck",
          "ck-color-picker__hash-view"
        ]
      },
      children: "#"
    });
  }
};
var ColorPickerInputRowView = class extends view_default {
  constructor(locale, children) {
    super(locale);
    this.children = this.createCollection(children);
    this.setTemplate({
      tag: "div",
      attributes: {
        class: [
          "ck",
          "ck-color-picker__row"
        ]
      },
      children: this.children
    });
  }
};

// node_modules/@ckeditor/ckeditor5-ui/src/colorselector/colorselectorview.js
import {FocusTracker as FocusTracker7, KeystrokeHandler as KeystrokeHandler6} from "es-ckeditor-lib/lib/utils";

// node_modules/@ckeditor/ckeditor5-ui/src/colorselector/documentcolorcollection.js
import {Collection as Collection3, ObservableMixin as ObservableMixin2} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var DocumentColorCollection = class extends ObservableMixin2(Collection3) {
  constructor(options) {
    super(options);
    this.set("isEmpty", true);
    this.on("change", () => {
      this.set("isEmpty", this.length === 0);
    });
  }
  add(item, index) {
    if (this.find((element) => element.color === item.color)) {
      return this;
    }
    return super.add(item, index);
  }
  hasColor(color) {
    return !!this.find((item) => item.color === color);
  }
};
var documentcolorcollection_default = DocumentColorCollection;

// node_modules/@ckeditor/ckeditor5-core/theme/icons/eraser.svg
var eraser_default = '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="m8.636 9.531-2.758 3.94a.5.5 0 0 0 .122.696l3.224 2.284h1.314l2.636-3.736L8.636 9.53zm.288 8.451L5.14 15.396a2 2 0 0 1-.491-2.786l6.673-9.53a2 2 0 0 1 2.785-.49l3.742 2.62a2 2 0 0 1 .491 2.785l-7.269 10.053-2.147-.066z"/><path d="M4 18h5.523v-1H4zm-2 0h1v-1H2z"/></svg>';

// node_modules/@ckeditor/ckeditor5-ui/theme/icons/color-palette.svg
var color_palette_default = '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.209 18.717A8.5 8.5 0 1 1 18.686 9.6h-.008l.002.12a3 3 0 0 1-2.866 2.997h-.268l-.046-.002v.002h-4.791a2 2 0 1 0 0 4 1 1 0 1 1-.128 1.992 8.665 8.665 0 0 1-.372.008Zm-3.918-7.01a1.25 1.25 0 1 0-2.415-.648 1.25 1.25 0 0 0 2.415.647ZM5.723 8.18a1.25 1.25 0 1 0 .647-2.414 1.25 1.25 0 0 0-.647 2.414ZM9.76 6.155a1.25 1.25 0 1 0 .647-2.415 1.25 1.25 0 0 0-.647 2.415Zm4.028 1.759a1.25 1.25 0 1 0 .647-2.415 1.25 1.25 0 0 0-.647 2.415Z"/></svg>';

// node_modules/@ckeditor/ckeditor5-ui/src/colorselector/colorgridsfragmentview.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var ColorGridsFragmentView = class extends view_default {
  constructor(locale, {colors, columns, removeButtonLabel, documentColorsLabel, documentColorsCount, colorPickerLabel, focusTracker, focusables}) {
    super(locale);
    const bind = this.bindTemplate;
    this.set("isVisible", true);
    this.focusTracker = focusTracker;
    this.items = this.createCollection();
    this.colorDefinitions = colors;
    this.columns = columns;
    this.documentColors = new documentcolorcollection_default();
    this.documentColorsCount = documentColorsCount;
    this._focusables = focusables;
    this._removeButtonLabel = removeButtonLabel;
    this._colorPickerLabel = colorPickerLabel;
    this._documentColorsLabel = documentColorsLabel;
    this.setTemplate({
      tag: "div",
      attributes: {
        class: [
          "ck-color-grids-fragment",
          bind.if("isVisible", "ck-hidden", (value) => !value)
        ]
      },
      children: this.items
    });
    this.removeColorButtonView = this._createRemoveColorButton();
    this.items.add(this.removeColorButtonView);
  }
  updateDocumentColors(model, attributeName) {
    const document2 = model.document;
    const maxCount = this.documentColorsCount;
    this.documentColors.clear();
    for (const root of document2.getRoots()) {
      const range = model.createRangeIn(root);
      for (const node of range.getItems()) {
        if (node.is("$textProxy") && node.hasAttribute(attributeName)) {
          this._addColorToDocumentColors(node.getAttribute(attributeName));
          if (this.documentColors.length >= maxCount) {
            return;
          }
        }
      }
    }
  }
  updateSelectedColors() {
    const documentColorsGrid = this.documentColorsGrid;
    const staticColorsGrid = this.staticColorsGrid;
    const selectedColor = this.selectedColor;
    staticColorsGrid.selectedColor = selectedColor;
    if (documentColorsGrid) {
      documentColorsGrid.selectedColor = selectedColor;
    }
  }
  render() {
    super.render();
    this.staticColorsGrid = this._createStaticColorsGrid();
    this.items.add(this.staticColorsGrid);
    if (this.documentColorsCount) {
      const bind = template_default.bind(this.documentColors, this.documentColors);
      const label = new labelview_default(this.locale);
      label.text = this._documentColorsLabel;
      label.extendTemplate({
        attributes: {
          class: [
            "ck",
            "ck-color-grid__label",
            bind.if("isEmpty", "ck-hidden")
          ]
        }
      });
      this.items.add(label);
      this.documentColorsGrid = this._createDocumentColorsGrid();
      this.items.add(this.documentColorsGrid);
    }
    this._createColorPickerButton();
    this._addColorSelectorElementsToFocusTracker();
    this.focus();
  }
  focus() {
    this.removeColorButtonView.focus();
  }
  destroy() {
    super.destroy();
  }
  addColorPickerButton() {
    if (this.colorPickerButtonView) {
      this.items.add(this.colorPickerButtonView);
      this.focusTracker.add(this.colorPickerButtonView.element);
      this._focusables.add(this.colorPickerButtonView);
    }
  }
  _addColorSelectorElementsToFocusTracker() {
    this.focusTracker.add(this.removeColorButtonView.element);
    this._focusables.add(this.removeColorButtonView);
    if (this.staticColorsGrid) {
      this.focusTracker.add(this.staticColorsGrid.element);
      this._focusables.add(this.staticColorsGrid);
    }
    if (this.documentColorsGrid) {
      this.focusTracker.add(this.documentColorsGrid.element);
      this._focusables.add(this.documentColorsGrid);
    }
  }
  _createColorPickerButton() {
    this.colorPickerButtonView = new buttonview_default();
    this.colorPickerButtonView.set({
      label: this._colorPickerLabel,
      withText: true,
      icon: color_palette_default,
      class: "ck-color-selector__color-picker"
    });
    this.colorPickerButtonView.on("execute", () => {
      this.fire("colorPicker:show");
    });
  }
  _createRemoveColorButton() {
    const buttonView = new buttonview_default();
    buttonView.set({
      withText: true,
      icon: eraser_default,
      label: this._removeButtonLabel
    });
    buttonView.class = "ck-color-selector__remove-color";
    buttonView.on("execute", () => {
      this.fire("execute", {
        value: null,
        source: "removeColorButton"
      });
    });
    buttonView.render();
    return buttonView;
  }
  _createStaticColorsGrid() {
    const colorGrid = new colorgridview_default(this.locale, {
      colorDefinitions: this.colorDefinitions,
      columns: this.columns
    });
    colorGrid.on("execute", (evt, data) => {
      this.fire("execute", {
        value: data.value,
        source: "staticColorsGrid"
      });
    });
    return colorGrid;
  }
  _createDocumentColorsGrid() {
    const bind = template_default.bind(this.documentColors, this.documentColors);
    const documentColorsGrid = new colorgridview_default(this.locale, {
      columns: this.columns
    });
    documentColorsGrid.extendTemplate({
      attributes: {
        class: bind.if("isEmpty", "ck-hidden")
      }
    });
    documentColorsGrid.items.bindTo(this.documentColors).using((colorObj) => {
      const colorTile = new colortileview_default();
      colorTile.set({
        color: colorObj.color,
        hasBorder: colorObj.options && colorObj.options.hasBorder
      });
      if (colorObj.label) {
        colorTile.set({
          label: colorObj.label,
          tooltip: true
        });
      }
      colorTile.on("execute", () => {
        this.fire("execute", {
          value: colorObj.color,
          source: "documentColorsGrid"
        });
      });
      return colorTile;
    });
    this.documentColors.on("change:isEmpty", (evt, name, val) => {
      if (val) {
        documentColorsGrid.selectedColor = null;
      }
    });
    return documentColorsGrid;
  }
  _addColorToDocumentColors(color) {
    const predefinedColor = this.colorDefinitions.find((definition) => definition.color === color);
    if (!predefinedColor) {
      this.documentColors.add({
        color,
        label: color,
        options: {
          hasBorder: false
        }
      });
    } else {
      this.documentColors.add(Object.assign({}, predefinedColor));
    }
  }
};
var colorgridsfragmentview_default = ColorGridsFragmentView;

// node_modules/@ckeditor/ckeditor5-core/theme/icons/check.svg
var check_default = '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6.972 16.615a.997.997 0 0 1-.744-.292l-4.596-4.596a1 1 0 1 1 1.414-1.414l3.926 3.926 9.937-9.937a1 1 0 0 1 1.414 1.415L7.717 16.323a.997.997 0 0 1-.745.292z"/></svg>';

// node_modules/@ckeditor/ckeditor5-core/theme/icons/cancel.svg
var cancel_default = '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="m11.591 10.177 4.243 4.242a1 1 0 0 1-1.415 1.415l-4.242-4.243-4.243 4.243a1 1 0 0 1-1.414-1.415l4.243-4.242L4.52 5.934A1 1 0 0 1 5.934 4.52l4.243 4.243 4.242-4.243a1 1 0 1 1 1.415 1.414l-4.243 4.243z"/></svg>';

// node_modules/@ckeditor/ckeditor5-ui/src/colorselector/colorpickerfragmentview.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var ColorPickerFragmentView = class extends view_default {
  constructor(locale, {focusTracker, focusables, keystrokes, colorPickerViewConfig}) {
    super(locale);
    this.items = this.createCollection();
    this.focusTracker = focusTracker;
    this.keystrokes = keystrokes;
    this.set("isVisible", false);
    this.set("selectedColor", void 0);
    this._focusables = focusables;
    this._colorPickerViewConfig = colorPickerViewConfig;
    const bind = this.bindTemplate;
    const {saveButtonView, cancelButtonView} = this._createActionButtons();
    this.saveButtonView = saveButtonView;
    this.cancelButtonView = cancelButtonView;
    this.actionBarView = this._createActionBarView({saveButtonView, cancelButtonView});
    this.setTemplate({
      tag: "div",
      attributes: {
        class: [
          "ck-color-picker-fragment",
          bind.if("isVisible", "ck-hidden", (value) => !value)
        ]
      },
      children: this.items
    });
  }
  render() {
    super.render();
    const colorPickerView = new colorpickerview_default(this.locale, {
      ...this._colorPickerViewConfig
    });
    this.colorPickerView = colorPickerView;
    this.colorPickerView.render();
    if (this.selectedColor) {
      colorPickerView.color = this.selectedColor;
    }
    this.listenTo(this, "change:selectedColor", (evt, name, value) => {
      colorPickerView.color = value;
    });
    this.items.add(this.colorPickerView);
    this.items.add(this.actionBarView);
    this._addColorPickersElementsToFocusTracker();
    this._stopPropagationOnArrowsKeys();
    this._executeOnEnterPress();
    this._executeUponColorChange();
  }
  destroy() {
    super.destroy();
  }
  focus() {
    this.colorPickerView.focus();
  }
  _executeOnEnterPress() {
    this.keystrokes.set("enter", (evt) => {
      if (this.isVisible && this.focusTracker.focusedElement !== this.cancelButtonView.element) {
        this.fire("execute", {
          value: this.selectedColor
        });
        evt.stopPropagation();
        evt.preventDefault();
      }
    });
  }
  _stopPropagationOnArrowsKeys() {
    const stopPropagation = (data) => data.stopPropagation();
    this.keystrokes.set("arrowright", stopPropagation);
    this.keystrokes.set("arrowleft", stopPropagation);
    this.keystrokes.set("arrowup", stopPropagation);
    this.keystrokes.set("arrowdown", stopPropagation);
  }
  _addColorPickersElementsToFocusTracker() {
    for (const slider of this.colorPickerView.slidersView) {
      this.focusTracker.add(slider.element);
      this._focusables.add(slider);
    }
    const input = this.colorPickerView.hexInputRow.children.get(1);
    if (input.element) {
      this.focusTracker.add(input.element);
      this._focusables.add(input);
    }
    this.focusTracker.add(this.saveButtonView.element);
    this._focusables.add(this.saveButtonView);
    this.focusTracker.add(this.cancelButtonView.element);
    this._focusables.add(this.cancelButtonView);
  }
  _createActionBarView({saveButtonView, cancelButtonView}) {
    const actionBarRow = new view_default();
    const children = this.createCollection();
    children.add(saveButtonView);
    children.add(cancelButtonView);
    actionBarRow.setTemplate({
      tag: "div",
      attributes: {
        class: [
          "ck",
          "ck-color-selector_action-bar"
        ]
      },
      children
    });
    return actionBarRow;
  }
  _createActionButtons() {
    const locale = this.locale;
    const t = locale.t;
    const saveButtonView = new buttonview_default(locale);
    const cancelButtonView = new buttonview_default(locale);
    saveButtonView.set({
      icon: check_default,
      class: "ck-button-save",
      type: "button",
      withText: false,
      label: t("Accept")
    });
    cancelButtonView.set({
      icon: cancel_default,
      class: "ck-button-cancel",
      type: "button",
      withText: false,
      label: t("Cancel")
    });
    saveButtonView.on("execute", () => {
      this.fire("execute", {
        source: "colorPickerSaveButton",
        value: this.selectedColor
      });
    });
    cancelButtonView.on("execute", () => {
      this.fire("colorPicker:cancel");
    });
    return {
      saveButtonView,
      cancelButtonView
    };
  }
  _executeUponColorChange() {
    this.colorPickerView.on("colorSelected", (evt, data) => {
      this.fire("execute", {
        value: data.color,
        source: "colorPicker"
      });
      this.set("selectedColor", data.color);
    });
  }
};
var colorpickerfragmentview_default = ColorPickerFragmentView;

// node_modules/@ckeditor/ckeditor5-ui/src/colorselector/colorselectorview.js
import "@ckeditor/ckeditor5-ui/theme/components/colorselector/colorselector.css";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var ColorSelectorView = class extends view_default {
  constructor(locale, {colors, columns, removeButtonLabel, documentColorsLabel, documentColorsCount, colorPickerLabel, colorPickerViewConfig}) {
    super(locale);
    this.items = this.createCollection();
    this.focusTracker = new FocusTracker7();
    this.keystrokes = new KeystrokeHandler6();
    this._focusables = new viewcollection_default();
    this._colorPickerViewConfig = colorPickerViewConfig;
    this._focusCycler = new focuscycler_default({
      focusables: this._focusables,
      focusTracker: this.focusTracker,
      keystrokeHandler: this.keystrokes,
      actions: {
        focusPrevious: "shift + tab",
        focusNext: "tab"
      }
    });
    this.colorGridsFragmentView = new colorgridsfragmentview_default(locale, {
      colors,
      columns,
      removeButtonLabel,
      documentColorsLabel,
      documentColorsCount,
      colorPickerLabel,
      focusTracker: this.focusTracker,
      focusables: this._focusables
    });
    this.colorPickerFragmentView = new colorpickerfragmentview_default(locale, {
      focusables: this._focusables,
      focusTracker: this.focusTracker,
      keystrokes: this.keystrokes,
      colorPickerViewConfig
    });
    this.set("_isColorGridsFragmentVisible", true);
    this.set("_isColorPickerFragmentVisible", false);
    this.set("selectedColor", void 0);
    this.colorGridsFragmentView.bind("isVisible").to(this, "_isColorGridsFragmentVisible");
    this.colorPickerFragmentView.bind("isVisible").to(this, "_isColorPickerFragmentVisible");
    this.on("change:selectedColor", (evt, evtName, data) => {
      this.colorGridsFragmentView.set("selectedColor", data);
      this.colorPickerFragmentView.set("selectedColor", data);
    });
    this.colorGridsFragmentView.on("change:selectedColor", (evt, evtName, data) => {
      this.set("selectedColor", data);
    });
    this.colorPickerFragmentView.on("change:selectedColor", (evt, evtName, data) => {
      this.set("selectedColor", data);
    });
    this.setTemplate({
      tag: "div",
      attributes: {
        class: [
          "ck",
          "ck-color-selector"
        ]
      },
      children: this.items
    });
  }
  render() {
    super.render();
    this.keystrokes.listenTo(this.element);
  }
  destroy() {
    super.destroy();
    this.focusTracker.destroy();
    this.keystrokes.destroy();
  }
  appendUI() {
    this._appendColorGridsFragment();
    if (this._colorPickerViewConfig) {
      this._appendColorPickerFragment();
    }
  }
  showColorPickerFragment() {
    if (!this.colorPickerFragmentView.colorPickerView || this._isColorPickerFragmentVisible) {
      return;
    }
    this._isColorPickerFragmentVisible = true;
    this.colorPickerFragmentView.focus();
    this._isColorGridsFragmentVisible = false;
  }
  showColorGridsFragment() {
    if (this._isColorGridsFragmentVisible) {
      return;
    }
    this._isColorGridsFragmentVisible = true;
    this.colorGridsFragmentView.focus();
    this._isColorPickerFragmentVisible = false;
  }
  focus() {
    this._focusCycler.focusFirst();
  }
  focusLast() {
    this._focusCycler.focusLast();
  }
  updateDocumentColors(model, attributeName) {
    this.colorGridsFragmentView.updateDocumentColors(model, attributeName);
  }
  updateSelectedColors() {
    this.colorGridsFragmentView.updateSelectedColors();
  }
  _appendColorGridsFragment() {
    if (this.items.length) {
      return;
    }
    this.items.add(this.colorGridsFragmentView);
    this.colorGridsFragmentView.delegate("execute").to(this);
    this.colorGridsFragmentView.delegate("colorPicker:show").to(this);
  }
  _appendColorPickerFragment() {
    if (this.items.length === 2) {
      return;
    }
    this.items.add(this.colorPickerFragmentView);
    if (this.colorGridsFragmentView.colorPickerButtonView) {
      this.colorGridsFragmentView.colorPickerButtonView.on("execute", () => {
        this.showColorPickerFragment();
      });
    }
    this.colorGridsFragmentView.addColorPickerButton();
    this.colorPickerFragmentView.delegate("execute").to(this);
    this.colorPickerFragmentView.delegate("colorPicker:cancel").to(this);
  }
};
var colorselectorview_default = ColorSelectorView;

// node_modules/@ckeditor/ckeditor5-ui/src/componentfactory.js
import {CKEditorError as CKEditorError5} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var ComponentFactory = class {
  constructor(editor) {
    this._components = new Map();
    this.editor = editor;
  }
  *names() {
    for (const value of this._components.values()) {
      yield value.originalName;
    }
  }
  add(name, callback) {
    this._components.set(getNormalized(name), {callback, originalName: name});
  }
  create(name) {
    if (!this.has(name)) {
      throw new CKEditorError5("componentfactory-item-missing", this, {name});
    }
    return this._components.get(getNormalized(name)).callback(this.editor.locale);
  }
  has(name) {
    return this._components.has(getNormalized(name));
  }
};
var componentfactory_default = ComponentFactory;
function getNormalized(name) {
  return String(name).toLowerCase();
}

// node_modules/@ckeditor/ckeditor5-ui/src/panel/balloon/balloonpanelview.js
import {getOptimalPosition as getOptimalPosition2, global as global5, isRange, toUnit as toUnit2} from "es-ckeditor-lib/lib/utils";
import {isElement} from "lodash-es";
import "@ckeditor/ckeditor5-ui/theme/components/panel/balloonpanel.css";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var toPx = toUnit2("px");
var defaultLimiterElement = global5.document.body;
var POSITION_OFF_SCREEN = {
  top: -99999,
  left: -99999,
  name: "arrowless",
  config: {
    withArrow: false
  }
};
var BalloonPanelView = class extends view_default {
  constructor(locale) {
    super(locale);
    const bind = this.bindTemplate;
    this.set("top", 0);
    this.set("left", 0);
    this.set("position", "arrow_nw");
    this.set("isVisible", false);
    this.set("withArrow", true);
    this.set("class", void 0);
    this._pinWhenIsVisibleCallback = null;
    this.content = this.createCollection();
    this.setTemplate({
      tag: "div",
      attributes: {
        class: [
          "ck",
          "ck-balloon-panel",
          bind.to("position", (value) => `ck-balloon-panel_${value}`),
          bind.if("isVisible", "ck-balloon-panel_visible"),
          bind.if("withArrow", "ck-balloon-panel_with-arrow"),
          bind.to("class")
        ],
        style: {
          top: bind.to("top", toPx),
          left: bind.to("left", toPx)
        }
      },
      children: this.content
    });
  }
  show() {
    this.isVisible = true;
  }
  hide() {
    this.isVisible = false;
  }
  attachTo(options) {
    this.show();
    const defaultPositions = BalloonPanelView.defaultPositions;
    const positionOptions = Object.assign({}, {
      element: this.element,
      positions: [
        defaultPositions.southArrowNorth,
        defaultPositions.southArrowNorthMiddleWest,
        defaultPositions.southArrowNorthMiddleEast,
        defaultPositions.southArrowNorthWest,
        defaultPositions.southArrowNorthEast,
        defaultPositions.northArrowSouth,
        defaultPositions.northArrowSouthMiddleWest,
        defaultPositions.northArrowSouthMiddleEast,
        defaultPositions.northArrowSouthWest,
        defaultPositions.northArrowSouthEast,
        defaultPositions.viewportStickyNorth
      ],
      limiter: defaultLimiterElement,
      fitInViewport: true
    }, options);
    const optimalPosition = BalloonPanelView._getOptimalPosition(positionOptions) || POSITION_OFF_SCREEN;
    const left = parseInt(optimalPosition.left);
    const top = parseInt(optimalPosition.top);
    const position = optimalPosition.name;
    const config = optimalPosition.config || {};
    const {withArrow = true} = config;
    this.top = top;
    this.left = left;
    this.position = position;
    this.withArrow = withArrow;
  }
  pin(options) {
    this.unpin();
    this._pinWhenIsVisibleCallback = () => {
      if (this.isVisible) {
        this._startPinning(options);
      } else {
        this._stopPinning();
      }
    };
    this._startPinning(options);
    this.listenTo(this, "change:isVisible", this._pinWhenIsVisibleCallback);
  }
  unpin() {
    if (this._pinWhenIsVisibleCallback) {
      this._stopPinning();
      this.stopListening(this, "change:isVisible", this._pinWhenIsVisibleCallback);
      this._pinWhenIsVisibleCallback = null;
      this.hide();
    }
  }
  _startPinning(options) {
    this.attachTo(options);
    const targetElement = getDomElement(options.target);
    const limiterElement = options.limiter ? getDomElement(options.limiter) : defaultLimiterElement;
    this.listenTo(global5.document, "scroll", (evt, domEvt) => {
      const scrollTarget = domEvt.target;
      const isWithinScrollTarget = targetElement && scrollTarget.contains(targetElement);
      const isLimiterWithinScrollTarget = limiterElement && scrollTarget.contains(limiterElement);
      if (isWithinScrollTarget || isLimiterWithinScrollTarget || !targetElement || !limiterElement) {
        this.attachTo(options);
      }
    }, {useCapture: true});
    this.listenTo(global5.window, "resize", () => {
      this.attachTo(options);
    });
  }
  _stopPinning() {
    this.stopListening(global5.document, "scroll");
    this.stopListening(global5.window, "resize");
  }
};
var balloonpanelview_default = BalloonPanelView;
BalloonPanelView.arrowSideOffset = 25;
BalloonPanelView.arrowHeightOffset = 10;
BalloonPanelView.stickyVerticalOffset = 20;
BalloonPanelView._getOptimalPosition = getOptimalPosition2;
BalloonPanelView.defaultPositions = generatePositions();
function getDomElement(object) {
  if (isElement(object)) {
    return object;
  }
  if (isRange(object)) {
    return object.commonAncestorContainer;
  }
  if (typeof object == "function") {
    return getDomElement(object());
  }
  return null;
}
function generatePositions(options = {}) {
  const {sideOffset = BalloonPanelView.arrowSideOffset, heightOffset = BalloonPanelView.arrowHeightOffset, stickyVerticalOffset = BalloonPanelView.stickyVerticalOffset, config} = options;
  return {
    northWestArrowSouthWest: (targetRect, balloonRect) => ({
      top: getNorthTop(targetRect, balloonRect),
      left: targetRect.left - sideOffset,
      name: "arrow_sw",
      ...config && {config}
    }),
    northWestArrowSouthMiddleWest: (targetRect, balloonRect) => ({
      top: getNorthTop(targetRect, balloonRect),
      left: targetRect.left - balloonRect.width * 0.25 - sideOffset,
      name: "arrow_smw",
      ...config && {config}
    }),
    northWestArrowSouth: (targetRect, balloonRect) => ({
      top: getNorthTop(targetRect, balloonRect),
      left: targetRect.left - balloonRect.width / 2,
      name: "arrow_s",
      ...config && {config}
    }),
    northWestArrowSouthMiddleEast: (targetRect, balloonRect) => ({
      top: getNorthTop(targetRect, balloonRect),
      left: targetRect.left - balloonRect.width * 0.75 + sideOffset,
      name: "arrow_sme",
      ...config && {config}
    }),
    northWestArrowSouthEast: (targetRect, balloonRect) => ({
      top: getNorthTop(targetRect, balloonRect),
      left: targetRect.left - balloonRect.width + sideOffset,
      name: "arrow_se",
      ...config && {config}
    }),
    northArrowSouthWest: (targetRect, balloonRect) => ({
      top: getNorthTop(targetRect, balloonRect),
      left: targetRect.left + targetRect.width / 2 - sideOffset,
      name: "arrow_sw",
      ...config && {config}
    }),
    northArrowSouthMiddleWest: (targetRect, balloonRect) => ({
      top: getNorthTop(targetRect, balloonRect),
      left: targetRect.left + targetRect.width / 2 - balloonRect.width * 0.25 - sideOffset,
      name: "arrow_smw",
      ...config && {config}
    }),
    northArrowSouth: (targetRect, balloonRect) => ({
      top: getNorthTop(targetRect, balloonRect),
      left: targetRect.left + targetRect.width / 2 - balloonRect.width / 2,
      name: "arrow_s",
      ...config && {config}
    }),
    northArrowSouthMiddleEast: (targetRect, balloonRect) => ({
      top: getNorthTop(targetRect, balloonRect),
      left: targetRect.left + targetRect.width / 2 - balloonRect.width * 0.75 + sideOffset,
      name: "arrow_sme",
      ...config && {config}
    }),
    northArrowSouthEast: (targetRect, balloonRect) => ({
      top: getNorthTop(targetRect, balloonRect),
      left: targetRect.left + targetRect.width / 2 - balloonRect.width + sideOffset,
      name: "arrow_se",
      ...config && {config}
    }),
    northEastArrowSouthWest: (targetRect, balloonRect) => ({
      top: getNorthTop(targetRect, balloonRect),
      left: targetRect.right - sideOffset,
      name: "arrow_sw",
      ...config && {config}
    }),
    northEastArrowSouthMiddleWest: (targetRect, balloonRect) => ({
      top: getNorthTop(targetRect, balloonRect),
      left: targetRect.right - balloonRect.width * 0.25 - sideOffset,
      name: "arrow_smw",
      ...config && {config}
    }),
    northEastArrowSouth: (targetRect, balloonRect) => ({
      top: getNorthTop(targetRect, balloonRect),
      left: targetRect.right - balloonRect.width / 2,
      name: "arrow_s",
      ...config && {config}
    }),
    northEastArrowSouthMiddleEast: (targetRect, balloonRect) => ({
      top: getNorthTop(targetRect, balloonRect),
      left: targetRect.right - balloonRect.width * 0.75 + sideOffset,
      name: "arrow_sme",
      ...config && {config}
    }),
    northEastArrowSouthEast: (targetRect, balloonRect) => ({
      top: getNorthTop(targetRect, balloonRect),
      left: targetRect.right - balloonRect.width + sideOffset,
      name: "arrow_se",
      ...config && {config}
    }),
    southWestArrowNorthWest: (targetRect) => ({
      top: getSouthTop(targetRect),
      left: targetRect.left - sideOffset,
      name: "arrow_nw",
      ...config && {config}
    }),
    southWestArrowNorthMiddleWest: (targetRect, balloonRect) => ({
      top: getSouthTop(targetRect),
      left: targetRect.left - balloonRect.width * 0.25 - sideOffset,
      name: "arrow_nmw",
      ...config && {config}
    }),
    southWestArrowNorth: (targetRect, balloonRect) => ({
      top: getSouthTop(targetRect),
      left: targetRect.left - balloonRect.width / 2,
      name: "arrow_n",
      ...config && {config}
    }),
    southWestArrowNorthMiddleEast: (targetRect, balloonRect) => ({
      top: getSouthTop(targetRect),
      left: targetRect.left - balloonRect.width * 0.75 + sideOffset,
      name: "arrow_nme",
      ...config && {config}
    }),
    southWestArrowNorthEast: (targetRect, balloonRect) => ({
      top: getSouthTop(targetRect),
      left: targetRect.left - balloonRect.width + sideOffset,
      name: "arrow_ne",
      ...config && {config}
    }),
    southArrowNorthWest: (targetRect) => ({
      top: getSouthTop(targetRect),
      left: targetRect.left + targetRect.width / 2 - sideOffset,
      name: "arrow_nw",
      ...config && {config}
    }),
    southArrowNorthMiddleWest: (targetRect, balloonRect) => ({
      top: getSouthTop(targetRect),
      left: targetRect.left + targetRect.width / 2 - balloonRect.width * 0.25 - sideOffset,
      name: "arrow_nmw",
      ...config && {config}
    }),
    southArrowNorth: (targetRect, balloonRect) => ({
      top: getSouthTop(targetRect),
      left: targetRect.left + targetRect.width / 2 - balloonRect.width / 2,
      name: "arrow_n",
      ...config && {config}
    }),
    southArrowNorthMiddleEast: (targetRect, balloonRect) => ({
      top: getSouthTop(targetRect),
      left: targetRect.left + targetRect.width / 2 - balloonRect.width * 0.75 + sideOffset,
      name: "arrow_nme",
      ...config && {config}
    }),
    southArrowNorthEast: (targetRect, balloonRect) => ({
      top: getSouthTop(targetRect),
      left: targetRect.left + targetRect.width / 2 - balloonRect.width + sideOffset,
      name: "arrow_ne",
      ...config && {config}
    }),
    southEastArrowNorthWest: (targetRect) => ({
      top: getSouthTop(targetRect),
      left: targetRect.right - sideOffset,
      name: "arrow_nw",
      ...config && {config}
    }),
    southEastArrowNorthMiddleWest: (targetRect, balloonRect) => ({
      top: getSouthTop(targetRect),
      left: targetRect.right - balloonRect.width * 0.25 - sideOffset,
      name: "arrow_nmw",
      ...config && {config}
    }),
    southEastArrowNorth: (targetRect, balloonRect) => ({
      top: getSouthTop(targetRect),
      left: targetRect.right - balloonRect.width / 2,
      name: "arrow_n",
      ...config && {config}
    }),
    southEastArrowNorthMiddleEast: (targetRect, balloonRect) => ({
      top: getSouthTop(targetRect),
      left: targetRect.right - balloonRect.width * 0.75 + sideOffset,
      name: "arrow_nme",
      ...config && {config}
    }),
    southEastArrowNorthEast: (targetRect, balloonRect) => ({
      top: getSouthTop(targetRect),
      left: targetRect.right - balloonRect.width + sideOffset,
      name: "arrow_ne",
      ...config && {config}
    }),
    westArrowEast: (targetRect, balloonRect) => ({
      top: targetRect.top + targetRect.height / 2 - balloonRect.height / 2,
      left: targetRect.left - balloonRect.width - heightOffset,
      name: "arrow_e",
      ...config && {config}
    }),
    eastArrowWest: (targetRect, balloonRect) => ({
      top: targetRect.top + targetRect.height / 2 - balloonRect.height / 2,
      left: targetRect.right + heightOffset,
      name: "arrow_w",
      ...config && {config}
    }),
    viewportStickyNorth: (targetRect, balloonRect, viewportRect, limiterRect) => {
      const boundaryRect = limiterRect || viewportRect;
      if (!targetRect.getIntersection(boundaryRect)) {
        return null;
      }
      if (boundaryRect.height - targetRect.height > stickyVerticalOffset) {
        return null;
      }
      return {
        top: boundaryRect.top + stickyVerticalOffset,
        left: targetRect.left + targetRect.width / 2 - balloonRect.width / 2,
        name: "arrowless",
        config: {
          withArrow: false,
          ...config
        }
      };
    }
  };
  function getNorthTop(targetRect, balloonRect) {
    return targetRect.top - balloonRect.height - heightOffset;
  }
  function getSouthTop(targetRect) {
    return targetRect.bottom + heightOffset;
  }
}

// node_modules/@ckeditor/ckeditor5-ui/src/tooltipmanager.js
import {DomEmitterMixin as DomEmitterMixin2, ResizeObserver as ResizeObserver2, first, global as global6, isVisible as isVisible3} from "es-ckeditor-lib/lib/utils";
import {isElement as isElement2, debounce as debounce2} from "lodash-es";
import "@ckeditor/ckeditor5-ui/theme/components/tooltip/tooltip.css";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var BALLOON_CLASS = "ck-tooltip";
var TooltipManager = class extends DomEmitterMixin2() {
  constructor(editor) {
    super();
    this._currentElementWithTooltip = null;
    this._currentTooltipPosition = null;
    this._resizeObserver = null;
    TooltipManager._editors.add(editor);
    if (TooltipManager._instance) {
      return TooltipManager._instance;
    }
    TooltipManager._instance = this;
    this.tooltipTextView = new view_default(editor.locale);
    this.tooltipTextView.set("text", "");
    this.tooltipTextView.setTemplate({
      tag: "span",
      attributes: {
        class: [
          "ck",
          "ck-tooltip__text"
        ]
      },
      children: [
        {
          text: this.tooltipTextView.bindTemplate.to("text")
        }
      ]
    });
    this.balloonPanelView = new balloonpanelview_default(editor.locale);
    this.balloonPanelView.class = BALLOON_CLASS;
    this.balloonPanelView.content.add(this.tooltipTextView);
    this._pinTooltipDebounced = debounce2(this._pinTooltip, 600);
    this.listenTo(global6.document, "mouseenter", this._onEnterOrFocus.bind(this), {useCapture: true});
    this.listenTo(global6.document, "mouseleave", this._onLeaveOrBlur.bind(this), {useCapture: true});
    this.listenTo(global6.document, "focus", this._onEnterOrFocus.bind(this), {useCapture: true});
    this.listenTo(global6.document, "blur", this._onLeaveOrBlur.bind(this), {useCapture: true});
    this.listenTo(global6.document, "scroll", this._onScroll.bind(this), {useCapture: true});
    this._watchdogExcluded = true;
  }
  destroy(editor) {
    const editorBodyViewCollection = editor.ui.view && editor.ui.view.body;
    TooltipManager._editors.delete(editor);
    this.stopListening(editor.ui);
    if (editorBodyViewCollection && editorBodyViewCollection.has(this.balloonPanelView)) {
      editorBodyViewCollection.remove(this.balloonPanelView);
    }
    if (!TooltipManager._editors.size) {
      this._unpinTooltip();
      this.balloonPanelView.destroy();
      this.stopListening();
      TooltipManager._instance = null;
    }
  }
  static getPositioningFunctions(position) {
    const defaultPositions = TooltipManager.defaultBalloonPositions;
    return {
      s: [
        defaultPositions.southArrowNorth,
        defaultPositions.southArrowNorthEast,
        defaultPositions.southArrowNorthWest
      ],
      n: [defaultPositions.northArrowSouth],
      e: [defaultPositions.eastArrowWest],
      w: [defaultPositions.westArrowEast],
      sw: [defaultPositions.southArrowNorthEast],
      se: [defaultPositions.southArrowNorthWest]
    }[position];
  }
  _onEnterOrFocus(evt, {target}) {
    const elementWithTooltipAttribute = getDescendantWithTooltip(target);
    if (!elementWithTooltipAttribute) {
      return;
    }
    if (elementWithTooltipAttribute === this._currentElementWithTooltip) {
      return;
    }
    this._unpinTooltip();
    this._pinTooltipDebounced(elementWithTooltipAttribute, getTooltipData(elementWithTooltipAttribute));
  }
  _onLeaveOrBlur(evt, {target, relatedTarget}) {
    if (evt.name === "mouseleave") {
      if (!isElement2(target)) {
        return;
      }
      if (this._currentElementWithTooltip && target !== this._currentElementWithTooltip) {
        return;
      }
      const descendantWithTooltip = getDescendantWithTooltip(target);
      const relatedDescendantWithTooltip = getDescendantWithTooltip(relatedTarget);
      if (descendantWithTooltip && descendantWithTooltip !== relatedDescendantWithTooltip) {
        this._unpinTooltip();
      }
    } else {
      if (this._currentElementWithTooltip && target !== this._currentElementWithTooltip) {
        return;
      }
      this._unpinTooltip();
    }
  }
  _onScroll(evt, {target}) {
    if (!this._currentElementWithTooltip) {
      return;
    }
    if (target.contains(this.balloonPanelView.element) && target.contains(this._currentElementWithTooltip)) {
      return;
    }
    this._unpinTooltip();
  }
  _pinTooltip(targetDomElement, {text, position, cssClass}) {
    const bodyViewCollection = first(TooltipManager._editors.values()).ui.view.body;
    if (!bodyViewCollection.has(this.balloonPanelView)) {
      bodyViewCollection.add(this.balloonPanelView);
    }
    this.tooltipTextView.text = text;
    this.balloonPanelView.pin({
      target: targetDomElement,
      positions: TooltipManager.getPositioningFunctions(position)
    });
    this._resizeObserver = new ResizeObserver2(targetDomElement, () => {
      if (!isVisible3(targetDomElement)) {
        this._unpinTooltip();
      }
    });
    this.balloonPanelView.class = [BALLOON_CLASS, cssClass].filter((className) => className).join(" ");
    for (const editor of TooltipManager._editors) {
      this.listenTo(editor.ui, "update", this._updateTooltipPosition.bind(this), {priority: "low"});
    }
    this._currentElementWithTooltip = targetDomElement;
    this._currentTooltipPosition = position;
  }
  _unpinTooltip() {
    this._pinTooltipDebounced.cancel();
    this.balloonPanelView.unpin();
    for (const editor of TooltipManager._editors) {
      this.stopListening(editor.ui, "update");
    }
    this._currentElementWithTooltip = null;
    this._currentTooltipPosition = null;
    if (this._resizeObserver) {
      this._resizeObserver.destroy();
    }
  }
  _updateTooltipPosition() {
    if (!isVisible3(this._currentElementWithTooltip)) {
      this._unpinTooltip();
      return;
    }
    this.balloonPanelView.pin({
      target: this._currentElementWithTooltip,
      positions: TooltipManager.getPositioningFunctions(this._currentTooltipPosition)
    });
  }
};
var tooltipmanager_default = TooltipManager;
TooltipManager.defaultBalloonPositions = generatePositions({
  heightOffset: 5,
  sideOffset: 13
});
TooltipManager._editors = new Set();
TooltipManager._instance = null;
function getDescendantWithTooltip(element) {
  if (!isElement2(element)) {
    return null;
  }
  return element.closest("[data-cke-tooltip-text]:not([data-cke-tooltip-disabled])");
}
function getTooltipData(element) {
  return {
    text: element.dataset.ckeTooltipText,
    position: element.dataset.ckeTooltipPosition || "s",
    cssClass: element.dataset.ckeTooltipClass || ""
  };
}

// node_modules/@ckeditor/ckeditor5-ui/src/editorui/poweredby.js
import {DomEmitterMixin as DomEmitterMixin3, Rect as Rect3, verifyLicense} from "es-ckeditor-lib/lib/utils";
import {throttle} from "lodash-es";

// node_modules/@ckeditor/ckeditor5-ui/theme/icons/project-logo.svg
var project_logo_default = '<svg xmlns="http://www.w3.org/2000/svg" width="53" height="10" viewBox="0 0 53 10"><path fill="#1C2331" d="M31.724 1.492a15.139 15.139 0 0 0 .045 1.16 2.434 2.434 0 0 0-.687-.34 3.68 3.68 0 0 0-1.103-.166 2.332 2.332 0 0 0-1.14.255 1.549 1.549 0 0 0-.686.87c-.15.41-.225.98-.225 1.712 0 .939.148 1.659.444 2.161.297.503.792.754 1.487.754.452.015.9-.094 1.294-.316.296-.174.557-.4.771-.669l.14.852h1.282V.007h-1.623v1.485ZM31 6.496a1.77 1.77 0 0 1-.494.061.964.964 0 0 1-.521-.127.758.758 0 0 1-.296-.466 3.984 3.984 0 0 1-.093-.992 4.208 4.208 0 0 1 .098-1.052.753.753 0 0 1 .307-.477 1.08 1.08 0 0 1 .55-.122c.233-.004.466.026.69.089l.483.144v2.553c-.11.076-.213.143-.307.2a1.73 1.73 0 0 1-.417.189ZM35.68 0l-.702.004c-.322.002-.482.168-.48.497l.004.581c.002.33.164.493.486.49l.702-.004c.322-.002.481-.167.48-.496L36.165.49c-.002-.33-.164-.493-.486-.491ZM36.145 2.313l-1.612.01.034 5.482 1.613-.01-.035-5.482ZM39.623.79 37.989.8 38 2.306l-.946.056.006 1.009.949-.006.024 2.983c.003.476.143.844.419 1.106.275.26.658.39 1.148.387.132 0 .293-.01.483-.03.19-.02.38-.046.57-.08.163-.028.324-.068.482-.119l-.183-1.095-.702.004a.664.664 0 0 1-.456-.123.553.553 0 0 1-.14-.422l-.016-2.621 1.513-.01-.006-1.064-1.514.01-.01-1.503ZM46.226 2.388c-.41-.184-.956-.274-1.636-.27-.673.004-1.215.101-1.627.29-.402.179-.72.505-.888.91-.18.419-.268.979-.264 1.68.004.688.1 1.24.285 1.655.172.404.495.724.9.894.414.18.957.268 1.63.264.68-.004 1.224-.099 1.632-.284.4-.176.714-.501.878-.905.176-.418.263-.971.258-1.658-.004-.702-.097-1.261-.28-1.677a1.696 1.696 0 0 0-.888-.9Zm-.613 3.607a.77.77 0 0 1-.337.501 1.649 1.649 0 0 1-1.317.009.776.776 0 0 1-.343-.497 4.066 4.066 0 0 1-.105-1.02 4.136 4.136 0 0 1 .092-1.03.786.786 0 0 1 .337-.507 1.59 1.59 0 0 1 1.316-.008.79.79 0 0 1 .344.502c.078.337.113.683.105 1.03.012.343-.019.685-.092 1.02ZM52.114 2.07a2.67 2.67 0 0 0-1.128.278c-.39.191-.752.437-1.072.73l-.157-.846-1.273.008.036 5.572 1.623-.01-.024-3.78c.35-.124.646-.22.887-.286.26-.075.53-.114.8-.118l.45-.003.144-1.546-.286.001ZM22.083 7.426l-1.576-2.532a2.137 2.137 0 0 0-.172-.253 1.95 1.95 0 0 0-.304-.29.138.138 0 0 1 .042-.04 1.7 1.7 0 0 0 .328-.374l1.75-2.71c.01-.015.025-.028.024-.048-.01-.01-.021-.007-.031-.007L20.49 1.17a.078.078 0 0 0-.075.045l-.868 1.384c-.23.366-.46.732-.688 1.099a.108.108 0 0 1-.112.06c-.098-.005-.196-.001-.294-.002-.018 0-.038.006-.055-.007.002-.02.002-.039.005-.058a4.6 4.6 0 0 0 .046-.701V1.203c0-.02-.009-.032-.03-.03h-.033L16.93 1.17c-.084 0-.073-.01-.073.076v6.491c-.001.018.006.028.025.027h1.494c.083 0 .072.007.072-.071v-2.19c0-.055-.003-.11-.004-.166a3.366 3.366 0 0 0-.05-.417h.06c.104 0 .209.002.313-.002a.082.082 0 0 1 .084.05c.535.913 1.07 1.824 1.607 2.736a.104.104 0 0 0 .103.062c.554-.003 1.107-.002 1.66-.002l.069-.003-.019-.032-.188-.304ZM27.112 6.555c-.005-.08-.004-.08-.082-.08h-2.414c-.053 0-.106-.003-.159-.011a.279.279 0 0 1-.246-.209.558.558 0 0 1-.022-.15c0-.382 0-.762-.002-1.143 0-.032.007-.049.042-.044h2.504c.029.003.037-.012.034-.038V3.814c0-.089.013-.078-.076-.078h-2.44c-.07 0-.062.003-.062-.06v-.837c0-.047.004-.093.013-.14a.283.283 0 0 1 .241-.246.717.717 0 0 1 .146-.011h2.484c.024.002.035-.009.036-.033l.003-.038.03-.496c.01-.183.024-.365.034-.548.005-.085.003-.087-.082-.094-.218-.018-.437-.038-.655-.05a17.845 17.845 0 0 0-.657-.026 72.994 72.994 0 0 0-1.756-.016 1.7 1.7 0 0 0-.471.064 1.286 1.286 0 0 0-.817.655c-.099.196-.149.413-.145.633v3.875c0 .072.003.144.011.216a1.27 1.27 0 0 0 .711 1.029c.228.113.48.167.734.158.757-.005 1.515.002 2.272-.042.274-.016.548-.034.82-.053.03-.002.043-.008.04-.041-.008-.104-.012-.208-.019-.312a69.964 69.964 0 0 1-.05-.768ZM16.14 7.415l-.127-1.075c-.004-.03-.014-.04-.044-.037a13.125 13.125 0 0 1-.998.073c-.336.01-.672.02-1.008.016-.116-.001-.233-.014-.347-.039a.746.746 0 0 1-.45-.262c-.075-.1-.132-.211-.167-.33a3.324 3.324 0 0 1-.126-.773 9.113 9.113 0 0 1-.015-.749c0-.285.022-.57.065-.852.023-.158.066-.312.127-.46a.728.728 0 0 1 .518-.443 1.64 1.64 0 0 1 .397-.048c.628-.001 1.255.003 1.882.05.022.001.033-.006.036-.026l.003-.031.06-.55c.019-.177.036-.355.057-.532.004-.034-.005-.046-.04-.056a5.595 5.595 0 0 0-1.213-.21 10.783 10.783 0 0 0-.708-.02c-.24-.003-.48.01-.719.041a3.477 3.477 0 0 0-.625.14 1.912 1.912 0 0 0-.807.497c-.185.2-.33.433-.424.688a4.311 4.311 0 0 0-.24 1.096c-.031.286-.045.572-.042.86-.006.43.024.86.091 1.286.04.25.104.497.193.734.098.279.26.53.473.734.214.205.473.358.756.446.344.11.702.17 1.063.177a8.505 8.505 0 0 0 1.578-.083 6.11 6.11 0 0 0 .766-.18c.03-.008.047-.023.037-.057a.157.157 0 0 1-.003-.025Z"/><path fill="#AFE229" d="M6.016 6.69a1.592 1.592 0 0 0-.614.21c-.23.132-.422.32-.56.546-.044.072-.287.539-.287.539l-.836 1.528.009.006c.038.025.08.046.123.063.127.046.26.07.395.073.505.023 1.011-.007 1.517-.003.29.009.58.002.869-.022a.886.886 0 0 0 .395-.116.962.962 0 0 0 .312-.286c.056-.083.114-.163.164-.249.24-.408.48-.816.718-1.226.075-.128.148-.257.222-.386l.112-.192a1.07 1.07 0 0 0 .153-.518l-1.304.023s-1.258-.005-1.388.01Z"/><path fill="#771BFF" d="m2.848 9.044.76-1.39.184-.352c-.124-.067-.245-.14-.367-.21-.346-.204-.706-.384-1.045-.6a.984.984 0 0 1-.244-.207c-.108-.134-.136-.294-.144-.46-.021-.409-.002-.818-.009-1.227-.003-.195 0-.39.003-.585.004-.322.153-.553.427-.713l.833-.488c.22-.13.44-.257.662-.385.05-.029.105-.052.158-.077.272-.128.519-.047.76.085l.044.028c.123.06.242.125.358.196.318.178.635.357.952.537.095.056.187.117.275.184.194.144.254.35.266.578.016.284.007.569.006.853-.001.28.004.558 0 .838.592-.003 1.259 0 1.259 0l.723-.013c-.003-.292-.007-.584-.007-.876 0-.524.015-1.048-.016-1.571-.024-.42-.135-.8-.492-1.067a5.02 5.02 0 0 0-.506-.339A400.52 400.52 0 0 0 5.94.787C5.722.664 5.513.524 5.282.423 5.255.406 5.228.388 5.2.373 4.758.126 4.305-.026 3.807.21c-.097.046-.197.087-.29.14A699.896 699.896 0 0 0 .783 1.948c-.501.294-.773.717-.778 1.31-.004.36-.009.718-.001 1.077.016.754-.017 1.508.024 2.261.016.304.07.6.269.848.127.15.279.28.448.382.622.4 1.283.734 1.92 1.11l.183.109Z"/></svg>\n';

// node_modules/@ckeditor/ckeditor5-ui/src/editorui/poweredby.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var ICON_WIDTH = 53;
var ICON_HEIGHT = 10;
var NARROW_ROOT_HEIGHT_THRESHOLD = 50;
var NARROW_ROOT_WIDTH_THRESHOLD = 350;
var DEFAULT_LABEL = "Powered by";
var PoweredBy = class extends DomEmitterMixin3() {
  constructor(editor) {
    super();
    this.editor = editor;
    this._balloonView = null;
    this._lastFocusedEditableElement = null;
    this._showBalloonThrottled = throttle(this._showBalloon.bind(this), 50, {leading: true});
    editor.on("ready", this._handleEditorReady.bind(this));
  }
  destroy() {
    const balloon = this._balloonView;
    if (balloon) {
      balloon.unpin();
      this._balloonView = null;
    }
    this._showBalloonThrottled.cancel();
    this.stopListening();
  }
  _handleEditorReady() {
    const editor = this.editor;
    const forceVisible = !!editor.config.get("ui.poweredBy.forceVisible");
    /* istanbul ignore next -- @preserve */
    if (!forceVisible && verifyLicense(editor.config.get("licenseKey")) === "VALID") {
      return;
    }
    if (!editor.ui.view) {
      return;
    }
    editor.ui.focusTracker.on("change:isFocused", (evt, data, isFocused) => {
      this._updateLastFocusedEditableElement();
      if (isFocused) {
        this._showBalloon();
      } else {
        this._hideBalloon();
      }
    });
    editor.ui.focusTracker.on("change:focusedElement", (evt, data, focusedElement) => {
      this._updateLastFocusedEditableElement();
      if (focusedElement) {
        this._showBalloon();
      }
    });
    editor.ui.on("update", () => {
      this._showBalloonThrottled();
    });
  }
  _createBalloonView() {
    const editor = this.editor;
    const balloon = this._balloonView = new balloonpanelview_default();
    const poweredByConfig = getNormalizedConfig(editor);
    const view = new PoweredByView(editor.locale, poweredByConfig.label);
    balloon.content.add(view);
    balloon.set({
      class: "ck-powered-by-balloon"
    });
    editor.ui.view.body.add(balloon);
    editor.ui.focusTracker.add(balloon.element);
    this._balloonView = balloon;
  }
  _showBalloon() {
    if (!this._lastFocusedEditableElement) {
      return;
    }
    const attachOptions = getBalloonAttachOptions(this.editor, this._lastFocusedEditableElement);
    if (attachOptions) {
      if (!this._balloonView) {
        this._createBalloonView();
      }
      this._balloonView.pin(attachOptions);
    }
  }
  _hideBalloon() {
    if (this._balloonView) {
      this._balloonView.unpin();
    }
  }
  _updateLastFocusedEditableElement() {
    const editor = this.editor;
    const isFocused = editor.ui.focusTracker.isFocused;
    const focusedElement = editor.ui.focusTracker.focusedElement;
    if (!isFocused || !focusedElement) {
      this._lastFocusedEditableElement = null;
      return;
    }
    const editableEditorElements = Array.from(editor.ui.getEditableElementsNames()).map((name) => {
      return editor.ui.getEditableElement(name);
    });
    if (editableEditorElements.includes(focusedElement)) {
      this._lastFocusedEditableElement = focusedElement;
    } else {
      this._lastFocusedEditableElement = editableEditorElements[0];
    }
  }
};
var poweredby_default = PoweredBy;
var PoweredByView = class extends view_default {
  constructor(locale, label) {
    super(locale);
    const iconView = new iconview_default();
    const bind = this.bindTemplate;
    iconView.set({
      content: project_logo_default,
      isColorInherited: false
    });
    iconView.extendTemplate({
      attributes: {
        style: {
          width: ICON_WIDTH + "px",
          height: ICON_HEIGHT + "px"
        }
      }
    });
    this.setTemplate({
      tag: "div",
      attributes: {
        class: ["ck", "ck-powered-by"],
        "aria-hidden": true
      },
      children: [
        {
          tag: "a",
          attributes: {
            href: "https://ckeditor.com/?utm_source=ckeditor&utm_medium=referral&utm_campaign=701Dn000000hVgmIAE_powered_by_ckeditor_logo",
            target: "_blank",
            tabindex: "-1"
          },
          children: [
            ...label ? [
              {
                tag: "span",
                attributes: {
                  class: ["ck", "ck-powered-by__label"]
                },
                children: [label]
              }
            ] : [],
            iconView
          ],
          on: {
            dragstart: bind.to((evt) => evt.preventDefault())
          }
        }
      ]
    });
  }
};
function getBalloonAttachOptions(editor, focusedEditableElement) {
  const poweredByConfig = getNormalizedConfig(editor);
  const positioningFunction = poweredByConfig.side === "right" ? getLowerRightCornerPosition(focusedEditableElement, poweredByConfig) : getLowerLeftCornerPosition(focusedEditableElement, poweredByConfig);
  return {
    target: focusedEditableElement,
    positions: [positioningFunction]
  };
}
function getLowerRightCornerPosition(focusedEditableElement, config) {
  return getLowerCornerPosition(focusedEditableElement, config, (rootRect, balloonRect) => {
    return rootRect.left + rootRect.width - balloonRect.width - config.horizontalOffset;
  });
}
function getLowerLeftCornerPosition(focusedEditableElement, config) {
  return getLowerCornerPosition(focusedEditableElement, config, (rootRect) => rootRect.left + config.horizontalOffset);
}
function getLowerCornerPosition(focusedEditableElement, config, getBalloonLeft) {
  return (visibleEditableElementRect, balloonRect) => {
    const editableElementRect = new Rect3(focusedEditableElement);
    if (editableElementRect.width < NARROW_ROOT_WIDTH_THRESHOLD || editableElementRect.height < NARROW_ROOT_HEIGHT_THRESHOLD) {
      return null;
    }
    let balloonTop;
    if (config.position === "inside") {
      balloonTop = editableElementRect.bottom - balloonRect.height;
    } else {
      balloonTop = editableElementRect.bottom - balloonRect.height / 2;
    }
    balloonTop -= config.verticalOffset;
    const balloonLeft = getBalloonLeft(editableElementRect, balloonRect);
    const newBalloonPositionRect = visibleEditableElementRect.clone().moveTo(balloonLeft, balloonTop).getIntersection(balloonRect.clone().moveTo(balloonLeft, balloonTop));
    const newBalloonPositionVisibleRect = newBalloonPositionRect.getVisible();
    if (!newBalloonPositionVisibleRect || newBalloonPositionVisibleRect.getArea() < balloonRect.getArea()) {
      return null;
    }
    return {
      top: balloonTop,
      left: balloonLeft,
      name: `position_${config.position}-side_${config.side}`,
      config: {
        withArrow: false
      }
    };
  };
}
function getNormalizedConfig(editor) {
  const userConfig = editor.config.get("ui.poweredBy");
  const position = userConfig && userConfig.position || "border";
  return {
    position,
    label: DEFAULT_LABEL,
    verticalOffset: position === "inside" ? 5 : 0,
    horizontalOffset: 5,
    side: editor.locale.contentLanguageDirection === "ltr" ? "right" : "left",
    ...userConfig
  };
}

// node_modules/@ckeditor/ckeditor5-ui/src/editorui/editorui.js
import {ObservableMixin as ObservableMixin3, isVisible as isVisible4, FocusTracker as FocusTracker8} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var EditorUI = class extends ObservableMixin3() {
  constructor(editor) {
    super();
    this.isReady = false;
    this._editableElementsMap = new Map();
    this._focusableToolbarDefinitions = [];
    const editingView = editor.editing.view;
    this.editor = editor;
    this.componentFactory = new componentfactory_default(editor);
    this.focusTracker = new FocusTracker8();
    this.tooltipManager = new tooltipmanager_default(editor);
    this.poweredBy = new poweredby_default(editor);
    this.set("viewportOffset", this._readViewportOffsetFromConfig());
    this.once("ready", () => {
      this.isReady = true;
    });
    this.listenTo(editingView.document, "layoutChanged", this.update.bind(this));
    this.listenTo(editingView, "scrollToTheSelection", this._handleScrollToTheSelection.bind(this));
    this._initFocusTracking();
  }
  get element() {
    return null;
  }
  update() {
    this.fire("update");
  }
  destroy() {
    this.stopListening();
    this.focusTracker.destroy();
    this.tooltipManager.destroy(this.editor);
    this.poweredBy.destroy();
    for (const domElement of this._editableElementsMap.values()) {
      domElement.ckeditorInstance = null;
      this.editor.keystrokes.stopListening(domElement);
    }
    this._editableElementsMap = new Map();
    this._focusableToolbarDefinitions = [];
  }
  setEditableElement(rootName, domElement) {
    this._editableElementsMap.set(rootName, domElement);
    if (!domElement.ckeditorInstance) {
      domElement.ckeditorInstance = this.editor;
    }
    this.focusTracker.add(domElement);
    const setUpKeystrokeHandler = () => {
      if (this.editor.editing.view.getDomRoot(rootName)) {
        return;
      }
      this.editor.keystrokes.listenTo(domElement);
    };
    if (this.isReady) {
      setUpKeystrokeHandler();
    } else {
      this.once("ready", setUpKeystrokeHandler);
    }
  }
  removeEditableElement(rootName) {
    const domElement = this._editableElementsMap.get(rootName);
    if (!domElement) {
      return;
    }
    this._editableElementsMap.delete(rootName);
    this.editor.keystrokes.stopListening(domElement);
    this.focusTracker.remove(domElement);
    domElement.ckeditorInstance = null;
  }
  getEditableElement(rootName = "main") {
    return this._editableElementsMap.get(rootName);
  }
  getEditableElementsNames() {
    return this._editableElementsMap.keys();
  }
  addToolbar(toolbarView, options = {}) {
    if (toolbarView.isRendered) {
      this.focusTracker.add(toolbarView.element);
      this.editor.keystrokes.listenTo(toolbarView.element);
    } else {
      toolbarView.once("render", () => {
        this.focusTracker.add(toolbarView.element);
        this.editor.keystrokes.listenTo(toolbarView.element);
      });
    }
    this._focusableToolbarDefinitions.push({toolbarView, options});
  }
  get _editableElements() {
    console.warn("editor-ui-deprecated-editable-elements: The EditorUI#_editableElements property has been deprecated and will be removed in the near future.", {editorUI: this});
    return this._editableElementsMap;
  }
  _readViewportOffsetFromConfig() {
    const editor = this.editor;
    const viewportOffsetConfig = editor.config.get("ui.viewportOffset");
    if (viewportOffsetConfig) {
      return viewportOffsetConfig;
    }
    const legacyOffsetConfig = editor.config.get("toolbar.viewportTopOffset");
    if (legacyOffsetConfig) {
      console.warn("editor-ui-deprecated-viewport-offset-config: The `toolbar.vieportTopOffset` configuration option is deprecated. It will be removed from future CKEditor versions. Use `ui.viewportOffset.top` instead.");
      return {top: legacyOffsetConfig};
    }
    return {top: 0};
  }
  _initFocusTracking() {
    const editor = this.editor;
    const editingView = editor.editing.view;
    let lastFocusedForeignElement;
    let candidateDefinitions;
    editor.keystrokes.set("Alt+F10", (data, cancel) => {
      const focusedElement = this.focusTracker.focusedElement;
      if (Array.from(this._editableElementsMap.values()).includes(focusedElement) && !Array.from(editingView.domRoots.values()).includes(focusedElement)) {
        lastFocusedForeignElement = focusedElement;
      }
      const currentFocusedToolbarDefinition = this._getCurrentFocusedToolbarDefinition();
      if (!currentFocusedToolbarDefinition || !candidateDefinitions) {
        candidateDefinitions = this._getFocusableCandidateToolbarDefinitions();
      }
      for (let i = 0; i < candidateDefinitions.length; i++) {
        const candidateDefinition = candidateDefinitions.shift();
        candidateDefinitions.push(candidateDefinition);
        if (candidateDefinition !== currentFocusedToolbarDefinition && this._focusFocusableCandidateToolbar(candidateDefinition)) {
          if (currentFocusedToolbarDefinition && currentFocusedToolbarDefinition.options.afterBlur) {
            currentFocusedToolbarDefinition.options.afterBlur();
          }
          break;
        }
      }
      cancel();
    });
    editor.keystrokes.set("Esc", (data, cancel) => {
      const focusedToolbarDef = this._getCurrentFocusedToolbarDefinition();
      if (!focusedToolbarDef) {
        return;
      }
      if (lastFocusedForeignElement) {
        lastFocusedForeignElement.focus();
        lastFocusedForeignElement = null;
      } else {
        editor.editing.view.focus();
      }
      if (focusedToolbarDef.options.afterBlur) {
        focusedToolbarDef.options.afterBlur();
      }
      cancel();
    });
  }
  _getFocusableCandidateToolbarDefinitions() {
    const definitions = [];
    for (const toolbarDef of this._focusableToolbarDefinitions) {
      const {toolbarView, options} = toolbarDef;
      if (isVisible4(toolbarView.element) || options.beforeFocus) {
        definitions.push(toolbarDef);
      }
    }
    definitions.sort((defA, defB) => getToolbarDefinitionWeight(defA) - getToolbarDefinitionWeight(defB));
    return definitions;
  }
  _getCurrentFocusedToolbarDefinition() {
    for (const definition of this._focusableToolbarDefinitions) {
      if (definition.toolbarView.element && definition.toolbarView.element.contains(this.focusTracker.focusedElement)) {
        return definition;
      }
    }
    return null;
  }
  _focusFocusableCandidateToolbar(candidateToolbarDefinition) {
    const {toolbarView, options: {beforeFocus}} = candidateToolbarDefinition;
    if (beforeFocus) {
      beforeFocus();
    }
    if (!isVisible4(toolbarView.element)) {
      return false;
    }
    toolbarView.focus();
    return true;
  }
  _handleScrollToTheSelection(evt, data) {
    const configuredViewportOffset = {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      ...this.viewportOffset
    };
    data.viewportOffset.top += configuredViewportOffset.top;
    data.viewportOffset.bottom += configuredViewportOffset.bottom;
    data.viewportOffset.left += configuredViewportOffset.left;
    data.viewportOffset.right += configuredViewportOffset.right;
  }
};
var editorui_default = EditorUI;
function getToolbarDefinitionWeight(toolbarDef) {
  const {toolbarView, options} = toolbarDef;
  let weight = 10;
  if (isVisible4(toolbarView.element)) {
    weight--;
  }
  if (options.isContextual) {
    weight--;
  }
  return weight;
}

// node_modules/@ckeditor/ckeditor5-ui/src/editorui/editoruiview.js
import "@ckeditor/ckeditor5-ui/theme/components/editorui/editorui.css";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var EditorUIView = class extends view_default {
  constructor(locale) {
    super(locale);
    this.body = new bodycollection_default(locale);
  }
  render() {
    super.render();
    this.body.attachToDom();
  }
  destroy() {
    this.body.detachFromDom();
    return super.destroy();
  }
};
var editoruiview_default = EditorUIView;

// node_modules/@ckeditor/ckeditor5-ui/src/editorui/boxed/boxededitoruiview.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var BoxedEditorUIView = class extends editoruiview_default {
  constructor(locale) {
    super(locale);
    this.top = this.createCollection();
    this.main = this.createCollection();
    this._voiceLabelView = this._createVoiceLabel();
    this.setTemplate({
      tag: "div",
      attributes: {
        class: [
          "ck",
          "ck-reset",
          "ck-editor",
          "ck-rounded-corners"
        ],
        role: "application",
        dir: locale.uiLanguageDirection,
        lang: locale.uiLanguage,
        "aria-labelledby": this._voiceLabelView.id
      },
      children: [
        this._voiceLabelView,
        {
          tag: "div",
          attributes: {
            class: [
              "ck",
              "ck-editor__top",
              "ck-reset_all"
            ],
            role: "presentation"
          },
          children: this.top
        },
        {
          tag: "div",
          attributes: {
            class: [
              "ck",
              "ck-editor__main"
            ],
            role: "presentation"
          },
          children: this.main
        }
      ]
    });
  }
  _createVoiceLabel() {
    const t = this.t;
    const voiceLabel = new labelview_default();
    voiceLabel.text = t("Rich Text Editor");
    voiceLabel.extendTemplate({
      attributes: {
        class: "ck-voice-label"
      }
    });
    return voiceLabel;
  }
};
var boxededitoruiview_default = BoxedEditorUIView;

// node_modules/@ckeditor/ckeditor5-ui/src/editableui/editableuiview.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var EditableUIView = class extends view_default {
  constructor(locale, editingView, editableElement) {
    super(locale);
    this.name = null;
    this.setTemplate({
      tag: "div",
      attributes: {
        class: [
          "ck",
          "ck-content",
          "ck-editor__editable",
          "ck-rounded-corners"
        ],
        lang: locale.contentLanguage,
        dir: locale.contentLanguageDirection
      }
    });
    this.set("isFocused", false);
    this._editableElement = editableElement;
    this._hasExternalElement = !!this._editableElement;
    this._editingView = editingView;
  }
  render() {
    super.render();
    if (this._hasExternalElement) {
      this.template.apply(this.element = this._editableElement);
    } else {
      this._editableElement = this.element;
    }
    this.on("change:isFocused", () => this._updateIsFocusedClasses());
    this._updateIsFocusedClasses();
  }
  destroy() {
    if (this._hasExternalElement) {
      this.template.revert(this._editableElement);
    }
    super.destroy();
  }
  get hasExternalElement() {
    return this._hasExternalElement;
  }
  _updateIsFocusedClasses() {
    const editingView = this._editingView;
    if (editingView.isRenderingInProgress) {
      updateAfterRender(this);
    } else {
      update(this);
    }
    function update(view) {
      editingView.change((writer) => {
        const viewRoot = editingView.document.getRoot(view.name);
        writer.addClass(view.isFocused ? "ck-focused" : "ck-blurred", viewRoot);
        writer.removeClass(view.isFocused ? "ck-blurred" : "ck-focused", viewRoot);
      });
    }
    function updateAfterRender(view) {
      editingView.once("change:isRenderingInProgress", (evt, name, value) => {
        if (!value) {
          update(view);
        } else {
          updateAfterRender(view);
        }
      });
    }
  }
};
var editableuiview_default = EditableUIView;

// node_modules/@ckeditor/ckeditor5-ui/src/editableui/inline/inlineeditableuiview.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var InlineEditableUIView = class extends editableuiview_default {
  constructor(locale, editingView, editableElement, options = {}) {
    super(locale, editingView, editableElement);
    const t = locale.t;
    this.extendTemplate({
      attributes: {
        role: "textbox",
        class: "ck-editor__editable_inline"
      }
    });
    this._generateLabel = options.label || (() => t("Editor editing area: %0", this.name));
  }
  render() {
    super.render();
    const editingView = this._editingView;
    editingView.change((writer) => {
      const viewRoot = editingView.document.getRoot(this.name);
      writer.setAttribute("aria-label", this._generateLabel(this), viewRoot);
    });
  }
};
var inlineeditableuiview_default = InlineEditableUIView;

// node_modules/@ckeditor/ckeditor5-ui/src/formheader/formheaderview.js
import "@ckeditor/ckeditor5-ui/theme/components/formheader/formheader.css";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var FormHeaderView = class extends view_default {
  constructor(locale, options = {}) {
    super(locale);
    const bind = this.bindTemplate;
    this.set("label", options.label || "");
    this.set("class", options.class || null);
    this.children = this.createCollection();
    this.setTemplate({
      tag: "div",
      attributes: {
        class: [
          "ck",
          "ck-form__header",
          bind.to("class")
        ]
      },
      children: this.children
    });
    if (options.icon) {
      this.iconView = new iconview_default();
      this.iconView.content = options.icon;
      this.children.add(this.iconView);
    }
    const label = new view_default(locale);
    label.setTemplate({
      tag: "h2",
      attributes: {
        class: [
          "ck",
          "ck-form__header__label"
        ]
      },
      children: [
        {text: bind.to("label")}
      ]
    });
    this.children.add(label);
  }
};
var formheaderview_default = FormHeaderView;

// node_modules/@ckeditor/ckeditor5-ui/src/iframe/iframeview.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var IframeView = class extends view_default {
  constructor(locale) {
    super(locale);
    const bind = this.bindTemplate;
    this.setTemplate({
      tag: "iframe",
      attributes: {
        class: [
          "ck",
          "ck-reset_all"
        ],
        sandbox: "allow-same-origin allow-scripts"
      },
      on: {
        load: bind.to("loaded")
      }
    });
  }
  render() {
    return new Promise((resolve) => {
      this.on("loaded", resolve);
      return super.render();
    });
  }
};
var iframeview_default = IframeView;

// node_modules/@ckeditor/ckeditor5-ui/src/notification/notification.js
import {ContextPlugin} from "es-ckeditor-lib/lib/core";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var Notification = class extends ContextPlugin {
  static get pluginName() {
    return "Notification";
  }
  init() {
    this.on("show:warning", (evt, data) => {
      window.alert(data.message);
    }, {priority: "lowest"});
  }
  showSuccess(message, data = {}) {
    this._showNotification({
      message,
      type: "success",
      namespace: data.namespace,
      title: data.title
    });
  }
  showInfo(message, data = {}) {
    this._showNotification({
      message,
      type: "info",
      namespace: data.namespace,
      title: data.title
    });
  }
  showWarning(message, data = {}) {
    this._showNotification({
      message,
      type: "warning",
      namespace: data.namespace,
      title: data.title
    });
  }
  _showNotification(data) {
    const event = data.namespace ? `show:${data.type}:${data.namespace}` : `show:${data.type}`;
    this.fire(event, {
      message: data.message,
      type: data.type,
      title: data.title || ""
    });
  }
};
var notification_default = Notification;

// node_modules/@ckeditor/ckeditor5-ui/src/model.js
import {ObservableMixin as ObservableMixin4} from "es-ckeditor-lib/lib/utils";
import {extend} from "lodash-es";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var Model = class extends ObservableMixin4() {
  constructor(attributes, properties) {
    super();
    if (properties) {
      extend(this, properties);
    }
    if (attributes) {
      this.set(attributes);
    }
  }
};
var model_default = Model;

// node_modules/@ckeditor/ckeditor5-ui/src/panel/balloon/contextualballoon.js
import {Plugin} from "es-ckeditor-lib/lib/core";
import {CKEditorError as CKEditorError6, FocusTracker as FocusTracker9, Rect as Rect4, toUnit as toUnit3} from "es-ckeditor-lib/lib/utils";

// node_modules/@ckeditor/ckeditor5-ui/theme/icons/previous-arrow.svg
var previous_arrow_default = '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11.463 5.187a.888.888 0 1 1 1.254 1.255L9.16 10l3.557 3.557a.888.888 0 1 1-1.254 1.255L7.26 10.61a.888.888 0 0 1 .16-1.382l4.043-4.042z"/></svg>';

// node_modules/@ckeditor/ckeditor5-ui/theme/icons/next-arrow.svg
var next_arrow_default = '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.537 14.813a.888.888 0 1 1-1.254-1.255L10.84 10 7.283 6.442a.888.888 0 1 1 1.254-1.255L12.74 9.39a.888.888 0 0 1-.16 1.382l-4.043 4.042z"/></svg>';

// node_modules/@ckeditor/ckeditor5-ui/src/panel/balloon/contextualballoon.js
import "@ckeditor/ckeditor5-ui/theme/components/panel/balloonrotator.css";
import "@ckeditor/ckeditor5-ui/theme/components/panel/fakepanel.css";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var toPx2 = toUnit3("px");
var ContextualBalloon = class extends Plugin {
  static get pluginName() {
    return "ContextualBalloon";
  }
  constructor(editor) {
    super(editor);
    this._viewToStack = new Map();
    this._idToStack = new Map();
    this._view = null;
    this._rotatorView = null;
    this._fakePanelsView = null;
    this.positionLimiter = () => {
      const view = this.editor.editing.view;
      const viewDocument = view.document;
      const editableElement = viewDocument.selection.editableElement;
      if (editableElement) {
        return view.domConverter.mapViewToDom(editableElement.root);
      }
      return null;
    };
    this.set("visibleView", null);
    this.set("_numberOfStacks", 0);
    this.set("_singleViewMode", false);
  }
  destroy() {
    super.destroy();
    if (this._view) {
      this._view.destroy();
    }
    if (this._rotatorView) {
      this._rotatorView.destroy();
    }
    if (this._fakePanelsView) {
      this._fakePanelsView.destroy();
    }
  }
  get view() {
    if (!this._view) {
      this._createPanelView();
    }
    return this._view;
  }
  hasView(view) {
    return Array.from(this._viewToStack.keys()).includes(view);
  }
  add(data) {
    if (!this._view) {
      this._createPanelView();
    }
    if (this.hasView(data.view)) {
      throw new CKEditorError6("contextualballoon-add-view-exist", [this, data]);
    }
    const stackId = data.stackId || "main";
    if (!this._idToStack.has(stackId)) {
      this._idToStack.set(stackId, new Map([[data.view, data]]));
      this._viewToStack.set(data.view, this._idToStack.get(stackId));
      this._numberOfStacks = this._idToStack.size;
      if (!this._visibleStack || data.singleViewMode) {
        this.showStack(stackId);
      }
      return;
    }
    const stack = this._idToStack.get(stackId);
    if (data.singleViewMode) {
      this.showStack(stackId);
    }
    stack.set(data.view, data);
    this._viewToStack.set(data.view, stack);
    if (stack === this._visibleStack) {
      this._showView(data);
    }
  }
  remove(view) {
    if (!this.hasView(view)) {
      throw new CKEditorError6("contextualballoon-remove-view-not-exist", [this, view]);
    }
    const stack = this._viewToStack.get(view);
    if (this._singleViewMode && this.visibleView === view) {
      this._singleViewMode = false;
    }
    if (this.visibleView === view) {
      if (stack.size === 1) {
        if (this._idToStack.size > 1) {
          this._showNextStack();
        } else {
          this.view.hide();
          this.visibleView = null;
          this._rotatorView.hideView();
        }
      } else {
        this._showView(Array.from(stack.values())[stack.size - 2]);
      }
    }
    if (stack.size === 1) {
      this._idToStack.delete(this._getStackId(stack));
      this._numberOfStacks = this._idToStack.size;
    } else {
      stack.delete(view);
    }
    this._viewToStack.delete(view);
  }
  updatePosition(position) {
    if (position) {
      this._visibleStack.get(this.visibleView).position = position;
    }
    this.view.pin(this._getBalloonPosition());
    this._fakePanelsView.updatePosition();
  }
  showStack(id) {
    this.visibleStack = id;
    const stack = this._idToStack.get(id);
    if (!stack) {
      throw new CKEditorError6("contextualballoon-showstack-stack-not-exist", this);
    }
    if (this._visibleStack === stack) {
      return;
    }
    this._showView(Array.from(stack.values()).pop());
  }
  _createPanelView() {
    this._view = new balloonpanelview_default(this.editor.locale);
    this.editor.ui.view.body.add(this._view);
    this.editor.ui.focusTracker.add(this._view.element);
    this._rotatorView = this._createRotatorView();
    this._fakePanelsView = this._createFakePanelsView();
  }
  get _visibleStack() {
    return this._viewToStack.get(this.visibleView);
  }
  _getStackId(stack) {
    const entry = Array.from(this._idToStack.entries()).find((entry2) => entry2[1] === stack);
    return entry[0];
  }
  _showNextStack() {
    const stacks = Array.from(this._idToStack.values());
    let nextIndex = stacks.indexOf(this._visibleStack) + 1;
    if (!stacks[nextIndex]) {
      nextIndex = 0;
    }
    this.showStack(this._getStackId(stacks[nextIndex]));
  }
  _showPrevStack() {
    const stacks = Array.from(this._idToStack.values());
    let nextIndex = stacks.indexOf(this._visibleStack) - 1;
    if (!stacks[nextIndex]) {
      nextIndex = stacks.length - 1;
    }
    this.showStack(this._getStackId(stacks[nextIndex]));
  }
  _createRotatorView() {
    const view = new RotatorView(this.editor.locale);
    const t = this.editor.locale.t;
    this.view.content.add(view);
    view.bind("isNavigationVisible").to(this, "_numberOfStacks", this, "_singleViewMode", (value, isSingleViewMode) => {
      return !isSingleViewMode && value > 1;
    });
    view.on("change:isNavigationVisible", () => this.updatePosition(), {priority: "low"});
    view.bind("counter").to(this, "visibleView", this, "_numberOfStacks", (visibleView, numberOfStacks) => {
      if (numberOfStacks < 2) {
        return "";
      }
      const current = Array.from(this._idToStack.values()).indexOf(this._visibleStack) + 1;
      return t("%0 of %1", [current, numberOfStacks]);
    });
    view.buttonNextView.on("execute", () => {
      if (view.focusTracker.isFocused) {
        this.editor.editing.view.focus();
      }
      this._showNextStack();
    });
    view.buttonPrevView.on("execute", () => {
      if (view.focusTracker.isFocused) {
        this.editor.editing.view.focus();
      }
      this._showPrevStack();
    });
    return view;
  }
  _createFakePanelsView() {
    const view = new FakePanelsView(this.editor.locale, this.view);
    view.bind("numberOfPanels").to(this, "_numberOfStacks", this, "_singleViewMode", (number, isSingleViewMode) => {
      const showPanels = !isSingleViewMode && number >= 2;
      return showPanels ? Math.min(number - 1, 2) : 0;
    });
    view.listenTo(this.view, "change:top", () => view.updatePosition());
    view.listenTo(this.view, "change:left", () => view.updatePosition());
    this.editor.ui.view.body.add(view);
    return view;
  }
  _showView({view, balloonClassName = "", withArrow = true, singleViewMode = false}) {
    this.view.class = balloonClassName;
    this.view.withArrow = withArrow;
    this._rotatorView.showView(view);
    this.visibleView = view;
    this.view.pin(this._getBalloonPosition());
    this._fakePanelsView.updatePosition();
    if (singleViewMode) {
      this._singleViewMode = true;
    }
  }
  _getBalloonPosition() {
    let position = Array.from(this._visibleStack.values()).pop().position;
    if (position) {
      if (!position.limiter) {
        position = Object.assign({}, position, {
          limiter: this.positionLimiter
        });
      }
      position = Object.assign({}, position, {
        viewportOffsetConfig: this.editor.ui.viewportOffset
      });
    }
    return position;
  }
};
var contextualballoon_default = ContextualBalloon;
var RotatorView = class extends view_default {
  constructor(locale) {
    super(locale);
    const t = locale.t;
    const bind = this.bindTemplate;
    this.set("isNavigationVisible", true);
    this.focusTracker = new FocusTracker9();
    this.buttonPrevView = this._createButtonView(t("Previous"), previous_arrow_default);
    this.buttonNextView = this._createButtonView(t("Next"), next_arrow_default);
    this.content = this.createCollection();
    this.setTemplate({
      tag: "div",
      attributes: {
        class: [
          "ck",
          "ck-balloon-rotator"
        ],
        "z-index": "-1"
      },
      children: [
        {
          tag: "div",
          attributes: {
            class: [
              "ck-balloon-rotator__navigation",
              bind.to("isNavigationVisible", (value) => value ? "" : "ck-hidden")
            ]
          },
          children: [
            this.buttonPrevView,
            {
              tag: "span",
              attributes: {
                class: [
                  "ck-balloon-rotator__counter"
                ]
              },
              children: [
                {
                  text: bind.to("counter")
                }
              ]
            },
            this.buttonNextView
          ]
        },
        {
          tag: "div",
          attributes: {
            class: "ck-balloon-rotator__content"
          },
          children: this.content
        }
      ]
    });
  }
  render() {
    super.render();
    this.focusTracker.add(this.element);
  }
  destroy() {
    super.destroy();
    this.focusTracker.destroy();
  }
  showView(view) {
    this.hideView();
    this.content.add(view);
  }
  hideView() {
    this.content.clear();
  }
  _createButtonView(label, icon) {
    const view = new buttonview_default(this.locale);
    view.set({
      label,
      icon,
      tooltip: true
    });
    return view;
  }
};
var FakePanelsView = class extends view_default {
  constructor(locale, balloonPanelView) {
    super(locale);
    const bind = this.bindTemplate;
    this.set("top", 0);
    this.set("left", 0);
    this.set("height", 0);
    this.set("width", 0);
    this.set("numberOfPanels", 0);
    this.content = this.createCollection();
    this._balloonPanelView = balloonPanelView;
    this.setTemplate({
      tag: "div",
      attributes: {
        class: [
          "ck-fake-panel",
          bind.to("numberOfPanels", (number) => number ? "" : "ck-hidden")
        ],
        style: {
          top: bind.to("top", toPx2),
          left: bind.to("left", toPx2),
          width: bind.to("width", toPx2),
          height: bind.to("height", toPx2)
        }
      },
      children: this.content
    });
    this.on("change:numberOfPanels", (evt, name, next, prev) => {
      if (next > prev) {
        this._addPanels(next - prev);
      } else {
        this._removePanels(prev - next);
      }
      this.updatePosition();
    });
  }
  _addPanels(number) {
    while (number--) {
      const view = new view_default();
      view.setTemplate({tag: "div"});
      this.content.add(view);
      this.registerChild(view);
    }
  }
  _removePanels(number) {
    while (number--) {
      const view = this.content.last;
      this.content.remove(view);
      this.deregisterChild(view);
      view.destroy();
    }
  }
  updatePosition() {
    if (this.numberOfPanels) {
      const {top, left} = this._balloonPanelView;
      const {width, height} = new Rect4(this._balloonPanelView.element);
      Object.assign(this, {top, left, width, height});
    }
  }
};

// node_modules/@ckeditor/ckeditor5-ui/src/panel/sticky/stickypanelview.js
import {global as global7, toUnit as toUnit4, Rect as Rect5} from "es-ckeditor-lib/lib/utils";
import "@ckeditor/ckeditor5-ui/theme/components/panel/stickypanel.css";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var toPx3 = toUnit4("px");
var StickyPanelView = class extends view_default {
  constructor(locale) {
    super(locale);
    const bind = this.bindTemplate;
    this.set("isActive", false);
    this.set("isSticky", false);
    this.set("limiterElement", null);
    this.set("limiterBottomOffset", 50);
    this.set("viewportTopOffset", 0);
    this.set("_marginLeft", null);
    this.set("_isStickyToTheBottomOfLimiter", false);
    this.set("_stickyTopOffset", null);
    this.set("_stickyBottomOffset", null);
    this.content = this.createCollection();
    this._contentPanelPlaceholder = new template_default({
      tag: "div",
      attributes: {
        class: [
          "ck",
          "ck-sticky-panel__placeholder"
        ],
        style: {
          display: bind.to("isSticky", (isSticky) => isSticky ? "block" : "none"),
          height: bind.to("isSticky", (isSticky) => {
            return isSticky ? toPx3(this._contentPanelRect.height) : null;
          })
        }
      }
    }).render();
    this._contentPanel = new template_default({
      tag: "div",
      attributes: {
        class: [
          "ck",
          "ck-sticky-panel__content",
          bind.if("isSticky", "ck-sticky-panel__content_sticky"),
          bind.if("_isStickyToTheBottomOfLimiter", "ck-sticky-panel__content_sticky_bottom-limit")
        ],
        style: {
          width: bind.to("isSticky", (isSticky) => {
            return isSticky ? toPx3(this._contentPanelPlaceholder.getBoundingClientRect().width) : null;
          }),
          top: bind.to("_stickyTopOffset", (value) => value ? toPx3(value) : value),
          bottom: bind.to("_stickyBottomOffset", (value) => value ? toPx3(value) : value),
          marginLeft: bind.to("_marginLeft")
        }
      },
      children: this.content
    }).render();
    this.setTemplate({
      tag: "div",
      attributes: {
        class: [
          "ck",
          "ck-sticky-panel"
        ]
      },
      children: [
        this._contentPanelPlaceholder,
        this._contentPanel
      ]
    });
  }
  render() {
    super.render();
    this.checkIfShouldBeSticky();
    this.listenTo(global7.document, "scroll", () => {
      this.checkIfShouldBeSticky();
    }, {useCapture: true});
    this.listenTo(this, "change:isActive", () => {
      this.checkIfShouldBeSticky();
    });
  }
  checkIfShouldBeSticky() {
    if (!this.limiterElement || !this.isActive) {
      this._unstick();
      return;
    }
    const limiterRect = new Rect5(this.limiterElement);
    let visibleLimiterRect = limiterRect.getVisible();
    if (visibleLimiterRect) {
      const windowRect = new Rect5(global7.window);
      windowRect.top += this.viewportTopOffset;
      windowRect.height -= this.viewportTopOffset;
      visibleLimiterRect = visibleLimiterRect.getIntersection(windowRect);
    }
    if (visibleLimiterRect && limiterRect.top < visibleLimiterRect.top) {
      const visibleLimiterTop = visibleLimiterRect.top;
      if (visibleLimiterTop + this._contentPanelRect.height + this.limiterBottomOffset > visibleLimiterRect.bottom) {
        const stickyBottomOffset = Math.max(limiterRect.bottom - visibleLimiterRect.bottom, 0) + this.limiterBottomOffset;
        if (limiterRect.bottom - stickyBottomOffset > limiterRect.top + this._contentPanelRect.height) {
          this._stickToBottomOfLimiter(stickyBottomOffset);
        } else {
          this._unstick();
        }
      } else {
        if (this._contentPanelRect.height + this.limiterBottomOffset < limiterRect.height) {
          this._stickToTopOfAncestors(visibleLimiterTop);
        } else {
          this._unstick();
        }
      }
    } else {
      this._unstick();
    }
  }
  _stickToTopOfAncestors(topOffset) {
    this.isSticky = true;
    this._isStickyToTheBottomOfLimiter = false;
    this._stickyTopOffset = topOffset;
    this._stickyBottomOffset = null;
    this._marginLeft = toPx3(-global7.window.scrollX);
  }
  _stickToBottomOfLimiter(stickyBottomOffset) {
    this.isSticky = true;
    this._isStickyToTheBottomOfLimiter = true;
    this._stickyTopOffset = null;
    this._stickyBottomOffset = stickyBottomOffset;
    this._marginLeft = toPx3(-global7.window.scrollX);
  }
  _unstick() {
    this.isSticky = false;
    this._isStickyToTheBottomOfLimiter = false;
    this._stickyTopOffset = null;
    this._stickyBottomOffset = null;
    this._marginLeft = null;
  }
  get _contentPanelRect() {
    return new Rect5(this._contentPanel);
  }
};
var stickypanelview_default = StickyPanelView;

// node_modules/@ckeditor/ckeditor5-ui/src/autocomplete/autocompleteview.js
import {getOptimalPosition as getOptimalPosition3, global as global8, toUnit as toUnit5, Rect as Rect6} from "es-ckeditor-lib/lib/utils";

// node_modules/@ckeditor/ckeditor5-ui/src/search/text/searchtextview.js
import {FocusTracker as FocusTracker11, KeystrokeHandler as KeystrokeHandler7} from "es-ckeditor-lib/lib/utils";

// node_modules/@ckeditor/ckeditor5-ui/src/search/text/searchtextqueryview.js
import {icons as icons2} from "es-ckeditor-lib/lib/core";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var SearchTextQueryView = class extends labeledfieldview_default {
  constructor(locale, config) {
    const t = locale.t;
    const viewConfig = Object.assign({}, {
      showResetButton: true,
      showIcon: true,
      creator: createLabeledInputText
    }, config);
    super(locale, viewConfig.creator);
    this.label = config.label;
    this._viewConfig = viewConfig;
    if (this._viewConfig.showIcon) {
      this.iconView = new iconview_default();
      this.iconView.content = icons2.loupe;
      this.fieldWrapperChildren.add(this.iconView, 0);
      this.extendTemplate({
        attributes: {
          class: "ck-search__query_with-icon"
        }
      });
    }
    if (this._viewConfig.showResetButton) {
      this.resetButtonView = new buttonview_default(locale);
      this.resetButtonView.set({
        label: t("Clear"),
        icon: icons2.cancel,
        class: "ck-search__reset",
        isVisible: false,
        tooltip: true
      });
      this.resetButtonView.on("execute", () => {
        this.reset();
        this.focus();
        this.fire("reset");
      });
      this.resetButtonView.bind("isVisible").to(this.fieldView, "isEmpty", (isEmpty) => !isEmpty);
      this.fieldWrapperChildren.add(this.resetButtonView);
      this.extendTemplate({
        attributes: {
          class: "ck-search__query_with-reset"
        }
      });
    }
  }
  reset() {
    this.fieldView.reset();
    if (this._viewConfig.showResetButton) {
      this.resetButtonView.isVisible = false;
    }
  }
};
var searchtextqueryview_default = SearchTextQueryView;

// node_modules/@ckeditor/ckeditor5-ui/src/search/searchinfoview.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var SearchInfoView = class extends view_default {
  constructor() {
    super();
    const bind = this.bindTemplate;
    this.set({
      isVisible: false,
      primaryText: "",
      secondaryText: ""
    });
    this.setTemplate({
      tag: "div",
      attributes: {
        class: [
          "ck",
          "ck-search__info",
          bind.if("isVisible", "ck-hidden", (value) => !value)
        ],
        tabindex: -1
      },
      children: [
        {
          tag: "span",
          children: [
            {
              text: [bind.to("primaryText")]
            }
          ]
        },
        {
          tag: "span",
          children: [
            {
              text: [bind.to("secondaryText")]
            }
          ]
        }
      ]
    });
  }
  focus() {
    this.element.focus();
  }
};
var searchinfoview_default = SearchInfoView;

// node_modules/@ckeditor/ckeditor5-ui/src/search/searchresultsview.js
import {FocusTracker as FocusTracker10} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var SearchResultsView = class extends view_default {
  constructor(locale) {
    super(locale);
    this.children = this.createCollection();
    this.focusTracker = new FocusTracker10();
    this.setTemplate({
      tag: "div",
      attributes: {
        class: [
          "ck",
          "ck-search__results"
        ],
        tabindex: -1
      },
      children: this.children
    });
    this._focusCycler = new focuscycler_default({
      focusables: this.children,
      focusTracker: this.focusTracker
    });
  }
  render() {
    super.render();
    for (const child of this.children) {
      this.focusTracker.add(child.element);
    }
  }
  focus() {
    this._focusCycler.focusFirst();
  }
  focusFirst() {
    this._focusCycler.focusFirst();
  }
  focusLast() {
    this._focusCycler.focusLast();
  }
};
var searchresultsview_default = SearchResultsView;

// node_modules/@ckeditor/ckeditor5-ui/src/search/text/searchtextview.js
import {escapeRegExp} from "lodash-es";
import "@ckeditor/ckeditor5-ui/theme/components/search/search.css";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var SearchTextView = class extends view_default {
  constructor(locale, config) {
    super(locale);
    this._config = config;
    this.filteredView = config.filteredView;
    this.queryView = this._createSearchTextQueryView();
    this.focusTracker = new FocusTracker11();
    this.keystrokes = new KeystrokeHandler7();
    this.resultsView = new searchresultsview_default(locale);
    this.children = this.createCollection();
    this.focusableChildren = this.createCollection([this.queryView, this.resultsView]);
    this.set("isEnabled", true);
    this.set("resultsCount", 0);
    this.set("totalItemsCount", 0);
    if (config.infoView && config.infoView.instance) {
      this.infoView = config.infoView.instance;
    } else {
      this.infoView = new searchinfoview_default();
      this._enableDefaultInfoViewBehavior();
      this.on("render", () => {
        this.search("");
      });
    }
    this.resultsView.children.addMany([this.infoView, this.filteredView]);
    this.focusCycler = new focuscycler_default({
      focusables: this.focusableChildren,
      focusTracker: this.focusTracker,
      keystrokeHandler: this.keystrokes,
      actions: {
        focusPrevious: "shift + tab",
        focusNext: "tab"
      }
    });
    this.on("search", (evt, {resultsCount, totalItemsCount}) => {
      this.resultsCount = resultsCount;
      this.totalItemsCount = totalItemsCount;
    });
    this.setTemplate({
      tag: "div",
      attributes: {
        class: [
          "ck",
          "ck-search",
          config.class || null
        ],
        tabindex: "-1"
      },
      children: this.children
    });
  }
  render() {
    super.render();
    this.children.addMany([
      this.queryView,
      this.resultsView
    ]);
    const stopPropagation = (data) => data.stopPropagation();
    for (const focusableChild of this.focusableChildren) {
      this.focusTracker.add(focusableChild.element);
    }
    this.keystrokes.listenTo(this.element);
    this.keystrokes.set("arrowright", stopPropagation);
    this.keystrokes.set("arrowleft", stopPropagation);
    this.keystrokes.set("arrowup", stopPropagation);
    this.keystrokes.set("arrowdown", stopPropagation);
  }
  focus() {
    this.queryView.focus();
  }
  reset() {
    this.queryView.reset();
    this.search("");
  }
  search(query) {
    const regExp = query ? new RegExp(escapeRegExp(query), "ig") : null;
    const filteringResults = this.filteredView.filter(regExp);
    this.fire("search", {query, ...filteringResults});
  }
  _createSearchTextQueryView() {
    const queryView = new searchtextqueryview_default(this.locale, this._config.queryView);
    this.listenTo(queryView.fieldView, "input", () => {
      this.search(queryView.fieldView.element.value);
    });
    queryView.on("reset", () => this.reset());
    queryView.bind("isEnabled").to(this);
    return queryView;
  }
  _enableDefaultInfoViewBehavior() {
    const t = this.locale.t;
    const infoView = this.infoView;
    this.on("search", (evt, data) => {
      if (!data.resultsCount) {
        const defaultTextConfig = this._config.infoView && this._config.infoView.text;
        let primaryText, secondaryText;
        if (data.totalItemsCount) {
          if (defaultTextConfig && defaultTextConfig.notFound) {
            primaryText = defaultTextConfig.notFound.primary;
            secondaryText = defaultTextConfig.notFound.secondary;
          } else {
            primaryText = t("No results found");
            secondaryText = "";
          }
        } else {
          if (defaultTextConfig && defaultTextConfig.noSearchableItems) {
            primaryText = defaultTextConfig.noSearchableItems.primary;
            secondaryText = defaultTextConfig.noSearchableItems.secondary;
          } else {
            primaryText = t("No searchable items");
            secondaryText = "";
          }
        }
        infoView.set({
          primaryText: normalizeInfoText(primaryText, data),
          secondaryText: normalizeInfoText(secondaryText, data),
          isVisible: true
        });
      } else {
        infoView.set({
          isVisible: false
        });
      }
    });
    function normalizeInfoText(text, {query, resultsCount, totalItemsCount}) {
      return typeof text === "function" ? text(query, resultsCount, totalItemsCount) : text;
    }
  }
};
var searchtextview_default = SearchTextView;

// node_modules/@ckeditor/ckeditor5-ui/src/autocomplete/autocompleteview.js
import "@ckeditor/ckeditor5-ui/theme/components/autocomplete/autocomplete.css";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var AutocompleteView = class extends searchtextview_default {
  constructor(locale, config) {
    super(locale, config);
    this._config = config;
    const toPx7 = toUnit5("px");
    this.extendTemplate({
      attributes: {
        class: ["ck-autocomplete"]
      }
    });
    const bindResultsView = this.resultsView.bindTemplate;
    this.resultsView.set("isVisible", false);
    this.resultsView.set("_position", "s");
    this.resultsView.set("_width", 0);
    this.resultsView.extendTemplate({
      attributes: {
        class: [
          bindResultsView.if("isVisible", "ck-hidden", (value) => !value),
          bindResultsView.to("_position", (value) => `ck-search__results_${value}`)
        ],
        style: {
          width: bindResultsView.to("_width", toPx7)
        }
      }
    });
    this.focusTracker.on("change:isFocused", (evt, name, isFocused) => {
      this._updateResultsVisibility();
      if (isFocused) {
        this.resultsView.element.scrollTop = 0;
      } else if (config.resetOnBlur) {
        this.queryView.reset();
      }
    });
    this.on("search", () => {
      this._updateResultsVisibility();
      this._updateResultsViewWidthAndPosition();
    });
    this.keystrokes.set("esc", (evt, cancel) => {
      this.resultsView.isVisible = false;
      cancel();
    });
    this.listenTo(global8.document, "scroll", () => {
      this._updateResultsViewWidthAndPosition();
    });
    this.on("change:isEnabled", () => {
      this._updateResultsVisibility();
    });
    this.filteredView.on("execute", (evt, {value}) => {
      this.focus();
      this.reset();
      this.queryView.fieldView.value = this.queryView.fieldView.element.value = value;
      this.resultsView.isVisible = false;
    });
    this.resultsView.on("change:isVisible", () => {
      this._updateResultsViewWidthAndPosition();
    });
  }
  _updateResultsViewWidthAndPosition() {
    if (!this.resultsView.isVisible) {
      return;
    }
    this.resultsView._width = new Rect6(this.queryView.fieldView.element).width;
    const optimalResultsPosition = AutocompleteView._getOptimalPosition({
      element: this.resultsView.element,
      target: this.queryView.element,
      fitInViewport: true,
      positions: AutocompleteView.defaultResultsPositions
    });
    this.resultsView._position = optimalResultsPosition ? optimalResultsPosition.name : "s";
  }
  _updateResultsVisibility() {
    const queryMinChars = typeof this._config.queryMinChars === "undefined" ? 0 : this._config.queryMinChars;
    const queryLength = this.queryView.fieldView.element.value.length;
    this.resultsView.isVisible = this.focusTracker.isFocused && this.isEnabled && queryLength >= queryMinChars;
  }
};
var autocompleteview_default = AutocompleteView;
AutocompleteView.defaultResultsPositions = [
  (fieldRect) => {
    return {
      top: fieldRect.bottom,
      left: fieldRect.left,
      name: "s"
    };
  },
  (fieldRect, resultsRect) => {
    return {
      top: fieldRect.top - resultsRect.height,
      left: fieldRect.left,
      name: "n"
    };
  }
];
AutocompleteView._getOptimalPosition = getOptimalPosition3;

// node_modules/@ckeditor/ckeditor5-ui/src/highlightedtext/highlightedtextview.js
import {escape} from "lodash-es";
import "@ckeditor/ckeditor5-ui/theme/components/highlightedtext/highlightedtext.css";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var HighlightedTextView = class extends view_default {
  constructor() {
    super();
    this.set("text", void 0);
    this.setTemplate({
      tag: "span",
      attributes: {
        class: ["ck", "ck-highlighted-text"]
      }
    });
    this.on("render", () => {
      this.on("change:text", () => {
        this._updateInnerHTML(this.text);
      });
      this._updateInnerHTML(this.text);
    });
  }
  highlightText(regExp) {
    this._updateInnerHTML(markText(this.text || "", regExp));
  }
  _updateInnerHTML(newInnerHTML) {
    this.element.innerHTML = newInnerHTML || "";
  }
};
var highlightedtextview_default = HighlightedTextView;
function markText(text, regExp) {
  if (!regExp) {
    return escape(text);
  }
  const textParts = [];
  let lastMatchEnd = 0;
  let matchInfo = regExp.exec(text);
  while (matchInfo !== null) {
    const curMatchStart = matchInfo.index;
    if (curMatchStart !== lastMatchEnd) {
      textParts.push({
        text: text.substring(lastMatchEnd, curMatchStart),
        isMatch: false
      });
    }
    textParts.push({
      text: matchInfo[0],
      isMatch: true
    });
    lastMatchEnd = regExp.lastIndex;
    matchInfo = regExp.exec(text);
  }
  if (lastMatchEnd !== text.length) {
    textParts.push({
      text: text.substring(lastMatchEnd),
      isMatch: false
    });
  }
  const outputHtml = textParts.map((part) => {
    part.text = escape(part.text);
    return part;
  }).map((part) => part.isMatch ? `<mark>${part.text}</mark>` : part.text).join("");
  return outputHtml;
}

// node_modules/@ckeditor/ckeditor5-ui/src/spinner/spinnerview.js
import "@ckeditor/ckeditor5-ui/theme/components/spinner/spinner.css";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var SpinnerView = class extends view_default {
  constructor() {
    super();
    this.set("isVisible", false);
    const bind = this.bindTemplate;
    this.setTemplate({
      tag: "span",
      attributes: {
        class: [
          "ck",
          "ck-spinner-container",
          bind.if("isVisible", "ck-hidden", (value) => !value)
        ]
      },
      children: [{
        tag: "span",
        attributes: {
          class: ["ck", "ck-spinner"]
        }
      }]
    });
  }
};
var spinnerview_default = SpinnerView;

// node_modules/@ckeditor/ckeditor5-ui/src/toolbar/balloon/balloontoolbar.js
import {Plugin as Plugin2} from "es-ckeditor-lib/lib/core";
import {FocusTracker as FocusTracker12, Rect as Rect7, ResizeObserver as ResizeObserver3, env as env3, global as global9, toUnit as toUnit6} from "es-ckeditor-lib/lib/utils";
import {debounce as debounce3} from "lodash-es";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var toPx4 = toUnit6("px");
var BalloonToolbar = class extends Plugin2 {
  static get pluginName() {
    return "BalloonToolbar";
  }
  static get requires() {
    return [contextualballoon_default];
  }
  constructor(editor) {
    super(editor);
    this._resizeObserver = null;
    this._balloonConfig = normalizeToolbarConfig(editor.config.get("balloonToolbar"));
    this.toolbarView = this._createToolbarView();
    this.focusTracker = new FocusTracker12();
    editor.ui.once("ready", () => {
      this.focusTracker.add(editor.ui.getEditableElement());
      this.focusTracker.add(this.toolbarView.element);
    });
    editor.ui.addToolbar(this.toolbarView, {
      beforeFocus: () => this.show(true),
      afterBlur: () => this.hide(),
      isContextual: true
    });
    this._balloon = editor.plugins.get(contextualballoon_default);
    this._fireSelectionChangeDebounced = debounce3(() => this.fire("_selectionChangeDebounced"), 200);
    this.decorate("show");
  }
  init() {
    const editor = this.editor;
    const selection = editor.model.document.selection;
    this.listenTo(this.focusTracker, "change:isFocused", (evt, name, isFocused) => {
      const isToolbarVisible = this._balloon.visibleView === this.toolbarView;
      if (!isFocused && isToolbarVisible) {
        this.hide();
      } else if (isFocused) {
        this.show();
      }
    });
    this.listenTo(selection, "change:range", (evt, data) => {
      if (data.directChange || selection.isCollapsed) {
        this.hide();
      }
      this._fireSelectionChangeDebounced();
    });
    this.listenTo(this, "_selectionChangeDebounced", () => {
      if (this.editor.editing.view.document.isFocused) {
        this.show();
      }
    });
    if (!this._balloonConfig.shouldNotGroupWhenFull) {
      this.listenTo(editor, "ready", () => {
        const editableElement = editor.ui.view.editable.element;
        this._resizeObserver = new ResizeObserver3(editableElement, (entry) => {
          this.toolbarView.maxWidth = toPx4(entry.contentRect.width * 0.9);
        });
      });
    }
    this.listenTo(this.toolbarView, "groupedItemsUpdate", () => {
      this._updatePosition();
    });
  }
  afterInit() {
    const factory = this.editor.ui.componentFactory;
    this.toolbarView.fillFromConfig(this._balloonConfig, factory);
  }
  _createToolbarView() {
    const t = this.editor.locale.t;
    const shouldGroupWhenFull = !this._balloonConfig.shouldNotGroupWhenFull;
    const toolbarView = new toolbarview_default(this.editor.locale, {
      shouldGroupWhenFull,
      isFloating: true
    });
    toolbarView.ariaLabel = t("Editor contextual toolbar");
    toolbarView.render();
    return toolbarView;
  }
  show(showForCollapsedSelection = false) {
    const editor = this.editor;
    const selection = editor.model.document.selection;
    const schema = editor.model.schema;
    if (this._balloon.hasView(this.toolbarView)) {
      return;
    }
    if (selection.isCollapsed && !showForCollapsedSelection) {
      return;
    }
    if (selectionContainsOnlyMultipleSelectables(selection, schema)) {
      return;
    }
    if (Array.from(this.toolbarView.items).every((item) => item.isEnabled !== void 0 && !item.isEnabled)) {
      return;
    }
    this.listenTo(this.editor.ui, "update", () => {
      this._updatePosition();
    });
    this._balloon.add({
      view: this.toolbarView,
      position: this._getBalloonPositionData(),
      balloonClassName: "ck-toolbar-container"
    });
  }
  hide() {
    if (this._balloon.hasView(this.toolbarView)) {
      this.stopListening(this.editor.ui, "update");
      this._balloon.remove(this.toolbarView);
    }
  }
  _getBalloonPositionData() {
    const editor = this.editor;
    const view = editor.editing.view;
    const viewDocument = view.document;
    const viewSelection = viewDocument.selection;
    const isBackward = viewDocument.selection.isBackward;
    return {
      target: () => {
        const range = isBackward ? viewSelection.getFirstRange() : viewSelection.getLastRange();
        const rangeRects = Rect7.getDomRangeRects(view.domConverter.viewRangeToDom(range));
        if (isBackward) {
          return rangeRects[0];
        } else {
          if (rangeRects.length > 1 && rangeRects[rangeRects.length - 1].width === 0) {
            rangeRects.pop();
          }
          return rangeRects[rangeRects.length - 1];
        }
      },
      positions: this._getBalloonPositions(isBackward)
    };
  }
  _updatePosition() {
    this._balloon.updatePosition(this._getBalloonPositionData());
  }
  destroy() {
    super.destroy();
    this.stopListening();
    this._fireSelectionChangeDebounced.cancel();
    this.toolbarView.destroy();
    this.focusTracker.destroy();
    if (this._resizeObserver) {
      this._resizeObserver.destroy();
    }
  }
  _getBalloonPositions(isBackward) {
    const isSafariIniOS = env3.isSafari && env3.isiOS;
    const positions = isSafariIniOS ? generatePositions({
      heightOffset: Math.max(balloonpanelview_default.arrowHeightOffset, Math.round(20 / global9.window.visualViewport.scale))
    }) : balloonpanelview_default.defaultPositions;
    return isBackward ? [
      positions.northWestArrowSouth,
      positions.northWestArrowSouthWest,
      positions.northWestArrowSouthEast,
      positions.northWestArrowSouthMiddleEast,
      positions.northWestArrowSouthMiddleWest,
      positions.southWestArrowNorth,
      positions.southWestArrowNorthWest,
      positions.southWestArrowNorthEast,
      positions.southWestArrowNorthMiddleWest,
      positions.southWestArrowNorthMiddleEast
    ] : [
      positions.southEastArrowNorth,
      positions.southEastArrowNorthEast,
      positions.southEastArrowNorthWest,
      positions.southEastArrowNorthMiddleEast,
      positions.southEastArrowNorthMiddleWest,
      positions.northEastArrowSouth,
      positions.northEastArrowSouthEast,
      positions.northEastArrowSouthWest,
      positions.northEastArrowSouthMiddleEast,
      positions.northEastArrowSouthMiddleWest
    ];
  }
};
var balloontoolbar_default = BalloonToolbar;
function selectionContainsOnlyMultipleSelectables(selection, schema) {
  if (selection.rangeCount === 1) {
    return false;
  }
  return [...selection.getRanges()].every((range) => {
    const element = range.getContainedElement();
    return element && schema.isSelectable(element);
  });
}

// node_modules/@ckeditor/ckeditor5-ui/src/toolbar/block/blocktoolbar.js
import {Plugin as Plugin3} from "es-ckeditor-lib/lib/core";
import {Rect as Rect8, ResizeObserver as ResizeObserver4, toUnit as toUnit8} from "es-ckeditor-lib/lib/utils";

// node_modules/@ckeditor/ckeditor5-ui/src/toolbar/block/blockbuttonview.js
import {toUnit as toUnit7} from "es-ckeditor-lib/lib/utils";
import "@ckeditor/ckeditor5-ui/theme/components/toolbar/blocktoolbar.css";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var toPx5 = toUnit7("px");
var BlockButtonView = class extends buttonview_default {
  constructor(locale) {
    super(locale);
    const bind = this.bindTemplate;
    this.isVisible = false;
    this.isToggleable = true;
    this.set("top", 0);
    this.set("left", 0);
    this.extendTemplate({
      attributes: {
        class: "ck-block-toolbar-button",
        style: {
          top: bind.to("top", (val) => toPx5(val)),
          left: bind.to("left", (val) => toPx5(val))
        }
      }
    });
  }
};
var blockbuttonview_default = BlockButtonView;

// node_modules/@ckeditor/ckeditor5-ui/src/toolbar/block/blocktoolbar.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var toPx6 = toUnit8("px");
var BlockToolbar = class extends Plugin3 {
  static get pluginName() {
    return "BlockToolbar";
  }
  constructor(editor) {
    super(editor);
    this._resizeObserver = null;
    this._blockToolbarConfig = normalizeToolbarConfig(this.editor.config.get("blockToolbar"));
    this.toolbarView = this._createToolbarView();
    this.panelView = this._createPanelView();
    this.buttonView = this._createButtonView();
    clickOutsideHandler({
      emitter: this.panelView,
      contextElements: [this.panelView.element, this.buttonView.element],
      activator: () => this.panelView.isVisible,
      callback: () => this._hidePanel()
    });
  }
  init() {
    const editor = this.editor;
    const t = editor.t;
    const editBlockText = t("Click to edit block");
    const dragToMoveText = t("Drag to move");
    const editBlockLabel = t("Edit block");
    const isDragDropBlockToolbarPluginLoaded = editor.plugins.has("DragDropBlockToolbar");
    const label = isDragDropBlockToolbarPluginLoaded ? `${editBlockText}
${dragToMoveText}` : editBlockLabel;
    this.buttonView.label = label;
    if (isDragDropBlockToolbarPluginLoaded) {
      this.buttonView.element.dataset.ckeTooltipClass = "ck-tooltip_multi-line";
    }
    this.listenTo(editor.model.document.selection, "change:range", (evt, data) => {
      if (data.directChange) {
        this._hidePanel();
      }
    });
    this.listenTo(editor.ui, "update", () => this._updateButton());
    this.listenTo(editor, "change:isReadOnly", () => this._updateButton(), {priority: "low"});
    this.listenTo(editor.ui.focusTracker, "change:isFocused", () => this._updateButton());
    this.listenTo(this.buttonView, "change:isVisible", (evt, name, isVisible5) => {
      if (isVisible5) {
        this.buttonView.listenTo(window, "resize", () => this._updateButton());
      } else {
        this.buttonView.stopListening(window, "resize");
        this._hidePanel();
      }
    });
    editor.ui.addToolbar(this.toolbarView, {
      beforeFocus: () => this._showPanel(),
      afterBlur: () => this._hidePanel()
    });
  }
  afterInit() {
    this.toolbarView.fillFromConfig(this._blockToolbarConfig, this.editor.ui.componentFactory);
    for (const item of this.toolbarView.items) {
      item.on("execute", () => this._hidePanel(true), {priority: "high"});
    }
  }
  destroy() {
    super.destroy();
    this.panelView.destroy();
    this.buttonView.destroy();
    this.toolbarView.destroy();
    if (this._resizeObserver) {
      this._resizeObserver.destroy();
    }
  }
  _createToolbarView() {
    const t = this.editor.locale.t;
    const shouldGroupWhenFull = !this._blockToolbarConfig.shouldNotGroupWhenFull;
    const toolbarView = new toolbarview_default(this.editor.locale, {
      shouldGroupWhenFull,
      isFloating: true
    });
    toolbarView.ariaLabel = t("Editor block content toolbar");
    return toolbarView;
  }
  _createPanelView() {
    const editor = this.editor;
    const panelView = new balloonpanelview_default(editor.locale);
    panelView.content.add(this.toolbarView);
    panelView.class = "ck-toolbar-container";
    editor.ui.view.body.add(panelView);
    editor.ui.focusTracker.add(panelView.element);
    this.toolbarView.keystrokes.set("Esc", (evt, cancel) => {
      this._hidePanel(true);
      cancel();
    });
    return panelView;
  }
  _createButtonView() {
    const editor = this.editor;
    const t = editor.t;
    const buttonView = new blockbuttonview_default(editor.locale);
    const iconFromConfig = this._blockToolbarConfig.icon;
    const icon = NESTED_TOOLBAR_ICONS[iconFromConfig] || iconFromConfig || NESTED_TOOLBAR_ICONS.dragIndicator;
    buttonView.set({
      label: t("Edit block"),
      icon,
      withText: false
    });
    buttonView.bind("isOn").to(this.panelView, "isVisible");
    buttonView.bind("tooltip").to(this.panelView, "isVisible", (isVisible5) => !isVisible5);
    this.listenTo(buttonView, "execute", () => {
      if (!this.panelView.isVisible) {
        this._showPanel();
      } else {
        this._hidePanel(true);
      }
    });
    editor.ui.view.body.add(buttonView);
    editor.ui.focusTracker.add(buttonView.element);
    return buttonView;
  }
  _updateButton() {
    const editor = this.editor;
    const model = editor.model;
    const view = editor.editing.view;
    if (!editor.ui.focusTracker.isFocused) {
      this._hideButton();
      return;
    }
    if (!editor.model.canEditAt(editor.model.document.selection)) {
      this._hideButton();
      return;
    }
    const modelTarget = Array.from(model.document.selection.getSelectedBlocks())[0];
    if (!modelTarget || Array.from(this.toolbarView.items).every((item) => !item.isEnabled)) {
      this._hideButton();
      return;
    }
    const domTarget = view.domConverter.mapViewToDom(editor.editing.mapper.toViewElement(modelTarget));
    this.buttonView.isVisible = true;
    this._setupToolbarResize();
    this._attachButtonToElement(domTarget);
    if (this.panelView.isVisible) {
      this._showPanel();
    }
  }
  _hideButton() {
    this.buttonView.isVisible = false;
  }
  _showPanel() {
    if (!this.buttonView.isVisible) {
      return;
    }
    const wasVisible = this.panelView.isVisible;
    this.panelView.show();
    const editableElement = this._getSelectedEditableElement();
    this.toolbarView.maxWidth = this._getToolbarMaxWidth(editableElement);
    this.panelView.pin({
      target: this.buttonView.element,
      limiter: editableElement
    });
    if (!wasVisible) {
      this.toolbarView.items.get(0).focus();
    }
  }
  _getSelectedEditableElement() {
    const selectedModelRootName = this.editor.model.document.selection.getFirstRange().root.rootName;
    return this.editor.ui.getEditableElement(selectedModelRootName);
  }
  _hidePanel(focusEditable) {
    this.panelView.isVisible = false;
    if (focusEditable) {
      this.editor.editing.view.focus();
    }
  }
  _attachButtonToElement(targetElement) {
    const contentStyles = window.getComputedStyle(targetElement);
    const editableRect = new Rect8(this._getSelectedEditableElement());
    const contentPaddingTop = parseInt(contentStyles.paddingTop, 10);
    const contentLineHeight = parseInt(contentStyles.lineHeight, 10) || parseInt(contentStyles.fontSize, 10) * 1.2;
    const buttonRect = new Rect8(this.buttonView.element);
    const contentRect = new Rect8(targetElement);
    let positionLeft;
    if (this.editor.locale.uiLanguageDirection === "ltr") {
      positionLeft = editableRect.left - buttonRect.width;
    } else {
      positionLeft = editableRect.right;
    }
    const positionTop = contentRect.top + contentPaddingTop + (contentLineHeight - buttonRect.height) / 2;
    buttonRect.moveTo(positionLeft, positionTop);
    const absoluteButtonRect = buttonRect.toAbsoluteRect();
    this.buttonView.top = absoluteButtonRect.top;
    this.buttonView.left = absoluteButtonRect.left;
  }
  _setupToolbarResize() {
    const editableElement = this._getSelectedEditableElement();
    if (!this._blockToolbarConfig.shouldNotGroupWhenFull) {
      if (this._resizeObserver && this._resizeObserver.element !== editableElement) {
        this._resizeObserver.destroy();
        this._resizeObserver = null;
      }
      if (!this._resizeObserver) {
        this._resizeObserver = new ResizeObserver4(editableElement, () => {
          this.toolbarView.maxWidth = this._getToolbarMaxWidth(editableElement);
        });
      }
    }
  }
  _getToolbarMaxWidth(editableElement) {
    const editableRect = new Rect8(editableElement);
    const buttonRect = new Rect8(this.buttonView.element);
    const isRTL = this.editor.locale.uiLanguageDirection === "rtl";
    const offset = isRTL ? buttonRect.left - editableRect.right + buttonRect.width : editableRect.left - buttonRect.left;
    return toPx6(editableRect.width + offset);
  }
};
var blocktoolbar_default = BlockToolbar;

// node_modules/@ckeditor/ckeditor5-ui/src/augmentation.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// node_modules/@ckeditor/ckeditor5-ui/src/index.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var icons3 = {
  colorPaletteIcon: color_palette_default
};
export {
  autocompleteview_default as AutocompleteView,
  balloonpanelview_default as BalloonPanelView,
  balloontoolbar_default as BalloonToolbar,
  blocktoolbar_default as BlockToolbar,
  bodycollection_default as BodyCollection,
  boxededitoruiview_default as BoxedEditorUIView,
  buttonlabelview_default as ButtonLabelView,
  buttonview_default as ButtonView,
  colorgridview_default as ColorGridView,
  colorpickerview_default as ColorPickerView,
  colorselectorview_default as ColorSelectorView,
  colortileview_default as ColorTileView,
  componentfactory_default as ComponentFactory,
  contextualballoon_default as ContextualBalloon,
  CssTransitionDisablerMixin,
  dropdownbuttonview_default as DropdownButtonView,
  dropdownpanelview_default as DropdownPanelView,
  dropdownview_default as DropdownView,
  editorui_default as EditorUI,
  editoruiview_default as EditorUIView,
  focuscycler_default as FocusCycler,
  formheaderview_default as FormHeaderView,
  highlightedtextview_default as HighlightedTextView,
  iconview_default as IconView,
  iframeview_default as IframeView,
  inlineeditableuiview_default as InlineEditableUIView,
  inputnumberview_default as InputNumberView,
  inputtextview_default as InputTextView,
  inputview_default as InputView,
  labelview_default as LabelView,
  labeledfieldview_default as LabeledFieldView,
  listitemgroupview_default as ListItemGroupView,
  listitemview_default as ListItemView,
  listview_default as ListView,
  model_default as Model,
  notification_default as Notification,
  searchinfoview_default as SearchInfoView,
  searchtextview_default as SearchTextView,
  spinnerview_default as SpinnerView,
  splitbuttonview_default as SplitButtonView,
  stickypanelview_default as StickyPanelView,
  switchbuttonview_default as SwitchButtonView,
  template_default as Template,
  textareaview_default as TextareaView,
  toolbarlinebreakview_default as ToolbarLineBreakView,
  toolbarseparatorview_default as ToolbarSeparatorView,
  toolbarview_default as ToolbarView,
  tooltipmanager_default as TooltipManager,
  view_default as View,
  viewcollection_default as ViewCollection,
  addKeyboardHandlingForGrid,
  addListToDropdown,
  addToolbarToDropdown,
  clickOutsideHandler,
  createDropdown,
  createLabeledDropdown,
  createLabeledInputNumber,
  createLabeledInputText,
  createLabeledTextarea,
  focusChildOnDropdownOpen,
  getLocalizedColorOptions,
  icons3 as icons,
  injectCssTransitionDisabler,
  normalizeColorOptions,
  normalizeSingleColorDefinition,
  normalizeToolbarConfig,
  submitHandler
};
