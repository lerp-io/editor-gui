import {createElement,useState,useEffect,useContext,useRef} from 'react'
h = createElement
import cn from 'classnames'
import decidePosition from './decidePosition.coffee'
import LayoutContext from './LayoutContext'

Section = (props,state)->
	if props.visible
		section_bar = h 'div',
			className: 'ed-section-bar'

	h 'div',
		className: 'ed-section ed-flex-down ed-full-w'
		section_bar
		h 'div',
			className: 'ed-section-title ed-flex-right'
			onClick: ->
				props.set?(!props.visible)
			h 'div',
				className: 'ed-section-label ed-flex-right ed-full-w'
				h 'div',
					className: 'ed-in-label-colon'
					'### '
				props.label
				h 'div',
					className: 'ed-section-label-toggle'
					(props.visible && ' -' || ' +')
		props.visible && (h 'div',
			className: 'ed-section-content ed-flex-down ed-full-w'
			props.children
		) || null
		props.visible && (h 'div',
			className: 'ed-section-end-label'
			'-*-'
		) || null

export default Section