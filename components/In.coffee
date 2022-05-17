import {createElement,useState,useEffect,useContext,useRef,useReducer} from 'react'
import cn from 'classnames'
import BoxContext from './BoxContext'
import parseColor from 'parse-color'
h = createElement





renderChart = (state,props)->
	
	{ctx,rect,pan_x} = state
	if !ctx then return

	
	y_pan = props.yRange[0]
	y_range = props.yRange[1] - props.yRange[0]
	
	pan_x = pan_x * -1
	step = props.step
	x_max = props.xBounds[1] + Math.floor(pan_x/step)*step
	x_min = Math.max(x_max-props.xRange,props.xBounds[0])
	x_length = Math.max(x_max - x_min,0)
	pan_diff = pan_x - Math.floor(pan_x/step)*step
	
	# log x_min,'-',x_max
	ctx.clearRect(0,0,rect.width,rect.height)
	
	colors = props.colors || []

	
	
	for j in [0...props.getY.length]
		i = -1
		ctx.beginPath()

		ctx.fillStyle = colors[j] || 'white'
		ctx.strokeStyle = colors[j] || 'white'
		ctx.lineWidth = 1
		# r_left = rect.width/props.xRange * (0 * step - pan_diff)
		# r_top = rect.height - (rect.height/y_range * (y_val - y_pan))
		
		
		while i < (x_length/step)
			i += 1
			x_val = x_min + (i * step)
			y_val = props.getY[j](x_val)
			if !y_val then continue
			
			r_left = rect.width/props.xRange * (i * step - pan_diff) 
			r_top = rect.height - (rect.height/y_range * (y_val - y_pan))
			if props.type == 'bar-chart'
				r_width = rect.width/props.xRange
				r_height = (rect.height/y_range * y_val)
				ctx.rect(r_left, r_top, r_width,r_height)
			else if props.type == 'line-chart'
				# if i == 0
				# 	ctx.moveTo(r_left,r_top)
				ctx.lineTo(r_left,r_top)
		
		# ctx.closePath()
		if props.type == 'bar-chart'
			ctx.fill()
		else
			ctx.stroke()
	


	



