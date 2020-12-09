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
/*! exports provided: clampPosition, getPosition, fixAlign, guessAlign, clampHeight, clampWidth */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clampPosition", function() { return clampPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPosition", function() { return getPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fixAlign", function() { return fixAlign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "guessAlign", function() { return guessAlign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clampHeight", function() { return clampHeight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clampWidth", function() { return clampWidth; });
var BAR_DIM, MIN_HEIGHT, MIN_WIDTH, REBAR_DIM, checkFitAlignDown, checkFitAlignLeft, checkFitAlignRight, checkFitAlignUp, checkFitPositionBottom, checkFitPositionTop, checkfitPositionLeft, checkfitPositionRight, clampHeight, clampPosition, clampWidth, fixAlign, getAlignDirections, getPosition, guessAlign, initAlign;

MIN_HEIGHT = 10;

MIN_WIDTH = 320;

BAR_DIM = 12;

REBAR_DIM = 4;

//neveragain
guessAlign = function(width, height, ctx, x, y) {
  var pre_align;
  if (!ctx.align) {
    pre_align = initAlign(ctx, x, y, width, height);
  } else {
    pre_align = ctx.align;
  }
  switch (pre_align) {
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

initAlign = function(ctx, x, y, width, height) {
  // log 'init align',x,width/2,ctx.view_rect.width/2
  if (x + width / 2 < ctx.view_rect.width / 2) {
    if (y + height / 2 < ctx.view_rect.height / 2) {
      return ctx.vert && 'right-down' || 'bottom-right';
    } else {
      return ctx.vert && 'right-up' || 'top-right';
    }
  } else {
    if (y + height / 2 < ctx.view_rect.height / 2) {
      return ctx.vert && 'left-down' || 'bottom-left';
    } else {
      return ctx.vert && 'left-up' || 'top-left';
    }
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

clampHeight = function(ctx, height) {
  if (ctx.root && ctx.clamp_height) {
    return Math.max(Math.min(ctx.view_rect.height - BAR_DIM - REBAR_DIM, Math.min(ctx.clamp_height, height)), MIN_HEIGHT);
  } else if (ctx.root) {
    return Math.max(Math.min(ctx.view_rect.height - BAR_DIM - REBAR_DIM, height), MIN_HEIGHT);
  } else {
    return Math.max(Math.min(height, ctx.view_rect.height), MIN_HEIGHT);
  }
};

clampWidth = function(ctx, width) {
  if (ctx.root && ctx.clamp_width) {
    return Math.max(Math.min(ctx.view_rect.width - BAR_DIM - REBAR_DIM, ctx.clamp_width), MIN_WIDTH);
  } else if (ctx.root) {
    return Math.min(ctx.view_rect.width - BAR_DIM - REBAR_DIM, MIN_WIDTH);
  } else {
    return Math.max(Math.min(width, ctx.view_rect.width), MIN_WIDTH);
  }
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

clampPosition = function(ctx, x, y, width, height, align_key) {
  var add_offset_x, add_offset_y, offset_x, offset_y;
  offset_x = 0;
  offset_y = 0;
  add_offset_x = 0;
  add_offset_y = 0;
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
  
  // log align_key
  if (offset_y && !offset_x) {
    if (align_key === 'top-left' || align_key === 'bottom-left') {
      add_offset_x = -ctx.dim / 2;
    } else if (align_key === 'top-right' || align_key === 'bottom-right') {
      add_offset_x = ctx.dim / 2;
    }
  }
  // else if align_key == 'left-up' || align_key == 'left-down'
  // 	add_offset_x = -ctx.dim/2
  // else if align_key == 'right-up' || align_key == 'right-down'
  // 	add_offset_x = ctx.dim/2
  if (offset_x && !offset_y) {
    // if align_key == 'top-left' || align_key == 'bottom-left'
    // 	add_offset_y = -ctx.dim/2
    // else if align_key == 'top-right' || align_key == 'bottom-right'
    // 	add_offset_y = ctx.dim/2
    if (align_key === 'right-down' || align_key === 'left-down') {
      add_offset_y = -ctx.dim / 2;
    } else if (align_key === 'right-up' || align_key === 'left-up') {
      add_offset_y = ctx.dim / 2;
    }
  }
  offset_x += add_offset_x;
  offset_y += add_offset_y;
  // if offset_x && !offset_y
  // 	offset_y -= ctx.dim/2

    // log offset_x,offset_y
  // if align_key
  // 	if align_key == 'right-down' || align_key == 'right-down' || align_key == 'left-down' || align_key == 'left-up'
  // 		if offset_x
  // 			log align_key,offset_x
  // 			offset_y += ctx.dim/2
  // 		else 
  // 	else
  // 		if offset_x
  // 			log align_key,offset_x
  // 			offset_y -= ctx.dim/2
  // 		else if offset_y
  // 			log align_key,offset_y
  // 			offset_x -= ctx.dim/2
  return [offset_x, offset_y];
};




/***/ }),

/***/ "./components/Anchor.coffee":
/*!**********************************!*\
  !*** ./components/Anchor.coffee ***!
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
/* harmony import */ var _Align__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Align */ "./components/Align.coffee");
var Anchor, BAR_DIM, DOT_DIM, REBAR_DIM, h;



h = react__WEBPACK_IMPORTED_MODULE_0__["createElement"];







BAR_DIM = 12;

REBAR_DIM = 4;

DOT_DIM = 4;

Anchor = function(props) {
  var anchor_ref, bar_height, bar_left, bar_top, bar_width, checkAnchorDim, content, content_ref, content_x, content_y, context, d_bottom, d_left, d_right, d_top, dim, dot_height, dot_width, drag_start_pos, handle_pos, i, is_dragging, offset_x, offset_y, on_resize_bar_mouse_down, on_resize_bar_mouse_leave, on_resize_bar_mouse_move, rebar_left, rebar_top, ref, ref1, resize_bar, resize_bar_style, resize_cursor, resize_dir, resize_start_pos, self_context, self_height, self_width, setDim, setDragStartPos, setDragging, setHandlePos, setResizeDir, setResizeStartPos, setZIndex, set_handle_pos, snap_bot, updateZIndex, z_index;
  anchor_ref = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])('ed-anchor', anchor_ref);
  context = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_LayoutContext__WEBPACK_IMPORTED_MODULE_2__["default"]);
  content_ref = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])();
  [dim, setDim] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({});
  [drag_start_pos, setDragStartPos] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(void 0);
  [resize_start_pos, setResizeStartPos] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(void 0);
  [resize_dir, setResizeDir] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(void 0);
  [set_handle_pos, setHandlePos] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(void 0);
  [is_dragging, setDragging] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  [z_index, setZIndex] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(0);
  updateZIndex = function(z_index) {
    return setZIndex(z_index);
  };
  checkAnchorDim = function() {
    var rect;
    if (content_ref.current) {
      rect = content_ref.current.children[0].getBoundingClientRect();
      if (dim.width !== rect.width || dim.height !== rect.height) {
        return setDim({
          width: rect.width,
          height: rect.height
        });
      }
    }
  };
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function() {
    checkAnchorDim();
  });
  if (!context) {
    return null;
  }
  if (dim.width && dim.height) {
    d_left = Math.max(0, props.position[0]);
    d_top = Math.max(0, props.position[1]);
    d_bottom = Math.max(0, context.view_rect.height - (props.position[1] + dim.height + BAR_DIM));
    d_right = Math.max(0, context.view_rect.width - (props.position[0] + dim.width + BAR_DIM));
  }
  snap_bot = false;
  if (d_left <= Math.min(d_right, Math.min(d_top, d_bottom)) && d_left < props.autoHandleThreshold) { //AUTO_HANDLE_SET_THRESHOLD
    handle_pos = 'left';
    if (props.autoSnapHandlePosition) {
      props.position[0] = 0;
    }
  } else if (d_top <= Math.min(d_bottom, Math.min(d_left, d_right)) && d_top < props.autoHandleThreshold) {
    handle_pos = 'top';
    if (props.autoSnapHandlePosition) {
      props.position[1] = 0;
    }
  } else if (d_right <= Math.min(d_left, Math.min(d_top, d_bottom)) && d_right < props.autoHandleThreshold) {
    handle_pos = 'right';
    if (props.autoSnapHandlePosition) {
      props.position[0] = Math.max(0, context.view_rect.width - dim.width - BAR_DIM);
    }
  } else if (d_bottom <= Math.min(d_top, Math.min(d_left, d_right)) && d_bottom < props.autoHandleThreshold) {
    handle_pos = 'bottom';
    if (props.autoSnapHandlePosition) {
      snap_bot = true;
      props.position[1] = Math.max(0, context.view_rect.height - dim.height - BAR_DIM);
    }
  } else {
    handle_pos = 'top';
  }
  if (props.autoHandlePosition && handle_pos !== set_handle_pos) {
    setHandlePos(handle_pos);
  }
  if (!props.autoHandlePosition) {
    handle_pos = props.handlePosition || 'left';
  }
  dot_width = DOT_DIM;
  dot_height = DOT_DIM;
  if (dim.width && dim.height) {
    switch (handle_pos) {
      case 'left':
        self_width = dim.width + BAR_DIM;
        self_height = dim.height;
        break;
      case 'right':
        self_width = dim.width + BAR_DIM;
        self_height = dim.height;
        break;
      case 'top':
        self_height = dim.height + BAR_DIM;
        self_width = dim.width;
        break;
      case 'bottom':
        self_width = dim.width;
        self_height = dim.height + BAR_DIM;
    }
    [offset_x, offset_y] = Object(_Align__WEBPACK_IMPORTED_MODULE_3__["clampPosition"])(context, props.position[0], props.position[1], self_width, self_height, void 0);
    props.position[0] += offset_x;
    props.position[1] += offset_y;
    switch (handle_pos) {
      case 'left':
        bar_width = BAR_DIM;
        bar_height = dim.height;
        bar_left = props.position[0];
        bar_top = props.position[1];
        rebar_left = props.position[0] + dim.width + BAR_DIM;
        rebar_top = props.position[1];
        content_x = props.position[0] + BAR_DIM;
        content_y = props.position[1];
        if (!props.visible) {
          dot_height = DOT_DIM * 3;
        }
        break;
      case 'right':
        bar_width = BAR_DIM;
        bar_height = dim.height;
        bar_left = props.position[0] + dim.width;
        bar_top = props.position[1];
        rebar_left = props.position[0] - REBAR_DIM;
        rebar_top = props.position[1];
        content_x = props.position[0];
        content_y = props.position[1];
        if (!props.visible) {
          dot_height = DOT_DIM * 3;
        }
        break;
      case 'top':
        bar_width = dim.width;
        bar_height = BAR_DIM;
        bar_left = props.position[0];
        bar_top = props.position[1];
        rebar_left = props.position[0];
        rebar_top = props.position[1] + dim.height + BAR_DIM;
        content_x = props.position[0];
        content_y = props.position[1] + BAR_DIM;
        if (!props.visible) {
          dot_width = DOT_DIM * 3;
        }
        break;
      case 'bottom':
        bar_width = dim.width;
        bar_height = BAR_DIM;
        bar_left = props.position[0];
        bar_top = props.position[1] + dim.height;
        rebar_left = props.position[0];
        rebar_top = props.position[1] - REBAR_DIM;
        content_x = props.position[0];
        content_y = props.position[1];
        if (!props.visible) {
          dot_width = DOT_DIM * 3;
        }
    }
  }
  self_context = Object.assign({}, context, {
    align: props.align,
    clamp_width: ((ref = props.size) != null ? ref[0] : void 0) || 0,
    clamp_height: ((ref1 = props.size) != null ? ref1[1] : void 0) || 0,
    x: content_x,
    y: content_y,
    root: true,
    checkAnchorDim: checkAnchorDim
  });
  if (props.visible || ((dim.width == null) || (dim.height == null))) {
    content = h('div', {
      cn: 'ed-anchor-content',
      ref: content_ref
    }, h(_LayoutContext__WEBPACK_IMPORTED_MODULE_2__["default"].Provider, {
      value: self_context
    }, props.children));
  }
  switch (resize_dir) {
    case 'bottom':
      resize_cursor = 's-resize';
      break;
    case 'top':
      resize_cursor = 'n-resize';
      break;
    case 'left':
      resize_cursor = 'w-resize';
      break;
    case 'right':
      resize_cursor = 'e-resize';
  }
  if (props.size && props.visible) {
    resize_bar_style = {
      background: props.barColor || 'black',
      top: rebar_top,
      left: rebar_left,
      height: (handle_pos === 'left' || handle_pos === 'right') && bar_height || REBAR_DIM,
      width: (handle_pos === 'left' || handle_pos === 'right') && REBAR_DIM || bar_width,
      flexDirection: (handle_pos === 'left' || handle_pos === 'right') && 'column' || 'row',
      cursor: resize_cursor
    };
    on_resize_bar_mouse_down = function(e) {
      setDragging(true); //need code review
      setResizeStartPos([e.clientX, e.clientY, dim.width, dim.height, props.position[0], props.position[1]]);
      e.preventDefault();
      e.stopPropagation();
      return false;
    };
    on_resize_bar_mouse_move = function(e) {
      var dir, rect;
      rect = e.target.getBoundingClientRect();
      if (handle_pos === 'bottom' || handle_pos === 'top') {
        if (e.clientX < rect.left + rect.width * 1 / 3) {
          dir = 'left';
        } else if (e.clientX > rect.left + rect.width * 2 / 3) {
          dir = 'right';
        } else {
          if (handle_pos === 'bottom') {
            dir = 'top';
          } else {
            dir = 'bottom';
          }
        }
      } else if (handle_pos === 'left' || handle_pos === 'right') {
        if (e.clientY < rect.top + rect.height * 1 / 3) {
          dir = 'top';
        } else if (e.clientY > rect.top + rect.height * 2 / 3) {
          dir = 'bottom';
        } else {
          if (handle_pos === 'left') {
            dir = 'right';
          } else {
            dir = 'left';
          }
        }
      }
      if (resize_dir !== dir && dir) {
        if ((dir === 'top' || dir === 'bottom') && props.resizeHeight === false) {
          return false;
        }
        if ((dir === 'left' || dir === 'right') && props.resizeWidth === false) {
          return false;
        }
        return setResizeDir(dir);
      }
    };
    on_resize_bar_mouse_leave = function() {
      if (!is_dragging) {
        return setResizeDir(void 0);
      }
    };
    resize_bar = h('div', {
      key: 'resize-bar',
      style: resize_bar_style,
      cn: 'ed-anchor-handle-resize',
      onMouseLeave: on_resize_bar_mouse_leave,
      onMouseMove: on_resize_bar_mouse_move,
      onMouseDown: on_resize_bar_mouse_down,
      onMouseEnter: on_resize_bar_mouse_move
    });
  }
  return h('div', {
    style: {
      top: 0,
      left: 0,
      zIndex: z_index,
      width: (resize_start_pos || drag_start_pos) && '100vw' || void 0,
      height: (resize_start_pos || drag_start_pos) && '100vh' || void 0,
      cursor: resize_cursor
    },
    cn: classnames__WEBPACK_IMPORTED_MODULE_1___default()('ed-anchor', drag_start_pos && 'ed-anchor-drag', resize_start_pos && 'ed-anchor-resize'),
    ref: anchor_ref,
    onMouseMove: function(e) {
      var height, left, self_x, self_y, top, width;
      if (resize_start_pos) {
        if (!is_dragging) {
          setDragging(true);
        }
        width = props.size[0];
        height = props.size[1];
        left = props.position[0];
        top = props.position[1];
        switch (resize_dir) {
          case 'bottom':
            height = Math.max(0, resize_start_pos[3] + e.clientY - resize_start_pos[1]);
            break;
          case 'top':
            if (handle_pos === 'left' || handle_pos === 'right') {
              height = Math.max(0, resize_start_pos[3] - e.clientY + resize_start_pos[1]);
              top = Math.max(0, resize_start_pos[5] + e.clientY - resize_start_pos[1]);
            } else {
              height = Math.max(0, resize_start_pos[3] - e.clientY + resize_start_pos[1]);
            }
            break;
          case 'right':
            if (handle_pos === 'top' || handle_pos === 'bottom') {
              width = Math.max(0, resize_start_pos[2] + e.clientX - resize_start_pos[0]);
            } else {
              width = Math.max(0, resize_start_pos[2] + e.clientX - resize_start_pos[0]);
            }
            break;
          case 'left':
            if (handle_pos === 'top' || handle_pos === 'bottom') {
              width = Math.max(0, resize_start_pos[2] - e.clientX + resize_start_pos[0]);
              left = Math.max(0, resize_start_pos[4] + e.clientX - resize_start_pos[0]);
            } else {
              width = Math.max(0, resize_start_pos[2] - e.clientX + resize_start_pos[0]);
            }
        }
        props.setPosition(left, top);
        props.setSize(width, height);
        e.stopPropagation();
        e.preventDefault();
        return false;
      } else if (drag_start_pos) {
        if (!is_dragging) {
          setDragging(true);
        }
        self_x = drag_start_pos[2] + e.clientX - drag_start_pos[0];
        self_y = drag_start_pos[3] + e.clientY - drag_start_pos[1];
        props.setPosition(self_x, self_y);
        if (!props.visible) {
          props.onBarClick();
        }
        e.stopPropagation();
        e.preventDefault();
        return false;
      }
    },
    onMouseUp: function(e) {
      if (resize_dir) {
        setResizeDir(void 0);
      }
      if (drag_start_pos !== void 0) {
        setDragStartPos(void 0);
        setDragging(false);
        if (!is_dragging) {
          props.onBarClick();
        }
        e.stopPropagation();
        e.preventDefault();
        return false;
      } else if (resize_start_pos !== void 0) {
        setResizeStartPos(void 0);
        setDragging(false);
        e.stopPropagation();
        e.preventDefault();
        return false;
      } else if (is_dragging) {
        setDragging(false);
      }
      if (resize_dir) {
        return setResizeDir(void 0);
      }
    },
    onMouseEnter: function() {
      return setZIndex(999);
    },
    onMouseLeave: function() {
      setZIndex(0);
      if (drag_start_pos !== void 0) {
        setDragStartPos(void 0);
        setDragging(false);
      }
      if (resize_start_pos !== void 0) {
        setResizeStartPos(void 0);
        return setDragging(false);
      }
    }
  }, h('div', {
    cn: 'ed-anchor-handle',
    style: {
      top: bar_top,
      left: bar_left,
      height: bar_height,
      width: bar_width,
      flexDirection: (handle_pos === 'left' || handle_pos === 'right') && 'column' || 'row',
      background: props.barColor || 'black'
    },
    onMouseDown: function(e) {
      setDragStartPos([e.clientX, e.clientY, props.position[0], props.position[1]]);
      e.stopPropagation();
      e.preventDefault();
      return false;
    }
  }, (function() {
    var j, ref2, results;
    results = [];
    for (i = j = 0, ref2 = props.dotCount || 1; (0 <= ref2 ? j < ref2 : j > ref2); i = 0 <= ref2 ? ++j : --j) {
      results.push(h('div', {
        cn: 'ed-anchor-dot',
        key: i,
        style: {
          background: props.dotColor || 'white',
          width: dot_width,
          height: dot_height
        }
      }));
    }
    return results;
  })()), resize_bar, content);
};

