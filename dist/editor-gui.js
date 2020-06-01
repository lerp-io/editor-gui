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

/***/ "./components/Box.coffee":
/*!*******************************!*\
  !*** ./components/Box.coffee ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _decidePosition_coffee__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./decidePosition.coffee */ "./components/decidePosition.coffee");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _LayoutContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LayoutContext */ "./components/LayoutContext.coffee");
/* harmony import */ var _BoxContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BoxContext */ "./components/BoxContext.coffee");
var Box, h;









h = react__WEBPACK_IMPORTED_MODULE_1__["createElement"];

Box = function(props, state) {
  var context, menu_ref, position, self_context, setPosition, setSelfContext, setVisible, style, visible;
  [position, setPosition] = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(props.position);
  [self_context, setSelfContext] = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])();
  [visible, setVisible] = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false);
  menu_ref = Object(react__WEBPACK_IMPORTED_MODULE_1__["useRef"])(null);
  style = {};
  context = Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(_LayoutContext__WEBPACK_IMPORTED_MODULE_2__["default"]);
  self_context = {};
  // log visible

  // log context
  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function() {
    if (!visible && menu_ref.current) {
      // log 'set visible',menu_ref.current
      setVisible(true);
    }
    if (props.position !== position) {
      // log 'set position'
      return setPosition(position);
    }
  });
  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function() {
    return function() {
      return typeof props.onSelect === "function" ? props.onSelect(void 0, void 0) : void 0;
    };
  }, []);
  if (!context) {
    return null;
  }
  Object(_decidePosition_coffee__WEBPACK_IMPORTED_MODULE_0__["default"])({
    style: style,
    context: context,
    menu_ref: menu_ref,
    position: position,
    left: props.left,
    right: props.right,
    top: props.top,
    bottom: props.bottom
  });
  return h('div', {
    ref: menu_ref,
    style: style,
    className: 'ed-box'
  }, props.title && (h('div', {
    className: 'ed-box-title'
  }, '~* ' + props.title + ' *~')) || null, props.description && (h('div', {
    className: 'ed-description'
  }, props.description)) || null, h('div', {
    className: 'ed-box-content'
  }, h(_BoxContext__WEBPACK_IMPORTED_MODULE_3__["default"].Provider, {
    value: self_context
  }, props.children)));
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
var In, decideInput, h, initial_state, reducer;



h = react__WEBPACK_IMPORTED_MODULE_0__["createElement"];





// range
// checkbox
// select
// color
// number
// text
// toggle
decideInput = function(props) {};

