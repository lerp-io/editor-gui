import {createElement,useState,useEffect,useContext,useRef,createRef} from 'react'
h = createElement
import cn from 'classnames'
# import decidePosition from './decidePosition.coffee'
import LayoutContext from './LayoutContext'
import {clampPosition,clampHeight} from './Align'


BAR_DIM = 12
REBAR_DIM = 4
AUTO_HANDLE_SET_THRESHOLD = 20
AUTO_HANDLE_SNAP_THRESHOLD = 12
DOT_DIM = 4

MenuAnchor = (props)->
	anchor_ref = useRef('ed-anchor',anchor_ref)
	context = useContext(LayoutContext)
	content_ref = useRef()
	[dim,setDim] = useState({})
	[drag_start_pos,setDragStartPos] = useState(undefined)
	[resize_start_pos,setResizeStartPos] = useState(undefined)
	[set_handle_pos,setHandlePos] = useState(undefined)
	[is_dragging,setDragging] = useState(false)
	[z_index,setZIndex] = useState(0)
	updateZIndex = (z_index)->
		setZIndex(z_index)
	
	# log 'render'
	
	checkAnchorDim = ()->
		if content_ref.current
			rect = content_ref.current.children[0].getBoundingClientRect()
			# log 'on_update',rect
			if dim.width != rect.width || dim.height != rect.height
				# log 'SET DIM',rect
				setDim({
					width: rect.width
					height: rect.height
				})
	# log dim
	useEffect ()->
		checkAnchorDim()
		return

	if !context
		return null
	
	# log dim
	
	if dim.width && dim.height
		d_left = Math.max(0,props.position[0])
		d_top = Math.max(0,props.position[1])
		d_bottom = Math.max(0,context.view_rect.height - (props.position[1] + dim.height + BAR_DIM))
		d_right = Math.max(0,context.view_rect.width - (props.position[0] + dim.width + BAR_DIM))

		# if (props.position[1] + dim.height + BAR_DIM)

	# log d_left,d_top,d_bottom,d_right
	# log d_top,d_bottom
	snap_bot = false

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
			props.position[0] = Math.max(0,context.view_rect.width - dim.width - BAR_DIM)
	else if d_bottom <= Math.min(d_top,Math.min(d_left,d_right)) && d_bottom < AUTO_HANDLE_SET_THRESHOLD
		handle_pos = 'bottom'
		if props.autoSnapHandlePosition
			snap_bot = true
			props.position[1] = Math.max(0,context.view_rect.height - dim.height - BAR_DIM)
	else
		handle_pos = 'top'
	
	if props.autoHandlePosition && handle_pos != set_handle_pos
		setHandlePos(handle_pos)
	
	if !props.autoHandlePosition
		handle_pos = props.handlePosition || 'left'
	
	# log handle_pos

	dot_width = DOT_DIM
	dot_height = DOT_DIM
	
	# self_x = props.position[0]
	# self_y = props.position[1]

	if dim.width && dim.height

		switch handle_pos
			when 'left'
				self_width = dim.width+BAR_DIM
				self_height = dim.height
			when 'right'
				self_width = dim.width+BAR_DIM
				self_height = dim.height
			when 'top'
				self_height = dim.height+BAR_DIM
				self_width = dim.width
			when 'bottom'
				self_width = dim.width
				self_height = dim.height+BAR_DIM

		[offset_x,offset_y] = clampPosition(context,props.position[0],props.position[1],self_width,self_height,undefined)
		props.position[0] += offset_x
		props.position[1] += offset_y



		switch handle_pos
			when 'left'
				bar_width = BAR_DIM
				bar_height = dim.height
				bar_left = props.position[0]
				bar_top = props.position[1]
				
				rebar_left = props.position[0]+dim.width
				rebar_top = props.position[1]
				
				
				
				content_x = props.position[0]+BAR_DIM
				content_y = props.position[1]
				if !props.visible
					dot_height = DOT_DIM*3
				
			when 'right'
				bar_width = BAR_DIM
				bar_height = dim.height
				bar_left = props.position[0]+dim.width
				bar_top = props.position[1]
				
				rebar_left = props.position[0]-REBAR_DIM
				rebar_top = props.position[1]
				
				
				content_x = props.position[0]
				content_y = props.position[1]
				if !props.visible
					dot_height = DOT_DIM*3
				

			when 'top'
				bar_width = dim.width
				bar_height = BAR_DIM
				bar_left = props.position[0]
				bar_top = props.position[1]

				rebar_left = props.position[0]
				rebar_top = props.position[1]+dim.height+BAR_DIM
				
				
				content_x = props.position[0]
				content_y = props.position[1]+BAR_DIM
				if !props.visible
					dot_width = DOT_DIM * 3
				
			
			when 'bottom'
				bar_width = dim.width
				bar_height = BAR_DIM
				bar_left = props.position[0]
				bar_top = props.position[1]+dim.height

				rebar_left = props.position[0]
				rebar_top = props.position[1]-REBAR_DIM

				
				content_x = props.position[0]
				content_y = props.position[1]

				if !props.visible
					dot_width = DOT_DIM * 3

		
		
		
		# if props.handlePosition == 'right'
			


	# log props.position
	# log props.size

	self_context = Object.assign {},context,
		align: props.align || 'right-down'
		clamp_width: props.size?[0] || 0
		clamp_height: props.size?[1] || 0
		
		x: content_x
		y: content_y
		root: yes
		checkAnchorDim: checkAnchorDim


	

	# log self_context.view_rect

	
	if props.visible || (!dim.width? || !dim.height?)
		content = h 'div',
			cn: 'ed-anchor-content'
			ref: content_ref
			# style:
			# 	pointerEvents: drag_start_pos && 'none' || undefined
			h LayoutContext.Provider,
				value: self_context
				props.children

	if props.size && props.visible
		resize_bar = h 'div',
			style:
				background: props.barColor || 'black'
				top: rebar_top
				left: rebar_left
				height:  (handle_pos == 'left' || handle_pos == 'right') && bar_height || REBAR_DIM
				width:  (handle_pos == 'left' || handle_pos == 'right') && REBAR_DIM || bar_width
				flexDirection: (handle_pos == 'left' || handle_pos == 'right') && 'column' || 'row'
			cn: 'ed-anchor-handle-resize'
			
			onMouseDown: (e)->
				setResizeStartPos([e.clientX,e.clientY,props.size[0],props.size[1]])
				e.preventDefault()
				e.stopPropagation()
				return false


	h 'div',
		style:
			top: 0
			left: 0
			zIndex: z_index
			width: (resize_start_pos|| drag_start_pos) && '100vw' || undefined
			height: (resize_start_pos || drag_start_pos) && '100vh' || undefined
		cn: cn('ed-anchor',drag_start_pos && 'ed-anchor-drag',resize_start_pos && 'ed-anchor-resize')
		ref: anchor_ref
		onMouseMove: (e)->
			
			if resize_start_pos
				# log resize_start_pos
				if !is_dragging
					setDragging(true)
				# self_width = resize_start_pos[2]+e.clientX-resize_start_pos[0]
				
				if snap_bot
					self_height = Math.max(0,resize_start_pos[3]-e.clientY+resize_start_pos[1])
					
				else
					self_height = Math.max(0,resize_start_pos[3]+e.clientY-resize_start_pos[1])
					
				# max_height = maxHeight(context,self_height)
				set_height = clampHeight(context,self_height)
				
				# if set_height - max_height

				# if self_height != set_height
				props.setSize(0,set_height)

				e.stopPropagation()
				e.preventDefault()
				return false

			else if drag_start_pos
				if !is_dragging
					setDragging(true)
				self_x = drag_start_pos[2]+e.clientX-drag_start_pos[0]
				self_y = drag_start_pos[3]+e.clientY-drag_start_pos[1]
				

				props.setPosition(self_x,self_y)
				if !props.visible
					props.onBarClick()
				e.stopPropagation()
				e.preventDefault()
				return false

			

		onMouseUp: (e)->
			if drag_start_pos != undefined
				setDragStartPos(undefined)
				setDragging(false)
				if !is_dragging
					props.onBarClick()
				
				e.stopPropagation()
				e.preventDefault()
				return false
			
			else if resize_start_pos != undefined
				setResizeStartPos(undefined)
				setDragging(false)
				if !is_dragging
					props.onBarClick()
				
				e.stopPropagation()
				e.preventDefault()
				return false
			
			

		onMouseEnter: ()->
			# log 'mouse enter'
			setZIndex(999)
		
		onMouseLeave: ()->
			setZIndex(0)
			# log 'mouse leave'
			if drag_start_pos != undefined
				setDragStartPos(undefined)
				setDragging(false)
			if resize_start_pos != undefined
				setResizeStartPos(undefined)
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
				e.stopPropagation()
				e.preventDefault()
				return false
			for i in [0...props.dotCount || 1]
				h 'div',
					cn: 'ed-anchor-dot'
					key: i
					style:
						background: props.dotColor || 'white'
						width: dot_width
						height: dot_height

		resize_bar

			
			
		content

		
				

export default MenuAnchor