global.log = console.log.bind(console)

import 'normalize.css'
import {createElement,useState,useEffect,useRef} from 'react'
import {render} from 'react-dom'
import {Layout,In,Box,Row,Menu,SectionLabel,Style} from './components'
h = createElement

import './demo.less'

demo = ()->

	[show_menu_item_a,setMenuItemA] = useState('🐠 another menu 🐠')
	[show_menu_item_b,setMenuItemB] = useState(undefined)
	[show_menu_item_c,setMenuItemC] = useState(undefined)
	[show_menu_item_d,setMenuItemD] = useState('undefined')
	
	[val_range_a,setValRangeA] = useState(10.10)
	[val_range_b,setValRangeB] = useState(-10.2)
	[val_range_c,setValRangeC] = useState(5.4)
	
	[val_number_a,setValNumberA] = useState(1.4)
	[val_number_b,setValNumberB] = useState(1.4)
	
	[val_text_a,setValTextA] = useState('short txt')
	[val_text_b,setValTextB] = useState('this some sort of oneline text, like a name or something')
	
	[val_color_a,setValColorA] = useState("#fff")
	[val_color_b,setValColorB] = useState(undefined)
	[val_color_c,setValColorB] = useState("#80cf3b")
	
	[val_toggle_a,setValToggleA] = useState(true)
	[val_toggle_b,setValToggleB] = useState(false)
	[val_toggle_c,setValToggleC] = useState(true)

	[section_visible_a,setSectionVisibleA] = useState(true)
	[section_visible_b,setSectionVisibleB] = useState(false)

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
				right: yes
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
							0: ()->
								h Box,
									title: 'test'
							"123": ()->
								h Box,
									title: 'test'
							'🐠 another menu 2 🐠': h Menu,
								vert: no
								left: yes
								items:
									0: ()->
										h Box,
											title: 'test'
									"123": ()->
										h Box,
											title: 'test'
									"125": ()->
										h Box,
											title: 'test'
									"126": ()->
										h Box,
											title: 'test'

	
	return dev()

render(h(demo),window.demo)