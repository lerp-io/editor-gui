### A simple react libray for quickly creating menus and editor panels


> `npm install editor-gui`


**editor-gui.js** helps you create menus and panels quickly using **react**. This library was inspired by other libraries like *imgui* and *datgui*. Although far from being as robust as *imgui*, it gets the job done for more simple browser based projects. Menus are easy to create and will work well in any position of the screen.

This library is designed to be used as a viewport overlay, hence all menus in are inherently `position:fixed` to the viewport. This means that you can't nest it inside a scrolling container or relative to other components in the DOM Tree. All of the examples below are rendered inside an iframe container.



You start off by creating a root **Layout** component from which you will set your desired font and any other context properties, the child of the layout component can be movable anchors or menus with preset positions.