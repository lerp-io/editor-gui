import {useState,useEffect} from 'react'
import {Layout,In,Box,Style,Anchor,Section} from '../components'
import {h as renderComponent} from 'react'

export default anchor = ()->
	[x_bounds_max,xBoundsMax] = useState(100)
	[x_bounds_min,xBoundsMin] = useState(-100)
	[y_range_min,yRangeMin] = useState(-2)
	[y_range_max,yRangeMax] = useState(2)
	[tick,updateTick] = useState(0)
	# log tick
	
	useEffect ()->
		setTimeout ()->
			# log 'update tick'
			updateTick(tick+1)
		,33

	,[tick]

	h Layout,
		waitForFontLoad: yes
		fontSize: 14
		fontFamily: 'Inconsolata'
		h Box,
			position: [200,0]
			title: 'chart options'
			h In,
				type: 'range'
				value: x_bounds_min
				set: xBoundsMin
				label: 'xBounds min'
				min: -200
				max: 50
			h In,
				type: 'range'
				value: x_bounds_max
				set: xBoundsMax
				label: 'xBounds max'
				max: 200
				min: 60
			h In,
				type: 'range'
				value: y_range_min
				set: yRangeMin
				label: 'yRange min'
				max: -0.1
				min: -10
			h In,
				type: 'range'
				value: y_range_max
				set: yRangeMax
				label: 'yRange max'
				max: 10
				min: 0.1
		
		h Box,
			position: [200,200]
			title: 'test'
			h In,
				tick_step: tick
				type: 'line-chart'
				xBounds: [x_bounds_min,x_bounds_max] #chart viewport bounds in x direction
				xRange: 20 #
				yRange: [y_range_min,y_range_max]
				step: 0.5
				colors: ['magenta','cyan']
				getY: [
					(x)->
						Math.sin(x+tick*.1)
					(x)->
						Math.cos(x+Math.sin(x*2+tick*.1))
				]