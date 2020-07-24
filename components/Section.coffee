import {createElement,useState,useEffect,useContext,useRef} from 'react'
h = createElement
import cn from 'classnames'
import LayoutContext from './LayoutContext'

Section = (props,state)->
	if props.visible
		section_bar = h 'div',
			className: 'ed-section-bar'

	h 'div',
		className: 'ed-section ed-flex-down ed-full-w'
		section_bar
		h 'div',
			className: cn 'ed-section-title ed-flex-right noselect',!props.visible? && 'ed-section-label-toggle-off'
			onClick: (e)->
				props.set?(!props.visible)
			h 'div',
				className: 'ed-section-label ed-flex-right ed-full-w'
				h 'div',
					className: 'ed-in-label-colon ed-pre'
					'# '
				props.label
				props.visible? && (h 'div',
					className: cn 'ed-section-label-toggle',props.visible == true || !props.visible? && 'ed-section-label-toggle-active'
					(props.visible == true && ' ▲' || ' ▼')
				) || null
		(props.visible == true || !props.visible?) && (h 'div',
			className: 'ed-section-content ed-flex-down ed-full-w'
			props.children
		) || null
		# props.visible && (h 'div',
		# 	className: 'ed-section-end-label'
		# 	'-*-'
		# ) || null

export default Section