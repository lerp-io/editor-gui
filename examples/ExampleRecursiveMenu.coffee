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

	renderRecursiveMenu = (menu_name,level=0,vert)->
		items = {}
		for i in [0...(level+3)]
			items["#{menu_name}-#{i}"] = renderRecursiveMenu.bind(null,"#{menu_name}-#{i}",level+1)
			items["#{menu_name}-#{i}-box"] = renderBox



		h Menu,
			vert: if vert? then vert else level % 2 == 0
			select: menu_state[menu_name]
			onSelect: (item_name)->
				onSelectRecursiveMenuItem(menu_name,item_name)
			items: items
		
	
	renderRecursiveMenu(props.name,0,props.vert)

export default ExampleRecursiveMenu