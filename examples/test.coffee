import {createElement,useState,useEffect,useRef,useReducer} from 'react'
import {Layout,In,Box,Row,Menu,Section,SectionLabel,Style,Separator,MenuAnchor} from '../components'


menuToggleReducerState = {}
menuToggleReducer = (state,{menu_name,item_name})->
	Object.assign {},state,
		"#{menu_name}" : item_name


export default test = ()->
	[is_mounted,setMounted] = useState(false)
	[size,setSize] = useState(null)
	useEffect ()->
		if !is_mounted
			setMounted(yes)
			
	,[]

	[menu_1_visible,setMenu1Visible] = useState(true)
	[menu_2_visible,setMenu2Visible] = useState(false)


	[anchor_pos,setAnchorPos] = useState([0,0])

	[menu_state,dispatchMenuState] = useReducer(menuToggleReducer,menuToggleReducerState) 
	onSelectRecursiveMenuItem = (menu_name,item_name)->
		# log 'on SELECT',menu_name,'->',item_name
		dispatchMenuState
			menu_name: menu_name
			item_name: item_name
	
	renderBox = ()->
		h Box,
			title: 'box title'
			description: 'this is some sort of test description with a semi long line of text!'
			h In,
				type: 'plain'
				label: 'plain value 2'
				value: '10293.1020310.123'
			h In,
				type: 'plain'
				label: 'plain value 2'
				value: '10293.1020310.123'
			h In,
				type: 'plain'
				label: 'plain value 2'
				value: '10293.1020310.123'
			h In,
				type: 'plain'
				label: 'plain value 2'
				value: '10293.1020310.123'
			h In,
				type: 'plain'
				label: 'plain value 2'
				value: '10293.1020310.123'
			h In,
				type: 'plain'
				label: 'plain value 2'
				value: '10293.1020310.123'
			h In,
				type: 'plain'
				label: 'plain value 2'
				value: '10293.1020310.123'
			h In,
				type: 'plain'
				label: 'plain value 2'
				value: '10293.1020310.123'
			h In,
				type: 'plain'
				label: 'plain value 2'
				value: '10293.1020310.123'
	
	renderRecursiveMenu = (menu_name,level=0)->
		h Menu,
			vert: level % 2 == 0
			# align: level == 0 &&  || undefined
			# position: level == 0 && [100,100] || undefined
			select: menu_state[menu_name]
			onSelect: (item_name)->
				onSelectRecursiveMenuItem(menu_name,item_name)
			items:
				"#{menu_name}-BOX1": renderBox
				"#{menu_name}-1": renderRecursiveMenu.bind(null,"#{menu_name}-1",level+1)
				"#{menu_name}-2": renderRecursiveMenu.bind(null,"#{menu_name}-2",level+1)
				"#{menu_name}-BOX2": renderBox
				"#{menu_name}-3": renderRecursiveMenu.bind(null,"#{menu_name}-3",level+1)
				"#{menu_name}-4": renderRecursiveMenu.bind(null,"#{menu_name}-4",level+1)
				"#{menu_name}-BOX3": renderBox
				
	# log anchor_pos
	h Layout,
		# getLabelWidth: (label)->
		# 	label.length * 8.15
		fontSize: 13
		fontFamily: 'system-ui'
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
			renderRecursiveMenu('menu',0)