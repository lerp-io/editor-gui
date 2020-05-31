import decidePosition from './decidePosition.coffee'
import {createElement,useState,useEffect,useRef,useContext} from 'react'
import LayoutContext from './LayoutContext'
import BoxContext from './BoxContext'
h = createElement
Box = (props,state)->
	[position,setPosition] = useState(props.position)
	[self_context,setSelfContext] = useState()
	[visible,setVisible] = useState(false)
	menu_ref = useRef(null)
	style = {}
	
	context = useContext(LayoutContext)
	self_context = {}

	# log visible

	# log context
	useEffect ()->
		# log visible,menu_ref.current
		if !visible && menu_ref.current
			# log 'set visible',menu_ref.current
			setVisible(true)

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
	
	decidePosition
		style:style
		context: context
		menu_ref: menu_ref
		position:position
		left:props.left
		right:props.right
		top:props.top
		bottom:props.bottom
	

	
	h 'div',
		style: style
		className: 'ed-box'
		props.title && (h 'div',
			className: 'ed-box-title'
			'~* '+props.title+' *~'
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