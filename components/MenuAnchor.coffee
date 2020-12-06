import {createElement,useState,useEffect,useContext,useRef,createRef} from 'react'
h = createElement
import cn from 'classnames'
# import decidePosition from './decidePosition.coffee'
import LayoutContext from './LayoutContext'
import {clampPosition} from './Align'


BAR_DIM = 12
AUTO_HANDLE_SET_THRESHOLD = 20
AUTO_HANDLE_SNAP_THRESHOLD = 12
DOT_DIM = 4

MenuAnchor = (props)->
	anchor_ref = useRef('ed-anchor',anchor_ref)
	context = useContext(LayoutContext)
	content_ref = useRef()
	[dim,setDim] = useState({})
	[drag_start_pos,setDragStartPos] = useState(undefined)
	[set_handle_pos,setHandlePos] = useState(undefined)
	[is_dragging,setDragging] = useState(false)

	useEffect ()->
		if content_ref.current
			rect = content_ref.current.children[0].getBoundingClientRect()
			if dim.width != rect.width || dim.height != rect.height
				setDim({
					width: rect.width
					height: rect.height
				})
		return

	if !context
		return null
	
	if dim.width && dim.height
		d_left = props.position[0]
		d_top = props.position[1]
		d_bottom = context.view_rect.height - (props.position[1] + dim.height + BAR_DIM)
		d_right = context.view_rect.width - (props.position[0] + dim.width + BAR_DIM)

	# log d_top,d_bottom

	if d_left <= Math.min(d_right,Math.min(d_top,d_bottom)) && d_left < AUTO_HANDLE_SET_THRESHOLD
		handle_pos = 'left'
		if props.autoSnapHandlePosition
			# setTimeout ()->
			props.position[0] = 0
			# ,0
	else if d_top <= Math.min(d_bottom,Math.min(d_left,d_right)) && d_top < AUTO_HANDLE_SET_THRESHOLD
		
		handle_pos = 'top'
		if props.autoSnapHandlePosition
			# setTimeout ()->
			props.position[1] = 0
	else if d_right <= Math.min(d_left,Math.min(d_top,d_bottom)) && d_right < AUTO_HANDLE_SET_THRESHOLD
		handle_pos = 'right'
		if props.autoSnapHandlePosition
			# setTimeout ()->
			props.position[0] = context.view_rect.width - dim.width - BAR_DIM
	else if d_bottom <= Math.min(d_top,Math.min(d_left,d_right)) && d_bottom < AUTO_HANDLE_SET_THRESHOLD
		handle_pos = 'bottom'
		if props.autoSnapHandlePosition
			props.position[1] = context.view_rect.height - dim.height - BAR_DIM
	else
		handle_pos = set_handle_pos
	
	if props.autoHandlePosition && handle_pos != set_handle_pos
		setHandlePos(handle_pos)
	
	if !props.autoHandlePosition
		handle_pos = props.handlePosition || 'left'
	


	dot_width = DOT_DIM
	dot_height = DOT_DIM

	if dim.width && dim.height
		switch handle_pos
			when 'left'
				bar_width = BAR_DIM
				bar_height = dim.height
				bar_left = props.position[0]
				bar_top = props.position[1]
				self_width = dim.width+BAR_DIM
				self_height = dim.height
				content_x = props.position[0]+BAR_DIM
				content_y = props.position[1]
				if !props.visible
					dot_height = DOT_DIM*3
				
			when 'right'
				bar_width = BAR_DIM
				bar_height = dim.height
				bar_left = props.position[0]+dim.width
				bar_top = props.position[1]
				self_width = dim.width+BAR_DIM
				self_height = dim.height
				content_x = props.position[0]
				content_y = props.position[1]
				if !props.visible
					dot_height = DOT_DIM*3
				

			when 'top'
				bar_width = dim.width
				bar_height = BAR_DIM
				bar_left = props.position[0]
				bar_top = props.position[1]
				self_height = dim.height+BAR_DIM
				self_width = dim.width
				content_x = props.position[0]
				content_y = props.position[1]+BAR_DIM
				if !props.visible
					dot_width = DOT_DIM * 3
				
			
			when 'bottom'
				bar_width = dim.width
				bar_height = BAR_DIM
				bar_left = props.position[0]
				bar_top = props.position[1]+dim.height
				self_width = dim.width
				self_height = dim.height+BAR_DIM
				content_x = props.position[0]
				content_y = props.position[1]

				if !props.visible
					dot_width = DOT_DIM * 3
				
			
			



		# if props.handlePosition == 'right'
			
	


	self_context = Object.assign {},context,
		align: props.align
		x: content_x
		y: content_y
		root: yes
	
	
	if props.visible || (!dim.width? || !dim.height?)
		content = h 'div',
			cn: 'ed-anchor-content'
			ref: content_ref
			# style:
			# 	pointerEvents: drag_start_pos && 'none' || undefined
			h LayoutContext.Provider,
				value: self_context
				props.children
	
	
	# log props.position[0]
	
	h 'div',
		style:
			top: 0
			left: 0
			width: drag_start_pos && '100vw' || undefined
			height: drag_start_pos && '100vh' || undefined
		cn: 'ed-anchor'
		ref: anchor_ref
		onMouseMove: (e)->
			if drag_start_pos
				if !is_dragging
					setDragging(true)
				self_x = drag_start_pos[2]+e.clientX-drag_start_pos[0]
				self_y = drag_start_pos[3]+e.clientY-drag_start_pos[1]
				[offset_x,offset_y] = clampPosition(self_context,self_x,self_y,self_width,self_height,undefined)

				self_x += offset_x
				self_y += offset_y

				props.setPosition(self_x,self_y)
				if !props.visible
					props.onBarClick()
		
		onMouseUp: (e)->
			if drag_start_pos != undefined
				setDragStartPos(undefined)
				setDragging(false)
				if !is_dragging
					props.onBarClick()
				
		onMouseLeave: ()->
			if drag_start_pos != undefined
				setDragStartPos(undefined)
				setDragging(false)


		h 'div',
			cn: 'ed-anchor-handle'
			style:
				top: bar_top
				left: bar_left
				height: bar_height
				width: bar_width
				flexDirection: (handle_pos == 'left' || handle_pos == 'right') && 'column' || 'row'
				background: props.barColor || 'black'
			
			onMouseDown: (e)->
				setDragStartPos([e.clientX,e.clientY,props.position[0],props.position[1]])
			
			for i in [0...props.dotCount || 1]
				h 'div',
					cn: 'ed-anchor-dot'
					key: i
					style:
						
						background: props.dotColor || 'white'
						width: dot_width
						height: dot_height
			
			
		content

		
				

export default MenuAnchor