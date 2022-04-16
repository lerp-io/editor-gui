import {createElement,useState,useEffect,useRef} from 'react'
h = createElement
import cn from 'classnames'
import LayoutContext from './LayoutContext'
import waitForFontLoad from '../lib/waitForFontLoad.js'


Layout = (props,state)->
	layout_ref = useRef()
	[context,setContext] = useState(null)
	[win_size,setWinSize] = useState(null)
	measure_text = useRef(new Map)
	canvas_ref = useRef()
	[is_dragging,isDragging] = useState(false)
	[force_update_t,forceUpdate] = useState(0)
	[font_loaded,setFontLoaded] = useState(null)

	css_font = props.fontSize+'px '+props.fontFamily

	useEffect ()->
		# log 'WAIT FOR WEB FONTS',props.waitForWebfonts
		if props.waitForFontLoad
			# log 'WAIT FOR WEB FONTS',props.fontFamily
			waitForFontLoad(css_font).then ()->
				# log 'FONT LOADED'
				setFontLoaded(props.fontFamily)
		return
	,[props.fontFamily]


	useEffect ()->
		# log 'SET MEASURE TEXT CANVAS',font_loaded
		measure_text.current = new Map
		can_el = document.createElement("canvas")
		canvas_ref.current = can_el.getContext("2d")
		canvas_ref.current.font = css_font
		return
	,[props.fontFamily,props.fontSize,win_size,font_loaded]


	useEffect ()->
		view_rect = layout_ref.current.getBoundingClientRect()
		setContext
			depth: 0
			dim: props.fontSize * 2
			wpad: props.fontSize * .4
			root: yes
			selected_label: 'root'
			view_rect: view_rect
			getLabelWidth: getLabelWidth
			stopDrag: stopDrag
			font_loaded: font_loaded
			startDrag: startDrag

	,[props.fontFamily,props.fontSize,win_size,font_loaded]


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
			# log 'GET SAVED LABEL WIDTH',text_width
			return text_width
		else
			# log 'measure text',props.fontSize,text_width,win_size
			text_width = ctx.measureText(label).width
			measure_text.current.set(label,text_width)
			# log 'GET NEW LABEL WIDTH',text_width
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