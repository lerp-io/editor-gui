import {createElement,useState,useEffect,useRef} from 'react'
h = createElement
import cn from 'classnames'
import LayoutContext from './LayoutContext'


Layout = (props,state)->
	layout_ref = useRef()
	[context,setContext] = useState(null)
	useEffect ()->
		if !context
			onWindowResize = ()->
				view_rect = layout_ref.current.getBoundingClientRect()
				setContext
					depth: 0
					dim: props.dim || 24
					wpad: props.wpad || 12
					root: yes
					selected_label: 'root'
					view_rect: view_rect
					getLabelWidth: props.getLabelWidth
			onWindowResize()
			window.addEventListener 'resize',onWindowResize
		return ()->
			window.removeEventListener 'resize',onWindowResize
	,[]

	h LayoutContext.Provider,
		value: context
		h 'div',
			ref: layout_ref
			className: 'ed-layout'
			props.children

export default Layout