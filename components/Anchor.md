The layout component is the main wrapper component which holds the context for child menus. Its used internaly for anchoring, positioning, and calculating dimensions. Both font size and font family are required because the label widths and menu positions are dynamically calculated before the render happens.

### Anchor Props
| name | required? | type | description  |
|---|---|---|---|
| position  | ✅ | array[number]  | [x,y] position array |
| autoHandleThreshold  | ✅ | number  | when to change the handle position when approaching corner of viewport. default is 20px |
| autoSnapHandlePosition  | ✅ | number  | enable snapping to edge when position is past `autoHandleThreshold` |
| autoSnapHandlePosition  | ✅ | number  | enable snapping to edge when position is past `autoHandleThreshold` |
| visible  | ✅ | boolean  | when set to false, only the drag bar is visible. |
| barColor  | ✅ | string  | css color string for the color of the drag bar. |
| size  |  | array[number]  | [width,height] size of box, if not set will be set to the default box size and resize bar will be hidden. |
| setPosition |  | callback(x,y)  | callback function which accepts x,y as parameters to reposition the anchor when dragging the drag bar. |
| setSize |  | callback(x,y)  | callback function which accepts x,y as parameters to reposition the anchor when resizing the resize bar. |
| onBarClick | | callback() | callback function which is called when the drag bar is clicked, can be used to toggle `visible` prop. |
| dotCount | | number | amount of dots in the drag bar, these can be used as visual guides or alerts. |
| dotColor | | string | css color string for the dot colors. |