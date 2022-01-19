import {createElement,useState,useEffect,useContext,useRef,createRef} from 'react'
h = createElement
import cn from 'classnames'
# import decidePosition from './decidePosition.coffee'
import LayoutContext from './LayoutContext'
import {clampPosition,clampHeight,clampWidth} from './Align'


BAR_DIM = 12
REBAR_DIM = 4
DOT_DIM = 4

Anchor = (props)->
	
	anchor_ref = useRef('ed-anchor',anchor_ref)
	context = useContext(LayoutContext)
	content_ref = useRef()
	[dim,setDim] = useState({})
	[drag_start_pos,setDragStartPos] = useState(undefined)
	[resize_start_pos,setResizeStartPos] = useState(undefined)
	[resize_dir,setResizeDir] = useState(undefined)
	[set_handle_pos,setHandlePos] = useState(undefined)
	[is_dragging,setDragging] = useState(false)
	[z_index,setZIndex] = useState(0)
	updateZIndex = (z_index)->
		setZIndex(z_index)
	
	# log 'UPDATE'
	checkAnchorDim = ()->
		if content_ref.current
			rect = content_ref.current.children[0].getBoundingClientRect()
			if props.size && (props.size[0] != rect.width ||  props.size[1] != rect.height)
				# log props.size[0],rect.width
				props.setSize?(rect.width,rect.height)
			if dim.width != rect.width || dim.height != rect.height
				setDim({
					width: rect.width
					height: rect.height
				})

	
	useEffect ()->
		checkAnchorDim()
		return

	if !context
		return null
	

	
	if dim.width && dim.height
		d_left = Math.max(0,props.position[0])
		d_top = Math.max(0,props.position[1])
		d_bottom = Math.max(0,context.view_rect.height - (props.position[1] + dim.height + BAR_DIM))
		d_right = Math.max(0,context.view_rect.width - (props.position[0] + dim.width + BAR_DIM))


	snap_bot = false

	if d_left <= Math.min(d_right,Math.min(d_top,d_bottom)) && d_left < props.autoHandleThreshold #AUTO_HANDLE_SET_THRESHOLD
		handle_pos = 'left'
		if props.autoSnapHandlePosition
			props.position[0] = 0

	else if d_top <= Math.min(d_bottom,Math.min(d_left,d_right)) && d_top < props.autoHandleThreshold
		handle_pos = 'top'
		if props.autoSnapHandlePosition
			props.position[1] = 0

	else if d_right <= Math.min(d_left,Math.min(d_top,d_bottom)) && d_right < props.autoHandleThreshold
		handle_pos = 'right'
		if props.autoSnapHandlePosition
			props.position[0] = Math.max(0,context.view_rect.width - dim.width - BAR_DIM)
	
	else if d_bottom <= Math.min(d_top,Math.min(d_left,d_right)) && d_bottom < props.autoHandleThreshold
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
	

	dot_width = DOT_DIM
	dot_height = DOT_DIM
	

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
				
				rebar_left = props.position[0]+dim.width+BAR_DIM
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


	self_context = Object.assign {},context,
		align: props.align
		clamp_width: props.size?[0] || 0
		clamp_height: props.size?[1] || 0
		x: content_x
		y: content_y
		root: yes
		checkAnchorDim: checkAnchorDim


	if props.visible || (!dim.width? || !dim.height?)
		content = h 'div',
			cn: 'ed-anchor-content'
			ref: content_ref
			h LayoutContext.Provider,
				value: self_context
				props.children
	
	
	switch resize_dir
		when 'bottom'
			resize_cursor = 's-resize'
		when 'top'
			resize_cursor = 'n-resize'
		when 'left'
			resize_cursor = 'w-resize'
		when 'right'
			resize_cursor = 'e-resize'


	if props.size && props.visible
	
		resize_bar_style = 
			background: props.barColor || 'black'
			top: rebar_top
			left: rebar_left
			height:  (handle_pos == 'left' || handle_pos == 'right') && bar_height || REBAR_DIM
			width:  (handle_pos == 'left' || handle_pos == 'right') && REBAR_DIM || bar_width
			flexDirection: (handle_pos == 'left' || handle_pos == 'right') && 'column' || 'row'
			cursor: resize_cursor
		
		self_context.handle_pos = handle_pos
		self_context.handle_style = resize_bar_style
		
		on_resize_bar_mouse_down = (e)->
			setDragging(true) #need code review
			setResizeStartPos([e.clientX,e.clientY,dim.width,dim.height,props.position[0],props.position[1]])
			e.preventDefault()
			e.stopPropagation()
			return false

		on_resize_bar_mouse_move = (e)->
			rect = e.target.getBoundingClientRect()
			if handle_pos == 'bottom' || handle_pos == 'top'
				if e.clientX < rect.left + rect.width * 1/3
					dir = 'left'
				else if e.clientX > rect.left + rect.width * 2/3
					dir = 'right'
				else
					if handle_pos == 'bottom'
						dir ='top' 
					else
						dir = 'bottom' 
			else if handle_pos == 'left' || handle_pos == 'right'
				if e.clientY < rect.top + rect.height * 1/3
					dir = 'top'
				else if e.clientY > rect.top + rect.height * 2/3
					dir = 'bottom'
				else
					if handle_pos == 'left'
						dir = 'right'
					else
						dir = 'left'

			if resize_dir != dir && dir
				if (dir == 'top' || dir == 'bottom') && props.resizeHeight == false
					return false
				if (dir == 'left' || dir == 'right') && props.resizeWidth == false
					return false
					
				setResizeDir(dir)
		
		on_resize_bar_mouse_leave = ->
			if !is_dragging
				setResizeDir(undefined)

		resize_bar = h 'div',
			key: 'resize-bar'
			style: resize_bar_style
			cn: 'ed-anchor-handle-resize'
			onMouseLeave: on_resize_bar_mouse_leave
			onMouseMove: on_resize_bar_mouse_move
			onMouseDown: on_resize_bar_mouse_down
			onMouseEnter: on_resize_bar_mouse_move


	h 'div',
		style:
			top: 0
			left: 0
			zIndex: z_index
			width: (resize_start_pos|| drag_start_pos) && '100vw' || undefined
			height: (resize_start_pos || drag_start_pos) && '100vh' || undefined
			cursor: resize_cursor
		cn: cn('ed-anchor',drag_start_pos && 'ed-anchor-drag',resize_start_pos && 'ed-anchor-resize')
		ref: anchor_ref
		onMouseMove: (e)->
			
			if resize_start_pos
			
				if !is_dragging
					setDragging(true)
				
				width = props.size[0]
				height = props.size[1]
				left = props.position[0]
				top = props.position[1]

				
				switch resize_dir
					when 'bottom'
						height = Math.max(0,resize_start_pos[3]+e.clientY-resize_start_pos[1])
					
					when 'top'
						if handle_pos == 'left' || handle_pos == 'right'
							height = Math.max(0,resize_start_pos[3]-e.clientY+resize_start_pos[1])
							top = Math.max(0,resize_start_pos[5]+e.clientY-resize_start_pos[1])
						else
							height = Math.max(0,resize_start_pos[3]-e.clientY+resize_start_pos[1])
					when 'right'
						if handle_pos == 'top' || handle_pos == 'bottom'
							width = Math.max(0,resize_start_pos[2]+e.clientX-resize_start_pos[0])
						else
							width = Math.max(0,resize_start_pos[2]+e.clientX-resize_start_pos[0])
					when 'left'
						if handle_pos == 'top' || handle_pos == 'bottom'
							width = Math.max(0,resize_start_pos[2]-e.clientX+resize_start_pos[0])
							left = Math.max(0,resize_start_pos[4]+e.clientX-resize_start_pos[0])
						else
							width = Math.max(0,resize_start_pos[2]-e.clientX+resize_start_pos[0])
				
				props.setPosition(left,top)
				props.setSize(width,height)
				
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

			if resize_dir
				setResizeDir(undefined)

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
				
				e.stopPropagation()
				e.preventDefault()
				return false
			else if is_dragging
				setDragging(false)
			

			if resize_dir
				setResizeDir(undefined)
				
		onMouseEnter: ()->
			setZIndex(999)
		
		onMouseLeave: ()->
			setZIndex(0)
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


Anchor.defaultProps = 
	autoHandleThreshold : 20

export default Anchor