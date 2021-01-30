The Menu component contains object of items instead of children which are rendered as labels and can be clicked to render boxes, open submenus, or trigger actions.


### Menu Props
| name | required? | type | description  |
|---|---|---|---|
| vert  |  | boolean  | if true, menu vertical, if false then horizontal |
| style | | {} | pass optional style properties to the menu.
| select | | boolean | 
| onSelect | | callback(item_key) | callback called with selected item key or undefined when deselected.
| align | | boolean | align key, **view alignment options below** 
| items  | ✅ | {} | object with items **(view item object props below)** and their keys to be rendered in the menu.   |



### Menu Item Object Props
items can be 

| name | required? | type | description  |
|---|---|---|---|
| label | | the menu item label.
| onClick / onSelect | | callback triggered when a menu item is selected
| render | | render function to render when when item is selected


### Alignment Options