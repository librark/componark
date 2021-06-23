MULTISELECT
***********


The ``ark-multiselect`` allows the user to select multiple items from a list, the items are grouped in 
the multiselect field and the list can be filtered from an input text.
Each item can be removed one by one and at the same time.

Examples
========

    **Simple list multiselect**
    
    .. code-block:: html

        <ark-multiselect 
            list label='multiselect list' 
            listen on-alter="alterMultiselect">
        </ark-multiselect>

    **List receive a list of items, and renders passing it in the item variable of init context**
    
    .. code:: javascript

        renderMultiselect () {
            const myItems = [
            '01 display',
            '02 max-width',
            '03 max-height',
            '04 width',
            '05 height'
            ]

            const multiselect = this.select('ark-multiselect[list]')
            
            multiselect.init({
            label: "multiselect test",
            items: myItems
            }).render().load()
        }

    **Object List**

    .. code:: html

        <ark-multiselect 
            list-object 
            label='multiselect object'
            listen on-alter="alterMultiselectObject">
        </ark-multiselect>


    **Filling a list from an API is also possible with an async function, use template for display the items**

    .. code:: javascript

        async renderMultiselectObject () {

        const myItems = await fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then((json) => json)

        const field = "id"
        const template = (item) => `${item['id']} - ${item['name']}`
        
        const multiselect =(
        this.select('ark-multiselect[list-object]')
        )

        multiselect.init({
            template: template,
            field: field,
            items: myItems
        }).render().load()

        }


Attributes
----------

+-------+--------+---------+------------------------------------------------+
| Name  |  Type  | Default |                  Description                   |
+=======+========+=========+================================================+
| label | string | null    | Creates a label text on top of the multiselect |
+-------+--------+---------+------------------------------------------------+

Properties
----------

+----------+-------------+---------+-------------------------------------------------------------------------------------------------+
|   Name   |    Type     | Default |                                           Description                                           |
+==========+=============+=========+=================================================================================================+
| label    | string      | null    | Creates a label text on top of the multiselect                                                  |
+----------+-------------+---------+-------------------------------------------------------------------------------------------------+
| items    | array, json | null    | Can receive an array of items or a complex list from a json file using an async function        |
+----------+-------------+---------+-------------------------------------------------------------------------------------------------+
| field    | string      | null    | Defines the field as the output for the list of selected items (usefull for handling json data) |
+----------+-------------+---------+-------------------------------------------------------------------------------------------------+
| template | string      | null    | Defines how items are to be presented in the interface (usefull for handling json data)         |
+----------+-------------+---------+-------------------------------------------------------------------------------------------------+