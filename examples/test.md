### anchors, menus, and boxes
This library is designed to be used as a viewport overlay, hence all menus in are inherently `position:fixed` to the viewport. This means that you can't nest it inside a scrolling container or relative to other components in the DOM Tree. All of the examples below are rendered inside an iframe container.

You start off by creating a root **Layout** component from which you will set your desired font and any other context properties, the child of the layout component can be movable anchors or menus with preset positions.

---

The following example is a layout component with 2 Menus. Drag the anchor handles to move the menus around to see the effects.

If you drag the menu anchor while the menu is opened, you will notice how the submenus and boxes dynamically change their position and alignment, overflowing and clamping to the viewport boundries when needed. Positions are intelligently computed each render to provide optimal visibility without extra configurations, but can each be fine tuned as well with different alignment options which we will go over in the next example.