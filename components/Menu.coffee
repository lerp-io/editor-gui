import {createElement,useState,useEffect,useContext,useRef} from 'react'
h = createElement
import cn from 'classnames'
import decidePosition from './decidePosition.coffee'
import LayoutContext from './LayoutContext'


Menu = (props)->
	[position,setPosition] = useState(props.position)
	[dim,setDim] = useState(null)
	[self_context,setSelfContext] = useState()
	[visible,setVisible] = useState(false)
	menu_ref = useRef(null)
	style = {}
	
	context = useContext(LayoutContext)
	self_context = Object.assign {},context,{root:no,vert:props.vert,depth:context?.depth+1}

	# log visible

	# log context
	useEffect ()->
		# log visible,menu_ref.current
		if !visible && menu_ref.current
			# log 'set visible',menu_ref.current
			setVisible(true)
		
		rect = menu_ref.current?.getBoundingClientRect()
		if rect
			new_dim = rect.height+'x'+rect.width
			if dim != new_dim
				# log 'set dim'
				setDim(new_dim)
	

		if props.position != position
			# log 'set position'
			setPosition(position)
	
	
	useEffect ()->
		return ()->
			# log 'select undefined',menu_ref.current
			props.onSelect?(undefined,undefined)
	,[]

	if !context
		return null
	
	# log props.bottom
	decidePosition
		style:style
		context: context
		menu_ref: menu_ref
		position:position
		left:props.left
		right:props.right
		top:props.top
		bottom:props.bottom

	style.zIndex = props.select && 666 || 1
	style.zIndex += self_context.depth

	# if self_context.depth == 1
	# 	style.borderLeft = '10px solid black'
	
	if props.items
		items = Object.keys(props.items).map (key,i)->
			child = props.items[key]
			title = key+'-'+i
			if typeof child == 'function'
				callback = child
				return h 'div',
					key:key
					className: 'ed-menu-item'
					h 'div',
						className: cn 'ed-menu-item-label',props.select == key && 'ed-selected','noselect'
						onClick: callback
						key
			else
				return h 'div',
					key:key
					className: 'ed-menu-item'
					h 'div',
						title: title
						onClick: props.onSelect && ( (e)->
							if e.target.title != title
								return
							# if e.target != ref
							if props.select == key
								# log 'select undefined',title
								props.onSelect(undefined,child)
							else
								# log 'SELECT',key,child
								props.onSelect(key,child)
						) || undefined
						className: cn 'ed-menu-item-label',props.select == key && 'ed-selected','noselect'
						key

					props.select == key && child || null


	
	h 'div',
		ref: menu_ref
		className: cn 'ed-menu',props.vert && 'ed-flex-down' || 'ed-flex-right',!visible && 'ed-hidden'
		style: style
		h LayoutContext.Provider,
			value: self_context
			items


export default Menu