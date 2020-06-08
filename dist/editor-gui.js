module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./components/index.coffee");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./components/Align.coffee":
/*!*********************************!*\
  !*** ./components/Align.coffee ***!
  \*********************************/
/*! exports provided: clampPosition, getPosition, fixAlign, guessAlign, adjustHeight */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clampPosition", function() { return clampPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPosition", function() { return getPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fixAlign", function() { return fixAlign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "guessAlign", function() { return guessAlign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "adjustHeight", function() { return adjustHeight; });
//neveragain
var adjustHeight, checkFitAlignDown, checkFitAlignLeft, checkFitAlignRight, checkFitAlignUp, checkFitPositionBottom, checkFitPositionTop, checkfitPositionLeft, checkfitPositionRight, clampPosition, fixAlign, getAlignDirections, getPosition, guessAlign;

guessAlign = function(width, height, ctx) {
  switch (ctx.align) {
    case 'right-down':
      return ctx.vert && 'right-down' || 'bottom-right';
    case 'right-up':
      return ctx.vert && 'right-up' || 'top-right';
    case 'left-down':
      return ctx.vert && 'left-down' || 'bottom-left';
    case 'left-up':
      return ctx.vert && 'left-up' || 'top-left';
    case 'bottom-right':
      return ctx.vert && 'right-down' || 'bottom-right';
    case 'bottom-left':
      return ctx.vert && 'left-down' || 'bottom-left';
    case 'top-right':
      return ctx.vert && 'right-up' || 'top-right';
    case 'top-left':
      return ctx.vert && 'left-up' || 'top-left';
    default:
      throw new Error('invalid align key');
  }
};

checkFitAlignRight = function(ctx, width, height) {
  return Math.min(ctx.view_rect.right - (ctx.sel_x + width), 0);
};

checkFitAlignLeft = function(ctx, width, height) {
  return Math.min((ctx.sel_x + ctx.sel_w - width) - ctx.view_rect.left, 0);
};

checkFitAlignUp = function(ctx, width, height) {
  return Math.min((ctx.sel_y + ctx.dim - height) - ctx.view_rect.top, 0);
};

checkFitAlignDown = function(ctx, width, height) {
  return Math.min(ctx.view_rect.bottom - (ctx.sel_y + height), 0);
};

checkFitPositionBottom = function(ctx, width, height) {
  return Math.min(ctx.view_rect.bottom - (ctx.y + ctx.height + height), 0);
};

checkFitPositionTop = function(ctx, width, height) {
  return Math.min((ctx.y - height) - ctx.view_rect.top, 0);
};

checkfitPositionLeft = function(ctx, width, height) {
  return Math.min((ctx.x - width) - ctx.view_rect.left, 0);
};

checkfitPositionRight = function(ctx, width, height) {
  return Math.min(ctx.view_rect.right - (ctx.x + ctx.width + width), 0);
};

fixAlign = function(align_key, ctx, width, height) {
  var bottom, down, left, right, top, up;
  switch (align_key) {
    case 'right-down':
      left = checkfitPositionLeft(ctx, width, height) > checkfitPositionRight(ctx, width, height);
      up = checkFitAlignDown(ctx, width, height) < checkFitAlignUp(ctx, width, height);
      if (left) {
        if (up) {
          return 'left-up';
        } else {
          return 'left-down';
        }
      } else {
        if (up) {
          return 'right-up';
        } else {
          return 'right-down';
        }
      }
      break;
    case 'right-up':
      left = checkfitPositionLeft(ctx, width, height) > checkfitPositionRight(ctx, width, height);
      up = checkFitAlignDown(ctx, width, height) < checkFitAlignUp(ctx, width, height);
      if (left) {
        if (down) {
          return 'left-down';
        } else {
          return 'left-up';
        }
      } else {
        if (down) {
          return 'right-down';
        } else {
          return 'right-up';
        }
      }
      break;
    case 'left-down':
      right = checkfitPositionLeft(ctx, width, height) < checkfitPositionRight(ctx, width, height);
      up = checkFitAlignDown(ctx, width, height) < checkFitAlignUp(ctx, width, height);
      if (right) {
        if (up) {
          return 'right-up';
        } else {
          return 'right-down';
        }
      } else {
        if (up) {
          return 'left-up';
        } else {
          return 'left-down';
        }
      }
      break;
    case 'left-up':
      right = checkfitPositionLeft(ctx, width, height) < checkfitPositionRight(ctx, width, height);
      down = checkFitAlignUp(ctx, width, height) < checkFitAlignDown(ctx, width, height);
      if (right) {
        if (down) {
          return 'right-down';
        } else {
          return 'right-up';
        }
      } else {
        if (down) {
          return 'left-down';
        } else {
          return 'left-up';
        }
      }
      break;
    case 'bottom-right':
      top = checkFitPositionBottom(ctx, width, height) < checkFitPositionTop(ctx, width, height);
      left = checkFitAlignRight(ctx, width, height) < checkFitAlignLeft(ctx, width, height);
      if (top) {
        if (left) {
          return 'top-left';
        } else {
          return 'top-right';
        }
      } else {
        if (left) {
          return 'bottom-left';
        } else {
          return 'bottom-right';
        }
      }
      break;
    case 'bottom-left':
      top = checkFitPositionTop(ctx, width, height) > checkFitPositionBottom(ctx, width, height);
      right = checkFitAlignLeft(ctx, width, height) < checkFitAlignRight(ctx, width, height);
      if (top) {
        if (right) {
          return 'top-right';
        } else {
          return 'top-left';
        }
      } else {
        if (right) {
          return 'bottom-right';
        } else {
          return 'bottom-left';
        }
      }
      break;
    case 'top-right':
      bottom = checkFitPositionBottom(ctx, width, height) > checkFitPositionTop(ctx, width, height);
      left = checkFitAlignLeft(ctx, width, height) > checkFitAlignRight(ctx, width, height);
      if (bottom) {
        if (left) {
          return 'bottom-left';
        } else {
          return 'bottom-right';
        }
      } else {
        if (left) {
          return 'top-left';
        } else {
          return 'top-right';
        }
      }
      break;
    case 'top-left':
      bottom = checkFitPositionBottom(ctx, width, height) > checkFitPositionTop(ctx, width, height);
      right = checkFitAlignLeft(ctx, width, height) < checkFitAlignRight(ctx, width, height);
      if (bottom) {
        if (right) {
          return 'bottom-right';
        } else {
          return 'bottom-left';
        }
      } else {
        if (right) {
          return 'top-right';
        } else {
          return 'top-left';
        }
      }
  }
};

adjustHeight = function(ctx, width, height) {
  var scroll;
  if (height >= ctx.view_rect.height) {
    scroll = 'scroll';
    height = ctx.view_rect.height;
  }
  return [scroll, height];
};

getAlignDirections = function(align_key) {
  var a, bottom, down, left, right, top, up;
  a = align_key.split('-');
  right = a[0] === 'right';
  left = a[0] === 'left';
  down = a[1] === 'down';
  up = a[1] === 'up';
  bottom = a[0] === 'bottom';
  top = a[0] === 'top';
  return [left, right, bottom, top, up, down];
};

getPosition = function(width, height, ctx, align_key) {
  var x, y;
  x = y = 0;
  switch (align_key) {
    case 'right-down':
      x = ctx.x + ctx.width;
      y = ctx.sel_y;
      break;
    case 'right-up':
      x = ctx.x + ctx.width;
      y = ctx.sel_y + ctx.dim - height;
      break;
    case 'left-down':
      x = ctx.x - width;
      y = ctx.sel_y;
      break;
    case 'left-up':
      x = ctx.x - width;
      y = ctx.sel_y + ctx.dim - height;
      break;
    case 'bottom-right':
      x = ctx.sel_x;
      y = ctx.y + ctx.height;
      break;
    case 'bottom-left':
      x = (ctx.sel_x + ctx.sel_w) - width;
      y = ctx.y + ctx.height;
      break;
    case 'top-right':
      x = ctx.sel_x;
      y = ctx.y - height;
      break;
    case 'top-left':
      x = (ctx.sel_x + ctx.sel_w) - width;
      y = ctx.y - height;
      break;
    default:
      throw new Error('invalid align key');
  }
  return [x, y];
};

clampPosition = function(ctx, x, y, width, height) {
  var offset_x, offset_y;
  offset_x = 0;
  offset_y = 0;
  if (x + width > ctx.view_rect.right) {
    offset_x = ctx.view_rect.right - (x + width);
  } else if (x < ctx.view_rect.left) {
    offset_x = ctx.view_rect.left - x;
  }
  if (y + height > ctx.view_rect.bottom) {
    offset_y = ctx.view_rect.bottom - (y + height);
  } else if (y < ctx.view_rect.top) {
    offset_y = ctx.view_rect.top - y;
  }
  
    // log offset_x,offset_y
  return [offset_x, offset_y];
};




/***/ }),

/***/ "./components/Box.coffee":
/*!*******************************!*\
  !*** ./components/Box.coffee ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _LayoutContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LayoutContext */ "./components/LayoutContext.coffee");
