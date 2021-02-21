# editor-gui.js

> `npm install editor-gui`

`editor-gui` is a simple react libray for quickly creating menus and editor panels

### [View Examples & Documentation](http://lerp-io.github.io/editor-gui)

---
**editor-gui** is a react javascript framework built to easily create overlay menus and dynamic input fields for editor type guis. It was inspired by other similar libraries such as *imgui* for c++, *datgui* for javascript, or *ofxDatgui* for openframeworks.

Use this library to help you build editor panels for **html5** canvas or **webgl** projects. Menus, Boxes, and Inputs are easy to create and will work well in any position of the screen.


---
Simply import the library and use the components
```jsx
import {Layout,Anchor,In,Box} from 'editor-gui' 

render => {
	{is_visible,toggleVisible} = useState(no)
	{position,setPosition} = useState([200,200])
	{val,setVal} = useState(0)

	onBarClick = function(){
		toggleVisible(!is_visible)
	}

	<Layout fontFamily="my-custom-font-family" fontSize="16">
		<Anchor position={position} visibe={is_visible} onBarClick={onBarClick} >
			<Box title="settings" stickyTitle={true}>
				<In type="range" min={-10} max={10} value={val} set={setVal}>

				</In>
			</Box>
		</Anchor>
	</Layout>
}
```

----
Personally, I like to use coffeescript for smaller projects, it also works well with react because it's cleaner and easier to read and write than xml, you can set it up using webpack.

```coffeescript
import {Layout,Anchor,In,Box} from 'editor-gui' 
import {renderComponent as h} from 'react'

render = ->
	{is_visible,toggleVisible} = useState(no)
	{position,setPosition} = useState([200,200])
	{val,setVal} = useState(0)
	h Layout,
		fontFamily: 'my-custom-font-family'
		fontSize: 16
		h Anchor,
			position: position #position in pixels
			visible: is_visible
			onBarClick: ->
				toggleVisible(!is_visible)
			h Box,
				title: 'settings'
				stickyTitle:true
				h In,
					type: 'range'
					min: -10
					max: 10
					value: val
					set: setVal

```
----


This library is designed to be used as a viewport overlay, hence all menus in are inherently `position:fixed` to the viewport. This means that you can't nest it inside a scrolling container or relative to other components in the DOM Tree. All of the examples are rendered inside an iframe container.


### Components List:

- [Layout](https://github.com/lerp-io/editor-gui/blob/master/components/Layout.md)
- [Anchor](https://github.com/lerp-io/editor-gui/blob/master/components/Anchor.md)
- [Box](https://github.com/lerp-io/editor-gui/blob/master/components/Box.md)
- [In](https://github.com/lerp-io/editor-gui/blob/master/components/In.md)