import {createElement,useState,useEffect,useRef,useReducer} from 'react'
import {Layout,In,Box,Row,Menu,Section,SectionLabel,Style,Separator} from '../components'
h = createElement


menuToggleReducerState = {}
menuToggleReducer = (state,{menu_name,item_name})->
	Object.assign {},state,
		"#{menu_name}" : item_name

import ExampleDemoBox from './ExampleDemoBox.coffee'

ExampleRecursiveMenu = (props)->
	[menu_state,dispatchMenuState] = useReducer(menuToggleReducer,menuToggleReducerState)
	
	onSelectRecursiveMenuItem = (menu_name,item_name)->
		# log 'on SELECT',menu_name,'->',item_name
		dispatchMenuState
			menu_name: menu_name
			item_name: item_name

	renderBox = ()->
		h ExampleDemoBox

	renderRecursiveMenu = (menu_name,level=0,vert=true)->
		h Menu,
			vert: if vert? then vert else level % 2 == 0
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
		
	
	renderRecursiveMenu(props.name,0,props.vert)

export default ExampleRecursiveMenu