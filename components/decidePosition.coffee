
decidePosition = ({style,context,menu_ref,position,left,right,top,bottom})->
	
	if context.root
		if position
			style.transform = "translate(#{position[0]},#{position[1]})"
			return

		if left
			style.left = '0px'
		else if right
			style.right = '0px'
		else
			style.left = '50%'
			style.transform = 'translate(-50%,0%)'
		
		if top
			style.top = '0px'
		else if bottom
			style.bottom = '0px'
		else
			style.top = '50%'
			if style.transform
				style.transform = 'translate(-50%,-50%)'
			else
				style.transform = 'translate(0%,-50%)'
		return true



	parent_is_vertical_list = context.vert
	appear_on_either_right_or_left = context.vert
	appear_on_either_top_or_bottom = !context.vert

	
	if left
		default_to_left = true
		default_to_right = false
	else
		default_to_left = false
		default_to_right = true
	
	if top
		default_to_top = true
		default_to_bottom = false
	else
		default_to_top = false
		default_to_bottom = true

	if appear_on_either_right_or_left
		if default_to_left
			style.right = '100%'
			style.left = undefined
		else
			style.right = undefined
			style.left = '100%'
		
		if default_to_top
			style.top = undefined
			style.bottom = '0%'
		else
			style.top = '0%'
			style.bottom = undefined
			
	
	else
		if default_to_left
			style.right = '0%'
			style.left = undefined
		else
			style.right = undefined
			style.left = '0%'
		
		if default_to_top
			style.top = undefined
			style.bottom = '100%'
		else
			style.top = '100%'
			style.bottom = undefined
			

	if menu_ref.current
		rect = menu_ref.current.getBoundingClientRect()
		parent_rect = menu_ref.current.parentNode.getBoundingClientRect()
		
		if appear_on_either_right_or_left
			if default_to_left
				r_left = parent_rect.left - rect.width
				if r_left < context.left
					style.right = undefined
					style.left = '100%'
			else
				r_right = parent_rect.right + rect.width
				if r_right > context.right
					style.right = '100%'
					style.left = undefined
			
			if default_to_top
				r_top = parent_rect.bottom - rect.height
				if r_top < context.top
					style.bottom = undefined
					style.top = '0%'
			else
				r_bottom = parent_rect.top + rect.height
				if r_bottom > context.bottom
					style.bottom = '0%'
					style.top = undefined
		else
			if default_to_left
				r_left = parent_rect.right - rect.width
				if r_left < context.left
					style.right = undefined
					style.left = '0%'
			else
				r_right = parent_rect.left + rect.width
				if r_right > context.right
					style.right = '0%'
					style.left = undefined
			
			if default_to_top
				r_top = parent_rect.top - rect.height
				if r_top < context.top
					style.top = '100%'
					style.bottom = undefined
			else
				r_bottom = parent_rect.bottom + rect.height
				if r_bottom > context.bottom
					style.bottom = '100%'
					style.top = undefined

		if appear_on_either_right_or_left
			# log 'APPEAR ON RIGHT OR LEFT',style.top
			if style.top
				clamp_offset = (rect.height + parent_rect.top) - context.bottom
				if clamp_offset > 0
					style.top = "calc( #{style.top} + #{clamp_offset}px )"
			else
				clamp_offset = context.top - ( parent_rect.bottom - rect.height)
				if clamp_offset > 0
					style.bottom = "calc( #{style.bottom} - #{clamp_offset}px )"

					
		


				











export default decidePosition