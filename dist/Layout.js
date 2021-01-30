// Generated by CoffeeScript 2.5.1
var Layout, h;

import {
  createElement,
  useState,
  useEffect,
  useRef
} from 'react';

h = createElement;

import cn from 'classnames';

import LayoutContext from './LayoutContext';

import waitForFontLoad from './waitForFontLoad.js';

Layout = function(props, state) {
  var canvas_ref, context, css_font, font_loaded, forceUpdate, force_update_t, getLabelWidth, isDragging, is_dragging, layout_ref, measure_text, setContext, setFontLoaded, setWinSize, startDrag, stopDrag, win_size;
  layout_ref = useRef();
  [context, setContext] = useState(null);
  [win_size, setWinSize] = useState(null);
  measure_text = useRef(new Map());
  canvas_ref = useRef();
  [is_dragging, isDragging] = useState(false);
  [force_update_t, forceUpdate] = useState(0);
  [font_loaded, setFontLoaded] = useState(null);
  css_font = props.fontSize + 'px ' + props.fontFamily;
  useEffect(function() {
    // log 'WAIT FOR WEB FONTS',props.waitForWebfonts
    if (props.waitForFontLoad) {
      // log 'WAIT FOR WEB FONTS',props.fontFamily
      waitForFontLoad(css_font).then(function() {
        // log 'FONT LOADED'
        return setFontLoaded(props.fontFamily);
      });
    }
  }, [props.fontFamily]);
  useEffect(function() {
    var can_el;
    // log 'SET MEASURE TEXT CANVAS',font_loaded
    measure_text.current = new Map();
    can_el = document.createElement("canvas");
    canvas_ref.current = can_el.getContext("2d");
    canvas_ref.current.font = css_font;
  }, [props.fontFamily, props.fontSize, win_size, font_loaded]);
  useEffect(function() {
    var view_rect;
    view_rect = layout_ref.current.getBoundingClientRect();
    return setContext({
      depth: 0,
      dim: props.fontSize * 1.6,
      wpad: props.fontSize * .4,
      root: true,
      selected_label: 'root',
      view_rect: view_rect,
      getLabelWidth: getLabelWidth,
      stopDrag: stopDrag,
      font_loaded: font_loaded,
      startDrag: startDrag
    });
  }, [props.fontFamily, props.fontSize, win_size, font_loaded]);
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
      // log 'GET SAVED LABEL WIDTH',text_width
      return text_width;
    } else {
      // log 'measure text',props.fontSize,text_width,win_size
      text_width = ctx.measureText(label).width;
      measure_text.current.set(label, text_width);
      // log 'GET NEW LABEL WIDTH',text_width
      return text_width;
    }
  };
  useEffect(function() {
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
  return h(LayoutContext.Provider, {
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

export default Layout;

//# sourceMappingURL=Layout.js.map