reducer = function(state, action) {
  // if action.type == 'dragstart'
  // 	return
  // 		start_range_slider_x: action.start_range_slider_x
  // 		drag_start_client_x: action.drag_start_client_x
  if (action.type === 'slide-rect') {
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
  range_slider_x: 0
};

In = function(props) {
  var context, dispatch, input, isDragging, is_dragging, label, max, min, outer_range_ref, props_range_value, props_value, range_slider_x, setStepValue, slider_state_ref, state, step_value, value_alpha, value_label;
  [state, dispatch] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useReducer"])(reducer, initial_state);
  [is_dragging, isDragging] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  [step_value, setStepValue] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(void 0);
  context = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_BoxContext__WEBPACK_IMPORTED_MODULE_2__["default"]);
  outer_range_ref = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  slider_state_ref = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])({});
  if (props.label) {
    label = h('div', {
      className: 'ed-in-label'
    }, props.label);
  }
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function() {
    if (outer_range_ref.current) {
      return dispatch({
        type: 'slide-rect',
        value: outer_range_ref.current.getBoundingClientRect()
      });
    }
  }, [outer_range_ref.current]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function() {
    if (props.step != null) {
      // log props.value
      // log Math.floor(step_value/props.step)*props.step
      if (Math.floor(step_value / props.step) * props.step !== Math.floor(props.value / props.step) * props.step) {
        log('override step value', props.value);
        return setStepValue(props.value);
      }
    }
  }, [props.value]);
  switch (props.type) {
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
      if (state.range_rect) {
        // log state.range_rect
        props_value = Number(props.value) || 1;
        if (props.step != null) {
          props_value = Math.floor(step_value / props.step) * props.step;
        }
        // log 'set from step value',step_value
        max = props.max || 1;
        min = props.min || 0;
        props_value = Math.min(Math.max(props_value, min), max);
        value_alpha = (props_value - min) / (max - min);
        range_slider_x = value_alpha * (state.range_rect.width - 6);
        // log range_slider_x
        if (props.step != null) {
          slider_state_ref.current.range_slider_x = ((step_value - min) / (max - min)) * (state.range_rect.width - 6);
        } else {
          slider_state_ref.current.range_slider_x = range_slider_x;
        }
      } else {
        range_slider_x = 0;
      }
      // log state.range_slider_x

      // log value_alpha
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
            var diff_x, new_value, range_rect, value, x, y, y_d, y_min_d;
            range_rect = state.range_rect;
            x = e.clientX;
            y = e.clientY;
            y_d = Math.abs(y - (range_rect.top + (range_rect.bottom - range_rect.top) / 2));
            y_min_d = range_rect.height / 2;
            if (y_d > y_min_d) {
              y_d = 1 + (y_d - y_min_d) * .1;
            } else {
              y_d = 1;
            }
            // log slider_state_ref.current.range_slider_x
            diff_x = (x - slider_state_ref.current.cx) / y_d;
            slider_state_ref.current.cx = x;
            range_slider_x = Math.min(Math.max(0, slider_state_ref.current.range_slider_x + diff_x), range_rect.width - 6);
            value_alpha = range_slider_x / (range_rect.width - 6);
            min = props.min || 0;
            max = props.max || 1;
            value = min + (max - min) * value_alpha;
            if (props.step != null) {
              new_value = Math.floor(value / props.step) * props.step;
              
              // log new_value,props.value
              setStepValue(value);
              if (new_value !== props.value) {
                props.set(Math.min(Math.max(new_value, min), max));
              }
            } else {
              props.set(value);
            }
            // isDragging(true)
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
            // isDragging(false)
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
    default:
      throw new Error('invalid input type');
  }
  return h('div', {
    className: 'ed-in-wrap'
  }, label, h('div', {
    className: 'ed-input-wrap'
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
  var autosize, context, layout_ref, mounted, setContext, setMounted;
  autosize = props.autosize;
  layout_ref = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])();
  [mounted, setMounted] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  [context, setContext] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function() {
    var rect;
    if (!context) {
      // log 'set context (after mount)'
      rect = layout_ref.current.getBoundingClientRect();
      return setContext({
        depth: 0,
        root: true,
        right: rect.right,
        left: rect.left,
        top: rect.top,
        bottom: rect.bottom
      });
    }
  }, [mounted, window.innerHeight, window.innerWidth]);
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
/* harmony import */ var _decidePosition_coffee__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./decidePosition.coffee */ "./components/decidePosition.coffee");
/* harmony import */ var _LayoutContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./LayoutContext */ "./components/LayoutContext.coffee");
var Menu, h;



h = react__WEBPACK_IMPORTED_MODULE_0__["createElement"];







Menu = function(props) {
  var context, items, menu_ref, position, self_context, setPosition, setSelfContext, setVisible, style, visible;
  [position, setPosition] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(props.position);
  [self_context, setSelfContext] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();
  [visible, setVisible] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  menu_ref = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  style = {};
  context = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_LayoutContext__WEBPACK_IMPORTED_MODULE_3__["default"]);
  self_context = Object.assign({}, context, {
    root: false,
    vert: props.vert,
    depth: (context != null ? context.depth : void 0) + 1
  });
  // log visible

  // log context
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function() {
    if (!visible && menu_ref.current) {
      // log 'set visible',menu_ref.current
      setVisible(true);
    }
    if (props.position !== position) {
      // log 'set position'
      return setPosition(position);
    }
  });
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function() {
    return function() {
      return typeof props.onSelect === "function" ? props.onSelect(void 0, void 0) : void 0;
    };
  }, []);
  if (!context) {
    return null;
  }
  
  // log props.bottom
  Object(_decidePosition_coffee__WEBPACK_IMPORTED_MODULE_2__["default"])({
    style: style,
    context: context,
    menu_ref: menu_ref,
    position: position,
    left: props.left,
    right: props.right,
    top: props.top,
    bottom: props.bottom
  });
  style.zIndex = props.select && 666 || 1;
  style.zIndex += self_context.depth;
  // if self_context.depth == 1
  // 	style.borderLeft = '10px solid black'
  if (props.items) {
    items = Object.keys(props.items).map(function(key, i) {
      var callback, child, title;
      child = props.items[key];
      title = key + '-' + i;
      if (typeof child === 'function') {
        callback = child;
        return h('div', {
          key: key,
          className: 'ed-menu-item'
        }, h('div', {
          className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('ed-menu-item-label', props.select === key && 'ed-selected', 'noselect'),
          onClick: callback
        }, key));
      } else {
        return h('div', {
          key: key,
          className: 'ed-menu-item'
        }, h('div', {
          title: title,
          onClick: props.onSelect && (function(e) {
            if (e.target.title !== title) {
              return;
            }
            // if e.target != ref
            if (props.select === key) {
              // log 'select undefined',title
              return props.onSelect(void 0, child);
            } else {
              // log 'SELECT',key,child
              return props.onSelect(key, child);
            }
          }) || void 0,
          className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('ed-menu-item-label', props.select === key && 'ed-selected', 'noselect')
        }, key), props.select === key && child || null);
      }
    });
  }
  return h('div', {
    ref: menu_ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('ed-menu', props.vert && 'ed-flex-down' || 'ed-flex-right', !visible && 'ed-hidden'),
    style: style
  }, h(_LayoutContext__WEBPACK_IMPORTED_MODULE_3__["default"].Provider, {
    value: self_context
  }, items));
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

