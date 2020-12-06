import {createElement,useState,useEffect,useRef} from 'react'
h = createElement
import cn from 'classnames'
import LayoutContext from './LayoutContext'


_measure_text = new Map
Layout = (props,state)->
	layout_ref = useRef()
	[context,setContext] = useState(null)
	measure_text = useRef(new Map)
	canvas_ref = useRef()
	[is_dragging,isDragging] = useState(false)
	[force_update_t,forceUpdate] = useState(0)

	useEffect ()->
		measure_text.current = new Map
		return
	,[props.fontFamily,props.fontSize]

	_forceUpdate = ()->
		log 'force update'
		forceUpdate(force_update_t+1)
	
	startDrag = (onDrag,onDragEnd,onMouseOut)->
		isDragging(true)
		layout_ref.current.addEventListener('mousemove',onDrag)
		layout_ref.current.addEventListener('mouseup',onDragEnd)
		layout_ref.current.addEventListener('mouseout',onMouseOut)

	stopDrag = (onDrag,onDragEnd,onMouseOut)->
		isDragging(false)
		layout_ref.current.removeEventListener('mousemove',onDrag)
		layout_ref.current.removeEventListener('mouseup',onDragEnd)
		layout_ref.current.removeEventListener('mouseout',onMouseOut)
	
	getLabelWidth = (label)->
		# log 'get label width'
		if !canvas_ref.current
			log 'create label width calculator'
			can_el = document.createElement("canvas")
			canvas_ref.current = can_el.getContext("2d")
			canvas_ref.current.font = props.fontSize+'px '+props.fontFamily#"16px times new roman"
		
		ctx = canvas_ref.current
		text_width = measure_text.current.get(label)
		if text_width?
			return text_width
		else
			text_width = ctx.measureText(label).width
			measure_text.current.set(label,text_width)
			return text_width



	useEffect ()->

		canvas = document.createElement("canvas");
		
		if !context
			onWindowResize = ()->
				view_rect = layout_ref.current.getBoundingClientRect()
				# log view_rect
				setContext
					depth: 0
					dim: props.dim || 24
					wpad: props.wpad || 12
					paddingLeft: props.paddingLeft || 4
					root: yes
					selected_label: 'root'
					view_rect: view_rect
					getLabelWidth: getLabelWidth
					stopDrag: stopDrag
					forceUpdate: _forceUpdate
					startDrag: startDrag
			onWindowResize()
			window.addEventListener 'resize',onWindowResize
			return
		return ()->
			window.removeEventListener 'resize',onWindowResize
	,[]

	h LayoutContext.Provider,
		value: context
		h 'div',
			ref: layout_ref
			style:
				fontSize: props.fontSize
				fontFamily: props.fontFamily
			className: 'ed-layout '+(is_dragging && 'ed-layout-dragging' || '')
			props.children

export default Layout