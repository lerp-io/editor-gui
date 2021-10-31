import {createElement,useState,useEffect,useRef,useContext} from 'react'
import LayoutContext from './LayoutContext'
import BoxContext from './BoxContext'
import cn from 'classnames'
import {clampPosition,getPosition,fixAlign,guessAlign,clampHeight,clampWidth} from './Align'

h = createElement

Container = (props,state)->
	context = useContext(LayoutContext)
	self_ref = useRef(null)
	content_ref = useRef(null)

	if !context
		return null

	self_context = 
		startDrag: context.startDrag
		stopDrag: context.stopDrag

	if context.root
		self_x = context.x
		self_y = context.y
	else
		return null

	h 'div',
		ref: self_ref
		style:
			left: self_x+'px'
			top: self_y+'px'
			zIndex: context.depth + 1 + 888
		className: cn 'ed-box'
		h BoxContext.Provider,
			value: self_context
			props.children
			

export default Container