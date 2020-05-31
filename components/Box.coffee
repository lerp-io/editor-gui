import decidePosition from './decidePosition.coffee'
import {createElement,useState,useEffect,useRef,useContext} from 'react'
import LayoutContext from './LayoutContext'
h = createElement
Box = (props,state)->
	style = {}
	[position,setPosition] = useState(props.position)
	[self_context,setSelfContext] = useState({root:yes})
	useEffect ()->
		if props.position != position
			setPosition(position)
	
	context = useContext(LayoutContext)
	if !context
		return null
	
	decidePosition(style,context,position,props.left,props.right,props.top,props.bottom)
	


	h 'div',
		style: style
		className: 'ed-box'
		props.children
			

		

export default Box