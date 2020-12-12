// Generated by CoffeeScript 2.5.1
var Menu, h;

import {
  createElement,
  useState,
  useEffect,
  useContext,
  useRef,
  createRef
} from 'react';

h = createElement;

import cn from 'classnames';

import LayoutContext from './LayoutContext';

import {
  clampPosition,
  getPosition,
  fixAlign,
  guessAlign,
  clampHeight
} from './Align';

Menu = function(props) {
  var align_key, autoDeselect, context, label_keys, label_widths, labels, max_label_width, menu_ref, new_height, offset_x, offset_y, overflow_y, ref, scroll_top, selected_child, selected_label_index, selected_label_x, selected_label_y, self_context, self_height, self_width, self_x, self_y, style, total_label_height, total_label_width, vert, x, y;
  context = useContext(LayoutContext);
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
  menu_ref = useRef();
  useEffect(function() {
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
  new_height = clampHeight(context, self_height);
  overflow_y = new_height < self_height;
  self_height = new_height;
  scroll_top = ((ref = menu_ref.current) != null ? ref.scrollTop : void 0) || 0;
  // style.minHeight = MIN_HEIGHT
  // style.height = self_height
  if (props.align) {
    align_key = props.align;
  } else {
    // log 'FORCE ALIGN FOR ',context.selected_label,' : ',align_key
    align_key = guessAlign(self_width, self_height, context);
    // log 'GUESSED ALIGN FOR ',context.selected_label,' : ',align_key
    [x, y] = getPosition(self_width, self_height, context, align_key);
    align_key = fixAlign(align_key, context, self_width, self_height);
  }
  // log 'FIX ALIGN FOR ',context.selected_label,' : ',align_key
  if (props.position) {
    self_x = props.position[0];
    self_y = props.position[1];
  } else if (context.root) {
    self_x = context.x;
    self_y = context.y;
  } else {
    [self_x, self_y] = getPosition(self_width, self_height, context, align_key);
    [offset_x, offset_y] = clampPosition(context, self_x, self_y, self_width, self_height, align_key);
    self_x += offset_x;
    self_y += offset_y;
  }
  style = {};
  style.overflowY = overflow_y;
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
      if (child.onClick || child.onSelect) {
        return h('div', {
          key: key,
          className: cn('ed-menu-item-label', props.select === key && 'ed-selected', 'noselect'),
          style: {
            paddingLeft: context.paddingLeft,
            minWidth: label_widths[i]
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
          paddingLeft: context.paddingLeft
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
        className: cn('ed-menu-item-label', props.select === key && 'ed-selected', 'noselect')
      }, label);
    });
  }
  return h('div', {
    className: cn('ed-menu', props.vert && 'ed-flex-down' || 'ed-flex-right', self_context.depth % 2 === 0 && 'ed-menu-alt'),
    style: style,
    ref: menu_ref
  }, h('div', {
    className: cn('ed-menu-labels', props.vert && 'ed-flex-down' || 'ed-flex-right')
  }, labels), h(LayoutContext.Provider, {
    value: self_context
  }, selected_child));
};

export default Menu;

//# sourceMappingURL=Menu.js.map