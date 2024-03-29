import {createElement,useState,useEffect,useRef,useReducer} from 'react'
import {Layout,In,Box,Row,Menu,Section,SectionLabel,Style,Separator,Anchor} from '../components'

import ExampleRecursiveMenu from './ExampleRecursiveMenu.coffee'
import ExampleDemoBox from './ExampleDemoBox.coffee'


export default test = ()->
	[is_mounted,setMounted] = useState(false)
	[size,setSize] = useState(null)
	useEffect ()->
		if !is_mounted
			setMounted(yes)
			
	,[]

	[menu_1_visible,setMenu1Visible] = useState(true)
	[menu_2_visible,setMenu2Visible] = useState(false)
	[menu_3_visible,setMenu3Visible] = useState(true)
	[menu_4_visible,setMenu4Visible] = useState(true)

	[dim_2,setAnchor2Dim] = useState([250,250])


	[anchor_pos,setAnchorPos] = useState([window.innerWidth/2,30])
	[anchor2_pos,setAnchor2Pos] = useState([6000,30])
	[anchor3_pos,setAnchor3Pos] = useState([0,900])
	[anchor4_pos,setAnchor4Pos] = useState([400,300])
	
	
	[demo_box_resize,toggleDemoBoxResize] = useState(true)

	[demo_box_color,setDemoBoxColor] = useState('red')
	[demo_dot_color,setDemoDotColor] = useState('black')
	[demo_dot_count,setDemoDotCount] = useState(2)
	
	[font_size,setFontSize] = useState(16)

	[snap_threshold,setSnapThreshold] = useState(20)

	[width_resize,toggleWidthResize] = useState(true)
	[height_resize,toggleHeightResize] = useState(true)

	[tool_box_select,selectToolBox] = useState(undefined)
	[tool_box_select2,selectToolBox2] = useState(undefined)


	renderToolBox = ->
		h Menu,
			vert: yes
			dim: 50
			onSelect: selectToolBox
			selectBorderColor: 'red'
			select: tool_box_select
			items: 
				edit: 
					label: h 'i',
						cn: 'fa-solid fa-hand'
				select:
					label: h 'i',
						cn: 'fa-solid fa-arrow-pointer'
					selectBorderColor: 'cyan'
				layers:
					label: h 'i',
						cn: 'fa-solid fa-layer-group'
					render: ()->
						h Menu,
							vert: no
							dim: 50
							test: yes
							selectBorderColor: 'yellow'
							onSelect: selectToolBox2
							select: tool_box_select2
							items: 
								edit: 
									label: h 'i',
										cn: 'fa-solid fa-hand'
								select:
									label: h 'i',
										cn: 'fa-solid fa-arrow-pointer'
								
				
				


	renderBox2 = ->
		h Box,
			title: 'edit demo box props'
			h In,
				type: 'toggle'
				label: 'pass size prop'
				value: demo_box_resize
				set: toggleDemoBoxResize
				color: 'red'
			h In,
				type: 'toggle'
				label: 'resize height enabled'
				value: height_resize
				set: toggleHeightResize
				valueColor: 'cyan'
			h In,
				type: 'toggle'
				label: 'resize width enabled'
				value: width_resize
				set: toggleWidthResize
				valueColor: 'yellow'
			h In,
				type: 'color'
				label: 'anchor bar color'
				value: demo_box_color
				set: setDemoBoxColor
			h In,
				type: 'color'
				label: 'anchor dot color'
				value: demo_dot_color
				set: setDemoDotColor
			h In,
				type: 'range'
				step:1
				min:0
				max:6
				label: 'anchor dot count'
				value: demo_dot_count
				set: setDemoDotCount
			h In,
				type: 'range'
				step:0.1
				min:8
				max:20
				label: 'font size'
				value: font_size
				set: setFontSize
			h In,
				type: 'range'
				step: 1
				min: 0
				max: 40
				label: 'edge snap threshold'
				value: snap_threshold
				set: setSnapThreshold
		
	# log anchor_pos
	h Layout,
		# getLabelWidth: (label)->
		# 	label.length * 8.15
		waitForFontLoad: yes
		fontSize: font_size
		fontFamily: FONT_FAMILY
		
		
		h ExampleRecursiveMenu,
			name: 'fixed'
			position: [100,100]

		h Anchor,
			handlePosition: 'bottom'
			autoHandlePosition: yes
			autoSnapHandlePosition: yes
			autoAlign: no
			position: anchor_pos
			visible: menu_1_visible
			onBarClick: ()->
				setMenu1Visible(!menu_1_visible)
			setPosition: (x,y)->
				setAnchorPos([x,y])
			
			h ExampleRecursiveMenu,
				name: 'menu'
				vert: yes
		
		h Anchor,
			handlePosition: 'bottom'
			autoHandlePosition: yes
			autoSnapHandlePosition: yes
			autoAlign: no
			dotColor: demo_dot_color
			dotCount: demo_dot_count
			barColor: demo_box_color
			position: anchor2_pos
			autoHandleThreshold: snap_threshold
			size: demo_box_resize && dim_2 || undefined
			visible: menu_2_visible
			resizeWidth: width_resize
			resizeHeight: height_resize
			onBarClick: ()->
				setMenu2Visible(!menu_2_visible)
			setPosition: (x,y)->
				setAnchor2Pos([x,y])
			setSize: (width,height)->
				setAnchor2Dim([width,height])
			h ExampleDemoBox
		
		
		h Anchor,
			autoHandlePosition: yes
			autoSnapHandlePosition: yes
			position: anchor3_pos
			visible: menu_3_visible
			resizeWidth: false
			resizeHeight: false
			onBarClick: ()->
				setMenu3Visible(!menu_3_visible)
			setPosition: (x,y)->
				setAnchor3Pos([x,y])
			renderBox2()
		

		h Anchor,
			dotColor: 'black'
			barColor: 'yellow'
			autoHandlePosition: yes
			autoSnapHandlePosition: yes
			position: anchor4_pos
			visible: menu_4_visible
			resizeWidth: false
			resizeHeight: false
			onBarClick: ()->
				setMenu4Visible(!menu_4_visible)
			setPosition: (x,y)->
				setAnchor4Pos([x,y])
			renderToolBox()
			

		