/* harmony import */ var _BoxContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BoxContext */ "./components/BoxContext.coffee");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "classnames");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Align__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Align */ "./components/Align.coffee");
var Box, MIN_HEIGHT, h;











h = react__WEBPACK_IMPORTED_MODULE_0__["createElement"];

MIN_HEIGHT = 100;

Box = function(props, state) {
  var align_key, content_height, content_ref, context, height, offset_x, offset_y, ref, self_context, self_height, self_ref, self_width, self_x, self_y, setHeight, setVisible, style, visible, x, y;
  // [self_context,setSelfContext] = useState()
  [visible, setVisible] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  [height, setHeight] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  self_ref = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  content_ref = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  style = {};
  context = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_LayoutContext__WEBPACK_IMPORTED_MODULE_1__["default"]);
  self_context = {};
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function() {
    if (!visible) {
      return setVisible(true);
    }
  });
  if (!context) {
    return null;
  }
  style = {};
  self_width = props.width || 320;
  content_height = ((ref = content_ref.current) != null ? ref.scrollHeight : void 0) || MIN_HEIGHT;
  [style.overflowY, self_height] = Object(_Align__WEBPACK_IMPORTED_MODULE_4__["adjustHeight"])(context, self_width, content_height);
  style.minHeight = MIN_HEIGHT;
  style.height = self_height;
  if (props.align) {
    align_key = props.align;
  } else {
    // log 'FORCE ALIGN FOR ',context.selected_label,' : ',align_key
    align_key = Object(_Align__WEBPACK_IMPORTED_MODULE_4__["guessAlign"])(self_width, self_height, context);
    // log 'GUESSED ALIGN FOR ',context.selected_label,' : ',align_key
    [x, y] = Object(_Align__WEBPACK_IMPORTED_MODULE_4__["getPosition"])(self_width, self_height, context, align_key);
    align_key = Object(_Align__WEBPACK_IMPORTED_MODULE_4__["fixAlign"])(align_key, context, self_width, self_height);
  }
  // log 'FIX ALIGN FOR ',context.selected_label,' : ',align_key
  if (props.position) {
    self_x = props.position[0];
    self_y = props.position[1];
  } else {
    [self_x, self_y] = Object(_Align__WEBPACK_IMPORTED_MODULE_4__["getPosition"])(self_width, self_height, context, align_key);
    // log self_x,self_y
    [offset_x, offset_y] = Object(_Align__WEBPACK_IMPORTED_MODULE_4__["clampPosition"])(context, self_x, self_y, self_width, self_height);
    self_x += offset_x;
    self_y += offset_y;
  }
  // [self_width]

  // style.zIndex = props.select && 666 || 1
  style.zIndex = context.depth + 1 + 888;
  style.left = self_x + 'px';
  style.top = self_y + 'px';
  style.width = self_width;
  return h('div', {
    ref: self_ref,
    style: style,
    className: classnames__WEBPACK_IMPORTED_MODULE_3___default()('ed-box', !visible && 'ed-hidden')
  }, h('div', {
    cn: 'ed-box-inner',
    ref: content_ref
  }, props.title && (h('div', {
    className: 'ed-box-title'
  }, '~* ' + props.title + ' *~')) || null, props.description && (h('div', {
    className: 'ed-description'
  }, props.description)) || null, h('div', {
    className: 'ed-box-content'
  }, h(_BoxContext__WEBPACK_IMPORTED_MODULE_2__["default"].Provider, {
    value: self_context
  }, props.children))));
};

/* harmony default export */ __webpack_exports__["default"] = (Box);


/***/ }),

/***/ "./components/BoxContext.coffee":
/*!**************************************!*\
  !*** ./components/BoxContext.coffee ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var context, createContext;

({createContext} = __webpack_require__(/*! react */ "react"));

context = createContext({
  dispatch: null
});

/* harmony default export */ __webpack_exports__["default"] = (context);


/***/ }),

/***/ "./components/Divider.coffee":
/*!***********************************!*\
  !*** ./components/Divider.coffee ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var SectionLabel;

SectionLabel = function(props, state) {};

/* harmony default export */ __webpack_exports__["default"] = (SectionLabel);


/***/ }),

/***/ "./components/In.coffee":
/*!******************************!*\
  !*** ./components/In.coffee ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "classnames");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _BoxContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BoxContext */ "./components/BoxContext.coffee");
/* harmony import */ var parse_color__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! parse-color */ "./node_modules/parse-color/index.js");
/* harmony import */ var parse_color__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(parse_color__WEBPACK_IMPORTED_MODULE_3__);
var In, LineChart, h, initial_state, reducer, renderChart;









h = react__WEBPACK_IMPORTED_MODULE_0__["createElement"];

renderChart = function(state, props) {
  var ctx, i, pan_diff, pan_x, r_height, r_left, r_top, r_width, rect, step, x_length, x_max, x_min, x_val, y_pan, y_range, y_val;
  ({ctx, rect, pan_x} = state);
  if (!ctx) {
    return;
  }
  y_pan = props.yRange[0];
  y_range = props.yRange[1] - props.yRange[0];
  pan_x = pan_x * -1;
  step = props.step;
  x_max = props.xBounds[1] + Math.floor(pan_x / step) * step;
  x_min = Math.max(x_max - props.xRange, props.xBounds[0]);
  x_length = Math.max(x_max - x_min, 0);
  pan_diff = pan_x - Math.floor(pan_x / step) * step;
  
  // log x_min,'-',x_max
  ctx.clearRect(0, 0, rect.width, rect.height);
  ctx.beginPath();
  ctx.fillStyle = props.color || 'white';
  ctx.strokeStyle = props.color || 'white';
  ctx.lineWidth = 1;
  i = -1;
  while (i < (x_length / step)) {
    i += 1;
    x_val = x_min + (i * step);
    y_val = props.getY(x_val);
    if (!y_val) {
      continue;
    }
    r_left = rect.width / props.xRange * (i * step - pan_diff);
    r_top = rect.height - (rect.height / y_range * (y_val - y_pan));
    if (props.chart_type === 'bar') {
      r_width = rect.width / props.xRange;
      r_height = rect.height / y_range * y_val;
      ctx.rect(r_left, r_top, r_width, r_height);
    } else if (props.chart_type === 'line') {
      ctx.lineTo(r_left, r_top);
    }
  }
  
  // ctx.closePath()
  if (props.chart_type === 'bar') {
    return ctx.fill();
  } else {
    return ctx.stroke();
  }
};

LineChart = function(props) {
  var canvas, canvas_ref, canvas_state, rect, setRect, setTickStep, tick_step, wrap_ref;
  wrap_ref = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  canvas_ref = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  canvas_state = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])({
    pan_x: 0
  });
  [rect, setRect] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  [tick_step, setTickStep] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function() {
    if (wrap_ref.current) {
      rect = wrap_ref.current.getBoundingClientRect();
      canvas_state.current.rect = rect;
      return setRect(rect);
    }
  }, [wrap_ref.current]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function() {
    if (canvas_ref.current) {
      log('set canvas context');
      canvas_state.current.ctx = canvas_ref.current.getContext('2d');
      setTickStep(0);
    }
  }, [canvas_ref.current]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function() {
    var error;
    try {
      renderChart(canvas_state.current, props);
    } catch (error1) {
      error = error1;
      console.error(error);
      return;
    }
  // setTimeout ()->
  // 	if !canvas_ref.current
  // 		return
  // 	setTickStep(tick_step+1)
  // ,100
  }, [tick_step]);
  if (rect) {
    canvas = h('canvas', {
      ref: canvas_ref,
      width: rect.width,
      height: rect.height,
      onMouseDown: function(e) {
        var onDrag, onDragEnd;
        canvas_state.current.cx = e.clientX;
        onDrag = function(e) {
          var diff_x, pan_x, x, y, y_d, y_min_d;
          x = e.clientX;
          y = e.clientY;
          rect = canvas_ref.current.getBoundingClientRect();
          y_d = Math.abs(y - (rect.top + (rect.bottom - rect.top) / 2));
          y_min_d = rect.height / 2;
          if (y_d > y_min_d) {
            y_d = 1 + (y_d - y_min_d) * .1;
          } else {
            y_d = 1;
          }
          diff_x = (x - canvas_state.current.cx) / (rect.width / props.xRange);
          canvas_state.current.cx = x;
          // log (canvas_state.current.pan_x + diff_x)
          pan_x = Math.min(Math.max(0, canvas_state.current.pan_x + diff_x * y_d), props.xBounds[1] - props.xBounds[0] - props.xRange);
          // log pan_x
          canvas_state.current.pan_x = pan_x;
          // log pan_x

          // log pan_x
          requestAnimationFrame(renderChart.bind(null, canvas_state.current, props));
          e.preventDefault();
          e.stopPropagation();
          return false;
        };
        onDragEnd = function(e) {
          e.preventDefault();
          e.stopPropagation();
          document.body.style.cursor = 'default';
          document.body.removeEventListener('mousemove', onDrag);
          document.body.removeEventListener('mouseup', onDragEnd);
          return false;
        };
        document.body.style.cursor = 'ew-resize';
        document.body.addEventListener('mousemove', onDrag);
        return document.body.addEventListener('mouseup', onDragEnd);
      }
    });
  }
  // e.preventDefault()
  // e.stopPropagation()
  // return false
  return h('div', {
    className: 'ed-full-w',
    ref: wrap_ref
  }, canvas);
};