Anchor.defaultProps = {
  autoHandleThreshold: 20
};

/* harmony default export */ __webpack_exports__["default"] = (Anchor);


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
var BAR_DIM, Box, MIN_HEIGHT, MIN_WIDTH, REBAR_DIM, h;











h = react__WEBPACK_IMPORTED_MODULE_0__["createElement"];

MIN_HEIGHT = 50;

MIN_WIDTH = 320;

BAR_DIM = 12;

REBAR_DIM = 4;

Box = function(props, state) {
  var align_key, content_ref, context, dim_overflow, height, offset_x, offset_y, self_context, self_ref, self_x, self_y, setDim, setVisible, style, visible, width, x, y;
  [visible, setVisible] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  [dim_overflow, setDim] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([MIN_HEIGHT, 0]);
  // [width_overflow,setWidth] = useState([MIN_WIDTH,0])
  self_ref = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  content_ref = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  height = dim_overflow[0];
  width = dim_overflow[2];
  style = {
    overflowY: dim_overflow[1],
    overflowX: dim_overflow[3]
  };
  context = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_LayoutContext__WEBPACK_IMPORTED_MODULE_1__["default"]);
  self_context = {
    startDrag: context.startDrag,
    stopDrag: context.stopDrag
  };
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function() {
    var content_height, content_width, overflow_x, overflow_y, ref, ref1, set_height, set_width;
    if (content_ref.current) {
      content_width = Math.max(((ref = content_ref.current) != null ? ref.scrollWidth : void 0) || 0, MIN_WIDTH);
      content_height = Math.max(((ref1 = content_ref.current) != null ? ref1.scrollHeight : void 0) || 0, MIN_HEIGHT);
      set_height = Object(_Align__WEBPACK_IMPORTED_MODULE_4__["clampHeight"])(context, content_height);
      set_width = Object(_Align__WEBPACK_IMPORTED_MODULE_4__["clampWidth"])(context, content_width);
      if (set_width < content_width) {
        overflow_x = 'scroll';
      } else {
        overflow_x = void 0;
      }
      if (set_height < content_height) {
        overflow_y = 'scroll';
      } else {
        overflow_y = void 0;
      }
      if (set_width !== dim_overflow[2] || set_height !== dim_overflow[0] || overflow_y !== dim_overflow[1] || overflow_x !== dim_overflow[3]) {
        self_ref.current.style.width = set_width;
        self_ref.current.style.height = set_height;
        setDim([set_height, overflow_y, set_width, overflow_x]);
      }
      if (!visible) {
        return setVisible(true);
      }
    }
  });
  if (!context) {
    return null;
  }
  style.minHeight = MIN_HEIGHT;
  style.height = height;
  style.width = width;
  if (props.align) {
    align_key = props.align;
  } else {
    align_key = Object(_Align__WEBPACK_IMPORTED_MODULE_4__["guessAlign"])(width, height, context);
    [x, y] = Object(_Align__WEBPACK_IMPORTED_MODULE_4__["getPosition"])(width, height, context, align_key);
    align_key = Object(_Align__WEBPACK_IMPORTED_MODULE_4__["fixAlign"])(align_key, context, width, height);
  }
  if (props.position) {
    self_x = props.position[0];
    self_y = props.position[1];
  } else if (context.root) {
    self_x = context.x;
    self_y = context.y;
  } else {
    [self_x, self_y] = Object(_Align__WEBPACK_IMPORTED_MODULE_4__["getPosition"])(width, height, context, align_key);
    [offset_x, offset_y] = Object(_Align__WEBPACK_IMPORTED_MODULE_4__["clampPosition"])(context, self_x, self_y, width, height, align_key);
    self_x += offset_x;
    self_y += offset_y;
  }
  style.zIndex = context.depth + 1 + 888;
  style.left = self_x + 'px';
  style.top = self_y + 'px';
  return h('div', {
    ref: self_ref,
    style: style,
    className: classnames__WEBPACK_IMPORTED_MODULE_3___default()('ed-box', !visible && 'ed-hidden', 'noselect')
  }, h('div', {
    cn: 'ed-box-inner',
    style: {
      minHeight: MIN_HEIGHT,
      paddingTop: !props.title && '0.425em'
    },
    ref: content_ref
  }, (props.title || props.label) && (h('div', {
    className: classnames__WEBPACK_IMPORTED_MODULE_3___default()('ed-box-title', props.stickyTitle && 'ed-box-title-sticky')
  }, h('div', {
    className: 'ed-in-label-colon'
  }, '# '), props.title || props.label)) || null, props.description && (h('div', {
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
  var canvas, canvas_ref, canvas_state, context, rect, setRect, setTickStep, tick_step, wrap_ref;
  wrap_ref = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  canvas_ref = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  canvas_state = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])({
    pan_x: 0
  });
  context = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_BoxContext__WEBPACK_IMPORTED_MODULE_2__["default"]);
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
      // log 'set canvas context'
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
  }, [tick_step, props.tick_step]);
  if (rect) {
    canvas = h('canvas', {
      ref: canvas_ref,
      width: rect.width,
      height: rect.height,
      onMouseDown: function(e) {
        var onDrag, onDragEnd, onMouseOut;
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
          requestAnimationFrame(renderChart.bind(null, canvas_state.current, props, context));
          e.preventDefault();
          e.stopPropagation();
          return false;
        };
        onMouseOut = function(e) {
          var f;
          e.stopPropagation();
          e.preventDefault();
          f = e.relatedTarget || e.toElement;
          if (f && f.nodeName !== "HTML") {
            return false;
          }
          // context.body.style.cursor = 'default'
          // context.body.removeEventListener('mousemove',onDrag)
          // context.body.removeEventListener('mouseup',onDragEnd)
          // context.body.removeEventListener('mouseout',onMouseOut)
          context.stopDrag(onDrag, onDragEnd, onMouseOut);
          // log 'MOUSE OUT'
          window.getSelection().removeAllRanges();
          return false;
        };
        onDragEnd = function(e) {
          e.preventDefault();
          e.stopPropagation();
          // context.body.style.cursor = 'default'
          // context.body.removeEventListener('mousemove',onDrag)
          // context.body.removeEventListener('mouseup',onDragEnd)
          // context.body.removeEventListener('mouseout',onMouseOut)
          context.stopDrag(onDrag, onDragEnd, onMouseOut);
          return false;
        };
        
        // context.body.style.cursor = 'ew-resize'
        // context.body.addEventListener 'mousemove',onDrag
        // context.body.addEventListener 'mouseup',onDragEnd
        // context.body.addEventListener 'mouseout',onMouseOut
        return context.startDrag(onDrag, onDragEnd, onMouseOut);
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
  var context, dispatch, input, input_ref, input_wrapper, isDragging, is_dragging, label, max, min, options, outer_range_ref, props_range_value, props_value, range_rect, range_slider_x, setStepValue, slider_state_ref, state, step_value, value_alpha, value_label;
  [state, dispatch] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useReducer"])(reducer, initial_state);
  [is_dragging, isDragging] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  [step_value, setStepValue] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(void 0);
  context = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_BoxContext__WEBPACK_IMPORTED_MODULE_2__["default"]);
  outer_range_ref = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  slider_state_ref = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])({});
  input_ref = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  if (props.label) {
    label = h('div', {
      className: 'ed-in-label ed-flex-right',
      style: {
        color: props.labelColor
      }
    }, props.label);
  }
  // h 'div',
  // 	className:'ed-in-label-colon'
  // 	props.type != 'toggle' && ':'
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
    case 'static':
      input = void 0;
      break;
    case 'plain':
    case 'label':
      input = h('div', {
        className: 'ed-input full-w ed-input-plain',
        style: {
          background: props.backgroundColor,
          color: props.valueColor
        }
      }, props.value);
      break;
    case 'text':
    case 'number':
      input = h('input', {
        type: props.type,
        disabled: props.disabled,
        className: 'ed-input',
        style: {
          background: props.backgroundColor,
          color: props.valueColor
        },
        onChange: function(e) {
          if (props.commit || context.dispatch) {
            dispatch({
              type: props.type,
              value: e.target.value
            });
          }
          if (context.dispatch) {
            context.dispatch({
              type: props.type,
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
        style: {
          backgroundColor: props.backgroundColor
        },
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
          backgroundColor: props.value && props.valueColor || void 0
        }
      }));
      break;
    case 'range':
      if (outer_range_ref.current) {
        range_rect = outer_range_ref.current.getBoundingClientRect();
        props_value = Number(props.value);
        if (props.step != null) {
          props_value = Math.floor(step_value / props.step) * props.step;
        }
        max = props.max || 1;
        min = props.min || 0;
        props_value = Math.min(Math.max(props_value, min), max);
        value_alpha = (props_value - min) / (max - min);
        // log props_value,value_alpha
        range_slider_x = value_alpha * (range_rect.width - 6);
        // log value_alpha,(range_rect.width-6),range_slider_x,props.step
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
          color: props.valueColor != null ? props.valueColor : void 0,
          backgroundColor: props.backgroundColor
        },
        onMouseDown: function(e) {
          var old_value, onDrag, onDragEnd, onMouseOut;
          slider_state_ref.current.cx = e.clientX;
          old_value = null;
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
              // log value,'/',props.step,'*',props.step
              new_value = Math.min(Math.max(Math.floor(value / props.step) * props.step, min), max);
              setStepValue(value);
              if (new_value !== old_value) {
                props.set(new_value);
                old_value = new_value;
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
            context.stopDrag(onDrag, onDragEnd, onMouseOut);
            return false;
          };
          onMouseOut = function(e) {
            var f;
            e.stopPropagation();
            e.preventDefault();
            f = e.relatedTarget || e.toElement;
            if (f && f.nodeName !== "HTML") {
              return false;
            }
            context.stopDrag(onDrag, onDragEnd, onMouseOut);
            // log 'MOUSE OUT'
            window.getSelection().removeAllRanges();
            return false;
          };
          // context.body.style.cursor = 'ew-resize'
          return context.startDrag(onDrag, onDragEnd, onMouseOut);
        }
      // context.body.addEventListener 'mousemove',onDrag
      // context.body.addEventListener 'mouseup',onDragEnd
      // context.body.addEventListener 'mouseout',onMouseOut
      }, h('div', {
        className: 'ed-range-slider',
        style: {
          transform: `translate(${range_slider_x}px,${0}%)`,
          backgroundColor: props.valueColor
        }
      }, !props.snapValueToEdge && value_label || void 0), props.snapValueToEdge && value_label || void 0);
      break;
    case 'button':
      // log 'SET COLOR',props.color
      input = h('button', {
        className: 'ed-button',
        style: {
          color: props.valueColor,
          background: props.backgroundColor
        },
        onClick: function(e) {
          return (typeof props.onSelect === "function" ? props.onSelect(e) : void 0) || (typeof props.onClick === "function" ? props.onClick(e) : void 0) || (typeof props.set === "function" ? props.set(e) : void 0);
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
        className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('ed-color-box-input', props.disabled && 'ed-disabled'),
        onChange: function(e) {
          if (!context.commit && props.set) {
            return props.set(e.target.value);
          }
        },
        type: 'color'
      })), h('input', {
        type: 'text',
        disabled: props.disabled,
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
  if (props.type === 'toggle') {
    return h('div', {
      className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('ed-in-wrap', 'ed-in-wrap-toggle', props.half && 'ed-in-half')
    }, h('div', {
      className: 'ed-in-wrap-toggle-input'
    // h 'div',
    // 	className: 'ed-in-wrap-toggle-label'
    }, input), label);
  }
  if (input != null) {
    input_wrapper = h('div', {
      className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('ed-input-wrap', props.half && 'ed-in-half')
    }, input);
  }
  return h('div', {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('ed-in-wrap', props.half && 'ed-in-half', props.type === 'plain' && 'ed-tight')
  }, input_wrapper, label, props.children);
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
  var _forceUpdate, canvas_ref, context, forceUpdate, force_update_t, getLabelWidth, isDragging, is_dragging, layout_ref, measure_text, setContext, setWinSize, startDrag, stopDrag, win_size;
  layout_ref = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])();
  [context, setContext] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  [win_size, setWinSize] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  measure_text = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(new Map());
  canvas_ref = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])();
  [is_dragging, isDragging] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  [force_update_t, forceUpdate] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(0);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function() {
    var can_el;
    // log 'new mea'
    measure_text.current = new Map();
    can_el = document.createElement("canvas");
    canvas_ref.current = can_el.getContext("2d");
    canvas_ref.current.font = props.fontSize + 'px ' + props.fontFamily;
  }, [props.fontFamily, props.fontSize]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function() {
    var view_rect;
    view_rect = layout_ref.current.getBoundingClientRect();
    return setContext({
      depth: 0,
      dim: props.fontSize * 1.6,
      wpad: props.fontSize * .4,
      // paddingLeft: props.fontSize * .6
      root: true,
      selected_label: 'root',
      view_rect: view_rect,
      getLabelWidth: getLabelWidth,
      stopDrag: stopDrag,
      forceUpdate: _forceUpdate,
      startDrag: startDrag
    });
  }, [props.fontFamily, props.fontSize, win_size]);
  _forceUpdate = function() {
    log('force update');
    return forceUpdate(force_update_t + 1);
  };
  startDrag = function(onDrag, onDragEnd, onMouseOut) {
    isDragging(true);
    layout_ref.current.addEventListener('mousemove', onDrag);
    layout_ref.current.addEventListener('mouseup', onDragEnd);
    return layout_ref.current.addEventListener('mouseout', onMouseOut);
  };
  stopDrag = function(onDrag, onDragEnd, onMouseOut) {
    isDragging(false);
    layout_ref.current.removeEventListener('mousemove', onDrag);
    layout_ref.current.removeEventListener('mouseup', onDragEnd);
    return layout_ref.current.removeEventListener('mouseout', onMouseOut);
  };
  getLabelWidth = function(label) {
    var ctx, text_width;
    ctx = canvas_ref.current;
    text_width = measure_text.current.get(label);
    if (text_width != null) {
      return text_width;
    } else {
      // log 'measure text'
      // log props.fontSize
      text_width = ctx.measureText(label).width;
      measure_text.current.set(label, text_width);
      return text_width;
    }
  };
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function() {
    var onWindowResize;
    if (!context) {
      onWindowResize = function() {
        return setWinSize(window.innerWidth + '-' + window.innerHeight);
      };
      onWindowResize();
      window.addEventListener('resize', onWindowResize);
      return;
    }
    return function() {
      return window.removeEventListener('resize', onWindowResize);
    };
  }, []);
  return h(_LayoutContext__WEBPACK_IMPORTED_MODULE_2__["default"].Provider, {
    value: context
  }, h('div', {
    ref: layout_ref,
    style: {
      fontSize: props.fontSize,
      fontFamily: props.fontFamily
    },
    className: 'ed-layout ' + (is_dragging && 'ed-layout-dragging' || '')
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
  var align_key, autoDeselect, context, label_keys, label_widths, labels, max_label_width, menu_ref, new_height, offset_x, offset_y, overflow_y, ref, ref1, ref2, scroll_top, selected_child, selected_label_index, selected_label_x, selected_label_y, self_context, self_height, self_width, self_x, self_y, style, total_label_height, total_label_width, vert;
  context = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_LayoutContext__WEBPACK_IMPORTED_MODULE_2__["default"]);
  if (props.autoDeselect != null) {
    autoDeselect = props.autoDeselect;
  } else if ((context != null ? context.autoDeselect : void 0) != null) {
    autoDeselect = context.autoDeselect;
  } else {
    autoDeselect = true;
  }
  self_context = Object.assign({}, context, {
    autoDeselect: autoDeselect,
    root: false,
    vert: props.vert,
    depth: (context != null ? context.depth : void 0) + 1
  });
  menu_ref = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])();
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function() {
    return function() {
      // log 'DECELECT'
      if (self_context.autoDeselect) {
        return typeof props.onSelect === "function" ? props.onSelect(void 0, void 0) : void 0;
      }
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
  selected_label_y = 0;
  selected_label_x = 0;
  total_label_height = 0;
  label_widths = label_keys.map(function(key, i) {
    var width;
    if (!props.items[key]) {
      return 0;
    }
    if (props.items[key].label) {
      key = props.items[key].label;
    }
    if (key === props.select) {
      selected_label_index = i;
      selected_label_y = total_label_height;
      selected_label_x = total_label_width;
    }
    width = context.getLabelWidth(key);
    // log 'get label width',key,width,context.wpad*2,context.dim
    if (width > max_label_width) {
      max_label_width = width;
    }
    total_label_width += width + context.wpad * 2;
    total_label_height += context.dim;
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
  new_height = Object(_Align__WEBPACK_IMPORTED_MODULE_3__["clampHeight"])(context, self_height);
  overflow_y = new_height < self_height;
  self_height = new_height;
  scroll_top = ((ref = menu_ref.current) != null ? ref.scrollTop : void 0) || 0;
  // style.minHeight = MIN_HEIGHT
  // style.height = self_height
  if (props.align) {
    align_key = props.align;
  } else {
    // log 'FORCE ALIGN FOR ',context.selected_label,' : ',align_key
    self_x = ((ref1 = props.position) != null ? ref1[0] : void 0) || context.x || 0;
    self_y = ((ref2 = props.position) != null ? ref2[1] : void 0) || context.y || 0;
    align_key = Object(_Align__WEBPACK_IMPORTED_MODULE_3__["guessAlign"])(self_width, self_height, context, self_x, self_y);
    // log 'GUESSED ALIGN FOR ',context.selected_label,' : ',align_key
    // [x,y] = getPosition(self_width,self_height,context,align_key)
    align_key = Object(_Align__WEBPACK_IMPORTED_MODULE_3__["fixAlign"])(align_key, context, self_width, self_height);
  }
  // log 'FIX ALIGN FOR ',context.selected_label,' : ',align_key
  if (props.position) {
    self_x = props.position[0];
    self_y = props.position[1];
  } else if (context.root) {
    self_x = context.x || 0;
    self_y = context.y || 0;
  } else {
    [self_x, self_y] = Object(_Align__WEBPACK_IMPORTED_MODULE_3__["getPosition"])(self_width, self_height, context, align_key);
    [offset_x, offset_y] = Object(_Align__WEBPACK_IMPORTED_MODULE_3__["clampPosition"])(context, self_x, self_y, self_width, self_height, align_key);
    self_x += offset_x;
    self_y += offset_y;
  }
  style = {};
  style.overflowY = overflow_y && 'scroll';
  style.zIndex = props.select && 666 || 1;
  style.zIndex += self_context.depth;
  style.left = self_x + 'px';
  style.top = self_y + 'px';
  style.height = self_height + 'px';
  // if offset_x || offset_y
  // 	style.transform = "translate(#{offset_x}px,#{offset_y}px)"
  if (props.style) {
    Object.assign(style, props.style);
  }
  self_context.width = self_width;
  self_context.height = self_height;
  self_context.x = self_x;
  self_context.y = self_y;
  self_context.vert = props.vert;
  self_context.root = false;
  self_context.align = align_key;
  self_context.selected_label = props.select;
  if (props.vert) {
    self_context.sel_x = self_x;
    self_context.sel_y = self_y + selected_label_y + scroll_top;
  } else {
    self_context.sel_x = self_x + selected_label_x;
    self_context.sel_y = self_y + scroll_top;
  }
  self_context.sel_w = label_widths[selected_label_index];
  selected_child = null;
  if (props.items) {
    labels = label_keys.map(function(key, i) {
      var child, label, title;
      child = props.items[key];
      if (!child) {
        return null;
      }
      label = child.label || key;
      // log context.wpad
      if (child.onClick || child.onSelect) {
        return h('div', {
          key: key,
          className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('ed-menu-item-label', props.select === key && 'ed-selected', 'noselect'),
          style: {
            paddingLeft: context.wpad,
            width: label_widths[i]
          },
          onClick: child.onClick || child.onSelect
        }, label);
      }
      title = key + '-' + i;
      label_keys.push(key);
      if (props.select === key) {
        if (typeof child === 'function') {
          selected_child = child();
        } else if (child.render) {
          selected_child = child.render();
        } else if (child.label) {
          selected_child = null;
        } else {
          selected_child = child;
        }
      }
      return h('button', {
        key: key,
        title: title,
        style: {
          minWidth: label_widths[i],
          paddingLeft: context.wpad
        },
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
      }, label);
    });
  }
  return h('div', {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('ed-menu', props.vert && 'ed-flex-down' || 'ed-flex-right', self_context.depth % 2 === 0 && 'ed-menu-alt'),
    style: style,
    ref: menu_ref
  }, h('div', {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('ed-menu-labels', props.vert && 'ed-flex-down' || 'ed-flex-right')
  }, labels), h(_LayoutContext__WEBPACK_IMPORTED_MODULE_2__["default"].Provider, {
    value: self_context
  }, selected_child));
};

/* harmony default export */ __webpack_exports__["default"] = (Menu);


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
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('ed-section-title ed-flex-right noselect', (props.visible == null) && 'ed-section-label-toggle-off'),
    onClick: function(e) {
      return typeof props.set === "function" ? props.set(!props.visible) : void 0;
    }
  }, h('div', {
    className: 'ed-section-label ed-flex-right ed-full-w'
  }, h('div', {
    className: 'ed-in-label-colon ed-pre'
  }, '# '), props.label, (props.visible != null) && (h('div', {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('ed-section-label-toggle', props.visible === true || (props.visible == null) && 'ed-section-label-toggle-active')
  }, props.visible === true && ' ▲' || ' ▼')) || null)), (props.visible === true || (props.visible == null)) && (h('div', {
    className: 'ed-section-content ed-flex-down ed-full-w'
  }, props.children)) || null);
};

