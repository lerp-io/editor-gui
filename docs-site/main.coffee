
import 'normalize.css'
import './main.less'

import {createElement,useState,useEffect,useRef,useReducer} from 'react'
import {createRoot} from 'react-dom/client'
import {Layout,In,Box,Menu,Section,SectionLabel,Style,Separator} from '../components'

global.root = createRoot(window.main)
# import gfm from 'remark-gfm'

global.h = createElement
global.log = console.log.bind(console)
global.FONT_FAMILY = 'Azeret Mono'

import {NavBar,NavBarSection} from './NavBar.coffee'

import {MDXProvider} from '@mdx-js/react'
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript'
import coffeescript from 'highlight.js/lib/languages/coffeescript'
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('coffeescript', coffeescript)
# import 'highlight.js/styles/stackoverflow-dark.css'
import 'highlight.js/styles/monokai-sublime.css'



Mark = (md)->
	h MDXProvider,{},h md



renderSourceCodeView = (props)->
	pre_ref = useRef()
	[code_type,setCodeType] = useState(undefined)
	[show_code,toggleShowCode] = useState(false)
	
	useEffect ()->
		if pre_ref.current && code_type
			hljs.highlightBlock(pre_ref.current)
		root.render(h(main))
		return
	,[pre_ref.current,code_type]
	
	if code_type == 'js'
		code_text = props.js
		code_lang = 'javascript'
	else if code_type == 'coffee'
		code_text = props.coffee
		code_lang = 'coffeescript'

	if code_type
		code = h 'div',
			cn: 'scroll'
			h 'pre',
				cn: 'code language-'+code_lang
				ref: pre_ref
				code_text

	h 'div',
		cn: 'example-code'
		
		h 'div',
			cn: 'lang-select-box'
			h 'button',
				cn: 'lang-select-button '+(code_type == 'js' && 'select' ||'')
				onClick: setCodeType.bind(null,if code_type == 'js' then undefined else 'js')
				'.js'
			h 'button',
				cn: 'lang-select-button '+(code_type == 'coffee' && 'select'||'')
				onClick: setCodeType.bind(null,if code_type == 'coffee' then undefined else 'coffee')
				'.coffee'
		code



renderExample = (component)->
	# log component
	iframe_ref = useRef({})
	useEffect ()->
		if iframe_ref.current
			doc = iframe_ref.current.contentDocument
			doc.head.innerHTML = document.head.innerHTML
			doc.body.innerHTML = '<div id="example"></div>'
			example_root = createRoot(doc.getElementById('example'))
			example_root.render(h(component))
		return
	,[]
	h 'iframe',
		cn: 'example-render'
		ref: iframe_ref



Example = (props)->
	h 'div',
		cn: 'example'
		h 'div',
			cn: 'example-title'
			props.title
		renderExample(props.component)
		renderSourceCodeView
			js: props.js_source
			coffee: props.coffee_source
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
import SectionMD from '../components/Section.md'
import SeparatorMD from '../components/Separator.md'
import AnchorMD from '../components/Anchor.md'
import About from './README.md'



COMPONENTS =
	Layout:
		md: LayoutMD
	Anchor:
		md: AnchorMD
	Menu:
		md: MenuMD
	Box:
		md: BoxMD
	In:
		md: InMD
	Section:
		md: SectionMD
	Separator:
		md: SeparatorMD



# EXAMPLES
import TestExampleMD from '../examples/test.md'
import TestExample from '../examples/test.coffee'
import TestExampleCoffee from '!raw-loader!../examples/test.coffee'
import TestExampleJS from '!raw-loader!../examples/test.js'

import AnchorExampleMD from '../examples/anchor.md'
import AnchorExample from '../examples/anchor.coffee'
import AnchorExampleCoffee from '!raw-loader!../examples/anchor.coffee'
import AnchorExampleJS from '!raw-loader!../examples/anchor.js'

import ChartExampleMD from '../examples/chart.md'
import ChartExample from '../examples/chart.coffee'
import ChartExampleCoffee from '!raw-loader!../examples/chart.coffee'
import ChartExampleJS from '!raw-loader!../examples/chart.js'



EXAMPLES =
	'Basic Anchor':
		component: AnchorExample
		coffee_source: AnchorExampleCoffee
		js_source: AnchorExampleJS
		md: AnchorExampleMD
	'Simple Line and Bar Charts':
		component: ChartExample
		coffee_source: ChartExampleCoffee
		js_source: ChartExampleJS
		md: ChartExampleMD



###
---------------------------------------------------------------
---------------------------------------------------------------
---------------------------------------------------------------
###
# import Demo from './demo'

import i_github from './github.svg'
import i_help from './help-circle.svg'

demo_example =
	component: TestExample
	coffee_source: TestExampleCoffee
	js_source: TestExampleJS
	md: TestExampleMD


main = ->
	[nav_select,selectNav] = useState(null)
	header = h 'div',
		cn: 'banner'
		'<editor-gui>'
		h 'span',
			cn: 'banner-text-c'
			'.js'
		h 'div',
			cn: 'header-icons'
			h 'a',
				cn: 'icon'
				href: 'https://github.com/lerp-io/editor-gui'
				h i_github
			h 'a',
				cn: 'icon'
				href: 'https://ysid.dev/'
				h i_help,
					style:
						stroke: 'grey'


	render_examples = []
	for title,snip of EXAMPLES
		render_examples.push h NavBarSection,
			nav_key: title
			key: title
			
			h Example,
				title: title
				coffee_source: snip.coffee_source
				js_source: snip.js_source
				component: snip.component
				md: snip.md


	render_components = []
	for name,comp of COMPONENTS
		# log name
		render_components.push h NavBarSection,
			nav_key: name 
			className: 'yellow'
			key: name
			h Component,
				name: name
				md: comp.md

	
	useEffect ()->
		document.querySelectorAll('pre code').forEach (block)->
			hljs.highlightBlock(block)
	,[]


	h 'div',
		cn: 'main'
		header
		renderExample(demo_example.component)
		h NavBar,
			select: nav_select
			h NavBarSection,
				nav_key: 'about'
				h 'div',
					cn: 'text'
					h MDXProvider,{},h About
			h NavBarSection,
				nav_key: 'examples'
				render_examples
			h NavBarSection,
				nav_key: 'components'
				render_components


root.render(h(main))
