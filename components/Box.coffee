import {createElement,useState,useEffect,useRef,useContext} from 'react'
import LayoutContext from './LayoutContext'
import BoxContext from './BoxContext'
import cn from 'classnames'

import {clampPosition,getPosition,fixAlign,guessAlign,clampHeight,clampWidth} from './Align'

h = createElement

MIN_HEIGHT = 50
MIN_WIDTH = 300
BAR_DIM = 12
REBAR_DIM = 4

Box = (props,state)->
	context = useContext(LayoutContext)
	
	[visible,setVisible] = useState(false)
	[dim_overflow,setDim] = useState([MIN_HEIGHT,0])
	# [width_overflow,setWidth] = useState([MIN_WIDTH,0])
	self_ref = useRef(null)
	content_ref = useRef(null)
	
	height = dim_overflow[0]
	width = dim_overflow[2]
	style = 
		overflowY: dim_overflow[1]
		overflowX: dim_overflow[3]


	useEffect ()->
		if content_ref.current

			content_width = Math.max(content_ref.current?.scrollWidth || 0,MIN_WIDTH)
			content_height = Math.max(content_ref.current?.scrollHeight || 0,MIN_HEIGHT)
			
			set_height = clampHeight(context,content_height)
			set_width = clampWidth(context,content_width)
			
			if set_width < content_width
				overflow_x = 'scroll'
			else
				overflow_x = undefined
			
			if set_height < content_height
				overflow_y = 'scroll'
			else
				overflow_y = undefined
			
			if set_width != dim_overflow[2] || set_height != dim_overflow[0] || overflow_y != dim_overflow[1] || overflow_x != dim_overflow[3]
				self_ref.current.style.width = set_width
				self_ref.current.style.height = set_height
				setDim([set_height,overflow_y,set_width,overflow_x])

			if !visible
				setVisible(true)


	if !context
		return null

	self_context = 
		startDrag: context.startDrag
		stopDrag: context.stopDrag

	style.minHeight = MIN_HEIGHT
	style.height = height
	style.width = width

	
	if props.align
		align_key = props.align
	else
		align_key = guessAlign(width,height,context)
		[x,y] = getPosition(width,height,context,align_key)
		align_key = fixAlign(align_key,context,width,height)


	if props.position
		self_x = props.position[0]
		self_y = props.position[1]
	else if context.root
		self_x = context.x
		self_y = context.y
	else
		[self_x,self_y] = getPosition(width,height,context,align_key)
		[offset_x,offset_y] = clampPosition(context,self_x,self_y,width,height,align_key)
		self_x += offset_x
		self_y += offset_y
		

	style.zIndex = context.depth + 1 + 888
	style.left = self_x+'px'
	style.top = self_y+'px'
	
	
	h 'div',
		ref: self_ref
		style: style
		className: cn 'ed-box',!visible && 'ed-hidden','noselect'
		h 'div',
			cn:'ed-box-inner'
			style:
				minHeight: MIN_HEIGHT
				# paddingTop: !props.title && '0.425em'
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