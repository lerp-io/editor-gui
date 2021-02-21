The recursive Menu component contains and object of items instead of children which are rendered as labels and can be clicked to render boxes, open submenus, or trigger actions.


### Menu Props
| name | required? | type | description  |
|---|---|---|---|
| position | | number[x,y] | position is required for top level menu if its not nested inside an `Anchor` component. |
| vert  |  | boolean  | if true, menu vertical, if false then horizontal |
| style | | {} | pass optional style properties to the menu.
| select | | string | the item_key passed from onSelect callback
| onSelect | | callback(item_key) | callback called with selected item key or undefined when deselected.
| align | | string | internal align override (refer to source code)
| items  | ✅ | {} | object with items **(view item object props below)** and their keys to be rendered in the menu.   |


### Menu Items
items can be 

| name | required? | type | description  |
|---|---|---|---|
| label | | the menu item label.
| onClick / onSelect | | callback triggered when a menu item is selected
| render | | render function to render when when item is selected

```coffeescript
h Menu,
	select: 'item-1'
	onSelect: (item_label)-> # string such as 'item-1' or 'item-2' 
		# 'item-1' will be rendered when selected.
		# 'item-2' onClick callback will be called when item is selected. 
	items:
		'item-1': ()-> #pass function to render a nested menu or box
			h Menu,
				...
		'item-2': #pass object for onClick handler
			onClick: ()->
				...

```