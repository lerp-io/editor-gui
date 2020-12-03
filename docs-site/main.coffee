
import 'normalize.css'
import './main.less'

import {createElement,useState,useEffect,useRef,useReducer} from 'react'
import {render} from 'react-dom'
import {Layout,In,Box,Row,Menu,Section,SectionLabel,Style,Separator} from '../components'

global.h = createElement
global.log = console.log.bind(console)



import {NavBar,NavBarSection} from './NavBar.coffee'


Snippet = (props)->
	h 'div',
		cn: 'snippet'
		'snippet'

Component = (props)->
	h 'div',
		cn: 'component'
		'component'




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




# SNIPPETS
import TestSnippetMD from '../snippets/test.md'
import TestSnippet from '../snippets/test.coffee'
import TestSnippetCoffee from '!raw-loader!../snippets/test.coffee'
import TestSnippetTS from '!raw-loader!../snippets/test.ts'


SNIPPETS =
	"Testing ": 
		component: TestSnippet
		coffee_source: TestSnippetCoffee
		ts_source: TestSnippetTS
		md: TestSnippetMD



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
		'editor-gui.js'
		# h Demo


	render_snippets = []
	for title,snip of SNIPPETS
		render_snippets.push h NavBarSection,
			nav_key: title
			key: title
			h Snippet,
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
	render_components.unshift h 'p',
		key: 'about'
		cn: 'text'
		'this is some text'


	h 'div',
		cn: 'main'
		header
		h NavBar,
			select: nav_select
			h NavBarSection,
				nav_key: 'components'
				render_components
			h NavBarSection,
				nav_key: 'snippets'
				render_snippets


render(h(main),window.main)
