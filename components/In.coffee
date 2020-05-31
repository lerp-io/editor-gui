import {createElement,useState,useEffect,useContext,useRef,useReducer} from 'react'
h = createElement
import cn from 'classnames'
# import decidePosition from './decidePosition.coffee'
# import LayoutContext from './LayoutContext'
import BoxContext from './BoxContext'
# range
# checkbox
# select
# color
# number
# text
# toggle

decideInput = (props)->
	
reducer = (state,action)->
	if action.type == 'text'
		return 
			text_value: action.value

initial_state =
	text:null

In = (props)->
	[state,dispatch] = useReducer(reducer,initial_state) 

	context = useContext(BoxContext)

	if props.label
		label = h 'div',
			className: 'ed-in-label'
			props.label


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
				

		else
			throw new Error 'invalid input type'
	
	h 'div',
		className: 'ed-in-wrap'
		label
		h 'div',
			className: 'ed-input-wrap'
			input


	

export default In