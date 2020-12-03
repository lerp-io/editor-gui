
### Component Props

Instead of splitting up the input into different components of each type, there is one global component which controls all types of input, some properties are applicable to some input types and will not affect others unless the input type changes.

| name | required? | type | description  |
|---|---|---|---|
| type  | ✅ | string  | the type of component to add, one of plain/label/text/number, view the component types below for details on each one |
| label  |   | string  | label to appear on right hand  |
| disabled  |  | boolean  | if input is disabled or not |
| value  |  | any  | value from set |
| color  |  | string  | toggle/text color |
| backgroundColor  |  | string  | component background color |
| onSelect/onClick/set  |  | function  | value setter, callback returns either value or event if button |
| step  |  | number  | stepping for type:range and type:line-chart |
| min  |  | number  | min value for range |
| max  |  | number  | max value for range |
| snapValueToEdge |  | boolean | when used with range if disabled value will stay next to cursor, else will snap to either corner |
| chart_type |  | string | type of chart (bar/line) |
| xBounds |  | array[number(2)] | chart x bounds (left/right) |
| yBounds |  | array[number(2)] | chart y bounds (top/bottom) |
| commit |  | boolean | set |




#### props.value [any] (required)
The input value. Depending on type of input, this can be either number or string

#### allowed type prop values
the type of input component you want to use.
- **plain** : plain text.
- **label** : alternative name for plain, same effect.
- **text** : text input field
- **number** : number input field
- **toggle** : boolean toggle
- **range** : range slider
- **line-chart** : line chart

#### props.label [string] 
label for the input which will appear on the left side.