// props.visible && (h 'div',
// 	className: 'ed-section-end-label'
// 	'-*-'
// ) || null
/* harmony default export */ __webpack_exports__["default"] = (Section);


/***/ }),

/***/ "./components/Separator.coffee":
/*!*************************************!*\
  !*** ./components/Separator.coffee ***!
  \*************************************/
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
var Separator, h;









h = react__WEBPACK_IMPORTED_MODULE_0__["createElement"];

Separator = function(props) {
  return h('div', {
    className: 'ed-separator'
  });
};

/* harmony default export */ __webpack_exports__["default"] = (Separator);


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
/*! exports provided: Box, In, Layout, Menu, Section, Separator, Anchor */
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

/* harmony import */ var _Separator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Separator */ "./components/Separator.coffee");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Separator", function() { return _Separator__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _Anchor__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Anchor */ "./components/Anchor.coffee");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Anchor", function() { return _Anchor__WEBPACK_IMPORTED_MODULE_7__["default"]; });




















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
exports.push([module.i, ".noselect {\n  -webkit-touch-callout: none;\n  /* iOS Safari */\n  -webkit-user-select: none;\n  /* Safari */\n  -khtml-user-select: none;\n  /* Konqueror HTML */\n  -moz-user-select: none;\n  /* Old versions of Firefox */\n  -ms-user-select: none;\n  /* Internet Explorer/Edge */\n  user-select: none;\n  /* Non-prefixed version, currently\n                                  supported by Chrome, Edge, Opera and Firefox */\n}\n.ed-layout {\n  z-index: 100;\n  text-rendering: optimizeSpeed;\n  line-height: 95%;\n  font-family: 'DM Mono', monospace;\n  font-size: 0.85em;\n  color: #ffffff;\n  position: fixed;\n  top: 0px;\n  left: 0px;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  pointer-events: none;\n}\n.ed-layout * {\n  pointer-events: all;\n  box-sizing: border-box;\n}\n.ed-layout-dragging {\n  pointer-events: all;\n  cursor: ew-resize;\n}\n.ed-layout-dragging * {\n  pointer-events: none !important;\n}\n.ed-full-w {\n  width: 100%;\n}\n.ed-flex-left,\n.ed-input-wrap {\n  display: flex;\n  flex-wrap: wrap;\n  position: relative;\n  flex-direction: row-reverse;\n  align-items: center;\n  justify-content: flex-end;\n}\n.ed-flex-right,\n.ed-in-wrap {\n  display: flex;\n  position: relative;\n  flex-direction: row;\n  align-items: center;\n  justify-content: flex-start;\n}\n.ed-flex-down {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  justify-content: flex-start;\n}\n.ed-in-wrap {\n  font-size: 0.9em;\n  width: 100%;\n  padding: 0px 0.425em;\n  min-height: 1.6em;\n  flex-wrap: nowrap;\n  margin-bottom: 0.255em;\n}\n.ed-in-wrap.ed-in-half {\n  width: 50%;\n}\n.ed-in-wrap.ed-tight {\n  min-height: 1em;\n}\n.ed-in-wrap:last-child {\n  margin-bottom: 0px;\n}\n.ed-in-wrap-toggle-input {\n  width: auto;\n  flex-shrink: 0;\n}\n.ed-in-wrap-toggle-label {\n  width: auto;\n}\n.ed-input-wrap {\n  width: 150%;\n}\n.ed-input-wrap.ed-in-half {\n  width: fit-content;\n}\n.ed-in-label {\n  width: 100%;\n  margin-left: 0.4em;\n  color: #c8c8c8;\n  white-space: normal;\n  text-align: -webkit-left;\n  align-items: flex-start;\n  justify-content: flex-start;\n  word-break: break-all;\n}\n.ed-in-label-colon {\n  color: #c8c8c8;\n}\ninput:disabled {\n  color: #c8c8c8 !important;\n  -webkit-user-select: none !important;\n  user-select: none !important;\n  cursor: default !important;\n}\n.ed-input {\n  width: inherit;\n  line-height: 1.6em;\n  height: 1.6em;\n  font-family: 'DM Mono', monospace;\n  -webkit-appearance: none;\n  outline: none;\n  color: #ffffff;\n  background-color: #141414;\n  border: none;\n  border-radius: none;\n  padding: 0px 0.425em;\n}\n.ed-input-plain {\n  background-color: #1e1e1e;\n}\n.ed-toggle-outer {\n  width: 1.6em;\n  cursor: pointer;\n  height: 1.6em;\n  background-color: #141414;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.ed-toggle-outer .ed-toggle-inner {\n  width: 12px;\n  height: 12px;\n  border-radius: 6px;\n  background-color: #2a2a2a;\n}\n.ed-toggle-outer .ed-toggle-inner.ed-toggle-active {\n  background: #ffffff;\n}\n.ed-box-title {\n  padding: 0.425em;\n  padding-bottom: 0.2125em;\n  font-weight: 800;\n  text-align: center;\n  display: flex;\n  color: white;\n  align-items: flex-start;\n  justify-content: flex-start;\n  flex-direction: row;\n  width: 100%;\n  z-index: 1;\n  background: #2a2a2a;\n  text-transform: uppercase !important;\n}\n.ed-box-title * {\n  white-space: pre;\n}\n.ed-box-title .ed-in-label-colon {\n  color: #c8c8c8;\n}\n.ed-box-title-sticky {\n  position: sticky;\n  top: 0px;\n  background: #ffffff;\n  color: #2a2a2a;\n  margin-bottom: 0.425em;\n}\n.ed-box-content {\n  display: flex;\n  align-self: start;\n  justify-content: start;\n  flex-direction: row;\n  flex-wrap: wrap;\n  padding-bottom: 0.85em;\n}\n.ed-box {\n  background-color: #2a2a2a;\n  color: #ffffff;\n  position: fixed;\n  width: 320px;\n  flex-wrap: nowrap;\n}\n.ed-box::-webkit-scrollbar {\n  -webkit-appearance: none;\n  background-color: #141414;\n  width: 4px;\n  height: 4px;\n  border-radius: 0px;\n}\n.ed-box::-webkit-scrollbar-corner {\n  background-color: #141414;\n}\n.ed-box::-webkit-scrollbar-thumb {\n  border-radius: 0px;\n  background-color: #7F7F7F;\n}\n.ed-box::-webkit-scrollbar-thumb:hover {\n  background-color: #8F8F8F;\n}\n.ed-box.ed-scroll {\n  overflow-y: scroll;\n  overflow-x: hidden;\n  width: 324px;\n}\n.ed-box .ed-description {\n  padding: 0px 0.425em;\n  font-size: 0.8em;\n  color: #ebebeb;\n  margin: 0.425em 0px;\n  margin-top: 0px;\n  white-space: normal;\n}\n.ed-menu-child-wrapper {\n  position: relative;\n  left: -100%;\n  top: 12px;\n}\n.ed-menu {\n  color: #ffffff;\n  flex-wrap: nowrap;\n  width: fit-content;\n  height: fit-content;\n  position: fixed;\n}\n.ed-menu.ed-scroll {\n  overflow-y: scroll;\n  overflow-x: hidden;\n}\n.ed-menu.ed-flex-down > .ed-menu-item {\n  width: -webkit-fill-available;\n  height: auto;\n}\n.ed-menu.ed-flex-right > .ed-menu-item {\n  height: -webkit-fill-available;\n  width: auto;\n}\n.ed-menu .ed-menu-labels {\n  background-color: #2a2a2a;\n}\n.ed-menu .ed-menu-item-label {\n  white-space: pre;\n  width: -webkit-fill-available;\n  height: 1.6em;\n  text-transform: uppercase;\n  display: flex;\n  align-items: center;\n  color: #ebebeb;\n  background: none;\n  border: none;\n  outline: none;\n  font: inherit;\n  padding: 0px;\n  cursor: pointer;\n}\n.ed-menu .ed-menu-item-label.ed-selected {\n  background-color: #141414;\n  color: #ffffff;\n}\n.ed-menu .ed-menu-item-label:hover {\n  color: #ffffff;\n}\n.ed-menu .ed-menu-item {\n  position: relative;\n}\n.ed-menu.ed-menu-alt > .ed-menu-labels > .ed-menu-item-label {\n  background-color: #141414;\n}\n.ed-menu.ed-menu-alt > .ed-menu-labels > .ed-menu-item-label.ed-selected {\n  background-color: #2a2a2a;\n}\n.ed-hidden {\n  visibility: hidden;\n}\n.ed-range-outer {\n  height: 1.6em;\n  width: 100%;\n  background: #141414;\n  position: relative;\n  cursor: ew-resize;\n}\n.ed-range-outer .ed-range-slider {\n  width: 6.5px;\n  height: 1.6em;\n  background: #ffffff;\n}\n.ed-range-outer .ed-range-slider.ed-active {\n  background: #ffffff;\n}\n.ed-range-outer .ed-range-value {\n  position: absolute;\n  left: 14px;\n  top: 50%;\n  transform: translate(0%, -50%);\n}\n.ed-range-outer .ed-range-value.ed-range-value-snap {\n  right: 8px;\n  left: initial;\n}\n.ed-range-outer .ed-range-value.ed-range-value-left {\n  right: 14px;\n  left: initial;\n}\n.ed-range-outer .ed-range-value.ed-range-value-left.ed-range-value-snap {\n  left: 8px;\n  right: initial;\n}\n.ed-button {\n  outline: none;\n  -webkit-appearance: none;\n  border: none;\n  cursor: pointer;\n  width: 100%;\n  height: 1.6em;\n  background: #141414;\n  color: #ebebeb;\n}\n.ed-button:hover {\n  color: #ffffff;\n}\n.ed-color-box {\n  position: relative;\n  -webkit-appearance: none;\n  width: 3.2em;\n  height: 1.6em;\n  flex-shrink: 0;\n  cursor: pointer;\n  margin-right: 0.255em;\n  border: 3px solid black;\n}\n.ed-color-box .ed-color-box-input {\n  visibility: visible;\n  opacity: 0;\n  cursor: pointer;\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  padding: 0px;\n  left: 0px;\n  top: 0px;\n}\n.ed-value-box {\n  width: 100%;\n  height: 1.6em;\n  background-color: #2a2a2a;\n  margin-left: 0.153em;\n  line-height: 1.6em;\n  padding: 0px 0.425em;\n}\n.ed-section {\n  margin: 0.425em 0px;\n  padding: 0.425em 0px;\n  position: relative;\n  border-top: 1px solid rgba(150, 150, 150, 0.3);\n  border-bottom: 1px solid rgba(150, 150, 150, 0.3);\n}\n.ed-section-title {\n  min-height: 1.6em;\n  cursor: pointer;\n  white-space: pre;\n  font-weight: 800;\n  width: 100%;\n  padding: 0px 0.425em;\n  text-transform: uppercase;\n}\n.ed-section-label-toggle-off {\n  cursor: default;\n}\n.ed-section-label-toggle {\n  font-size: 0.85em;\n  width: 100%;\n  padding-right: 0.425em;\n  display: flex;\n  color: #c8c8c8;\n  flex-direction: column;\n  align-items: flex-end;\n  justify-content: flex-end;\n}\n.ed-section-label-toggle.ed-section-label-toggle-active {\n  color: #ebebeb;\n}\n.ed-section-end-label {\n  padding: 0.425em;\n  display: flex;\n  width: 100%;\n  flex-direction: row;\n  align-items: center;\n  justify-content: center;\n}\n.ed-input-select {\n  width: 100%;\n  outline: none;\n  -webkit-appearance: none;\n  height: 24px;\n  cursor: pointer;\n  padding: 0px 0.425em;\n  border: none;\n  color: #ffffff;\n  background: #141414;\n}\n.ed-input-select-arrow {\n  position: absolute;\n  right: 14px;\n  color: #c8c8c8;\n  font-family: monospace;\n}\n.ed-separator {\n  margin-top: 0.53333333em;\n  border-bottom: 1px solid rgba(150, 150, 150, 0.3);\n  height: 0px;\n  width: 100%;\n  margin-bottom: 0.8em;\n}\n.ed-line-chart {\n  width: 100%;\n  height: 80px;\n  background: #141414;\n}\n.ed-line-chart-wrap {\n  flex-direction: column;\n  align-content: flex-start;\n  justify-content: flex-start;\n  align-items: flex-start;\n}\n.ed-line-chart-wrap canvas {\n  cursor: ew-resize;\n  width: 100%;\n  height: 100%;\n}\n.ed-line-chart-label {\n  padding: 0.425em 0px;\n}\n.ed-anchor {\n  display: flex;\n  flex-direction: row;\n  position: fixed;\n}\n.ed-anchor .ed-anchor-handle {\n  position: fixed;\n  background: black;\n  cursor: move;\n  display: flex;\n  justify-content: center;\n  align-content: center;\n  align-items: center;\n}\n.ed-anchor .ed-anchor-handle .ed-anchor-dot {\n  margin: 0.26666667em;\n  pointer-events: none;\n  background: white;\n  width: 0.26666667em;\n  height: 0.26666667em;\n}\n.ed-anchor .ed-anchor-handle-resize {\n  width: 0.8em;\n  height: 0.8em;\n  background: black;\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 1;\n}\n.ed-anchor.ed-anchor-drag {\n  pointer-events: all;\n  cursor: move;\n}\n.ed-anchor.ed-anchor-drag * {\n  pointer-events: none !important;\n}\n.ed-anchor.ed-anchor-resize {\n  pointer-events: all;\n}\n.ed-anchor.ed-anchor-resize * {\n  pointer-events: none !important;\n}\n", ""]);
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