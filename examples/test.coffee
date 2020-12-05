import {createElement,useState,useEffect,useRef,useReducer} from 'react'
import {Layout,In,Box,Row,Menu,Section,SectionLabel,Style,Separator} from '../components'


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

	[menu_state,dispatchMenuState] = useReducer(menuToggleReducer,menuToggleReducerState) 

	renderRecursiveMenu = (menu_name,level=0)->
		h Menu,
			vert: level % 2 == 0
			select: menu_state[menu_name]
			onSelect: (item_name)->
				onSelectRecursiveMenuItem(menu_name,item_name)
			items:
				"#{menu_name}-5BOX": renderBox
				"#{menu_name}-1": renderRecursiveMenu.bind(null,"#{menu_name}-1",level+1)
				"#{menu_name}-2": renderRecursiveMenu.bind(null,"#{menu_name}-2",level+1)
				"#{menu_name}-3": renderRecursiveMenu.bind(null,"#{menu_name}-3",level+1)
				"#{menu_name}-4": renderRecursiveMenu.bind(null,"#{menu_name}-4",level+1)

	dev = ()->
		h Layout,
			getLabelWidth: (label)->
				label.length * 8.15
			h MenuAnchor,
				align: 'right-down'
				renderRecursiveMenu('r',0)
					