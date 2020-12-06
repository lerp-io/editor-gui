### anchors, menus, and boxes
This library is designed to be used as a viewport overlay, hence all menus in are inherently `position:fixed` to the viewport. This means that you can't nest it inside a scrolling container or relative to other components in the DOM Tree. All of the examples below are rendered inside an iframe container.

You start off by creating a root **Layout** component from which you will set your desired font and any other context properties, the child of the layout component can be movable anchors or menus with preset positions.

---

The following example is defined in the properties panel