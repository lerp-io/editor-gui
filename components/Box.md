The `Box` component acts as a container for a collection of input components such as inputs, sections, separators, charts, or other optional or custom elements.

### Box Props
| name | required? | type | description  |
|---|---|---|---|
| title | | string | box title.
| stickyTitle | | boolean | sticky title. | 
| description | | string | description or text at top of box, can also just add text by using In with type='plain'
| position  |  | [x,y] | override box position |
| align | | string | internal align key manual override (refer to source code) | 

```coffeescript
h Box,
	title:'my awsome box'
	position: [0,0] #dont need to set this if nested inside menu or anchor, but can manually override the automatically calculated position
	h In,
		type: 'plain'
		'some plain text or custom component'
	h In,
		...
	h In,
		...

```