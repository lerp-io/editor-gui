
import 'normalize.css'
import './main.less'

import {createElement,useState,useEffect,useRef,useReducer} from 'react'
import {render} from 'react-dom'
import {Layout,In,Box,Row,Menu,Section,SectionLabel,Style,Separator} from '../components'

import gfm from 'remark-gfm'

global.h = createElement
global.log = console.log.bind(console)

import Markdown from 'react-markdown'
import {NavBar,NavBarSection} from './NavBar.coffee'



Mark = (md)->
	h Markdown,
		plugins:[gfm]
		md



Example = (props)->
	h 'div',
		cn: 'example'
		h 'div',
			cn: 'example-title'
			props.title
		h 'div',
			cn: 'text example-markdown'
			Mark(props.md)



Component = (props)->
	h 'div',
		cn: 'component'
		h 'div',
			cn: 'component-name'
			'<'+props.name+'>'
		h 'div',
			cn: 'text component-markdown'
			Mark(props.md)
			# props.name
			# 'component'



###
---------------------------------------------------------------
---------------------------------------------------------------
---------------------------------------------------------------
###



# COMPONENTS
import BoxMD from '../components/Box.md'
import InMD from '../components/In.md'
import LayoutMD from '../components/Layout.md'
import MenuMD from '../components/Menu.md'
import RowMD from '../components/Row.md'
import SectionMD from '../components/Section.md'
import SeparatorMD from '../components/Separator.md'

import About from '../About.md'

COMPONENTS =
	Box: 
		md: BoxMD
	In: 
		md: InMD
	Layout: 
		md: LayoutMD
	Menu: 
		md: MenuMD
	Row: 
		md: RowMD
	Section: 
		md: SectionMD
	Separator: 
		md: SeparatorMD




# EXAMPLES
import TestExampleMD from '../examples/test.md'
import TestExample from '../examples/test.coffee'
import TestExampleCoffee from '!raw-loader!../examples/test.coffee'
import TestExampleTS from '!raw-loader!../examples/test.ts'


EXAMPLES =
	"Testing":
		component: TestExample
		coffee_source: TestExampleCoffee
		ts_source: TestExampleTS
		md: TestExampleMD



###
---------------------------------------------------------------
---------------------------------------------------------------
---------------------------------------------------------------
###
# import Demo from './demo'

main = ->
	[nav_select,selectNav] = useState(null)
	header = h 'div',
		cn: 'banner'
		'editor-gui'
		h 'span',
			cn: 'banner-text-c'
			'.js'
		# h Demo


	render_examples = []
	for title,snip of EXAMPLES
		render_examples.push h NavBarSection,
			nav_key: title
			key: title
			h Example,
				title: title
				coffee_source: snip.coffee_source
				ts_source: snip.ts_source
				component: snip.component
				md: snip.md


	render_components = []
	for name,comp of COMPONENTS
		# log name
		render_components.push h NavBarSection,
			nav_key: name 
			dot_color: 'green'
			key: name
			h Component,
				name: name
				md: comp.md
	
	# log render_components
	# render_components.unshift h 'div',
	# 	key: 'about'
	# 	cn: 'text'
		
		


	h 'div',
		cn: 'main'
		header
		h NavBar,
			select: nav_select
			h NavBarSection,
				nav_key: 'about'
				h 'div',
					cn: 'text'
					h Markdown,{},About
			
			h NavBarSection,
				nav_key: 'examples'
				render_examples
			h NavBarSection,
				nav_key: 'components'
				render_components


render(h(main),window.main)