reducer = function(state, action) {
  // if action.type == 'dragstart'
  // 	return
  // 		start_range_slider_x: action.start_range_slider_x
  // 		drag_start_client_x: action.drag_start_client_x
  if (action.type === 'set-color-input') {
    return {
      color_input_value: action.value
    };
  } else if (action.type === 'slide-rect') {
    return {
      range_rect: action.value
    };
  } else if (action.type === 'text') {
    return {
      text_value: action.value
    };
  } else if (action.type === 'rangeslide') {
    return {
      range_slider_x: action.range_slider_x
    };
  }
};

initial_state = {
  text: null,
  range_slider_x: 0,
  color_input_value: null
};

In = function(props) {
  var context, dispatch, input, input_ref, isDragging, is_dragging, label, max, min, options, outer_range_ref, props_range_value, props_value, range_rect, range_slider_x, setStepValue, slider_state_ref, state, step_value, value_alpha, value_label;
  [state, dispatch] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useReducer"])(reducer, initial_state);
  [is_dragging, isDragging] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  [step_value, setStepValue] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(void 0);
  context = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_BoxContext__WEBPACK_IMPORTED_MODULE_2__["default"]);
  outer_range_ref = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  slider_state_ref = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])({});
  input_ref = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  if (props.label) {
    label = h('div', {
      className: 'ed-in-label ed-flex-right'
    }, props.label, h('div', {
      className: 'ed-in-label-colon'
    }, ':'));
  }
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function() {
    if (props.value !== state.color_input_value && props.type === 'color') {
      dispatch({
        type: 'set-color-input',
        value: props.value
      });
    }
    if (props.step != null) {
      if (Math.floor(step_value / props.step) * props.step !== Math.floor(props.value / props.step) * props.step) {
        return setStepValue(props.value);
      }
    }
  }, [props.value]);
  switch (props.type) {
    case 'plain':
      input = h('div', {
        className: 'ed-label full-w'
      }, props.value);
      break;
    case 'text':
      input = h('input', {
        type: 'text',
        className: 'ed-input',
        onChange: function(e) {
          if (props.commit || context.dispatch) {
            dispatch({
              type: 'text',
              value: e.target.value
            });
          }
          if (context.dispatch) {
            context.dispatch({
              type: 'text',
              value: e.target.value
            });
          }
          if (!props.commit && !context.commit && props.set) {
            return props.set(e.target.value);
          }
        },
        value: props.value
      });
      break;
    case 'toggle':
      input = h('div', {
        className: 'ed-toggle-outer',
        onClick: function() {
          if (props.commit || context.dispatch) {
            dispatch({
              type: 'toggle',
              value: !props.value
            });
          }
          if (context.dispatch) {
            context.dispatch({
              type: 'toggle',
              value: !props.value
            });
          }
          if (!props.commit && !context.commit && props.set) {
            return props.set(!props.value);
          }
        }
      }, h('div', {
        className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('ed-toggle-inner', props.value && 'ed-toggle-active'),
        style: {
          backgroundColor: props.value && props.color || void 0
        }
      }));
      break;
    case 'range':
      if (outer_range_ref.current) {
        range_rect = outer_range_ref.current.getBoundingClientRect();
        props_value = Number(props.value) || 1;
        if (props.step != null) {
          props_value = Math.floor(step_value / props.step) * props.step;
        }
        max = props.max || 1;
        min = props.min || 0;
        props_value = Math.min(Math.max(props_value, min), max);
        value_alpha = (props_value - min) / (max - min);
        range_slider_x = value_alpha * (range_rect.width - 6);
        if (props.step != null) {
          slider_state_ref.current.range_slider_x = ((step_value - min) / (max - min)) * (range_rect.width - 6);
        } else {
          slider_state_ref.current.range_slider_x = range_slider_x;
        }
      } else {
        range_slider_x = 0;
      }
      props_range_value = Number(props.value).toFixed(props.toFixed != null ? props.toFixed : 2);
      value_label = h('div', {
        className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('ed-range-value', value_alpha > .5 && 'ed-range-value-left', props.snapValueToEdge && 'ed-range-value-snap')
      }, props_range_value);
      input = h('div', {
        className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('ed-range-outer'),
        ref: outer_range_ref,
        style: {
          color: props.color != null ? props.color : void 0
        },
        onMouseDown: function(e) {
          var onDrag, onDragEnd;
          slider_state_ref.current.cx = e.clientX;
          onDrag = function(e) {
            var diff_x, new_value, value, x, y, y_d, y_min_d;
            range_rect = outer_range_ref.current.getBoundingClientRect();
            x = e.clientX;
            y = e.clientY;
            y_d = Math.abs(y - (range_rect.top + (range_rect.bottom - range_rect.top) / 2));
            y_min_d = range_rect.height / 2;
            if (y_d > y_min_d) {
              y_d = 1 + (y_d - y_min_d) * .1;
            } else {
              y_d = 1;
            }
            diff_x = (x - slider_state_ref.current.cx) / y_d;
            slider_state_ref.current.cx = x;
            range_slider_x = Math.min(Math.max(0, slider_state_ref.current.range_slider_x + diff_x), range_rect.width - 6);
            value_alpha = range_slider_x / (range_rect.width - 6);
            min = props.min || 0;
            max = props.max || 1;
            value = min + (max - min) * value_alpha;
            if (props.step != null) {
              new_value = Math.floor(value / props.step) * props.step;
              setStepValue(value);
              if (new_value !== props.value) {
                props.set(Math.min(Math.max(new_value, min), max));
              }
            } else {
              props.set(value);
            }
            e.preventDefault();
            e.stopPropagation();
            return false;
          };
          onDragEnd = function(e) {
            e.preventDefault();
            e.stopPropagation();
            document.body.style.cursor = 'default';
            document.body.removeEventListener('mousemove', onDrag);
            document.body.removeEventListener('mouseup', onDragEnd);
            return false;
          };
          document.body.style.cursor = 'ew-resize';
          document.body.addEventListener('mousemove', onDrag);
          return document.body.addEventListener('mouseup', onDragEnd);
        }
      }, h('div', {
        className: 'ed-range-slider',
        style: {
          transform: `translate(${range_slider_x}px,${0}%)`,
          backgroundColor: props.color != null ? props.color : void 0
        }
      }, !props.snapValueToEdge && value_label || void 0), props.snapValueToEdge && value_label || void 0);
      break;
    case 'button':
      input = h('button', {
        className: 'ed-button',
        onClick: function(e) {
          return props.onSelect(e);
        }
      }, props.value || 'button');
      break;
    case 'color':
      input = h('div', {
        className: 'ed-flex-right ed-full-w'
      }, h('div', {
        className: 'ed-color-box',
        style: {
          background: props.value
        }
      }, h('input', {
        ref: input_ref,
        className: 'ed-color-box-input',
        onChange: function(e) {
          if (!context.commit && props.set) {
            return props.set(e.target.value);
          }
        },
        type: 'color'
      })), h('input', {
        type: 'text',
        className: 'ed-input',
        value: state.color_input_value || '',
        onChange: function(e) {
          var parsed_color;
          parsed_color = parse_color__WEBPACK_IMPORTED_MODULE_3___default()(e.target.value);
          if (parsed_color.hex) {
            return typeof props.set === "function" ? props.set(e.target.value) : void 0;
          } else {
            return dispatch({
              type: 'set-color-input',
              value: e.target.value
            });
          }
        }
      }));
      break;
    case 'select':
      // value_exists = false
      options = Object.keys(props.options).map(function(key) {
        return h('option', {
          key: key,
          value: key
        }, props.options[key]);
      });
      if (!props.options[props.value]) {
        options.unshift(h('option', {
          key: '-',
          value: null
        }, props.value || '-'));
      }
      input = h('div', {
        className: 'ed-flex-right ed-full-w'
      }, h('select', {
        className: 'ed-input-select',
        value: props.value || '[select]',
        onChange: (e) => {
          return typeof props.set === "function" ? props.set(e.target.value) : void 0;
        }
      }, options), h('div', {
        className: 'ed-input-select-arrow'
      }, '▼'));
      break;
    case 'line-chart':
      input = h('div', {
        className: 'ed-line-chart'
      }, h(LineChart, props));
      break;
    default:
      throw new Error('invalid input type');
  }
  if (props.type === 'line-chart') {
    return h('div', {
      className: 'ed-in-wrap ed-line-chart-wrap'
    }, h('div', {
      className: 'ed-line-chart-label'
    }, label), input);
  }
  return h('div', {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('ed-in-wrap', props.half && 'ed-in-half', props.type === 'plain' && 'ed-tight')
  }, label, h('div', {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('ed-input-wrap', props.half && 'ed-in-half')
  }, input));
};

