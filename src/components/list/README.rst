LIST
****

The ``ark-list`` component provides an idexed vertical list of ``ark-list-items``.

    

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

+-------+--------+---------+----------------------------+
| Name  |  Type  | Default |        Description         |
+=======+========+=========+============================+
| type  | string | text    | Type of input              |
+-------+--------+---------+----------------------------+
| label | string | null    | Input´s accompanying label |
+-------+--------+---------+----------------------------+



Properties
----------

+-------+--------+---------+-----------------------------+
| Name  |  Type  | Default |         Description         |
+=======+========+=========+=============================+
| label | string | null    | Input's accompanying label. |
+-------+--------+---------+-----------------------------+


Methods
-------

+-------+--------+---------+-----------------------------+
| Name  |  Type  | Default |         Description         |
+=======+========+=========+=============================+
| label | string | null    | Input's accompanying label. |
+-------+--------+---------+-----------------------------+
