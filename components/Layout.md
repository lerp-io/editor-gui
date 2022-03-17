The layout component is the main wrapper component which holds the context for child menus. Its used internaly for anchoring, positioning, and calculating dimensions. Both font size and font family are required because the label widths and menu positions are dynamically calculated before the render happens.

### Layout Props
| name | required? | type | description  |
|---|---|---|---|
| fontFamily  | ✅ | string  | which font to use |
| fontSize  | ✅ | number  | font size in pixels |
