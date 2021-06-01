MULTISELECT
***********


The ``ark-multiselect`` allows the user to select multiple items from a list, the items groups in the multiselect field and the list can be filtered from an input text.
Each item can be removed one by one and at the same time.

Examples
========

    **Normal list multiselect**
    
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

+----------+--------+---------+------------------------------------------------+
|   Name   |  Type  | Default |                  Description                   |
+==========+========+=========+================================================+
| title    | string | null    | Creates a title that displays in the header    |
+----------+--------+---------+------------------------------------------------+
| subtitle | string | null    | Creates a subtitle that displays in the header |
+----------+--------+---------+------------------------------------------------+
| width    | string | null    | Sets the width of the window                   |
+----------+--------+---------+------------------------------------------------+
| height   | string | null    | Sets the height of the window                  |
+----------+--------+---------+------------------------------------------------+

Properties
----------

+----------+--------+---------+------------------------------------------------+
|   Name   |  Type  | Default |                  Description                   |
+==========+========+=========+================================================+
| title    | string | null    | Creates a title that displays in the header    |
+----------+--------+---------+------------------------------------------------+
| subtitle | string | null    | Creates a subtitle that displays in the header |
+----------+--------+---------+------------------------------------------------+
| width    | string | null    | Sets the width of the window                   |
+----------+--------+---------+------------------------------------------------+
| height   | string | null    | Sets the height of the window                  |
+----------+--------+---------+------------------------------------------------+


Methods
-------

+--------+------------+-------------------------------------+
|  Name  | Parameters |             Description             |
+========+============+=====================================+
| open   | -          | Shows the window on top of the page |
+--------+------------+-------------------------------------+
| close  | -          | Close the window                    |
+--------+------------+-------------------------------------+
| toggle | -          | Toggle between open and close       |
+--------+------------+-------------------------------------+

Slots
-----

**Add a** ``slot`` **attribute on the element to specify the section of the card in wich the content is to be displayed**

+---------+------------------------------------------------------------------+
|  Name   |                           Description                            |
+=========+==================================================================+
| general | Every element that has not a slot specified displays in the body |
+---------+------------------------------------------------------------------+
| actions | Displays the buttons in the right bottom section of the window   |
+---------+------------------------------------------------------------------+

