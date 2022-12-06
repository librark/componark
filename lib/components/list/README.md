LIST
====

The ``ark-list`` component provides an indexed vertical
list of ``ark-list-items``.


Examples
--------

**Default list:**

**Assuming ``data`` is the following array:**

```javascript
  const data = ['Colombia', 'Uruguay', 'Brasil', 'Perú']
```

**Then, the following HTML declaration would render it by passing its content
as JSON within a ``data`` element:**

```html
   <ark-list>
     <data>${JSON.stringify(data)}</data>
   </ark-list>
```

**Template list:**

**If ``data`` were an array of objects such as:**

```javascript
  const dataTemplate = [
    { first: 'Colombia', second: 'Argentina', year: 2016 },
    { first: 'Uruguay', second: 'Colombia', year: 2017 },
    { first: 'Brasil', second: 'Argentina', year: 2018 },
    { first: 'Perú', second: 'Bolivia', year: 2019 }
  ]
```

**Then we could provide a ``template`` to render each of its items:**

```html
   <ark-list>
     <data>${JSON.stringify(data)}</data>
     <template>
        <h1>\${this.year}</h1>
        <span data-first>FIRST: \${this.first}</span>
        <span> | </span>
        <span data-second>SECOND: \${this.second}</span>
     </template>
   </ark-list>
```

**NOTE: remember to escape JavaScript string interpolation expressions
inside the template tag (i.e. use ``\%{}``).**


**Programmatic API:**

**The list receives its items as a ** ``data`` **array of objects**

**And its item structure in a** ``template`` **property**

``` javascript
    const template = item => `
    <h1>${item.year}</h1>
    <span data-first>FIRST: ${item.first}</span>
    <span> | </span>
    <span data-second>SECOND: ${item.second}</span>`_
```

**In order to render an** ``ark-list`` **of multiple lines, we assign the
items in the** ``data`` **property and its content in
the** ``template`` **property**

``` javascript
    const templateList = this.select('[data-template-list]')
    templateList.init({
        data: sourceTemplate,
        template: template
    }).render()
```

Attributes
----------

|     Component     |      Name      |  Type   | Default |              Description              |
| :---------------: | :------------: | :-----: | :-----: | :-----------------------------------: |
| ``ark-list-item`` |     index      | string  |  text   |   Indicates the ``list-item`` index   |
|   ``ark-list``    | click-disabled | boolean |  null   | Disable the click event for the items |


Properties
----------

|        Component        |   Name   |     Type     | Default |                                         Description                                          |
| :---------------------: | :------: | ------------ | ------: | :------------------------------------------------------------------------------------------: |
|    ``ark-list-item``    |  index   | string       |    text |                              Indicates the ``list-item`` index                               |
| ``ark-list`` (default)  |  source  | list         |    null |                   A list of strings that represents each item in the list                    |
| ``ark-list`` (template) |  source  | list         |    null |                An list of objects that represents data reflected in each item                |
|    ``ark-list-item``    |   data   | list, object |    null |                 Displays the data defined in the source for a specific item                  |
|    ``ark-list-item``    | template | string       |    null | Receives and displays a html in a template literal, the data should render in a ``span`` tag |
