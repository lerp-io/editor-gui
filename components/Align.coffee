MIN_HEIGHT = 10
MIN_WIDTH = 300
BAR_DIM = 12
REBAR_DIM = 4
#neveragain

guessAlign = (width,height,ctx,x,y)->
	if !ctx.align
		pre_align = initAlign(ctx,x,y,width,height)
	else
		pre_align = ctx.align
	
	switch pre_align
		when 'right-down'
			return ctx.vert && 'right-down' || 'bottom-right'
		when 'right-up'
			return ctx.vert && 'right-up' || 'top-right'
		when 'left-down'
			return ctx.vert && 'left-down' || 'bottom-left'
		when 'left-up'
			return ctx.vert && 'left-up' || 'top-left'
		when 'bottom-right'
			return ctx.vert && 'right-down' || 'bottom-right'
		when 'bottom-left'
			return ctx.vert && 'left-down' || 'bottom-left'
		when 'top-right'
			return ctx.vert && 'right-up' || 'top-right'
		when 'top-left'
			return ctx.vert && 'left-up' || 'top-left'
		else
			throw new Error 'invalid align key'	



initAlign = (ctx,x,y,width,height)->
	# log 'init align',x,width/2,ctx.view_rect.width/2
	if x + width/2 < ctx.view_rect.width/2
		if y + height/2 < ctx.view_rect.height/2
			return ctx.vert && 'right-down' || 'bottom-right'
		else
			return ctx.vert && 'right-up' || 'top-right'
	else
		if y + height/2 < ctx.view_rect.height/2
			return ctx.vert && 'left-down' || 'bottom-left'
		else
			return ctx.vert && 'left-up' || 'top-left'



checkFitAlignRight = (ctx,width,height)->
	Math.min(ctx.view_rect.right - (ctx.sel_x + width),0)

checkFitAlignLeft = (ctx,width,height)->
	Math.min((ctx.sel_x + ctx.sel_w - width) - ctx.view_rect.left,0)

checkFitAlignUp = (ctx,width,height)->
	Math.min((ctx.sel_y + ctx.dim - height) - ctx.view_rect.top,0)

checkFitAlignDown = (ctx,width,height)->
	Math.min(ctx.view_rect.bottom - (ctx.sel_y + height),0)

checkFitPositionBottom = (ctx,width,height)->
	Math.min(ctx.view_rect.bottom - (ctx.y + ctx.height + height),0)

checkFitPositionTop = (ctx,width,height)->
	Math.min((ctx.y - height) - (ctx.view_rect.top),0)

checkfitPositionLeft = (ctx,width,height)->
	Math.min((ctx.x - width) - (ctx.view_rect.left),0)
		
checkfitPositionRight = (ctx,width,height)->
	Math.min((ctx.view_rect.right) - (ctx.x + ctx.width + width),0)




fixAlign = (align_key,ctx,width,height)->
	switch align_key
		when 'right-down'
			left = checkfitPositionLeft(ctx,width,height) > checkfitPositionRight(ctx,width,height)
			up = checkFitAlignDown(ctx,width,height) < checkFitAlignUp(ctx,width,height)
			if left
				if up then return 'left-up'
				else return 'left-down'
			else
				if up then return 'right-up'
				else return 'right-down'

		when 'right-up'
			left = checkfitPositionLeft(ctx,width,height) > checkfitPositionRight(ctx,width,height)
			up = checkFitAlignDown(ctx,width,height) < checkFitAlignUp(ctx,width,height)
			if left
				if down then return 'left-down'
				else return 'left-up'
			else
				if down then return 'right-down'
				else return 'right-up'

		when 'left-down'
			right = checkfitPositionLeft(ctx,width,height) < checkfitPositionRight(ctx,width,height)
			up = checkFitAlignDown(ctx,width,height) < checkFitAlignUp(ctx,width,height)
			if right
				if up then return 'right-up'
				else return 'right-down'
			else
				if up then return 'left-up'
				else return 'left-down'

		when 'left-up'
			right = checkfitPositionLeft(ctx,width,height) < checkfitPositionRight(ctx,width,height)
			down = checkFitAlignUp(ctx,width,height) < checkFitAlignDown(ctx,width,height)
			if right
				if down then return 'right-down'
				else return 'right-up'
			else
				if down then return 'left-down'
				else return 'left-up'

		when 'bottom-right'
			top = checkFitPositionBottom(ctx,width,height) < checkFitPositionTop(ctx,width,height)
			left = checkFitAlignRight(ctx,width,height) < checkFitAlignLeft(ctx,width,height)
			if top
				if left then return 'top-left'
				else return 'top-right'
			else
				if left then return 'bottom-left'
				else return 'bottom-right'

		when 'bottom-left'
			top = checkFitPositionTop(ctx,width,height) > checkFitPositionBottom(ctx,width,height)
			right = checkFitAlignLeft(ctx,width,height) < checkFitAlignRight(ctx,width,height)
			if top
				if right then return 'top-right'
				else return 'top-left'
			else
				if right then return 'bottom-right'
				else return 'bottom-left'

		when 'top-right'
			bottom = checkFitPositionBottom(ctx,width,height) > checkFitPositionTop(ctx,width,height)
			left = checkFitAlignLeft(ctx,width,height) > checkFitAlignRight(ctx,width,height)
			if bottom
				if left then return 'bottom-left'
				else return 'bottom-right'
			else
				if left then return 'top-left'
				else return 'top-right'

		when 'top-left'
			bottom = checkFitPositionBottom(ctx,width,height) > checkFitPositionTop(ctx,width,height)
			right = checkFitAlignLeft(ctx,width,height) < checkFitAlignRight(ctx,width,height)
			if bottom
				if right then return 'bottom-right'
				else return 'bottom-left'
			else
				if right then return 'top-right'
				else return 'top-left'


