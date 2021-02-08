// Generated by CoffeeScript 2.5.1
var Section, h;

import {
  createElement,
  useState,
  useEffect,
  useContext,
  useRef
} from 'react';

h = createElement;

import cn from 'classnames';

import LayoutContext from './LayoutContext';

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
    className: cn('ed-section-title ed-flex-right noselect', (props.visible == null) && 'ed-section-label-toggle-off'),
    onClick: function(e) {
      return typeof props.onClick === "function" ? props.onClick(!props.visible) : void 0;
    }
  }, h('div', {
    className: 'ed-section-label ed-flex-right ed-full-w'
  }, h('div', {
    className: 'ed-in-label-colon ed-pre'
  }, '# '), props.label, props.onClick && ((props.visible != null) && (h('div', {
    className: cn('ed-section-label-toggle', props.visible === true || (props.visible == null) && 'ed-section-label-toggle-active')
  }, props.visible === true && ' ▲' || ' ▼')) || null))), (props.visible === true || (props.visible == null)) && (h('div', {
    className: 'ed-section-content ed-flex-down ed-full-w'
  }, props.children)) || null);
};

// props.visible && (h 'div',
// 	className: 'ed-section-end-label'
// 	'-*-'
// ) || null
export default Section;

//# sourceMappingURL=Section.js.map
