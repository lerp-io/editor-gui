import {createElement,useState,useEffect,useRef,useReducer} from 'react'
import {Layout,In,Box,Menu,Section,SectionLabel,Style,Separator} from '../components'
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

	renderRecursiveMenu = (menu_name,level=0,vert,position)->
		items = {}

		if level % 2 == 0
			item_count = 2
		else
			item_count = (level+1)*2

		for i in [0...item_count]
			items["#{menu_name}#{i}"] = renderRecursiveMenu.bind(null,"#{menu_name}#{i}",level+1)
			items["#{menu_name}#{i}-box"] = renderBox


		h Menu,
			vert: if props.vert? then props.vert else level % 2 == 1
			select: menu_state[menu_name]
			position: position
			onSelect: (item_name)->
				onSelectRecursiveMenuItem(menu_name,item_name)
			items: items


	renderRecursiveMenu(props.name,0,props.vert,props.position)

export default ExampleRecursiveMenu