import {createElement,useState,useEffect,useRef} from 'react'
h = createElement
import cn from 'classnames'
import LayoutContext from './LayoutContext'



Layout = (props,state)->
	layout_ref = useRef()
	[context,setContext] = useState(null)
	[win_size,setWinSize] = useState(null)
	measure_text = useRef(new Map)
	canvas_ref = useRef()
	[is_dragging,isDragging] = useState(false)
	[force_update_t,forceUpdate] = useState(0)

	useEffect ()->
		# log 'new mea'
		measure_text.current = new Map
		can_el = document.createElement("canvas")
		canvas_ref.current = can_el.getContext("2d")
		canvas_ref.current.font = props.fontSize+'px '+props.fontFamily
		return
	,[props.fontFamily,props.fontSize]

	useEffect ()->
		view_rect = layout_ref.current.getBoundingClientRect()
		setContext
			depth: 0
			dim: props.fontSize * 1.6
			wpad: props.fontSize * .4
			# paddingLeft: props.fontSize * .6
			root: yes
			selected_label: 'root'
			view_rect: view_rect
			getLabelWidth: getLabelWidth
			stopDrag: stopDrag
			forceUpdate: _forceUpdate
			startDrag: startDrag

	,[props.fontFamily,props.fontSize,win_size]

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
		
		ctx = canvas_ref.current
		text_width = measure_text.current.get(label)
		if text_width?
			return text_width
		else
			# log 'measure text'
			# log props.fontSize
			text_width = ctx.measureText(label).width
			measure_text.current.set(label,text_width)
			return text_width



	useEffect ()->
		if !context
			onWindowResize = ()->
				setWinSize(window.innerWidth+'-'+window.innerHeight)
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