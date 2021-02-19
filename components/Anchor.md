The `Anchor` component is a window manager for menus and boxes. It wraps around boxes and can be used to resize, hide, and snap boxes to the edge of the screen. Anchors can be moved around by dragging the thick bar. Anchors can also be resized in all 4 directions by hovering over 3 different sections of the narrow bar.

You can also set custom colors and dots to help you quickly visually identify which anchors are used for what.

---
## Anchor Component Properties:
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