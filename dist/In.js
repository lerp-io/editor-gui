// Generated by CoffeeScript 2.5.1
var In, LineChart, h, initial_state, reducer, renderChart;

import {
  createElement,
  useState,
  useEffect,
  useContext,
  useRef,
  useReducer
} from 'react';

import cn from 'classnames';

import BoxContext from './BoxContext';

import parseColor from 'parse-color';

h = createElement;

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
  wrap_ref = useRef(null);
  canvas_ref = useRef(null);
  canvas_state = useRef({
    pan_x: 0
  });
  context = useContext(BoxContext);
  [rect, setRect] = useState(null);
  [tick_step, setTickStep] = useState(null);
  useEffect(function() {
    if (wrap_ref.current) {
      rect = wrap_ref.current.getBoundingClientRect();
      canvas_state.current.rect = rect;
      return setRect(rect);
    }
  }, [wrap_ref.current]);
  useEffect(function() {
    if (canvas_ref.current) {
      // log 'set canvas context'
      canvas_state.current.ctx = canvas_ref.current.getContext('2d');
      setTickStep(0);
    }
  }, [canvas_ref.current]);
  useEffect(function() {
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
  [state, dispatch] = useReducer(reducer, initial_state);
  [is_dragging, isDragging] = useState(false);
  [step_value, setStepValue] = useState(void 0);
  context = useContext(BoxContext);
  outer_range_ref = useRef(null);
  slider_state_ref = useRef({});
  input_ref = useRef(null);
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
  useEffect(function() {
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
        className: cn('ed-toggle-inner', props.value && 'ed-toggle-active'),
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
        className: cn('ed-range-value', value_alpha > .5 && 'ed-range-value-left', props.snapValueToEdge && 'ed-range-value-snap')
      }, props_range_value);
      input = h('div', {
        className: cn('ed-range-outer'),
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
        className: cn('ed-color-box-input', props.disabled && 'ed-disabled'),
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
          parsed_color = parseColor(e.target.value);
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
      className: cn('ed-in-wrap', 'ed-in-wrap-toggle', props.half && 'ed-in-half')
    }, h('div', {
      className: 'ed-in-wrap-toggle-input'
    // h 'div',
    // 	className: 'ed-in-wrap-toggle-label'
    }, input), label);
  }
  if (input != null) {
    input_wrapper = h('div', {
      className: cn('ed-input-wrap', props.half && 'ed-in-half')
    }, input);
  }
  return h('div', {
    className: cn('ed-in-wrap', props.half && 'ed-in-half', props.type === 'plain' && 'ed-tight')
  }, input_wrapper, label, props.children);
};

export default In;

//# sourceMappingURL=In.js.map