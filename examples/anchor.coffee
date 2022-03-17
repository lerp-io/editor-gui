import {useState,useEffect} from 'react'
import {Layout,In,Box,Style,Anchor,Section} from '../components'
import {h as renderComponent} from 'react'

export default anchor = ()->
	[is_mounted,setMounted] = useState(false)
	[size,setSize] = useState(null)
	[anchor_pos,setAnchorPos] = useState([0,30])
	[auto_handle_pos,setAutoHandlePos] = useState(true)

	[handle_pos,setHandlePos] = useState('bottom')
	[is_visible,toggleVisible] = useState(true)

	h Layout,
		waitForFontLoad: yes
		fontSize: 14
		fontFamily: FONT_FAMILY
		h Anchor,
			handlePosition: handle_pos
			autoHandlePosition: auto_handle_pos
			autoSnapHandlePosition: yes
			autoAlign: no
			onBarClick: toggleVisible.bind(null,!is_visible)
			position: anchor_pos
			visible: is_visible
			setPosition: (x,y)->
				setAnchorPos([x,y])
			h Box,
				title: 'anchor options'
				h In,
					type: 'toggle'
					label: 'autoHandlePosition'
					value: auto_handle_pos
					set: setAutoHandlePos
				h Section,
					label: 'handle Position'
					h In,
						type: 'static'
						'handle position to set when autoHandlePosition is disabled.'
					h In,
						type: 'toggle'
						label: 'right'
						value: handle_pos == 'right'
						set: setHandlePos.bind(null,'right')
					h In,
						type: 'toggle'
						label: 'left'
						value: handle_pos == 'left'
						set: setHandlePos.bind(null,'left')
					h In,
						type: 'toggle'
						label: 'top'
						value: handle_pos == 'top'
						set: setHandlePos.bind(null,'top')
					h In,
						type: 'toggle'
						label: 'bottom'
						value: handle_pos == 'bottom'
						set: setHandlePos.bind(null,'bottom')
				

