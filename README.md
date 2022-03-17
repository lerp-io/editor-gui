# editor-gui.js

> `npm install editor-gui`

---
### [View Examples & Documentation](http://lerp-io.github.io/editor-gui)

---
**editor-gui** is a react javascript framework for dynamic editor type guis. It was inspired by other similar libraries such as *imgui* for c++, *dat.gui* for javascript, or *ofxDatgui* for open-frameworks.

Use this library to help you build editor panels for your **HTML5** canvas or **WEBGL** projects. Menus, Boxes, and Inputs are easy to create and will work well in any position of the screen!


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


## Components

- [Layout](https://github.com/lerp-io/editor-gui/blob/master/components/Layout.md)
- [Anchor](https://github.com/lerp-io/editor-gui/blob/master/components/Anchor.md)
- [Menu](https://github.com/lerp-io/editor-gui/blob/master/components/Menu.md)
- [Box](https://github.com/lerp-io/editor-gui/blob/master/components/Box.md)
- [In](https://github.com/lerp-io/editor-gui/blob/master/components/In.md)
- [Section](https://github.com/lerp-io/editor-gui/blob/master/components/Section.md)
- [Separator](https://github.com/lerp-io/editor-gui/blob/master/components/Separator.md)


## Support
[Buymeacoffee](https://www.buymeacoffee.com/yurysidorov)

[BTC: bc1qqft7dazwh2mvp4c5p49pakjs6apdac24ny7rs3](https://blockchair.com/bitcoin/address/bc1qqft7dazwh2mvp4c5p49pakjs6apdac24ny7rs3)

[my other stuff](https://ysid.dev)