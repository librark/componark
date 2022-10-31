INPUT
-----

The ``ark-input`` element supports all the types of the default 
`w3schools: <https://www.w3schools.com/html/html_form_input_types.asp>`_
``input`` web component.
    

Examples
--------

**Default input with label:**

```html    
    <ark-input label="Label"></ark-input>
```

**Inputs with inline and header labels:**

```html 
    <ark-input label="Inline Label" inline></ark-input>
    <ark-input label="Header Label"></ark-input> 
```

**Inputs using type attribute:**

```html
    <ark-input type="file"></ark-input>
    <ark-input type="email"></ark-input>
    <ark-input type="password"></ark-input>
```


Attributes
----------

| Name  |  Type  | Default |        Description         |
| :---: | :----: | :-----: | :------------------------: |
| type  | string |  text   |       Type of input        |
| label | string |  null   | Input´s accompanying label |


Properties
----------

| Name  |  Type  | Default |         Description         |
| :---: | :----: | :-----: | :-------------------------: |
| label | string |  null   | Input's accompanying label. |


Events
------

|   Name   |       Description       |
| :------: | :---------------------: |
| on-alter | Capture the input value |