/* harmony default export */ __webpack_exports__["default"] = (In);


/***/ }),

/***/ "./components/Layout.coffee":
/*!**********************************!*\
  !*** ./components/Layout.coffee ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "classnames");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _LayoutContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LayoutContext */ "./components/LayoutContext.coffee");
var Layout, h;



h = react__WEBPACK_IMPORTED_MODULE_0__["createElement"];





Layout = function(props, state) {
  var context, layout_ref, setContext;
  layout_ref = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])();
  [context, setContext] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function() {
    var onWindowResize;
    if (!context) {
      onWindowResize = function() {
        var view_rect;
        view_rect = layout_ref.current.getBoundingClientRect();
        return setContext({
          depth: 0,
          dim: props.dim || 24,
          wpad: props.wpad || 12,
          root: true,
          selected_label: 'root',
          view_rect: view_rect,
          getLabelWidth: props.getLabelWidth
        });
      };
      onWindowResize();
      window.addEventListener('resize', onWindowResize);
    }
    return function() {
      return window.removeEventListener('resize', onWindowResize);
    };
  }, []);
  return h(_LayoutContext__WEBPACK_IMPORTED_MODULE_2__["default"].Provider, {
    value: context
  }, h('div', {
    ref: layout_ref,
    className: 'ed-layout'
  }, props.children));
};

/* harmony default export */ __webpack_exports__["default"] = (Layout);


/***/ }),

/***/ "./components/LayoutContext.coffee":
/*!*****************************************!*\
  !*** ./components/LayoutContext.coffee ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var context, createContext;

({createContext} = __webpack_require__(/*! react */ "react"));

context = createContext({
  root: true
});

/* harmony default export */ __webpack_exports__["default"] = (context);


/***/ }),

/***/ "./components/Menu.coffee":
/*!********************************!*\
  !*** ./components/Menu.coffee ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "classnames");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _LayoutContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LayoutContext */ "./components/LayoutContext.coffee");
/* harmony import */ var _Align__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Align */ "./components/Align.coffee");
var Menu, h;



h = react__WEBPACK_IMPORTED_MODULE_0__["createElement"];







Menu = function(props) {
  var align_key, context, label_keys, label_widths, labels, max_label_width, offset_x, offset_y, selected_child, selected_label_index, selected_label_x, self_context, self_height, self_width, self_x, self_y, style, total_label_width, vert, x, y;
  context = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_LayoutContext__WEBPACK_IMPORTED_MODULE_2__["default"]);
  self_context = Object.assign({}, context, {
    root: false,
    vert: props.vert,
    depth: (context != null ? context.depth : void 0) + 1
  });
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function() {
    return function() {
      // log 'DECELECT'
      return props.onSelect(void 0, void 0);
    };
  }, []);
  if (!context) {
    return null;
  }
  
  // log 'PASSED DOWN CONTEXT',context.selected_label,context
  label_keys = Object.keys(props.items);
  max_label_width = 0;
  total_label_width = 0;
  selected_label_index = -1;
  selected_label_x = 0;
  label_widths = label_keys.map(function(key, i) {
    var width;
    if (key === props.select) {
      selected_label_index = i;
      selected_label_x = total_label_width;
    }
    width = context.getLabelWidth(key);
    if (width > max_label_width) {
      max_label_width = width;
    }
    total_label_width += width + context.wpad * 2;
    return width + context.wpad * 2;
  });
  vert = props.vert;
  if (vert) {
    self_height = context.dim * label_keys.length;
    self_width = max_label_width + context.wpad * 2;
  } else {
    self_height = context.dim;
    self_width = total_label_width;
  }
  if (props.align) {
    align_key = props.align;
  } else {
    // log 'FORCE ALIGN FOR ',context.selected_label,' : ',align_key
    align_key = Object(_Align__WEBPACK_IMPORTED_MODULE_3__["guessAlign"])(self_width, self_height, context);
    // log 'GUESSED ALIGN FOR ',context.selected_label,' : ',align_key
    [x, y] = Object(_Align__WEBPACK_IMPORTED_MODULE_3__["getPosition"])(self_width, self_height, context, align_key);
    align_key = Object(_Align__WEBPACK_IMPORTED_MODULE_3__["fixAlign"])(align_key, context, self_width, self_height);
  }
  // log 'FIX ALIGN FOR ',context.selected_label,' : ',align_key
  if (props.position) {
    self_x = props.position[0];
    self_y = props.position[1];
  } else {
    [self_x, self_y] = Object(_Align__WEBPACK_IMPORTED_MODULE_3__["getPosition"])(self_width, self_height, context, align_key);
    // log 'GOT POSITION FOR',context.selected_label,'[',self_x,',',self_y,']'
    [offset_x, offset_y] = Object(_Align__WEBPACK_IMPORTED_MODULE_3__["clampPosition"])(context, self_x, self_y, self_width, self_height);
    self_x += offset_x;
    self_y += offset_y;
  }
  style = {};
  style.zIndex = props.select && 666 || 1;
  style.zIndex += self_context.depth;
  style.left = self_x + 'px';
  style.top = self_y + 'px';
  // if offset_x || offset_y
  // 	style.transform = "translate(#{offset_x}px,#{offset_y}px)"
  self_context.width = self_width;
  self_context.height = self_height;
  self_context.x = self_x;
  self_context.y = self_y;
  self_context.vert = props.vert;
  self_context.align = align_key;
  self_context.selected_label = props.select;
  if (props.vert) {
    self_context.sel_x = self_x;
    self_context.sel_y = self_y + context.dim * selected_label_index;
  } else {
    self_context.sel_x = self_x + selected_label_x;
    self_context.sel_y = self_y;
  }
  self_context.sel_w = label_widths[selected_label_index];
  selected_child = null;
  if (props.items) {
    labels = label_keys.map(function(key, i) {
      var child, title;
      child = props.items[key];
      if (!child) {
        return null;
      }
      if (child.onClick) {
        return h('div', {
          key: key,
          className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('ed-menu-item-label', props.select === key && 'ed-selected', 'noselect'),
          onClick: child.onClick
        }, key);
      }
      title = key + '-' + i;
      label_keys.push(key);
      if (props.select === key) {
        if (typeof child === 'function') {
          selected_child = child();
        } else {
          selected_child = child;
        }
      }
      return h('div', {
        key: key,
        title: title,
        onClick: props.onSelect && (function(e) {
          if (e.target.title !== title) {
            return;
          }
          if (props.select === key) {
            props.onSelect(void 0);
          } else {
            props.onSelect(key);
          }
          e.stopPropagation();
          e.preventDefault();
          return false;
        }) || void 0,
        className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('ed-menu-item-label', props.select === key && 'ed-selected', 'noselect')
      }, key);
    });
  }
  return h('div', {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('ed-menu', props.vert && 'ed-flex-down' || 'ed-flex-right'),
    style: style
  }, h('div', {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('ed-menu-labels', props.vert && 'ed-flex-down' || 'ed-flex-right')
  }, labels), h(_LayoutContext__WEBPACK_IMPORTED_MODULE_2__["default"].Provider, {
    value: self_context
  }, selected_child));
};

/* harmony default export */ __webpack_exports__["default"] = (Menu);


/***/ }),

/***/ "./components/Row.coffee":
/*!*******************************!*\
  !*** ./components/Row.coffee ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var Row;

Row = function(props, state) {};

/* harmony default export */ __webpack_exports__["default"] = (Row);


/***/ }),

/***/ "./components/Section.coffee":
/*!***********************************!*\
  !*** ./components/Section.coffee ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "classnames");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _LayoutContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LayoutContext */ "./components/LayoutContext.coffee");
var Section, h;



h = react__WEBPACK_IMPORTED_MODULE_0__["createElement"];





Section = function(props, state) {
  var section_bar;
  if (props.visible) {
    section_bar = h('div', {
      className: 'ed-section-bar'
    });
  }
  return h('div', {
    className: 'ed-section ed-flex-down ed-full-w'
  }, section_bar, h('div', {
    className: 'ed-section-title ed-flex-right',
    onClick: function() {
      return typeof props.set === "function" ? props.set(!props.visible) : void 0;
    }
  }, h('div', {
    className: 'ed-section-label ed-flex-right ed-full-w'
  }, h('div', {
    className: 'ed-in-label-colon'
  }, '# '), props.label, h('div', {
    className: 'ed-section-label-toggle'
  }, props.visible && ' -' || ' +'))), props.visible && (h('div', {
    className: 'ed-section-content ed-flex-down ed-full-w'
  }, props.children)) || null, props.visible && (h('div', {
    className: 'ed-section-end-label'
  }, '-*-')) || null);
};

/* harmony default export */ __webpack_exports__["default"] = (Section);


/***/ }),

/***/ "./components/Style.less":
/*!*******************************!*\
  !*** ./components/Style.less ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!../node_modules/less-loader/dist/cjs.js!./Style.less */ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./components/Style.less");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./components/index.coffee":
