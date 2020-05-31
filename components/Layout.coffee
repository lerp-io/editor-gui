import {createElement,useState,useEffect,useRef} from 'react'
h = createElement
import cn from 'classnames'
import LayoutContext from './LayoutContext'


Layout = (props,state)->
	autosize = props.autosize
	layout_ref = useRef()
	[mounted,setMounted] = useState(false)
	[context,setContext] = useState(null)


	useEffect ()->
		if !context
			# log 'set context (after mount)'
			rect = layout_ref.current.getBoundingClientRect()
			setContext
				depth: 0
				root: yes
				right: rect.right
				left: rect.left
				top: rect.top
				bottom: rect.bottom
	,[mounted,window.innerHeight,window.innerWidth]

	h LayoutContext.Provider,
		value: context
		h 'div',
			ref: layout_ref
			className: 'ed-layout'
			props.children

export default Layout