import {createElement,useState,useEffect,useContext,useRef,createRef} from 'react'
h = createElement
import cn from 'classnames'
# import decidePosition from './decidePosition.coffee'
import LayoutContext from './LayoutContext'
import BoxContext from './BoxContext'


import {clampPosition,getPosition,fixAlign,guessAlign,clampHeight} from './Align'


Menu = (props)->
	context = useContext(LayoutContext)
	box_context = useContext(BoxContext)
	if context && box_context
		Object.assign context,box_context

	if props.autoDeselect?
		autoDeselect = props.autoDeselect
	else if context?.autoDeselect?
		autoDeselect = context.autoDeselect
	else
		autoDeselect = yes
	
	self_context = Object.assign {},context,{autoDeselect:autoDeselect,root:no,vert:props.vert,depth:context?.depth+1}
	self_context.dim = props.dim || self_context.dim
	if props.dim
		self_context.squares = true
	menu_ref = useRef()

	useEffect ()->
		return ()->
			if self_context.autoDeselect
				props.onSelect?(undefined,undefined)
	,[]

	if !context
		return null

	
	label_keys = Object.keys(props.items)
	max_label_width = 0
	total_label_width = 0
	selected_label_index = -1
	selected_label_y = 0
	selected_label_x = 0
	total_label_height = 0


	label_widths = label_keys.map (key,i)->

		item = props.items[key]


		if !item
			return 0
		
		if props.dim
			if props.select == key
				selected_label_index = i
				selected_label_y = total_label_height
				selected_label_x = total_label_width
			total_label_width += self_context.dim
			total_label_height += self_context.dim
			max_label_width = self_context.dim
			return self_context.dim

		
		if key == props.select
			selected_label_index = i
			selected_label_y = total_label_height
			selected_label_x = total_label_width
		
		width = context.getLabelWidth(key)
		# log 'get label width',key,width,context.wpad*2,context.dim
		if width > max_label_width
			max_label_width = width
		
		
		total_label_width += width + context.wpad*2
		total_label_height += self_context.dim
		return width + context.wpad*2

	
	vert = props.vert
	
	if vert
		self_height = total_label_height
		self_width = props.dim || max_label_width+context.wpad*2
	else
		self_height = props.dim || self_context.dim
		self_width = total_label_width
	
	new_height = clampHeight(context,self_height)
	overflow_y = new_height < self_height
	self_height = new_height
	scroll_top = menu_ref.current?.scrollTop || 0
	# style.minHeight = MIN_HEIGHT
	# style.height = self_height
	

	if props.align
		align_key = props.align
		# log 'FORCE ALIGN FOR ',context.selected_label,' : ',align_key
	else
		self_x = props.position?[0] || context.x || 0
		self_y = props.position?[1] || context.y || 0
		
		
		align_key = guessAlign(self_width,self_height,context,self_x,self_y)
		
		# [x,y] = getPosition(self_width,self_height,context,align_key)
		align_key = fixAlign(align_key,context,self_width,self_height)
		# log 'FIX ALIGN FOR ',context.selected_label,' : ',align_key
	
	# if box_context.root == true

	

	if props.position
		self_x = props.position[0]
		self_y = props.position[1]

	else if context.root && !context.box
		self_x = context.x || 0
		self_y = context.y || 0
		
	else
		# log 'GET MENU POSITION',context,align_key
		[self_x,self_y] = getPosition(self_width,self_height,context,align_key)
		[offset_x,offset_y] = clampPosition(context,self_x,self_y,self_width,self_height,align_key)
		
		self_x += offset_x
		self_y += offset_y



	style = {}
	style.overflowY = overflow_y && 'scroll'
	style.zIndex = props.select && 666 || 1
	style.zIndex += self_context.depth
	style.left = self_x+'px'
	style.top = self_y+'px'
	style.height = self_height+'px'
	# if offset_x || offset_y
	# 	style.transform = "translate(#{offset_x}px,#{offset_y}px)"
	if props.style
		Object.assign style,props.style

	self_context.width = self_width
	self_context.height = self_height
	self_context.x = self_x
	self_context.y = self_y
	self_context.vert = props.vert
	self_context.root = false
	self_context.align = align_key
	self_context.selected_label = props.select
	if props.vert
		self_context.sel_x = self_x
		self_context.sel_y = self_y + selected_label_y + scroll_top
	else
		self_context.sel_x = self_x + selected_label_x
		self_context.sel_y = self_y + scroll_top
	
	self_context.sel_w = label_widths[selected_label_index]

	selected_child = null

	if props.items
		labels = label_keys.map (key,i)->
			child = props.items[key]
			if !child
				return null
			# if child.render
			# 	return h 'div',
			# 		className: cn 'ed-menu-item-box',props.select == key && 'ed-selected','noselect'
			# 		child.render()

			label = child.label || key

			if props.dim
				label_style = 
					width: props.dim
					height: props.dim
					borderColor: child.selectBorderColor || props.selectBorderColor
			else
				label_style = 
					paddingLeft: context.wpad
					minWidth: label_widths[i]

			selected = props.select == key
			if child.onClick || child.onSelect
				
				return h 'div',
					key:key
					className: cn props.dim && 'ed-menu-item-box','ed-menu-item-label',selected && 'ed-selected','noselect'
					style: label_style
					onClick: child.onClick || child.onSelect
					label

			title = key+'-'+i
			# label_keys.push(key)

			if props.select == key
				if (typeof child == 'function')
					selected_child = child()
				else if child.render
					selected_child = child.render()
				else if child.label
					selected_child = null
				else
					selected_child = child

			return h 'button',
				key:key
				title: title
				style: label_style
				onClick: props.onSelect && ( (e)->
					if e.target.title != title
						return
					if props.select == key
						props.onSelect(undefined)
					else
						props.onSelect(key)
					e.stopPropagation()
					e.preventDefault()
					return false
				) || undefined
				className: cn props.dim && 'ed-menu-item-box','ed-menu-item-label',props.select == key && 'ed-selected','noselect'
				label


	h 'div',
		className: cn 'ed-menu',props.vert && 'ed-flex-down' || 'ed-flex-right',self_context.depth % 2 == 0 && 'ed-menu-alt'
		style: style
		ref: menu_ref
		h 'div',
			className: cn 'ed-menu-labels',props.vert && 'ed-flex-down' || 'ed-flex-right'
			labels
		h LayoutContext.Provider,
			value: self_context
			selected_child


export default Menu