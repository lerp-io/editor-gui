import {createElement,useState,useEffect,useRef,useContext} from 'react'
import LayoutContext from './LayoutContext'
import BoxContext from './BoxContext'
import cn from 'classnames'

import {clampPosition,getPosition,fixAlign,guessAlign,adjustHeight} from './Align'

h = createElement

MIN_HEIGHT = 100


Box = (props,state)->

	[visible,setVisible] = useState(false)
	[height,setHeight] = useState(null)
	self_ref = useRef(null)
	content_ref = useRef(null)
	style = {}
	
	context = useContext(LayoutContext)
	self_context = {}

	useEffect ()->
		if !visible
			setVisible(true)
		
		if content_ref.current
			current_height = content_ref.current?.scrollHeight || MIN_HEIGHT
			if height != current_height
				setHeight(current_height)



	if !context
		return null


	style = {}
	self_width = props.width || 320
	content_height = content_ref.current?.scrollHeight || MIN_HEIGHT
	[style.overflowY,self_height] = adjustHeight(context,self_width,content_height)
	style.minHeight = MIN_HEIGHT
	style.height = self_height


	
	if props.align
		align_key = props.align
		# log 'FORCE ALIGN FOR ',context.selected_label,' : ',align_key
	else
		align_key = guessAlign(self_width,self_height,context)
		[x,y] = getPosition(self_width,self_height,context,align_key)
		align_key = fixAlign(align_key,context,self_width,self_height)
		# log 'FIX ALIGN FOR ',context.selected_label,' : ',align_key

	if props.position
		self_x = props.position[0]
		self_y = props.position[1]
	else
		[self_x,self_y] = getPosition(self_width,self_height,context,align_key)
		# log self_x,self_y
		[offset_x,offset_y] = clampPosition(context,self_x,self_y,self_width,self_height)
		self_x += offset_x
		self_y += offset_y
		# [self_width]

		
	
	
	# style.zIndex = props.select && 666 || 1
	style.zIndex = context.depth + 1 + 888
	style.left = self_x+'px'
	style.top = self_y+'px'
	style.width = self_width
	
	
	

	h 'div',
		ref: self_ref
		style: style
		className: cn 'ed-box',!visible && 'ed-hidden','ed-scroll'
		h 'div',
			cn:'ed-box-inner'
			style:
				minHeight: MIN_HEIGHT
			ref: content_ref
			props.title && (h 'div',
				className: 'ed-box-title'
				h 'div',
					className: 'ed-in-label-colon'
					'## '
				props.title
				h 'div',
					className: 'ed-in-label-colon'
					' ##'
			) || null
			props.description && (h 'div',
				className: 'ed-description'
				props.description
			) || null
			h 'div',
				className: 'ed-box-content'
				h BoxContext.Provider,
					value: self_context
					props.children
			

		

export default Box