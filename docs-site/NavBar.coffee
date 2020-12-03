import {createContext,useContext,createElement,useState,useEffect,useRef,useReducer} from 'react'
h = createElement
import './NavBar.less'


NavBarContext = createContext
	root: yes


renderNavTree = (set_key,props,offset,select,level,click)->
	tree = []
	# log 'render nav tree',set_key,tree_items
	# log props
	tree_items = props.children
	scroll_top = props.top || 0
	for key,props of tree_items
		tree.push renderNavTree(key,props,offset,select,level+1)
	
	my_select = select.indexOf(set_key) >= 0

	# log my_select

	if set_key
		return h 'div',
			key: set_key
			cn: 'navtree-section l'+level+' '+(my_select && 'select' || '')
			h 'div',
				cn:'navtree-label l'+level+' '+(my_select && 'select' || '')
				onClick: ()->
					document.body.scrollTo(0,offset+scroll_top)
				set_key

			tree
	else
		return h 'div',
			key: '__root'
			cn: 'navtree-root'
			tree


findNavKey = (tree,scrollY,select)->
	# log tree
	for key,it of tree
		# log it.top,it.bot,scrollY
		if scrollY < it.bot #&& scrollY >= it.top
			select.push key
			findNavKey(it.children,scrollY,select)
			return select
	return select


NavBar = (props)->
	
	[select,setSelect] = useState([])
	[nav_tree,setNavTree] = useState({})
	[hash,setHash] = useState(23)
	root_ref = useRef()
	state_ref = useRef
		select:[]
		nav_tree:{}
		hash: hash


	checkSelect = ->
		nav_tree = state_ref.current.nav_tree
		select = state_ref.current.select
		# rect = root_ref.current.getBoundingClientRect()
		# log window.scrollY,rect.top
		new_select = findNavKey(nav_tree,document.body.scrollTop-root_ref.current.offsetTop,[])
		# log new_select,select
		if new_select.length != select.length
			state_ref.current.select = new_select
			return setSelect(new_select)
		
		for i in [0...select.length]
			if new_select[i] != select[i]
				state_ref.current.select = new_select
				return setSelect(new_select)
		
		return


	useEffect ()->
		# log 'use effect',my_nav_tree
		# log  state_ref.current.hash
		if state_ref.current.hash != hash
			checkSelect()
			setHash(state_ref.current.hash)
			setNavTree(state_ref.current.nav_tree)


	useEffect ()->
		# console.log('SET NAV TREE',self_context.nav_tree)
		window.addEventListener 'scroll',checkSelect
		return ()->
			window.removeEventListener 'scroll',checkSelect
	,[]

	rendered_nav_tree = renderNavTree(null,{children:nav_tree},root_ref.current?.offsetTop||0,state_ref.current.select,0)


	h NavBarContext.Provider,
		value: 
			setNav: (link_name,top,bot,link_children,hash)->
				state_ref.current.nav_tree[link_name] = {top:top,bot:bot,children:link_children}
				state_ref.current.hash *= hash
		h 'div',
			cn: 'nav-context'
			ref: root_ref
			rendered_nav_tree
			h 'div',
				cn: 'nav-content-root'
				props.children



NavBarSection = (props)->
	context = useContext(NavBarContext)
	ref = useRef()
	self_context = 
		setNav: (link_name,top,bot,nav_children,hash)->
			self_context.hash *= hash
			self_context.nav_children[link_name] = {top:top,bot:bot,children:nav_children}
			return
		nav_children: {}
		hash: 23

	useEffect ()->
		self_context.hash *= (ref.current.offsetTop+ref.current.clientHeight)*31
		context.setNav(props.nav_key,ref.current.offsetTop,ref.current.offsetTop+ref.current.clientHeight,self_context.nav_children,self_context.hash)
		return
	,[]

	h NavBarContext.Provider,
		value: self_context
		h 'div',
			cn: 'nav-content'
			ref: ref
			props.children



export {NavBarSection}
export {NavBar}