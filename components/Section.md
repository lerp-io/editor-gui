### Section Props
Group and separate inputs by sections.

`In`s inside each `Box` are meant to have a somewhat flat hierarchy to promote creating more `Box` instead of having just one messy one but you can still create a `Section` and add labels to hide/show different inputs by category.


| name | required? | type | description  |
|---|---|---|---|
| visible  | ✅ | boolean | when true inputs inside section are rendered |
| onClick  |  | callback(!visible) | callback triggered to toggle visible/or not, the opposite of visible is passed as the first parameter. |