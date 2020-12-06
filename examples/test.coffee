import {createElement,useState,useEffect,useRef,useReducer} from 'react'
import {Layout,In,Box,Row,Menu,Section,SectionLabel,Style,Separator,MenuAnchor} from '../components'

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

	[dim_2,setAnchor2Dim] = useState([250,250])


	[anchor_pos,setAnchorPos] = useState([0,30])
	[anchor2_pos,setAnchor2Pos] = useState([150,400])
	

	# log anchor_pos
	h Layout,
		# getLabelWidth: (label)->
		# 	label.length * 8.15
		fontSize: 15
		fontFamily: 'Inconsolata'
		h MenuAnchor,
			handlePosition: 'bottom'
			align: 'left-down'
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
				vert: true
		
		h MenuAnchor,
			handlePosition: 'bottom'
			align: 'left-down'
			autoHandlePosition: yes
			autoSnapHandlePosition: yes
			autoAlign: no
			dotColor: 'green'
			dotCount: 2
			barColor: 'yellow'
			position: anchor2_pos
			size: dim_2
			visible: menu_2_visible
			onBarClick: ()->
				setMenu2Visible(!menu_2_visible)
			setPosition: (x,y)->
				setAnchor2Pos([x,y])
			setSize: (width,height)->
				setAnchor2Dim([width,height])
			h ExampleDemoBox
			# h ExampleRecursiveMenu,
			# 	name: 'menu2'
			# 	# vert: true