/*!*********************************!*\
  !*** ./components/index.coffee ***!
  \*********************************/
/*! exports provided: Box, In, Layout, Menu, Row, Divider, Section */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Style_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Style.less */ "./components/Style.less");
/* harmony import */ var _Style_less__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Style_less__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Layout */ "./components/Layout.coffee");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Layout", function() { return _Layout__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _Menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Menu */ "./components/Menu.coffee");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Menu", function() { return _Menu__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _Box__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Box */ "./components/Box.coffee");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Box", function() { return _Box__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _In__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./In */ "./components/In.coffee");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "In", function() { return _In__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _Section__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Section */ "./components/Section.coffee");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Section", function() { return _Section__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _Divider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Divider */ "./components/Divider.coffee");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Divider", function() { return _Divider__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _Row__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Row */ "./components/Row.coffee");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Row", function() { return _Row__WEBPACK_IMPORTED_MODULE_7__["default"]; });




















/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./components/Style.less":
/*!************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./components/Style.less ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".noselect {\n  -webkit-touch-callout: none;\n  /* iOS Safari */\n  -webkit-user-select: none;\n  /* Safari */\n  -khtml-user-select: none;\n  /* Konqueror HTML */\n  -moz-user-select: none;\n  /* Old versions of Firefox */\n  -ms-user-select: none;\n  /* Internet Explorer/Edge */\n  user-select: none;\n  /* Non-prefixed version, currently\n                                  supported by Chrome, Edge, Opera and Firefox */\n}\n.ed-layout {\n  z-index: 100;\n  transform: translate(0, 0);\n  font-family: 'DM Mono', monospace;\n  font-size: 0.85em;\n  color: #bbbbbb;\n  position: fixed;\n  top: 0px;\n  left: 0px;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  pointer-events: none;\n}\n.ed-layout * {\n  pointer-events: all;\n  box-sizing: border-box;\n}\n.ed-full-w {\n  width: 100%;\n}\n.ed-flex-left,\n.ed-input-wrap {\n  display: flex;\n  flex-wrap: wrap;\n  flex-direction: row-reverse;\n  align-items: center;\n  justify-content: flex-end;\n}\n.ed-flex-right,\n.ed-in-wrap {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: flex-start;\n}\n.ed-flex-down {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  justify-content: flex-start;\n}\n.ed-in-wrap {\n  font-size: 0.9em;\n  width: 100%;\n  padding: 0px 0.425em;\n  min-height: 24px;\n  flex-wrap: nowrap;\n  margin-bottom: 0.255em;\n}\n.ed-in-wrap.ed-in-half {\n  width: 50%;\n}\n.ed-in-wrap.ed-tight {\n  min-height: 16px;\n}\n.ed-input-wrap {\n  width: 150%;\n}\n.ed-input-wrap.ed-in-half {\n  width: fit-content;\n}\n.ed-in-label {\n  width: 100%;\n  margin-right: 0.25em;\n  white-space: normal;\n  text-align: -webkit-right;\n  align-items: flex-end;\n  justify-content: flex-end;\n  word-break: break-all;\n}\n.ed-in-label-colon {\n  color: #6b6b6b;\n}\n.ed-input {\n  width: inherit;\n  line-height: 24px;\n  height: 24px;\n  -webkit-appearance: none;\n  outline: none;\n  color: #bbbbbb;\n  background-color: rgba(27, 27, 27, 0.95);\n  border: none;\n  border-radius: none;\n  padding: 0px 0.425em;\n}\n.ed-toggle-outer {\n  width: 24px;\n  cursor: pointer;\n  height: 24px;\n  background-color: rgba(27, 27, 27, 0.95);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.ed-toggle-outer .ed-toggle-inner {\n  width: 12px;\n  height: 12px;\n  border-radius: 6px;\n  background-color: rgba(27, 27, 27, 0.9);\n}\n.ed-toggle-outer .ed-toggle-inner.ed-toggle-active {\n  background: #bbbbbb;\n}\n.ed-box-title {\n  padding: 0.425em;\n  text-align: center;\n  width: 100%;\n  text-transform: uppercase !important;\n}\n.ed-box-content {\n  display: flex;\n  align-self: start;\n  justify-content: start;\n  flex-direction: row;\n  flex-wrap: wrap;\n  padding-bottom: 0.85em;\n}\n.ed-scroll::-webkit-scrollbar {\n  -webkit-appearance: none;\n  background-color: rgba(27, 27, 27, 0.95);\n  width: 4px;\n  height: 4px;\n  border-radius: 0px;\n}\n.ed-scroll::-webkit-scrollbar-corner {\n  background-color: rgba(27, 27, 27, 0.95);\n}\n.ed-scroll::-webkit-scrollbar-thumb {\n  border-radius: 0px;\n  background-color: #7F7F7F;\n}\n.ed-scroll::-webkit-scrollbar-thumb:hover {\n  background-color: #8F8F8F;\n}\n.ed-box {\n  backdrop-filter: blur(10px);\n  background-color: rgba(27, 27, 27, 0.9);\n  color: #bbbbbb;\n  position: fixed;\n  width: 320px;\n  flex-wrap: nowrap;\n}\n.ed-box.ed-scroll {\n  overflow-y: scroll;\n  overflow-x: hidden;\n  width: 324px;\n}\n.ed-box .ed-description {\n  padding: 0px 0.85em;\n  font-size: 0.8em;\n  color: #8d8d8d;\n  margin: 0.85em 0px;\n  white-space: normal;\n}\n.ed-menu-child-wrapper {\n  position: relative;\n  left: -100%;\n  top: 12px;\n}\n.ed-menu {\n  color: #bbbbbb;\n  flex-wrap: nowrap;\n  width: fit-content;\n  height: fit-content;\n  position: fixed;\n  top: 0px;\n  left: 0px;\n}\n.ed-menu.ed-scroll {\n  overflow-y: scroll;\n  overflow-x: hidden;\n}\n.ed-menu.ed-flex-down > .ed-menu-item {\n  width: -webkit-fill-available;\n  height: auto;\n}\n.ed-menu.ed-flex-right > .ed-menu-item {\n  height: -webkit-fill-available;\n  width: auto;\n}\n.ed-menu .ed-menu-labels {\n  background-color: rgba(27, 27, 27, 0.9);\n  backdrop-filter: blur(10px);\n}\n.ed-menu .ed-menu-item-label {\n  white-space: pre;\n  width: -webkit-fill-available;\n  height: 24px;\n  text-transform: uppercase;\n  display: flex;\n  align-items: center;\n  color: #8d8d8d;\n  cursor: pointer;\n  padding: 0px 12px;\n}\n.ed-menu .ed-menu-item-label.ed-selected {\n  background-color: rgba(27, 27, 27, 0.95);\n  backdrop-filter: blur(10px);\n  color: #bbbbbb;\n}\n.ed-menu .ed-menu-item-label:hover {\n  color: #bbbbbb;\n}\n.ed-menu .ed-menu-item {\n  position: relative;\n}\n.ed-hidden {\n  visibility: hidden;\n}\n.ed-range-outer {\n  height: 24px;\n  width: 100%;\n  background: rgba(27, 27, 27, 0.95);\n  position: relative;\n  cursor: ew-resize;\n}\n.ed-range-outer .ed-range-slider {\n  width: 6px;\n  height: 24px;\n  background: #bbbbbb;\n}\n.ed-range-outer .ed-range-slider.ed-active {\n  background: #bbbbbb;\n}\n.ed-range-outer .ed-range-value {\n  position: absolute;\n  left: 14px;\n  top: 50%;\n  transform: translate(0%, -50%);\n}\n.ed-range-outer .ed-range-value.ed-range-value-snap {\n  right: 8px;\n  left: initial;\n}\n.ed-range-outer .ed-range-value.ed-range-value-left {\n  right: 14px;\n  left: initial;\n}\n.ed-range-outer .ed-range-value.ed-range-value-left.ed-range-value-snap {\n  left: 8px;\n  right: initial;\n}\n.ed-button {\n  outline: none;\n  -webkit-appearance: none;\n  border: none;\n  cursor: pointer;\n  width: 100%;\n  height: 24px;\n  background: rgba(27, 27, 27, 0.95);\n  color: #8d8d8d;\n}\n.ed-button:hover {\n  color: #bbbbbb;\n}\n.ed-color-box {\n  position: relative;\n  -webkit-appearance: none;\n  width: 48px;\n  height: 24px;\n  flex-shrink: 0;\n  cursor: pointer;\n  margin-right: 0.255em;\n  border: 3px solid black;\n}\n.ed-color-box .ed-color-box-input {\n  visibility: visible;\n  opacity: 0;\n  cursor: pointer;\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  padding: 0px;\n  left: 0px;\n  top: 0px;\n}\n.ed-value-box {\n  width: 100%;\n  height: 24px;\n  background-color: rgba(27, 27, 27, 0.9);\n  margin-left: 0.153em;\n  line-height: 24px;\n  padding: 0px 0.425em;\n}\n.ed-section {\n  margin: 0px;\n  position: relative;\n}\n.ed-section-title {\n  min-height: 24px;\n  cursor: pointer;\n  white-space: pre;\n  width: 100%;\n  padding: 0.425em;\n  text-transform: uppercase;\n}\n.ed-section-label-toggle {\n  font-size: 1.275em;\n  width: 100%;\n  padding-right: 0.425em;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  justify-content: flex-end;\n}\n.ed-section-end-label {\n  padding: 0.425em;\n  display: flex;\n  width: 100%;\n  flex-direction: row;\n  align-items: center;\n  justify-content: center;\n}\n.ed-input-select {\n  width: 100%;\n  outline: none;\n  -webkit-appearance: none;\n  height: 24px;\n  cursor: pointer;\n  padding: 0px 0.425em;\n  border: none;\n  color: #bbbbbb;\n  background: rgba(27, 27, 27, 0.95);\n}\n.ed-input-select-arrow {\n  position: absolute;\n  right: 14px;\n  color: #6b6b6b;\n  font-family: monospace;\n}\n.ed-line-chart {\n  width: 100%;\n  height: 80px;\n  background: rgba(27, 27, 27, 0.95);\n}\n.ed-line-chart-wrap {\n  flex-direction: column;\n  align-content: flex-start;\n  justify-content: flex-start;\n  align-items: flex-start;\n}\n.ed-line-chart-wrap canvas {\n  cursor: ew-resize;\n  width: 100%;\n  height: 100%;\n}\n.ed-line-chart-label {\n  padding: 0.425em 0px;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "./node_modules/parse-color/index.js":
/*!*******************************************!*\
  !*** ./node_modules/parse-color/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var convert = __webpack_require__(/*! color-convert */ "./node_modules/parse-color/node_modules/color-convert/index.js");

