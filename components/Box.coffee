import {createElement,useState,useEffect,useRef,useContext} from 'react'
import LayoutContext from './LayoutContext'
import BoxContext from './BoxContext'
import cn from 'classnames'

import {clampPosition,getPosition,fixAlign,guessAlign,clampHeight} from './Align'

h = createElement

MIN_HEIGHT = 50


Box = (props,state)->

	[visible,setVisible] = useState(false)
	[height_overflow,setHeight] = useState([MIN_HEIGHT,0])
	self_ref = useRef(null)
	content_ref = useRef(null)
	
	height = height_overflow[0]
	# log height
	style = 
		overflowY: height_overflow[1]
	
	context = useContext(LayoutContext)
	self_context = 
		startDrag: context.startDrag
		stopDrag: context.stopDrag

	
	self_width = props.width || 320
	
	useEffect ()->
		if content_ref.current
			content_height = content_ref.current?.scrollHeight || MIN_HEIGHT
			set_height = clampHeight(context,content_height)
			# log content_height,self_height
			if set_height != height_overflow[0]
				self_ref.current.style.height = set_height
				if set_height < content_height
					overflow_y = 'scroll'
				setHeight([set_height,overflow_y])

			if !visible
				setVisible(true)



	if !context
		return null


	
	
	# content_height = content_ref.current?.scrollHeight || MIN_HEIGHT
	# [style.overflowY,self_height] = adjustHeight(context,self_width,content_height)
	# log content_height,self_height
	# log self_height
	style.minHeight = MIN_HEIGHT
	style.height = height


	
	if props.align
		align_key = props.align
		# log 'FORCE ALIGN FOR ',context.selected_label,' : ',align_key
	else
		align_key = guessAlign(self_width,height,context)
		[x,y] = getPosition(self_width,height,context,align_key)
		align_key = fixAlign(align_key,context,self_width,height)
		# log 'FIX ALIGN FOR ',context.selected_label,' : ',align_key

	if props.position
		self_x = props.position[0]
		self_y = props.position[1]
	else if context.root
		self_x = context.x
		self_y = context.y
	else
		[self_x,self_y] = getPosition(self_width,height,context,align_key)
		# log self_x,self_y
		[offset_x,offset_y] = clampPosition(context,self_x,self_y,self_width,height,align_key)
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
		className: cn 'ed-box',!visible && 'ed-hidden',style.overflowY == 'scroll' && 'ed-scroll','noselect'
		h 'div',
			cn:'ed-box-inner'
			style:
				minHeight: MIN_HEIGHT
			ref: content_ref
			(props.title || props.label) && (h 'div',
				className: cn 'ed-box-title',props.stickyTitle && 'ed-box-title-sticky'
				h 'div',
					className: 'ed-in-label-colon'
					'# '
				(props.title || props.label)	
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