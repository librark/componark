SELECT
======

The ``ark-select`` element is an implementation of an
`HTML select element <https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select>`_ 
thus includes all the ``select`` attributes.

Examples
--------

**Normal use**

``` html
    <ark-select label="my select">
        <option value="op1">Option 1</option>
        <option value="op2">Option 2</option>
        <option value="op3">Option 3</option>
        <option value="op4">Option 4</option>
    </ark-select>
```

**Disabled attribute**
    
``` html
    <ark-select label="Disabled" disabled>
        <option value="op1">Option 1</option>
    </ark-select>
```

Attributes
----------

| Name  |  Type  | Default |        Description        |
|:-----:|:------:|:-------:|:-------------------------:|
| label | string | null    | Select accompanying label |

Properties
----------

| Name  |  Type  | Default |        Description        |
|:-----:|:------:|:-------:|:-------------------------:|
| label | string | null    | Select accompanying label |