LineChart = (props)->
	wrap_ref = useRef(null)
	canvas_ref = useRef(null)
	canvas_state = useRef({
		pan_x: 0
	})
	context = useContext(BoxContext)
	[rect,setRect] = useState(null)
	[tick_step,setTickStep] = useState(null)
	
	useEffect ()->
		if wrap_ref.current
			rect = wrap_ref.current.getBoundingClientRect()
			canvas_state.current.rect = rect
			setRect(rect)
			
	,[wrap_ref.current]

	useEffect ()->
		if canvas_ref.current
			# log 'set canvas context'
			canvas_state.current.ctx = canvas_ref.current.getContext('2d')
			setTickStep(0)
		return
	,[canvas_ref.current]

	useEffect ()->
		try
			renderChart(canvas_state.current,props)
		catch error
			console.error(error)
			return
		# setTimeout ()->
		# 	if !canvas_ref.current
		# 		return
		# 	setTickStep(tick_step+1)
		# ,100
		return
	,[tick_step,props.tick_step,props.yRange[0],props.yRange[1],props.xRange,props.step,props.type,props.colors[0],props.colors[1],props.colors[2],props.colors[3],props.colors[4]]


	if rect
		canvas = h 'canvas',
			ref: canvas_ref
			width: rect.width
			height: rect.height
			onMouseDown: (e)->
				canvas_state.current.cx = e.clientX 

				onDrag = (e)->
					x = e.clientX
					y = e.clientY
					rect = canvas_ref.current.getBoundingClientRect()

					y_d = Math.abs ( y - ( rect.top + ( rect.bottom - rect.top )/2 ))
					y_min_d = rect.height/2
					
					if y_d > y_min_d
						y_d = 1 + (y_d - y_min_d)*.1
					else
						y_d = 1


					diff_x = ( x - canvas_state.current.cx ) / (rect.width/props.xRange)
					canvas_state.current.cx = x
					# log (canvas_state.current.pan_x + diff_x)
					pan_x = Math.min(Math.max(0,(canvas_state.current.pan_x + diff_x*y_d)),props.xBounds[1] - props.xBounds[0]-props.xRange)
					# log pan_x
					canvas_state.current.pan_x = pan_x
					# log pan_x
					
					# log pan_x
					requestAnimationFrame renderChart.bind(null,canvas_state.current,props,context)
					e.preventDefault()
					e.stopPropagation()
					return false

				onMouseOut = (e)->
					e.stopPropagation()
					e.preventDefault()
					f = e.relatedTarget || e.toElement
					if f && f.nodeName != "HTML"
						return false
					# context.body.style.cursor = 'default'
					# context.body.removeEventListener('mousemove',onDrag)
					# context.body.removeEventListener('mouseup',onDragEnd)
					# context.body.removeEventListener('mouseout',onMouseOut)
					context.stopDrag(onDrag,onDragEnd,onMouseOut)
					# log 'MOUSE OUT'
					window.getSelection().removeAllRanges()
					return false

				onDragEnd = (e)->
					e.preventDefault()
					e.stopPropagation()
					# context.body.style.cursor = 'default'
					# context.body.removeEventListener('mousemove',onDrag)
					# context.body.removeEventListener('mouseup',onDragEnd)
					# context.body.removeEventListener('mouseout',onMouseOut)
					context.stopDrag(onDrag,onDragEnd,onMouseOut)
					return false
				
				# context.body.style.cursor = 'ew-resize'
				# context.body.addEventListener 'mousemove',onDrag
				# context.body.addEventListener 'mouseup',onDragEnd
				# context.body.addEventListener 'mouseout',onMouseOut
				context.startDrag(onDrag,onDragEnd,onMouseOut)
				# e.preventDefault()
				# e.stopPropagation()
				# return false

	
	h 'div',
		className: 'ed-full-w'
		ref: wrap_ref
		canvas





	
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


	if props.label
		label = h 'div',
			className: 'ed-in-label ed-flex-right'
			style:
				color: props.labelColor
			props.label
			# h 'div',
			# 	className:'ed-in-label-colon'
			# 	props.type != 'toggle' && ':'

	useEffect ()->
		if props.value != state.color_input_value && props.type == 'color'
			dispatch
				type: 'set-color-input'
				value: props.value

		if props.step?
			if Math.floor(step_value/props.step)*props.step != Math.floor(props.value/props.step)*props.step
				setStepValue(props.value)
		
	,[props.value]



	switch props.type
		when 'static'
			input = undefined
		when 'plain','label'
			input = h 'div',
				className: 'ed-input full-w ed-input-plain'
				style:
					background: props.backgroundColor
					color: props.valueColor
				props.value

		when 'text','number'
			input = h 'input',
				type: props.type
				disabled: props.disabled
				className: 'ed-input'
				style:
					background: props.backgroundColor
					color: props.valueColor
				onChange: (e)->
					# if props.commit || context.dispatch
					# 	dispatch
					# 		type: props.type
					# 		value: e.target.value
					
					# if context.dispatch
					# 	context.dispatch
					# 		type: props.type
					# 		value: e.target.value
					
					# if !props.commit && !context.commit && props.set
					props.set?(e.target.value)
				
				value: props.value

		when 'toggle'
			triggerToggle = ()->
				# if props.commit || context.dispatch
				# 	dispatch
				# 		type: 'toggle'
				# 		value: !props.value
				
				# if context.dispatch
				# 	context.dispatch
				# 		type: 'toggle'
				# 		value: !props.value
				
				# if props.set
				props.set?(!props.value)
			
			input = h 'div',
				className: 'ed-toggle-outer'
				style:
					backgroundColor: props.backgroundColor
				h 'div',
					className: cn 'ed-toggle-inner',props.value && 'ed-toggle-active'
					style:
						backgroundColor: props.value && props.valueColor || undefined

		when 'range'
			if outer_range_ref.current
				range_rect = outer_range_ref.current.getBoundingClientRect()
				props_value = Number(props.value)
				if props.step?
					props_value = Math.floor(step_value/props.step)*props.step
				
				max = props.max || 1
				min = props.min || 0

				props_value = Math.min(Math.max(props_value,min),max)
				value_alpha = (props_value-min) / (max - min)
				# log props_value,value_alpha
				
				range_slider_x = value_alpha * (range_rect.width-6)
				# log value_alpha,(range_rect.width-6),range_slider_x,props.step
				
				if props.step?
					slider_state_ref.current.range_slider_x = ((step_value-min) / (max - min)) * (range_rect.width-6)
				else
					slider_state_ref.current.range_slider_x = range_slider_x
			else
				range_slider_x = 0
				
			
			props_range_value = Number(props.value).toFixed(if props.toFixed? then props.toFixed else 2)

			value_label = h 'div',
				className: cn 'ed-range-value',value_alpha > .5 && 'ed-range-value-left',props.snapValueToEdge && 'ed-range-value-snap'
				props_range_value
			
			onMouseDown = (e)->
				slider_state_ref.current.cx = e.clientX 
				old_value = null
				onDrag = (e)->
					range_rect = outer_range_ref.current.getBoundingClientRect()
					
					x = e.clientX
					y = e.clientY

					y_d = Math.abs ( y - ( range_rect.top + ( range_rect.bottom - range_rect.top )/2 ))
					y_min_d = range_rect.height/2
					
					if y_d > y_min_d
						y_d = 1 + (y_d - y_min_d)*.1
					else
						y_d = 1

					
					diff_x = ( x - slider_state_ref.current.cx ) / y_d
					
					slider_state_ref.current.cx = x
					range_slider_x = Math.min(Math.max(0,slider_state_ref.current.range_slider_x + diff_x),range_rect.width-6)
					value_alpha = range_slider_x/(range_rect.width-6)
					min =  (props.min || 0)
					max = (props.max || 1)
					value = min + (max - min)*value_alpha
					

					if props.step?
						# log value,'/',props.step,'*',props.step
						new_value = Math.min(Math.max(Math.floor(value/props.step)*props.step,min),max)
						setStepValue(value)
						if new_value != old_value
							props.set(new_value)
							old_value = new_value
					else
						props.set(value)
					e.preventDefault()
					e.stopPropagation()
					return false
		
				onDragEnd = (e)->
					e.preventDefault()
					e.stopPropagation()
					context.stopDrag(onDrag,onDragEnd,onMouseOut)
					return false
				
				onMouseOut = (e)->
					e.stopPropagation()
					e.preventDefault()
					f = e.relatedTarget || e.toElement
					if f && f.nodeName != "HTML"
						return false
					context.stopDrag(onDrag,onDragEnd,onMouseOut)
					# log 'MOUSE OUT'
					window.getSelection().removeAllRanges()
					return false

				# context.body.style.cursor = 'ew-resize'
				context.startDrag(onDrag,onDragEnd,onMouseOut)
				# context.body.addEventListener 'mousemove',onDrag
				# context.body.addEventListener 'mouseup',onDragEnd
				# context.body.addEventListener 'mouseout',onMouseOut


			input = h 'div',
				className: cn 'ed-range-outer'
				ref: outer_range_ref
				style:
					color: if props.valueColor? then props.valueColor else undefined 
					backgroundColor: props.backgroundColor
				onMouseDown: !props.disabled && onMouseDown || undefined
				
				h 'div',
					className: 'ed-range-slider'
					style:
						transform: "translate(#{range_slider_x}px,#{0}%)"
						backgroundColor: props.valueColor
					!props.snapValueToEdge && value_label || undefined
				props.snapValueToEdge && value_label || undefined

		when 'button'
			# log 'SET COLOR',props.color
			input = h 'button',
				className: 'ed-button'
				style:
					color: props.valueColor
					background: props.backgroundColor
				onClick: !props.disabled && ((e)->
					props.onSelect?(e) || props.onClick?(e) || props.set?(e)
				) || undefined
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
						className: cn 'ed-color-box-input',(props.disabled && 'ed-disabled')
						value: props.value
						onChange: (e)->
							# if !context.commit && props.set
							props.set?(e.target.value)
						type: 'color'

				h 'input',
					type: 'text'
					disabled: props.disabled
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
		when 'select'
			# value_exists = false
			if Array.isArray(props.options)
				val_exists = false
				options = props.options.map (val)->
					if val[0] == props.value
						val_exists = true
					h 'option',
						key: val[0]
						value: val[0]
						val[1]
				
				if !val_exists
					options.unshift h 'option',
						key: '-'
						value: null
						props.value || '-'
			else
				options = Object.keys(props.options).map (key)->
					h 'option',
						key: key
						value:key
						props.options[key]

				if !props.options[props.value]
					options.unshift h 'option',
						key: '-'
						value: null
						props.value || '-'

			input = h 'div',
				className: 'ed-flex-right ed-full-w'
				h 'select',
					className: 'ed-input-select'
					value: props.value || '[select]'
					onChange: (e)=>
						props.set?(e.target.value)
					options

				h 'div',
					className: 'ed-input-select-arrow'
					'▼'
						
		when 'line-chart','bar-chart'
			input = h 'div',
				className: 'ed-line-chart'
				h LineChart,props
		else
			throw new Error 'invalid input type'
	

	if props.type == 'line-chart' || props.type == 'bar-chart'
		return h 'div',
			className: 'ed-in-wrap ed-line-chart-wrap'
			h 'div',
				className: 'ed-line-chart-label'
				label
			input
	
	if props.type == 'toggle' 
		return h 'div',
			className: cn 'ed-in-wrap','ed-in-wrap-toggle',props.half && 'ed-in-half'
			onClick: !props.disabled && triggerToggle || undefined
			h 'div',
				className: 'ed-in-wrap-toggle-input'
				input
			# h 'div',
			# 	className: 'ed-in-wrap-toggle-label'
			label
			
	if input?
		input_wrapper = h 'div',
			className: cn 'ed-input-wrap',props.half && 'ed-in-half' || (props.full || props.type == 'button') && 'ed-in-full' 
			input

	h 'div',
		className: cn 'ed-in-wrap',props.half && 'ed-in-half',props.type == 'plain' && 'ed-tight',props.disabled && 'ed-in-disabled'
		input_wrapper
		label
		props.children


	

export default In