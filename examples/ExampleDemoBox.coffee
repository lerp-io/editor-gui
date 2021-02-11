import {createElement,useState,useEffect,useRef,useReducer} from 'react'
import {Layout,In,Box,Menu,Section,SectionLabel,Style,Separator} from '../components'
import '../components/Style.less'
h = createElement


chart_data = []
for m in [0...100]
	chart_data.push 120/100*m+Math.random()*20


export default ExampleDemoBox = ()->
	[is_mounted,setMounted] = useState(false)
	[size,setSize] = useState(null)
	useEffect ()->
		if !is_mounted
			setMounted(yes)
			
	,[]

	[toggle_title,toggleTitle] = useState(true)

	[show_menu_item_a,setMenuItemA] = useState('🐠 another menu 🐠')
	[show_menu_item_b,setMenuItemB] = useState("0")
	[show_menu_item_c,setMenuItemC] = useState(undefined)
	[show_menu_item_d,setMenuItemD] = useState('undefined')
	
	[val_range_a,setValRangeA] = useState(5.0)
	[val_range_b,setValRangeB] = useState(20)
	[val_range_c,setValRangeC] = useState(5.4)
	[val_range_d,setValRangeD] = useState(0)
	[val_number_a,setValNumberA] = useState(1.4)
	[val_number_b,setValNumberB] = useState(1.4)
	
	[stick_title,toggleStickyTitle] = useState(false)
	[val_text_a,setValTextA] = useState('short txt')
	[val_text_b,setValTextB] = useState('this some sort of oneline text, like a name or something')
	
	[val_color_a,setValColorA] = useState("#fff")
	[val_color_b,setValColorB] = useState("black")
	[val_color_c,setValColorC] = useState("#80cf3b")
	
	[val_toggle_a,setValToggleA] = useState(true)
	[val_toggle_b,setValToggleB] = useState(false)
	[val_toggle_c,setValToggleC] = useState(true)

	[section_visible_a,setSectionVisibleA] = useState(true)
	[section_visible_b,setSectionVisibleB] = useState(true)

	[val_select_a,setValSelectA] = useState(null)

	[box_visible_a,setBoxVisibleA] = useState(true)

	[input_bg_color,inputBackgroundColor] = useState('red')
	pos_a = useRef([0,0])

	[upd,setUpdate] = useState(null)
	global.setUpdate = setUpdate

	# [menu_state,dispatchMenuState] = useReducer(menuToggleReducer,menuToggleReducerState) 
	# log menu_state


	renderBox = ()->

		# return h Box,
		# 	# top: no
		# 	# top: yes
		# 	title: 'box title'
		# 	description: 'this is some sort of test description with a semi long line of text!'
		
		h Box,
			# top: no
			# top: yes
			title: toggle_title && 'box title'
			stickyTitle: stick_title
			# description: 'this is some sort of test description with a semi long line of text!'
			# h In,
			# 	type: 'text'
			# 	label: 'some text this is some sort of test description with a semi long line of text!'
			# 	# min: -10
			# 	# max: 10
			# 	# step: 1
			# 	value: val_text_a
			# 	set: setValTextA
			h In,
				type: 'toggle'
				label: 'toggle sticky title'
				value: stick_title
				set: toggleStickyTitle
			h In,
				type: 'toggle'
				label: 'toggle title'
				value: toggle_title
				set: toggleTitle
			h In,
				type: 'static'
				'static input with text passed as a child. this is some sort of test description with a semi long line of text!'
			
			h In,
				type: 'plain'
				label: 'plain value'
				value: 'some value string'
			h In,
				type: 'plain'
				label: 'plain value 2'
				backgroundColor: input_bg_color
				valueColor: 'black'
				labelColor: 'yellow'
				value: '10293.1020310.123'
			h In,
				type: 'static'
				'the above input colors are set via backgroundColor, valueColor and labelColor'
			
			h In,
				type: 'color'
				label: 'backgroundColor'
				value: input_bg_color
				set: inputBackgroundColor
			
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
				valueColor: 'red'
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
				valueColor: 'cyan'
			h In,
				type: 'toggle'
				half: yes
				label: 'toggle A'
				value: val_toggle_a
				set: setValToggleA
				valueColor: 'yellow'
				backgroundColor: 'red'
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
				backgroundColor: 'pink'
				valueColor: 'black'
				value: val_range_a
				set: setValRangeA
				toFixed: 3
				min: 1
				max: 10
			h In,
				type: 'static'
				'custom colors can also be set on range inputs'
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
				valueColor: 'yellow'
			
			
			h In,
				type: 'range'
				label: 'stepped by 1'
				value: val_range_d
				set: setValRangeD
				# toFixed: 0
				min: 0
				max: 10
				step: 1
				snapValueToEdge: yes
				color: 'orange'
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
				type: 'static'
				'Labels which are super long will word break and span multiple lines.'
			h Separator
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
			h Separator
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
				# onClick: setSectionVisibleA
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
				onClick: setSectionVisibleB
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
					label: 'bar chart'
					chart_type: 'bar'
					xBounds: [0,chart_data.length]
					xRange: 40
					yRange: [0,150]
					colors: ['red','green','yellow']
					step: 1
					getY: [
						
						(x)->
							chart_data[x]
						(x)->
							chart_data[x]-5
						(x)->
							chart_data[x]-30+10*Math.sin(x)
						
					]
				h In,
					type: 'line-chart'
					label: 'line chart'
					chart_type: 'line'
					color: 'cyan'
					xBounds: [-100,100]
					xRange: 10
					yRange: [-2,2]
					step: 1
					colors: ['magenta','cyan']
					getY: [
						(x)->
							Math.sin(x)
						(x)->
							Math.cos(x)
					]
						
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
	

	renderBox()