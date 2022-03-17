import {useState,useEffect} from 'react'
import {Layout,In,Box,Style,Anchor,Section} from '../components'
import {h as renderComponent} from 'react'

dat = [0...100].map (i)->
	a: Math.sin(i*.3)
	b: Math.cos(i*.3)*.5



export default anchor = ()->
	[y_range_min,yRangeMin] = useState(-2)
	[y_range_max,yRangeMax] = useState(2)
	[tick,updateTick] = useState(0)
	[realtime,setRealtime] = useState(false)
	[bar,barChart] = useState(false)
	[chart_step,setChartStep] = useState(4)
	[x_range,setXRange] = useState(40)
	[color_a,setColorA] = useState('magenta')
	[color_b,setColorB] = useState('cyan')

	# log tick
	
	useEffect ()->
		if !realtime
			return
		setTimeout ()->
			# log 'update tick'
			dat.push
				a: Math.sin(tick*.3)
				b: Math.cos(tick*.3)*.5
			if dat.length > 200
				dat.splice(0,100)
			# log dat.length
			updateTick(tick+1)
		,100

	,[tick,realtime]

	h Layout,
		waitForFontLoad: yes
		fontSize: 14
		fontFamily: FONT_FAMILY
		h Box,
			position: [0,50]
			title: 'chart options'
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
			h In,
				type: 'toggle'
				label: 'emulate realtime'
				value: realtime
				set: setRealtime
			h In,
				type: 'toggle'
				label: 'render as bars'
				value: bar
				set: barChart
			h In,
				type: 'range',
				label: 'step'
				min: 1
				max: 10
				step:1
				value: chart_step
				set: setChartStep
			h In,
				type: 'range',
				label: 'xRange'
				min: 10
				max: 60
				step:1
				value: x_range
				set: setXRange
			h In,
				type: 'color'
				label: 'color A'
				value: color_a
				set: setColorA
			h In,
				type: 'color'
				label: 'color B'
				value: color_b
				set: setColorB

		
		h Box,
			position: [400,120]
			title: 'test'
			h In,
				tick_step: tick
				type: bar && 'bar-chart' || 'line-chart'
				xBounds: [0,dat.length-1] #min and max data bounds for getY
				xRange: x_range
				yRange: [y_range_min,y_range_max]
				step: chart_step
				colors: [color_a,color_b]
				getY: [
					(x)->
						dat[x]?.a || 0
						
					(x)->
						dat[x]?.b || 0
						
				]