/***/ "./components/SectionLabel.coffee":
/*!****************************************!*\
  !*** ./components/SectionLabel.coffee ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var SectionLabel;

SectionLabel = function(props, state) {};

/* harmony default export */ __webpack_exports__["default"] = (SectionLabel);


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

/***/ "./components/decidePosition.coffee":
/*!******************************************!*\
  !*** ./components/decidePosition.coffee ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var decidePosition;

decidePosition = function({style, context, menu_ref, position, left, right, top, bottom}) {
  var appear_on_either_right_or_left, appear_on_either_top_or_bottom, clamp_offset, default_to_bottom, default_to_left, default_to_right, default_to_top, parent_is_vertical_list, parent_rect, r_bottom, r_left, r_right, r_top, rect;
  if (context.root) {
    if (position) {
      style.transform = `translate(${position[0]},${position[1]})`;
      return;
    }
    if (left) {
      style.left = '0px';
    } else if (right) {
      style.right = '0px';
    } else {
      style.left = '50%';
      style.transform = 'translate(-50%,0%)';
    }
    if (top) {
      style.top = '0px';
    } else if (bottom) {
      style.bottom = '0px';
    } else {
      style.top = '50%';
      if (style.transform) {
        style.transform = 'translate(-50%,-50%)';
      } else {
        style.transform = 'translate(0%,-50%)';
      }
    }
    return true;
  }
  parent_is_vertical_list = context.vert;
  appear_on_either_right_or_left = context.vert;
  appear_on_either_top_or_bottom = !context.vert;
  if (left) {
    default_to_left = true;
    default_to_right = false;
  } else {
    default_to_left = false;
    default_to_right = true;
  }
  if (top) {
    default_to_top = true;
    default_to_bottom = false;
  } else {
    default_to_top = false;
    default_to_bottom = true;
  }
  if (appear_on_either_right_or_left) {
    if (default_to_left) {
      style.right = '100%';
      style.left = void 0;
    } else {
      style.right = void 0;
      style.left = '100%';
    }
    if (default_to_top) {
      style.top = void 0;
      style.bottom = '0%';
    } else {
      style.top = '0%';
      style.bottom = void 0;
    }
  } else {
    if (default_to_left) {
      style.right = '0%';
      style.left = void 0;
    } else {
      style.right = void 0;
      style.left = '0%';
    }
    if (default_to_top) {
      style.top = void 0;
      style.bottom = '100%';
    } else {
      style.top = '100%';
      style.bottom = void 0;
    }
  }
  if (menu_ref.current) {
    rect = menu_ref.current.getBoundingClientRect();
    parent_rect = menu_ref.current.parentNode.getBoundingClientRect();
    if (appear_on_either_right_or_left) {
      if (default_to_left) {
        r_left = parent_rect.left - rect.width;
        if (r_left < context.left) {
          style.right = void 0;
          style.left = '100%';
        }
      } else {
        r_right = parent_rect.right + rect.width;
        if (r_right > context.right) {
          style.right = '100%';
          style.left = void 0;
        }
      }
      if (default_to_top) {
        r_top = parent_rect.bottom - rect.height;
        if (r_top < context.top) {
          style.bottom = void 0;
          style.top = '0%';
        }
      } else {
        r_bottom = parent_rect.top + rect.height;
        if (r_bottom > context.bottom) {
          style.bottom = '0%';
          style.top = void 0;
        }
      }
    } else {
      if (default_to_left) {
        r_left = parent_rect.right - rect.width;
        if (r_left < context.left) {
          style.right = void 0;
          style.left = '0%';
        }
      } else {
        r_right = parent_rect.left + rect.width;
        if (r_right > context.right) {
          style.right = '0%';
          style.left = void 0;
        }
      }
      if (default_to_top) {
        r_top = parent_rect.top - rect.height;
        if (r_top < context.top) {
          style.top = '100%';
          style.bottom = void 0;
        }
      } else {
        r_bottom = parent_rect.bottom + rect.height;
        if (r_bottom > context.bottom) {
          style.bottom = '100%';
          style.top = void 0;
        }
      }
    }
    if (appear_on_either_right_or_left) {
      // log 'APPEAR ON RIGHT OR LEFT',style.top
      if (style.top) {
        clamp_offset = (rect.height + parent_rect.top) - context.bottom;
        if (clamp_offset > 0) {
          return style.top = `calc( ${style.top} + ${clamp_offset}px )`;
        }
      } else {
        clamp_offset = context.top - (parent_rect.bottom - rect.height);
        if (clamp_offset > 0) {
          return style.bottom = `calc( ${style.bottom} - ${clamp_offset}px )`;
        }
      }
    }
  }
};

/* harmony default export */ __webpack_exports__["default"] = (decidePosition);


