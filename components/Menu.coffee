import {createElement,useState,useEffect,useContext,useRef,createRef} from 'react'
h = createElement
import cn from 'classnames'
# import decidePosition from './decidePosition.coffee'
import LayoutContext from './LayoutContext'



import {clampPosition,getPosition,fixAlign,guessAlign,adjustHeight} from './Align'


Menu = (props)->
	context = useContext(LayoutContext)
	self_context = Object.assign {},context,{root:no,vert:props.vert,depth:context?.depth+1}
	menu_ref = useRef()

	useEffect ()->
		return ()->
			# log 'DECELECT'
			props.onSelect(undefined,undefined)
	,[]

	if !context
		return null
	
	# log 'PASSED DOWN CONTEXT',context.selected_label,context

	label_keys = Object.keys(props.items)
	max_label_width = 0
	total_label_width = 0
	selected_label_index = -1
	selected_label_y = 0
	selected_label_x = 0
	total_label_height = 0
	label_widths = label_keys.map (key,i)->
		
		if !props.items[key]
			return 0
		
		if key == props.select
			selected_label_index = i
			selected_label_y = total_label_height
			selected_label_x = total_label_width
		
		width = context.getLabelWidth(key)
		if width > max_label_width
			max_label_width = width
		
		total_label_width += width + context.wpad*2
		total_label_height += context.dim
		return width + context.wpad*2
	
	
	vert = props.vert

	if vert
		self_height = context.dim * label_keys.length
		self_width = max_label_width+context.wpad*2
	else
		self_height = context.dim
		self_width = total_label_width
	
	[overflow_y,self_height] = adjustHeight(context,self_width,self_height)
	scroll_top = menu_ref.current?.scrollTop || 0
	# style.minHeight = MIN_HEIGHT
	# style.height = self_height
	
	if props.align
		align_key = props.align
		# log 'FORCE ALIGN FOR ',context.selected_label,' : ',align_key
	else
		align_key = guessAlign(self_width,self_height,context)
		# log 'GUESSED ALIGN FOR ',context.selected_label,' : ',align_key
		[x,y] = getPosition(self_width,self_height,context,align_key)
		align_key = fixAlign(align_key,context,self_width,self_height)
		# log 'FIX ALIGN FOR ',context.selected_label,' : ',align_key

	if props.position
		self_x = props.position[0]
		self_y = props.position[1]
	else
		[self_x,self_y] = getPosition(self_width,self_height,context,align_key)
		# log 'GOT POSITION FOR',context.selected_label,'[',self_x,',',self_y,']'
		[offset_x,offset_y] = clampPosition(context,self_x,self_y,self_width,self_height)
		self_x += offset_x
		self_y += offset_y
		


	style = {}
	style.overflowY = overflow_y
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
			
			if child.onClick
				return h 'div',
					key:key
					className: cn 'ed-menu-item-label',props.select == key && 'ed-selected','noselect'
					onClick: child.onClick
					key

			title = key+'-'+i
			label_keys.push(key)

			if props.select == key
				if (typeof child == 'function')
					selected_child = child()
				else
					selected_child = child

			return h 'div',
				key:key
				title: title
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
				className: cn 'ed-menu-item-label',props.select == key && 'ed-selected','noselect'
				key


	h 'div',
		className: cn 'ed-menu',props.vert && 'ed-flex-down' || 'ed-flex-right'
		style: style
		ref: menu_ref
		h 'div',
			className: cn 'ed-menu-labels',props.vert && 'ed-flex-down' || 'ed-flex-right'
			labels
		h LayoutContext.Provider,
			value: self_context
			selected_child


export default Menu