LIST
****

The ``ark-list`` component provides an indexed vertical list of ``ark-list-items``.

    

Examples
========

Default list :
--------------


    **One-line list, receives the items as a source:**

    .. code-block:: javascript
        
        const sourceDefault = ['Colombia', 'Uruguay', 'Brasil', 'Perú']

        const defaultList = this.select('[data-default-list]')
    
        defaultList.init({
                source: sourceDefault
                }).render()>

    **The** ``data-default-list`` **attribute returns the item**

    .. code-block:: html
        
        <ark-list data-default-list click-disabled no-borders></ark-list>

Template list :
---------------  

    **Receives items as** ``data`` **list of objects**

        .. code-block:: javascript
            
            const dataTemplate = [
                { first: 'Colombia', second: 'Argentina', year: 2016 },
                { first: 'Uruguay', second: 'Colombia', year: 2017 },
                { first: 'Brasil', second: 'Argentina', year: 2018 },
                { first: 'Perú', second: 'Bolivia', year: 2019 }
            ]
    
    **And its content in a** ``template`` **property**

        .. code-block:: javascript
            
            const template = item => `
            <h1>${item.year}</h1>
            <span data-first>FIRST: ${item.first}</span>
            <span> | </span>
            <span data-second>SECOND: ${item.second}</span>`_

    **In order to render an** ``ark-list`` **of multiple lines, we assign the items in the** ``data`` **property and its content in the** ``template`` **property**

        .. code:: javascript

            const templateList = this.select('[data-template-list]')
            templateList
            .init({
                data: sourceTemplate,
                template: template
            })
            .render()


    **The** ``data-template-list`` **attribute returns the items for our template list**
        
        .. code-block:: html

            <ark-list data-template-list"></ark-list>
        

Attributes
----------

+-------------------+----------------+---------+---------+---------------------------------------+
|     Component     |      Name      |  Type   | Default |              Description              |
+===================+================+=========+=========+=======================================+
| ``ark-list-item`` | index          | string  | text    | Indicates the ``list-item`` index     |
+-------------------+----------------+---------+---------+---------------------------------------+
| ``ark-list``      | click-disabled | boolean | null    | Disable the click event for the items |
+-------------------+----------------+---------+---------+---------------------------------------+



Properties
----------

+-------------------------+----------+--------------+---------+----------------------------------------------------------------------------------------------+
|        Component        |   Name   |     Type     | Default |                                         Description                                          |
+=========================+==========+==============+=========+==============================================================================================+
| ``ark-list-item``       | index    | string       | text    | Indicates the ``list-item`` index                                                            |
+-------------------------+----------+--------------+---------+----------------------------------------------------------------------------------------------+
| ``ark-list`` (default)  | source   | list         | null    | A list of strings that represents each item in the list                                      |
+-------------------------+----------+--------------+---------+----------------------------------------------------------------------------------------------+
| ``ark-list`` (template) | source   | list         | null    | An list of objects that represents data reflected in each item                               |
+-------------------------+----------+--------------+---------+----------------------------------------------------------------------------------------------+
| ``ark-list-item``       | data     | list, object | null    | Displays the data defined in the source for a specific item                                  |
+-------------------------+----------+--------------+---------+----------------------------------------------------------------------------------------------+
| ``ark-list-item``       | template | string       | null    | Receives and displays a html in a template literal, the data should render in a ``span`` tag |
+-------------------------+----------+--------------+---------+----------------------------------------------------------------------------------------------+