/***/ }),

/***/ "./components/index.coffee":
/*!*********************************!*\
  !*** ./components/index.coffee ***!
  \*********************************/
/*! exports provided: Box, In, Layout, Menu, Row, SectionLabel, Style */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Box__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Box */ "./components/Box.coffee");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Box", function() { return _Box__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _In__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./In */ "./components/In.coffee");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "In", function() { return _In__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _Layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Layout */ "./components/Layout.coffee");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Layout", function() { return _Layout__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _Menu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Menu */ "./components/Menu.coffee");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Menu", function() { return _Menu__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _Row__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Row */ "./components/Row.coffee");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Row", function() { return _Row__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _SectionLabel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SectionLabel */ "./components/SectionLabel.coffee");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SectionLabel", function() { return _SectionLabel__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _Style_less__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Style.less */ "./components/Style.less");
/* harmony import */ var _Style_less__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_Style_less__WEBPACK_IMPORTED_MODULE_6__);
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "Style", function() { return _Style_less__WEBPACK_IMPORTED_MODULE_6___default.a; });

















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
exports.push([module.i, ".noselect {\n  -webkit-touch-callout: none;\n  /* iOS Safari */\n  -webkit-user-select: none;\n  /* Safari */\n  -khtml-user-select: none;\n  /* Konqueror HTML */\n  -moz-user-select: none;\n  /* Old versions of Firefox */\n  -ms-user-select: none;\n  /* Internet Explorer/Edge */\n  user-select: none;\n  /* Non-prefixed version, currently\n                                  supported by Chrome, Edge, Opera and Firefox */\n}\n.ed-layout {\n  transform: translate(0, 0);\n  font-family: 'DM Mono', monospace;\n  font-size: 0.85em;\n  color: #bbbbbb;\n  position: fixed;\n  top: 0px;\n  left: 0px;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  pointer-events: none;\n}\n.ed-layout * {\n  pointer-events: all;\n  box-sizing: border-box;\n}\n.ed-full-w {\n  width: 100%;\n}\n.ed-flex-left,\n.ed-input-wrap {\n  display: flex;\n  flex-wrap: wrap;\n  flex-direction: row-reverse;\n  align-items: center;\n  justify-content: flex-end;\n}\n.ed-flex-right,\n.ed-in-wrap {\n  display: flex;\n  flex-wrap: wrap;\n  flex-direction: row;\n  align-items: center;\n  justify-content: flex-start;\n}\n.ed-flex-down {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  justify-content: flex-start;\n}\n.ed-in-wrap {\n  font-size: 0.9em;\n  width: 100%;\n  min-height: 24px;\n  flex-wrap: nowrap;\n  margin-bottom: 0.425em;\n}\n.ed-input-wrap {\n  margin-left: 0.85em;\n  width: 150%;\n}\n.ed-in-label {\n  width: 100%;\n  white-space: normal;\n  text-align: -webkit-right;\n}\n.ed-input {\n  width: inherit;\n  height: 26px;\n  -webkit-appearance: none;\n  outline: none;\n  color: #bbbbbb;\n  background-color: rgba(27, 27, 27, 0.95);\n  border: none;\n  border-radius: none;\n  padding: 0.425em;\n}\n.ed-toggle-outer {\n  width: 26px;\n  cursor: pointer;\n  height: 26px;\n  background-color: rgba(27, 27, 27, 0.95);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.ed-toggle-outer .ed-toggle-inner {\n  width: 12px;\n  height: 12px;\n  border-radius: 6px;\n  background-color: rgba(27, 27, 27, 0.9);\n}\n.ed-toggle-outer .ed-toggle-inner.ed-toggle-active {\n  background: #bbbbbb;\n}\n.ed-box-title {\n  padding: 0px 0.85em;\n  margin: 0.85em 0px;\n  text-align: center;\n  width: 100%;\n  text-transform: uppercase !important;\n}\n.ed-box-content {\n  padding: 0px 0.85em;\n  margin: 0.85em 0px;\n  display: flex;\n  align-self: start;\n  justify-content: start;\n  flex-direction: row;\n  flex-wrap: wrap;\n}\n.ed-box {\n  backdrop-filter: blur(10px);\n  background-color: rgba(27, 27, 27, 0.9);\n  color: #bbbbbb;\n  width: 340px;\n  min-height: 26px;\n  flex-wrap: nowrap;\n  position: absolute;\n}\n.ed-box .ed-description {\n  padding: 0px 0.85em;\n  font-size: 0.8em;\n  color: #8d8d8d;\n  margin: 0.85em 0px;\n  white-space: normal;\n}\n.ed-menu {\n  color: #bbbbbb;\n  flex-wrap: nowrap;\n  width: fit-content;\n  position: absolute;\n}\n.ed-menu.ed-flex-down > .ed-menu-item {\n  width: -webkit-fill-available;\n  height: auto;\n}\n.ed-menu.ed-flex-right > .ed-menu-item {\n  height: -webkit-fill-available;\n  width: auto;\n}\n.ed-menu .ed-menu-item-label {\n  color: #8d8d8d;\n  height: 26px;\n  text-transform: uppercase;\n  cursor: pointer;\n  padding: 0.425em 0.85em;\n}\n.ed-menu .ed-menu-item-label.ed-selected {\n  background-color: rgba(27, 27, 27, 0.95);\n  color: #bbbbbb;\n}\n.ed-menu .ed-menu-item-label:hover {\n  background: rgba(27, 27, 27, 0.95);\n}\n.ed-menu > .ed-menu-item {\n  position: relative;\n  white-space: nowrap;\n  color: #bbbbbb;\n  backdrop-filter: blur(10px);\n  background-color: rgba(27, 27, 27, 0.9);\n}\n.ed-menu-item-child {\n  position: absolute;\n  left: 0px;\n  top: 0px;\n}\n.ed-hidden {\n  visibility: hidden;\n}\n.ed-range-outer {\n  height: 24px;\n  width: 100%;\n  background: rgba(27, 27, 27, 0.95);\n  position: relative;\n  cursor: ew-resize;\n}\n.ed-range-outer .ed-range-slider {\n  width: 6px;\n  height: 24px;\n  background: #bbbbbb;\n}\n.ed-range-outer .ed-range-slider.ed-active {\n  background: #bbbbbb;\n}\n.ed-range-outer .ed-range-value {\n  position: absolute;\n  left: 14px;\n  top: 50%;\n  transform: translate(0%, -50%);\n}\n.ed-range-outer .ed-range-value.ed-range-value-snap {\n  right: 8px;\n  left: initial;\n}\n.ed-range-outer .ed-range-value.ed-range-value-left {\n  right: 14px;\n  left: initial;\n}\n.ed-range-outer .ed-range-value.ed-range-value-left.ed-range-value-snap {\n  left: 8px;\n  right: initial;\n}\n.ed-button {\n  outline: none;\n  -webkit-appearance: none;\n  border: none;\n  cursor: pointer;\n  width: 100%;\n  height: 24px;\n  background: rgba(27, 27, 27, 0.95);\n  color: #8d8d8d;\n}\n.ed-button:hover {\n  color: #bbbbbb;\n}\n", ""]);
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