clampHeight = (ctx,height)->
	if ctx.root && ctx.clamp_height
		return Math.max(Math.min(ctx.view_rect.height- BAR_DIM - REBAR_DIM,Math.min(ctx.clamp_height,height)),MIN_HEIGHT)
	else if ctx.root
		return Math.max(Math.min(ctx.view_rect.height - BAR_DIM - REBAR_DIM,height),MIN_HEIGHT)
	else
		return Math.max(Math.min(height,ctx.view_rect.height),MIN_HEIGHT)


clampWidth = (ctx,width)->
	if ctx.root && ctx.clamp_width
		return Math.max(Math.min(ctx.view_rect.width - BAR_DIM - REBAR_DIM,ctx.clamp_width),MIN_WIDTH)
	else if ctx.root
		return Math.min(ctx.view_rect.width - BAR_DIM - REBAR_DIM,MIN_WIDTH)
	else
		return Math.max(Math.min(width,ctx.view_rect.width),MIN_WIDTH)



getAlignDirections = (align_key)->
	a = align_key.split('-')
	right = a[0] == 'right'
	left = a[0] == 'left'
	down = a[1] == 'down'
	up = a[1] == 'up'
	bottom = a[0] == 'bottom'
	top = a[0] == 'top'
	return [left,right,bottom,top,up,down]

BAR_DIM = 12
REBAR_DIM = 4
DOT_DIM = 4

getPosition = (width,height,ctx,align_key)->
	x = y = 0
	switch align_key
		when 'right-down'
			x = ctx.x + ctx.width
			y = ctx.sel_y
		when 'right-up'
			x = (ctx.x + ctx.width)
			y = ctx.sel_y + ctx.dim - height
		when 'left-down'
			x = ctx.x - width
			y = ctx.sel_y
		when 'left-up'
			x = (ctx.x - width)
			y = ctx.sel_y + ctx.dim - height
		when 'bottom-right'
			x = ctx.sel_x
			y = ctx.y+ctx.height
		when 'bottom-left'
			x = (ctx.sel_x + ctx.sel_w) - width
			y = ctx.y+ctx.height
		when 'top-right'
			x = ctx.sel_x
			y = ctx.y-height
		when 'top-left'
			x = (ctx.sel_x + ctx.sel_w) - width
			y = ctx.y-height
		else
			throw new Error 'invalid align key'
	
	return [x,y]



clampPosition = (ctx,x,y,width,height,align_key)->
	offset_x = 0
	offset_y = 0
	
	add_offset_x = 0
	add_offset_y = 0

	if x + width > ctx.view_rect.right 
		offset_x = ctx.view_rect.right - (x + width)
	else if x < ctx.view_rect.left
		offset_x = ctx.view_rect.left - x
	
	if y + height > ctx.view_rect.bottom
		offset_y = ctx.view_rect.bottom - (y + height)
	else if y < ctx.view_rect.top
		offset_y = ctx.view_rect.top - y

	if offset_y && !offset_x
		if align_key == 'top-left' || align_key == 'bottom-left'
			add_offset_x = -ctx.dim/2
		else if align_key == 'top-right' || align_key == 'bottom-right'
			add_offset_x = ctx.dim/2

	
	if offset_x && !offset_y
		if align_key == 'right-down' || align_key == 'left-down'
			add_offset_y = -ctx.dim/2
		else if align_key == 'right-up' || align_key == 'left-up'
			add_offset_y = ctx.dim/2

	offset_x += add_offset_x
	offset_y += add_offset_y

	return [offset_x,offset_y]


export {clampPosition,getPosition,fixAlign,guessAlign,clampHeight,clampWidth}