import {createElement,useState,useEffect,useContext,useRef,useReducer} from 'react'
h = createElement
import cn from 'classnames'
# import decidePosition from './decidePosition.coffee'
# import LayoutContext from './LayoutContext'
import BoxContext from './BoxContext'

import parseColor from 'parse-color'
# range
# checkbox
# select
# color
# number
# text
# toggle

decideInput = (props)->
	
reducer = (state,action)->
	# if action.type == 'dragstart'
	# 	return
	# 		start_range_slider_x: action.start_range_slider_x
	# 		drag_start_client_x: action.drag_start_client_x
	if action.type == 'set-color-input'
		return
			color_input_value: action.value
	
	else if action.type == 'slide-rect'
		return
			range_rect: action.value
	
	else if action.type == 'text'
		return 
			text_value: action.value
	
	else if action.type == 'rangeslide'
		return
			range_slider_x: action.range_slider_x

initial_state =
	text:null
	range_slider_x: 0
	color_input_value: null

In = (props)->
	[state,dispatch] = useReducer(reducer,initial_state) 
	[is_dragging,isDragging] = useState(false)
	[step_value,setStepValue] = useState(undefined)

	context = useContext(BoxContext)
	outer_range_ref = useRef(null)
	slider_state_ref = useRef({})
	input_ref = useRef(null)

	# log state

	if props.label
		label = h 'div',
			className: 'ed-in-label ed-flex-right'
			props.label
			h 'div',
				className:'ed-in-label-colon'
				':'

	# log state

	# useEffect ()->
		

	# 	if outer_range_ref.current
	# 		dispatch
	# 			type:'slide-rect'
	# 			value: outer_range_ref.current.getBoundingClientRect()
	# ,[outer_range_ref.current]

	# log state.color_input_value
	useEffect ()->
		if props.value != state.color_input_value && props.type == 'color'
			# log 'set color input',state.color_input_value
			dispatch
				type: 'set-color-input'
				value: props.value

		if props.step?
			# log props.value
			# log Math.floor(step_value/props.step)*props.step
			if Math.floor(step_value/props.step)*props.step !=  Math.floor(props.value/props.step)*props.step
				# log 'override step value',props.value
				setStepValue(props.value)
		
	,[props.value]



	switch props.type
		when 'text'
			input = h 'input',
				type: 'text'
				className: 'ed-input'
				onChange: (e)->
					if props.commit || context.dispatch
						dispatch
							type: 'text'
							value: e.target.value
					
					if context.dispatch
						context.dispatch
							type: 'text'
							value: e.target.value
					
					if !props.commit && !context.commit && props.set
						props.set(e.target.value)
				
				value: props.value
		
		when 'toggle'
			input = h 'div',
				className: 'ed-toggle-outer'
				onClick: ()->
					if props.commit || context.dispatch
						dispatch
							type: 'toggle'
							value: !props.value
					
					if context.dispatch
						context.dispatch
							type: 'toggle'
							value: !props.value
					
					if !props.commit && !context.commit && props.set
						props.set(!props.value)
				h 'div',
					className: cn 'ed-toggle-inner',props.value && 'ed-toggle-active'
					style:
						backgroundColor: props.value && props.color || undefined
		
		when 'range'
			if outer_range_ref.current
				range_rect = outer_range_ref.current.getBoundingClientRect()
				# log state.range_rect
				props_value = Number(props.value) || 1
				if props.step?
					props_value = Math.floor(step_value/props.step)*props.step
					# log 'set from step value',step_value
				max = props.max || 1
				min = props.min || 0
				props_value = Math.min(Math.max(props_value,min),max)
				value_alpha = (props_value-min) / (max - min)
				range_slider_x = value_alpha * (range_rect.width-6)
				# log range_slider_x
				if props.step?
					slider_state_ref.current.range_slider_x = ((step_value-min) / (max - min)) * (range_rect.width-6)
				else
					slider_state_ref.current.range_slider_x = range_slider_x
			else
				range_slider_x = 0
				# log state.range_slider_x

			# log value_alpha
			
			props_range_value = Number(props.value).toFixed(if props.toFixed? then props.toFixed else 2)

			value_label = h 'div',
				className: cn 'ed-range-value',value_alpha > .5 && 'ed-range-value-left',props.snapValueToEdge && 'ed-range-value-snap'
				props_range_value
			
			input = h 'div',
				className: cn 'ed-range-outer'
				ref: outer_range_ref
				style:
					color: if props.color? then props.color else undefined 
				onMouseDown: (e)->
					
					slider_state_ref.current.cx = e.clientX 
					
					

					onDrag = (e)->
						range_rect = outer_range_ref.current.getBoundingClientRect()
						# range_rect = state.range_rect
						x = e.clientX
						y = e.clientY

						y_d = Math.abs ( y - ( range_rect.top + ( range_rect.bottom - range_rect.top )/2 ))
						y_min_d = range_rect.height/2
						
						if y_d > y_min_d
							y_d = 1 + (y_d - y_min_d)*.1
						else
							y_d = 1

						# log slider_state_ref.current.range_slider_x
						
						diff_x = ( x - slider_state_ref.current.cx ) / y_d
						slider_state_ref.current.cx = x
						range_slider_x = Math.min(Math.max(0,slider_state_ref.current.range_slider_x + diff_x),range_rect.width-6)
						

						value_alpha = range_slider_x/(range_rect.width-6)
						min =  (props.min || 0)
						max = (props.max || 1)
						value = min + (max - min)*value_alpha
						
						
						if props.step?
							new_value = Math.floor(value/props.step)*props.step
							
							setStepValue(value)
							if new_value != props.value
								props.set(Math.min(Math.max(new_value,min),max))
						else
							props.set(value)
						e.preventDefault()
						e.stopPropagation()
						return false

					onDragEnd = (e)->
						e.preventDefault()
						e.stopPropagation()
						document.body.style.cursor = 'default'
						document.body.removeEventListener('mousemove',onDrag)
						document.body.removeEventListener('mouseup',onDragEnd)
						return false

					document.body.style.cursor = 'ew-resize'
					document.body.addEventListener 'mousemove',onDrag
					document.body.addEventListener 'mouseup',onDragEnd
				
				h 'div',
					className: 'ed-range-slider'
					style:
						transform: "translate(#{range_slider_x}px,#{0}%)"
						backgroundColor: if props.color? then props.color else undefined
					!props.snapValueToEdge && value_label || undefined
				props.snapValueToEdge && value_label || undefined

		when 'button'

			input = h 'button',
				className: 'ed-button'
				onClick: (e)->
					props.onSelect(e)
				props.value || 'button'

		when 'color'
			input = h 'div',
				className: 'ed-flex-right ed-full-w'
				h 'div',
					className: 'ed-color-box'
					style:
						background: props.value
					h 'input',
						ref: input_ref
						className: 'ed-color-box-input'
						onChange: (e)->
							if !context.commit && props.set
								props.set(e.target.value)
						type: 'color'

				h 'input',
					type: 'text'
					className: 'ed-input'
					value: state.color_input_value || ''
					onChange: (e)->
						parsed_color = parseColor(e.target.value)
						if parsed_color.hex
							props.set?(e.target.value)
						else
							dispatch
								type: 'set-color-input'
								value: e.target.value

						

		else
			throw new Error 'invalid input type'
	
	h 'div',
		className: cn 'ed-in-wrap',props.half && 'ed-in-half'
		label
		h 'div',
			className: cn 'ed-input-wrap',props.half && 'ed-in-half'
			input


	

export default In