module.exports = function (cstr) {
    var m, conv, parts, alpha;
    if (m = /^((?:rgb|hs[lv]|cmyk|xyz|lab)a?)\s*\(([^\)]*)\)/.exec(cstr)) {
        var name = m[1];
        var base = name.replace(/a$/, '');
        var size = base === 'cmyk' ? 4 : 3;
        conv = convert[base];
        
        parts = m[2].replace(/^\s+|\s+$/g, '')
            .split(/\s*,\s*/)
            .map(function (x, i) {
                if (/%$/.test(x) && i === size) {
                    return parseFloat(x) / 100;
                }
                else if (/%$/.test(x)) {
                    return parseFloat(x);
                }
                return parseFloat(x);
            })
        ;
        if (name === base) parts.push(1);
        alpha = parts[size] === undefined ? 1 : parts[size];
        parts = parts.slice(0, size);
        
        conv[base] = function () { return parts };
    }
    else if (/^#[A-Fa-f0-9]+$/.test(cstr)) {
        var base = cstr.replace(/^#/,'');
        var size = base.length;
        conv = convert.rgb;
        parts = base.split(size === 3 ? /(.)/ : /(..)/);
        parts = parts.filter(Boolean)
            .map(function (x) {
                if (size === 3) {
                    return parseInt(x + x, 16);
                }
                else {
                    return parseInt(x, 16)
                }
            })
        ;
        alpha = 1;
        conv.rgb = function () { return parts };
        if (!parts[0]) parts[0] = 0;
        if (!parts[1]) parts[1] = 0;
        if (!parts[2]) parts[2] = 0;
    }
    else {
        conv = convert.keyword;
        conv.keyword = function () { return cstr };
        parts = cstr;
        alpha = 1;
    }
    
    var res = {
        rgb: undefined,
        hsl: undefined,
        hsv: undefined,
        cmyk: undefined,
        keyword: undefined,
        hex: undefined
    };
    try { res.rgb = conv.rgb(parts) } catch (e) {}
    try { res.hsl = conv.hsl(parts) } catch (e) {}
    try { res.hsv = conv.hsv(parts) } catch (e) {}
    try { res.cmyk = conv.cmyk(parts) } catch (e) {}
    try { res.keyword = conv.keyword(parts) } catch (e) {}
    
    if (res.rgb) res.hex = '#' + res.rgb.map(function (x) {
        var s = x.toString(16);
        if (s.length === 1) return '0' + s;
        return s;
    }).join('');
    
    if (res.rgb) res.rgba = res.rgb.concat(alpha);
    if (res.hsl) res.hsla = res.hsl.concat(alpha);
    if (res.hsv) res.hsva = res.hsv.concat(alpha);
    if (res.cmyk) res.cmyka = res.cmyk.concat(alpha);
    
    return res;
};


/***/ }),

/***/ "./node_modules/parse-color/node_modules/color-convert/conversions.js":
/*!****************************************************************************!*\
  !*** ./node_modules/parse-color/node_modules/color-convert/conversions.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* MIT license */

module.exports = {
  rgb2hsl: rgb2hsl,
  rgb2hsv: rgb2hsv,
  rgb2hwb: rgb2hwb,
  rgb2cmyk: rgb2cmyk,
  rgb2keyword: rgb2keyword,
  rgb2xyz: rgb2xyz,
  rgb2lab: rgb2lab,
  rgb2lch: rgb2lch,

  hsl2rgb: hsl2rgb,
  hsl2hsv: hsl2hsv,
  hsl2hwb: hsl2hwb,
  hsl2cmyk: hsl2cmyk,
  hsl2keyword: hsl2keyword,

  hsv2rgb: hsv2rgb,
  hsv2hsl: hsv2hsl,
  hsv2hwb: hsv2hwb,
  hsv2cmyk: hsv2cmyk,
  hsv2keyword: hsv2keyword,

  hwb2rgb: hwb2rgb,
  hwb2hsl: hwb2hsl,
  hwb2hsv: hwb2hsv,
  hwb2cmyk: hwb2cmyk,
  hwb2keyword: hwb2keyword,

  cmyk2rgb: cmyk2rgb,
  cmyk2hsl: cmyk2hsl,
  cmyk2hsv: cmyk2hsv,
  cmyk2hwb: cmyk2hwb,
  cmyk2keyword: cmyk2keyword,

  keyword2rgb: keyword2rgb,
  keyword2hsl: keyword2hsl,
  keyword2hsv: keyword2hsv,
  keyword2hwb: keyword2hwb,
  keyword2cmyk: keyword2cmyk,
  keyword2lab: keyword2lab,
  keyword2xyz: keyword2xyz,

  xyz2rgb: xyz2rgb,
  xyz2lab: xyz2lab,
  xyz2lch: xyz2lch,

  lab2xyz: lab2xyz,
  lab2rgb: lab2rgb,
  lab2lch: lab2lch,

  lch2lab: lch2lab,
  lch2xyz: lch2xyz,
  lch2rgb: lch2rgb
}


function rgb2hsl(rgb) {
  var r = rgb[0]/255,
      g = rgb[1]/255,
      b = rgb[2]/255,
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      delta = max - min,
      h, s, l;

  if (max == min)
    h = 0;
  else if (r == max)
    h = (g - b) / delta;
  else if (g == max)
    h = 2 + (b - r) / delta;
  else if (b == max)
    h = 4 + (r - g)/ delta;

  h = Math.min(h * 60, 360);

  if (h < 0)
    h += 360;

  l = (min + max) / 2;

  if (max == min)
    s = 0;
  else if (l <= 0.5)
    s = delta / (max + min);
  else
    s = delta / (2 - max - min);

  return [h, s * 100, l * 100];
}

function rgb2hsv(rgb) {
  var r = rgb[0],
      g = rgb[1],
      b = rgb[2],
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      delta = max - min,
      h, s, v;

  if (max == 0)
    s = 0;
  else
    s = (delta/max * 1000)/10;

  if (max == min)
    h = 0;
  else if (r == max)
    h = (g - b) / delta;
  else if (g == max)
    h = 2 + (b - r) / delta;
  else if (b == max)
    h = 4 + (r - g) / delta;

  h = Math.min(h * 60, 360);

  if (h < 0)
    h += 360;

  v = ((max / 255) * 1000) / 10;

  return [h, s, v];
}

function rgb2hwb(rgb) {
  var r = rgb[0],
      g = rgb[1],
      b = rgb[2],
      h = rgb2hsl(rgb)[0],
      w = 1/255 * Math.min(r, Math.min(g, b)),
      b = 1 - 1/255 * Math.max(r, Math.max(g, b));

  return [h, w * 100, b * 100];
}

function rgb2cmyk(rgb) {
  var r = rgb[0] / 255,
      g = rgb[1] / 255,
      b = rgb[2] / 255,
      c, m, y, k;

  k = Math.min(1 - r, 1 - g, 1 - b);
  c = (1 - r - k) / (1 - k) || 0;
  m = (1 - g - k) / (1 - k) || 0;
  y = (1 - b - k) / (1 - k) || 0;
  return [c * 100, m * 100, y * 100, k * 100];
}

function rgb2keyword(rgb) {
  return reverseKeywords[JSON.stringify(rgb)];
}

