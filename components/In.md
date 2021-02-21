

Instead of splitting up the input into different components of each type, there is one global component which controls all types of input, some properties are shared, and others are applicable to only certain input types and will not affect others unless the input type changes.

### In Props

| name | required? | type | description  |
|---|---|---|---|
| type  | ✅ | string  | the type of component to add, view the component types below for details on each one |
| value  |  | mixed  | value from `set` callback |
| set  |  | function  | callback with value as first argument |
| label  |   | string  | optional label to show to right side of input field  |
| step  |  | number  | stepping for type:range and type:line-chart |
| min  |  | number  | min value for range |
| max  |  | number  | max value for range |
| color  |  | string  | toggle/text color |
| backgroundColor  |  | string  | component background color |
| onSelect/onClick/set  |  | function  | value setter, callback returns either value or event if button |
| snapValueToEdge |  | boolean | when used with range if disabled value will stay next to cursor, else will snap to either corner |
| xBounds |  | array[number(2)] | line/bar chart x bounds (left/right) |
| yBounds |  | array[number(2)] | line/bar chart y bounds (top/bottom) |
| disabled  |  | boolean  | is input disabled? |


#### allowed type prop values
the type of input component you want to use.
- **plain** : plain text or nested custom component.
- **label** : alternative name for plain, same effect.
- **text** : text input field
- **number** : number input field
- **toggle** : boolean toggle
- **range** : range slider
- **line-chart** : bar chart
- **bar-chart** : line chart, same code as bar chart except renders as lines.

Rendering charts is easy
```coffeescript

	h In,
		type: 'line-chart'
		xBounds: [-100,100] #chart viewport bounds in x direction
		xRange: 10 #
		yRange: [-2,2]
		step: 1
		colors: ['magenta','cyan']
		getY: [
			(x)->
				Math.sin(x)
			(x)->
				Math.cos(x)
		]
```

#### props.label [string] 
label for the input which will appear on the left side.

