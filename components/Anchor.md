The `Anchor` component is a window manager for menus and boxes. It wraps around boxes and menus is used to resize, hide, and snap boxes to the edge of the screen. Anchors can be moved around by dragging the thick bar. Anchors can also be resized in all 4 directions by hovering over 3 different sections of the narrow bar.

You can also set custom colors and dots to help you quickly visually identify which anchors are used for what.

---
### anchor props
| name | required? | type | description  |
|---|---|---|---|
| **position**  | ✅ | array[number]  | [x,y] position array |
| size  |  | array[number]  | [width,height] size of box, if not set will be set to the default box size and resize bar will be hidden. |
| setPosition |  | callback(x,y)  | callback function which accepts x,y as parameters to reposition the anchor when dragging the drag bar. |
| setSize |  | callback(x,y)  | callback function which accepts x,y as parameters to reposition the anchor when resizing the resize bar. |
| onBarClick | | callback() | callback function which is called when the drag bar is clicked, can be used to toggle `visible` prop. |
| **visible**  | ✅ | boolean  | when set to false, only the drag bar is visible. |
| **barColor**  | ✅ | string  | css color string for the color of the drag bar. |
| dotCount | | number | amount of dots in the drag bar, these can be used as visual guides or alerts. |
| dotColor | | string | css color string for the dot colors. |
| **autoHandleThreshold**  | ✅ | number  | when to change the handle position when approaching corner of viewport. default is 20px |
| **autoSnapHandlePosition**  | ✅ | number  | enable snapping to edge when position is past `autoHandleThreshold` |
| **handlePosition**  | ✅ | string["bottom/top/right/left"]  | will force bar to be in specific position when `autoHandleThreshold` is disabled  |

---



In larger production environments, I like to wrap the anchor component into an AutoAnchor component which automatically saves and sets initial positions without the need to setup state variables and callbacks for each Anchor every time, which can quickly get very tedious and confusing.

something like this...
```coffeescript

import {Layout,In,Menu,Anchor,Box,Section,Separator} from 'editor-gui'



setAnchorPosition = (id,x,y)->
	#use anchor id to save data in persistent state object
setAnchorSize = (id,x,y)->
	#use anchor id to save data in persistent state object
toggleAnchorVisible = (id)->
	#use anchor id to save data in persistent state object

getAnchorSize = (id,dx,dy)->
	#use anchor id to save data in persistent state object
getAnchorVisible = (id)->
	#get anchor data by id
getAnchorPosition = (id,dx,dy)->
	#get anchor data by id


export AutoAnchor = (props)->
	h Anchor,
		barColor: props.barColor
		dotColor: props.dotColor
		dotCount: props.dotCount
		position: getAnchorPosition(props.id,props.x||40,props.y||40)
		size: getAnchorSize(props.id,props.width||200,props.height||200)
		autoAlign: yes
		visible: getAnchorVisible(props.id)
		autoHandlePosition: yes
		autoSnapHandlePosition: yes
		onBarClick: ->
			toggleAnchorVisible(props.id)
		setPosition: (x,y)->
			setAnchorPosition(props.id,x,y)
		setSize: (x,y)->
			setAnchorSize(props.id,x,y)
		props.children


## then you can simply do something like...
import {AutoAnchor} from './AutoAnchor'
h Layout,
	...
	h AutoAnchor,
		id: "id-1"
		width: 200 #default width
		height: 200 #default height
		x: 0 #default x position
		y: 0 #default y position
		h Box,
			....
	h AutoAnchor,
		id: "id-2"
		h Box,
			....



```