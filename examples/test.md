### anchors, menus, and boxes
This library is designed to be used as a viewport overlay, hence all menus in are inherently `position:fixed` to the viewport. This means that you can't nest it inside a scrolling container or relative to other components in the DOM Tree. All of the examples below are rendered inside an iframe container.

> npm install editor-gui

You start off by creating a root **Layout** component from which you will set your desired font and any other context properties, the child of the layout component can be movable anchors or menus with preset positions.

---

The following example is a benchmark, test, and an overview of all the current components - a layout component with 2 infinitely recursive menus and a box containing different input fields. Drag the anchor handles to move the menus around to see the effects.

If you drag the menu anchor while the menu is opened, you will notice how the submenus and boxes dynamically change their position and alignment, overflowing and clamping to the viewport boundries when needed. Positions are automatically computed each render to provide optimal visibility without extra configurations even if certain parameters are set. For example, the red menu alternates between vertical and horizontal and has a preference for aligning children to the right border. We will go over alignment options later. 