function rgb2xyz(rgb) {
  var r = rgb[0] / 255,
      g = rgb[1] / 255,
      b = rgb[2] / 255;

  // assume sRGB
  r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);
  g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);
  b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);

  var x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
  var y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
  var z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);

  return [x * 100, y *100, z * 100];
}

function rgb2lab(rgb) {
  var xyz = rgb2xyz(rgb),
        x = xyz[0],
        y = xyz[1],
        z = xyz[2],
        l, a, b;

  x /= 95.047;
  y /= 100;
  z /= 108.883;

  x = x > 0.008856 ? Math.pow(x, 1/3) : (7.787 * x) + (16 / 116);
  y = y > 0.008856 ? Math.pow(y, 1/3) : (7.787 * y) + (16 / 116);
  z = z > 0.008856 ? Math.pow(z, 1/3) : (7.787 * z) + (16 / 116);

  l = (116 * y) - 16;
  a = 500 * (x - y);
  b = 200 * (y - z);

  return [l, a, b];
}

function rgb2lch(args) {
  return lab2lch(rgb2lab(args));
}

function hsl2rgb(hsl) {
  var h = hsl[0] / 360,
      s = hsl[1] / 100,
      l = hsl[2] / 100,
      t1, t2, t3, rgb, val;

  if (s == 0) {
    val = l * 255;
    return [val, val, val];
  }

  if (l < 0.5)
    t2 = l * (1 + s);
  else
    t2 = l + s - l * s;
  t1 = 2 * l - t2;

  rgb = [0, 0, 0];
  for (var i = 0; i < 3; i++) {
    t3 = h + 1 / 3 * - (i - 1);
    t3 < 0 && t3++;
    t3 > 1 && t3--;

    if (6 * t3 < 1)
      val = t1 + (t2 - t1) * 6 * t3;
    else if (2 * t3 < 1)
      val = t2;
    else if (3 * t3 < 2)
      val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
    else
      val = t1;

    rgb[i] = val * 255;
  }

  return rgb;
}

function hsl2hsv(hsl) {
  var h = hsl[0],
      s = hsl[1] / 100,
      l = hsl[2] / 100,
      sv, v;

  if(l === 0) {
      // no need to do calc on black
      // also avoids divide by 0 error
      return [0, 0, 0];
  }

  l *= 2;
  s *= (l <= 1) ? l : 2 - l;
  v = (l + s) / 2;
  sv = (2 * s) / (l + s);
  return [h, sv * 100, v * 100];
}

function hsl2hwb(args) {
  return rgb2hwb(hsl2rgb(args));
}

function hsl2cmyk(args) {
  return rgb2cmyk(hsl2rgb(args));
}

function hsl2keyword(args) {
  return rgb2keyword(hsl2rgb(args));
}


function hsv2rgb(hsv) {
  var h = hsv[0] / 60,
      s = hsv[1] / 100,
      v = hsv[2] / 100,
      hi = Math.floor(h) % 6;

  var f = h - Math.floor(h),
      p = 255 * v * (1 - s),
      q = 255 * v * (1 - (s * f)),
      t = 255 * v * (1 - (s * (1 - f))),
      v = 255 * v;

  switch(hi) {
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
}

function hsv2hsl(hsv) {
  var h = hsv[0],
      s = hsv[1] / 100,
      v = hsv[2] / 100,
      sl, l;

  l = (2 - s) * v;
  sl = s * v;
  sl /= (l <= 1) ? l : 2 - l;
  sl = sl || 0;
  l /= 2;
  return [h, sl * 100, l * 100];
}

function hsv2hwb(args) {
  return rgb2hwb(hsv2rgb(args))
}

function hsv2cmyk(args) {
  return rgb2cmyk(hsv2rgb(args));
}

function hsv2keyword(args) {
  return rgb2keyword(hsv2rgb(args));
}

// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
function hwb2rgb(hwb) {
  var h = hwb[0] / 360,
      wh = hwb[1] / 100,
      bl = hwb[2] / 100,
      ratio = wh + bl,
      i, v, f, n;

  // wh + bl cant be > 1
  if (ratio > 1) {
    wh /= ratio;
    bl /= ratio;
  }

  i = Math.floor(6 * h);
  v = 1 - bl;
  f = 6 * h - i;
  if ((i & 0x01) != 0) {
    f = 1 - f;
  }
  n = wh + f * (v - wh);  // linear interpolation

  switch (i) {
    default:
    case 6:
    case 0: r = v; g = n; b = wh; break;
    case 1: r = n; g = v; b = wh; break;
    case 2: r = wh; g = v; b = n; break;
    case 3: r = wh; g = n; b = v; break;
    case 4: r = n; g = wh; b = v; break;
    case 5: r = v; g = wh; b = n; break;
  }

  return [r * 255, g * 255, b * 255];
}

function hwb2hsl(args) {
  return rgb2hsl(hwb2rgb(args));
}

function hwb2hsv(args) {
  return rgb2hsv(hwb2rgb(args));
}

function hwb2cmyk(args) {
  return rgb2cmyk(hwb2rgb(args));
}

function hwb2keyword(args) {
  return rgb2keyword(hwb2rgb(args));
}

function cmyk2rgb(cmyk) {
  var c = cmyk[0] / 100,
      m = cmyk[1] / 100,
      y = cmyk[2] / 100,
      k = cmyk[3] / 100,
      r, g, b;

  r = 1 - Math.min(1, c * (1 - k) + k);
  g = 1 - Math.min(1, m * (1 - k) + k);
  b = 1 - Math.min(1, y * (1 - k) + k);
  return [r * 255, g * 255, b * 255];
}

function cmyk2hsl(args) {
  return rgb2hsl(cmyk2rgb(args));
}

function cmyk2hsv(args) {
  return rgb2hsv(cmyk2rgb(args));
}

function cmyk2hwb(args) {
  return rgb2hwb(cmyk2rgb(args));
}

function cmyk2keyword(args) {
  return rgb2keyword(cmyk2rgb(args));
}


function xyz2rgb(xyz) {
  var x = xyz[0] / 100,
      y = xyz[1] / 100,
      z = xyz[2] / 100,
      r, g, b;

  r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
  g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
  b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

  // assume sRGB
  r = r > 0.0031308 ? ((1.055 * Math.pow(r, 1.0 / 2.4)) - 0.055)
    : r = (r * 12.92);

  g = g > 0.0031308 ? ((1.055 * Math.pow(g, 1.0 / 2.4)) - 0.055)
    : g = (g * 12.92);

  b = b > 0.0031308 ? ((1.055 * Math.pow(b, 1.0 / 2.4)) - 0.055)
    : b = (b * 12.92);

  r = Math.min(Math.max(0, r), 1);
  g = Math.min(Math.max(0, g), 1);
  b = Math.min(Math.max(0, b), 1);

  return [r * 255, g * 255, b * 255];
}

function xyz2lab(xyz) {
  var x = xyz[0],
      y = xyz[1],
      z = xyz[2],
      l, a, b;

  x /= 95.047;
  y /= 100;
  z /= 108.883;

  x = x > 0.008856 ? Math.pow(x, 1/3) : (7.787 * x) + (16 / 116);
  y = y > 0.008856 ? Math.pow(y, 1/3) : (7.787 * y) + (16 / 116);
  z = z > 0.008856 ? Math.pow(z, 1/3) : (7.787 * z) + (16 / 116);

  l = (116 * y) - 16;
  a = 500 * (x - y);
  b = 200 * (y - z);

  return [l, a, b];
}

function xyz2lch(args) {
  return lab2lch(xyz2lab(args));
}

function lab2xyz(lab) {
  var l = lab[0],
      a = lab[1],
      b = lab[2],
      x, y, z, y2;

  if (l <= 8) {
    y = (l * 100) / 903.3;
    y2 = (7.787 * (y / 100)) + (16 / 116);
  } else {
    y = 100 * Math.pow((l + 16) / 116, 3);
    y2 = Math.pow(y / 100, 1/3);
  }

  x = x / 95.047 <= 0.008856 ? x = (95.047 * ((a / 500) + y2 - (16 / 116))) / 7.787 : 95.047 * Math.pow((a / 500) + y2, 3);

  z = z / 108.883 <= 0.008859 ? z = (108.883 * (y2 - (b / 200) - (16 / 116))) / 7.787 : 108.883 * Math.pow(y2 - (b / 200), 3);

  return [x, y, z];
}

function lab2lch(lab) {
  var l = lab[0],
      a = lab[1],
      b = lab[2],
      hr, h, c;

  hr = Math.atan2(b, a);
  h = hr * 360 / 2 / Math.PI;
  if (h < 0) {
    h += 360;
  }
  c = Math.sqrt(a * a + b * b);
  return [l, c, h];
}

function lab2rgb(args) {
  return xyz2rgb(lab2xyz(args));
}

function lch2lab(lch) {
  var l = lch[0],
      c = lch[1],
      h = lch[2],
      a, b, hr;

  hr = h / 360 * 2 * Math.PI;
  a = c * Math.cos(hr);
  b = c * Math.sin(hr);
  return [l, a, b];
}

function lch2xyz(args) {
  return lab2xyz(lch2lab(args));
}

function lch2rgb(args) {
  return lab2rgb(lch2lab(args));
}

function keyword2rgb(keyword) {
  return cssKeywords[keyword];
}

function keyword2hsl(args) {
  return rgb2hsl(keyword2rgb(args));
}

function keyword2hsv(args) {
  return rgb2hsv(keyword2rgb(args));
}

function keyword2hwb(args) {
  return rgb2hwb(keyword2rgb(args));
}

function keyword2cmyk(args) {
  return rgb2cmyk(keyword2rgb(args));
}

function keyword2lab(args) {
  return rgb2lab(keyword2rgb(args));
}

function keyword2xyz(args) {
  return rgb2xyz(keyword2rgb(args));
}

var cssKeywords = {
  aliceblue:  [240,248,255],
  antiquewhite: [250,235,215],
  aqua: [0,255,255],
  aquamarine: [127,255,212],
  azure:  [240,255,255],
  beige:  [245,245,220],
  bisque: [255,228,196],
  black:  [0,0,0],
  blanchedalmond: [255,235,205],
  blue: [0,0,255],
  blueviolet: [138,43,226],
  brown:  [165,42,42],
  burlywood:  [222,184,135],
  cadetblue:  [95,158,160],
  chartreuse: [127,255,0],
  chocolate:  [210,105,30],
  coral:  [255,127,80],
  cornflowerblue: [100,149,237],
  cornsilk: [255,248,220],
  crimson:  [220,20,60],
  cyan: [0,255,255],
  darkblue: [0,0,139],
  darkcyan: [0,139,139],
  darkgoldenrod:  [184,134,11],
  darkgray: [169,169,169],
  darkgreen:  [0,100,0],
  darkgrey: [169,169,169],
  darkkhaki:  [189,183,107],
  darkmagenta:  [139,0,139],
  darkolivegreen: [85,107,47],
  darkorange: [255,140,0],
  darkorchid: [153,50,204],
  darkred:  [139,0,0],
  darksalmon: [233,150,122],
  darkseagreen: [143,188,143],
  darkslateblue:  [72,61,139],
  darkslategray:  [47,79,79],
  darkslategrey:  [47,79,79],
  darkturquoise:  [0,206,209],
  darkviolet: [148,0,211],
  deeppink: [255,20,147],
  deepskyblue:  [0,191,255],
  dimgray:  [105,105,105],
  dimgrey:  [105,105,105],
  dodgerblue: [30,144,255],
  firebrick:  [178,34,34],
  floralwhite:  [255,250,240],
  forestgreen:  [34,139,34],
  fuchsia:  [255,0,255],
  gainsboro:  [220,220,220],
  ghostwhite: [248,248,255],
  gold: [255,215,0],
  goldenrod:  [218,165,32],
  gray: [128,128,128],
  green:  [0,128,0],
  greenyellow:  [173,255,47],
  grey: [128,128,128],
  honeydew: [240,255,240],
  hotpink:  [255,105,180],
  indianred:  [205,92,92],
  indigo: [75,0,130],
  ivory:  [255,255,240],
  khaki:  [240,230,140],
  lavender: [230,230,250],
  lavenderblush:  [255,240,245],
  lawngreen:  [124,252,0],
  lemonchiffon: [255,250,205],
  lightblue:  [173,216,230],
  lightcoral: [240,128,128],
  lightcyan:  [224,255,255],
  lightgoldenrodyellow: [250,250,210],
  lightgray:  [211,211,211],
  lightgreen: [144,238,144],
  lightgrey:  [211,211,211],
  lightpink:  [255,182,193],
  lightsalmon:  [255,160,122],
  lightseagreen:  [32,178,170],
  lightskyblue: [135,206,250],
  lightslategray: [119,136,153],
  lightslategrey: [119,136,153],
  lightsteelblue: [176,196,222],
  lightyellow:  [255,255,224],
  lime: [0,255,0],
  limegreen:  [50,205,50],
  linen:  [250,240,230],
  magenta:  [255,0,255],
  maroon: [128,0,0],
  mediumaquamarine: [102,205,170],
  mediumblue: [0,0,205],
  mediumorchid: [186,85,211],
  mediumpurple: [147,112,219],
  mediumseagreen: [60,179,113],
  mediumslateblue:  [123,104,238],
  mediumspringgreen:  [0,250,154],
  mediumturquoise:  [72,209,204],
  mediumvioletred:  [199,21,133],
  midnightblue: [25,25,112],
  mintcream:  [245,255,250],
  mistyrose:  [255,228,225],
  moccasin: [255,228,181],
  navajowhite:  [255,222,173],
  navy: [0,0,128],
  oldlace:  [253,245,230],
  olive:  [128,128,0],
  olivedrab:  [107,142,35],
  orange: [255,165,0],
  orangered:  [255,69,0],
  orchid: [218,112,214],
  palegoldenrod:  [238,232,170],
  palegreen:  [152,251,152],
  paleturquoise:  [175,238,238],
  palevioletred:  [219,112,147],
  papayawhip: [255,239,213],
  peachpuff:  [255,218,185],
  peru: [205,133,63],
  pink: [255,192,203],
  plum: [221,160,221],
  powderblue: [176,224,230],
  purple: [128,0,128],
  rebeccapurple: [102, 51, 153],
  red:  [255,0,0],
  rosybrown:  [188,143,143],
  royalblue:  [65,105,225],
  saddlebrown:  [139,69,19],
  salmon: [250,128,114],
  sandybrown: [244,164,96],
  seagreen: [46,139,87],
  seashell: [255,245,238],
  sienna: [160,82,45],
  silver: [192,192,192],
  skyblue:  [135,206,235],
  slateblue:  [106,90,205],
  slategray:  [112,128,144],
  slategrey:  [112,128,144],
  snow: [255,250,250],
  springgreen:  [0,255,127],
  steelblue:  [70,130,180],
  tan:  [210,180,140],
  teal: [0,128,128],
  thistle:  [216,191,216],
  tomato: [255,99,71],
  turquoise:  [64,224,208],
  violet: [238,130,238],
  wheat:  [245,222,179],
  white:  [255,255,255],
  whitesmoke: [245,245,245],
  yellow: [255,255,0],
  yellowgreen:  [154,205,50]
};

var reverseKeywords = {};
for (var key in cssKeywords) {
  reverseKeywords[JSON.stringify(cssKeywords[key])] = key;
}


/***/ }),

