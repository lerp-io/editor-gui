global.log = console.log.bind(console)

import 'normalize.css'
import {createElement,useState,useEffect,useRef} from 'react'
import {render} from 'react-dom'
import {Layout,In,Box,Row,Menu,Section,SectionLabel,Style} from './components'
h = createElement

import './demo.less'


chart_data = [
	[0,10]
	[1,11]
	[2,12]
	[3,10]
	[4,5]
	[2,6]
	[3,12]
]

demo = ()->
	[is_mounted,setMounted] = useState(false)
	[size,setSize] = useState(null)
	useEffect ()->
		if !is_mounted
			setMounted(yes)
			window.addEventListener 'resize',setSize
	,[]
	[show_menu_item_a,setMenuItemA] = useState('🐠 another menu 🐠')
	[show_menu_item_b,setMenuItemB] = useState("0")
	[show_menu_item_c,setMenuItemC] = useState(undefined)
	[show_menu_item_d,setMenuItemD] = useState('undefined')
	
	[val_range_a,setValRangeA] = useState(5.0)
	[val_range_b,setValRangeB] = useState(20)
	[val_range_c,setValRangeC] = useState(5.4)
	
	[val_number_a,setValNumberA] = useState(1.4)
	[val_number_b,setValNumberB] = useState(1.4)
	
	[val_text_a,setValTextA] = useState('short txt')
	[val_text_b,setValTextB] = useState('this some sort of oneline text, like a name or something')
	
	[val_color_a,setValColorA] = useState("#fff")
	[val_color_b,setValColorB] = useState("black")
	[val_color_c,setValColorC] = useState("#80cf3b")
	
	[val_toggle_a,setValToggleA] = useState(true)
	[val_toggle_b,setValToggleB] = useState(false)
	[val_toggle_c,setValToggleC] = useState(true)

	[section_visible_a,setSectionVisibleA] = useState(false)
	[section_visible_b,setSectionVisibleB] = useState(true)

	[val_select_a,setValSelectA] = useState(null)

	[box_visible_a,setBoxVisibleA] = useState(true)

	pos_a = useRef([0,0])

	[upd,setUpdate] = useState(null)
	global.setUpdate = setUpdate


	renderSettingsBoxB = (props,state)->
		h Box,
			title: undefined
			description: undefined
			h Row,{},
				h In,
					type: 'toggle'
					label: 'toggle A'
					value: val_toggle_a
					set: setValToggleA
					color: 'red'
				h In,
					type: 'color'
					label: 'another color'
					value: val_color_b
					commit: setValColorB
			h Row,{},
				h In,
					type: 'toggle'
					label: 'toggle B'
					value: val_toggle_b
					set: setValToggleB
					color: 'red'
				h In,
					type: 'color'
					label: 'val color c'
					value: val_color_c
					commit: setValColorC
			h In,
				type: 'select'
				label: 'select'
				value: val_select_a
				items: ['option A','option B','option C']
				set: setValSelectA
	# log show_menu_item_a
	prod = ()->
		h LayoutProvider,
			autosize: yes
			h Box,
				title: 'this is a floating box'
				position: pos_a.current
				set: (x,y)->
					pos_a.current[0] = x
					pos_a.current[1] = y
			
			h Menu,
				top: yes
				left: yes
				position: undefined
				select: show_menu_item_a
				onSelect: (item_name,renderFn)->
					setMenuItemA(item_name)
				items:
					'bUtToN':
						onSelect: ()->
							alert('a trigger')
						render: undefined
					'SettiNgs box A': (props,state)-> 
						h Box,
							title: 'settings box A'
							description: ()->
								h 'p',{},'render some sort of description'
							description: 'some sort of description' 
							h In,
								type: 'range'
								label: 'range A'
								min: 10
								max: 20
								value: val_range_a
								step: 1
								set: setValRangeA
							h In,
								type: 'range'
								label: 'range B'
								min: -10
								max: 10
								step: 1
								value: val_range_b
								set: setValRangeB
							h Section,
								label: 'some section'
								visible: section_visible_a 
								set: setSectionVisibleA
								h In,
									type: 'range'
									label: undefined
									min: 10
									max: 20
									step: 1
									value: val_range_c
									set: setValRangeC
								h In,
									type: 'text'
									label: undefined
									value: val_text_a
								h In,
									type: 'number'
									label: 'some manual number'
									commit: setValNumber
									value: val_number_a
								h In,
									type: 'text'
									label: 'text2'
									value: val_text_b
							h SectionLabel,
								label: 'another section label'
							h In,
								type: 'number'
								label: 'another number'
								commit: setValNumber
								value: val_number_b
							h In,
								type: 'color'
								label: 'some sort of long color label i guess'
								value: val_color_a
								commit: setValColorA
							h Section,
								label: 'some other section'
								visible: section_visible_b
								set: setSectionVisibleB
								h In,
									type: 'color'
									label: 'another color'
									value: val_color_b
									commit: setValColorB
								h In,
									type: 'color'
									label: 'another color'
									value: val_color_c
									commit: setValColorC
								h Row,{},
									h In,
										type: 'toggle'
										label: 'toggle A'
										value: val_toggle_a
										set: setValToggleA
										color: 'red'
									h In,
										type: 'toggle'
										label: 'toggle A'
										value: val_toggle_c
										set: setValToggleB
										color: 'green'
									h In,
										type: 'toggle'
										label: 'toggle A'
										value: val_toggle_c
										set: setValToggleC
										color: 'cyan'

					'settings box B': renderSettingsBoxB

					'another menu ': h Menu,
						select: show_menu_item_b
						onSelect: setMenuItemB
						items:
							' 🐊 sub menu': h Menu,
								onSelect: setMenuItemC
								select: show_menu_item_c
								items:
									a: ()->
										h Box,
											title: 'test'
									b: ()->
										h Box,
											title: 'test'
									c: ()->
										h Box,
											title: 'test'
							
							'trigger':
								onSelect: ()->
									alert('a trigger')
							
							'🐠 another menu 🐠': h Menu,
								onSelect: setMenuItemD
								select: show_menu_item_d
								items:
									0: ()->
										h Box,
											title: 'test'
									"123": ()->
										h Box,
											title: 'test'
									"asd asd ": ()->
										h Box,
											title: 'test'


			h Box,
				title: 'bottom center box'
				float: no
				right: no
				bottom: yes
				h In,
					type: 'text'
					label: 'text'
					value: undefined
	
	dev = ()->
		h Layout,{},
			h Box,
				visible: box_visible_a
				setVisible: setBoxVisibleA
				title: 'this is a floating box'
				position: pos_a.current
				drag: (x,y)->
					pos_a.current[0] = x
					pos_a.current[1] = y
					return pos_a.current
				h In,
					type: 'text'
					label: 'text'
					value: undefined
			h Box,
				visible: undefined
				setVisible: undefined
				title: 'bottom center box'
				float: no
				right: no
				bottom: yes
				h In,
					type: 'text'
					label: 'text'
					value: undefined
			h Menu,
				left: yes
				top: yes
				select: show_menu_item_a
				onSelect: (item_name,renderFn)->
					setMenuItemA(item_name)
				items:
					'top left box B': h Box,
						visible: undefined
						setVisible: undefined
						# title: 'top right box A'
						h In,
							type: 'text'
							label: 'text'
							value: undefined
					'top left box B': h Box,
						visible: undefined
						setVisible: undefined
						# title: 'top right box B'
						h In,
							type: 'text'
							label: 'text'
							value: undefined
					'top left box C': h Box,
						visible: undefined
						setVisible: undefined
						# title: 'top right box C'
						h In,
							type: 'text'
							label: 'text'
							value: undefined
				
	dev = ()->
		h Layout,{},
			h Menu,
				left: yes
				# top: yes
				vert: yes
				select: show_menu_item_a
				onSelect: (item_name,renderFn)->
					# log 'select a',item_name
					setMenuItemA(item_name)
				
				items:
					'bUtToN': ()->
						alert('trigger 1')
					
					'HellO wOrld': ()->
						alert('trigger 2')
					
					'🐠 another menu 🐠': h Menu,
						vert: yes
						left: yes
						select: show_menu_item_b
						onSelect: (item_name,renderFn)->
							setMenuItemB(item_name)
						items:
							0: h Box,
								# top: yes
								title: 'box title'
								description: 'this is some sort of test description with a semi long line of text!'
								# h In,
								# 	type: 'text'
								# 	label: 'some text this is some sort of test description with a semi long line of text!'
								# 	# min: -10
								# 	# max: 10
								# 	# step: 1
								# 	value: val_text_a
								# 	set: setValTextA
								h In,
									type: 'plain'
									label: 'plain value'
									value: 'some value string'
								h In,
									type: 'plain'
									label: 'plain value 2'
									value: '10293.1020310.123'
								h In,
									type: 'text'
									label: 'val'
									# min: -10
									# max: 10
									# step: 1
									value: val_text_a
									set: setValTextA
								h In,
									type: 'text'
									label: 'val'
									# min: -10
									# max: 10
									# step: 1
									value: val_text_a
									set: setValTextA
								h In,
									type: 'toggle'
									label: 'full toggle'
									value: val_toggle_b
									set: setValToggleB
									color: 'red'
								h In,
									type: 'toggle'
									half: yes
									label: 'toggle A'
									value: val_toggle_a
									set: setValToggleA
									# color: 'red'
								h In,
									type: 'toggle'
									half: yes
									label: 'toggle B'
									value: val_toggle_b
									set: setValToggleB
									color: 'red'
								h In,
									type: 'toggle'
									half: yes
									label: 'toggle A'
									value: val_toggle_a
									set: setValToggleA
									# color: 'red'
								h In,
									type: 'toggle'
									half: yes
									label: 'toggle B'
									value: val_toggle_b
									set: setValToggleB
									color: 'red'
								h In,
									type: 'range'
									label: 'range A'
									value: val_range_a
									set: setValRangeA
									toFixed: 3
									min: 1
									max: 10
								h In,
									type: 'range'
									label: 'copy of range A'
									value: val_range_a
									set: setValRangeA
									toFixed: 3
									min: 1
									max: 10
									# color: 'cyan'
								h In,
									type: 'range'
									label: 'colored, stepped by 1 with snapped labels on either end'
									value: val_range_b
									set: setValRangeB
									toFixed: 0
									min: 1
									max: 100
									step: 1
									snapValueToEdge: yes
									color: 'yellow'
								h In,
									type: 'range'
									label: 'stepped by 10 and fixed to 2 decimals'
									value: val_range_c
									set: setValRangeC
									toFixed: 2
									min: 1
									max: 100
									step: 10
									snapValueToEdge: yes
									color: 'lime'
								h In,
									type: 'button'
									label: 'pls click meh'
									onSelect: ->
										alert('hellow wurld')
								h In,
									type: 'button'
									value: 'hello'
									onSelect: ->
										alert('hellow wurld')
								h In,
									type: 'button'
									value: 'hello 2'
									onSelect: ->
										alert('hellow wurld')
								h In,
									type: 'color'
									label: 'color 1'
									value: val_color_a
									set: setValColorA
								h In,
									type: 'color'
									label: 'color 2'
									value: val_color_b
									set: setValColorB
								h In,
									type: 'color'
									label: 'color 2 copy'
									value: val_color_b
									set: setValColorB
								h Section,
									label: 'some section'
									visible: section_visible_a
									set: setSectionVisibleA
									h In,
										type: 'button'
										value: 'hello 2'
										onSelect: ->
											alert('hellow wurld')
									h In,
										type: 'color'
										label: 'color 1'
										value: val_color_a
										set: setValColorA
								h Section,
									label: 'some other section'
									visible: section_visible_b
									set: setSectionVisibleB
									h In,
										type: 'button'
										value: 'hello 2'
										onSelect: ->
											alert('hellow wurld')
									h In,
										type: 'color'
										label: 'color 1'
										value: val_color_a
										set: setValColorA
									h In,
										type: 'range'
										label: 'range A'
										value: val_range_a
										set: setValRangeA
										toFixed: 3
										min: 1
										max: 10
									h In,
										type: 'line-chart'
										label: 'line chart label'
										set: (key,value)->
											setValSelectA(key)
										value: val_select_a
										xBounds: [-200,200]
										yRange: 10
										xRange: 50
										step: .5
										getY: (x)->
											# log x
											Math.sin(x)
								h In,
									type: 'select'
									set: (key,value)->
										setValSelectA(key)
									value: val_select_a
									label: 'select'
									options: 
										'option-a': 'Option 1'
										'option-b': 'Option 2'
										'option-c': 'Option 3'
								h In,
									type: 'select'
									set: (key,value)->
										setValSelectA(key)
									value: val_select_a
									label: 'select copy'
									options: 
										'option-a': 'Option 1'
										'option-b': 'Option 2'
										'option-c': 'Option 3'
								
										

							


							"123": h Box,
								title: 'test'
							'🐠 another menu 2 🐠': h Menu,
								vert: no
								left: yes
								items:
									0: h Box,
										title: 'test 1'
									"123": h Box,
										title: 'test 2'
									"125": h Box,
										title: 'test 3'
									"126": h Box,
										title: 'test 4'
							'🐠 another menu 3 🐠': h Menu,
								vert: no
								left: yes
								select: show_menu_item_c
								onSelect: (item_name,renderFn)->
									setMenuItemC(item_name)
								items:
									"test": h Menu,
										vert: no
										right: yes
										top: yes
										items:
											0: h Box,
												title: 'test 1'
											"123": h Box,
												title: 'test 2'
											"125": h Box,
												title: 'test 3'
									"123": h Box,
										title: 'test 2'
									"125": h Box,
										title: 'test 3'
										
									

	
	return dev()

render(h(demo),window.demo)