/***/ "./node_modules/parse-color/node_modules/color-convert/index.js":
/*!**********************************************************************!*\
  !*** ./node_modules/parse-color/node_modules/color-convert/index.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var conversions = __webpack_require__(/*! ./conversions */ "./node_modules/parse-color/node_modules/color-convert/conversions.js");

var convert = function() {
   return new Converter();
}

for (var func in conversions) {
  // export Raw versions
  convert[func + "Raw"] =  (function(func) {
    // accept array or plain args
    return function(arg) {
      if (typeof arg == "number")
        arg = Array.prototype.slice.call(arguments);
      return conversions[func](arg);
    }
  })(func);

  var pair = /(\w+)2(\w+)/.exec(func),
      from = pair[1],
      to = pair[2];

  // export rgb2hsl and ["rgb"]["hsl"]
  convert[from] = convert[from] || {};

  convert[from][to] = convert[func] = (function(func) { 
    return function(arg) {
      if (typeof arg == "number")
        arg = Array.prototype.slice.call(arguments);
      
      var val = conversions[func](arg);
      if (typeof val == "string" || val === undefined)
        return val; // keyword

      for (var i = 0; i < val.length; i++)
        val[i] = Math.round(val[i]);
      return val;
    }
  })(func);
}


/* Converter does lazy conversion and caching */
var Converter = function() {
   this.convs = {};
};

/* Either get the values for a space or
  set the values for a space, depending on args */
Converter.prototype.routeSpace = function(space, args) {
   var values = args[0];
   if (values === undefined) {
      // color.rgb()
      return this.getValues(space);
   }
   // color.rgb(10, 10, 10)
   if (typeof values == "number") {
      values = Array.prototype.slice.call(args);        
   }

   return this.setValues(space, values);
};
  
/* Set the values for a space, invalidating cache */
Converter.prototype.setValues = function(space, values) {
   this.space = space;
   this.convs = {};
   this.convs[space] = values;
   return this;
};

/* Get the values for a space. If there's already
  a conversion for the space, fetch it, otherwise
  compute it */
Converter.prototype.getValues = function(space) {
   var vals = this.convs[space];
   if (!vals) {
      var fspace = this.space,
          from = this.convs[fspace];
      vals = convert[fspace][space](from);

      this.convs[space] = vals;
   }
  return vals;
};

["rgb", "hsl", "hsv", "cmyk", "keyword"].forEach(function(space) {
   Converter.prototype[space] = function(vals) {
      return this.routeSpace(space, arguments);
   }
});

module.exports = convert;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "classnames":
/*!*****************************!*\
  !*** external "classnames" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("classnames");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ })

/******/ });
//# sourceMappingURL=editor-gui.js.map