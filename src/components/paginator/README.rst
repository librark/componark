PAGINATOR
*********

The ``ark-paginator`` component allows the user to select a specific page from a range of pages.

    

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

    **This component needs to initialize with** ``collectionSize`` **and** ``pageSize`` **properties to display the button and pages needed**
        
        .. code-block:: javascript

            const paginator = this.select('ark-paginator')
            paginator.init({ collectionSize: 4, pageSize: 1 }).render()

    **The** ``ark-paginator`` **component receive an** ``on-page-change`` **event that points to the data that's going to be displayed**  
        
        .. code-block:: html

            <ark-paginator listen on-page-change="updateList"></ark-paginator>
        

Attributes
----------

+-------------------+----------------+---------+---------+-----------------------------------------------+
|     Component     |      Name      |  Type   | Default |                  Description                  |
+===================+================+=========+=========+===============================================+
| ``ark-paginator`` | on-page-change | string  | null    | Sets the data to be displayed in the pages    |
+-------------------+----------------+---------+---------+-----------------------------------------------+
| ``ark-paginator`` | listen         | boolean | null    | Enables the event needed to display the pages |
+-------------------+----------------+---------+---------+-----------------------------------------------+



Properties
----------

+-------------------+----------------+--------+---------+-------------------------------------------------+
|     Component     |      Name      |  Type  | Default |                   Description                   |
+===================+================+========+=========+=================================================+
| ``ark-paginator`` | pageSize       | number | null    | Number of pages displayed in one page           |
+-------------------+----------------+--------+---------+-------------------------------------------------+
| ``ark-paginator`` | collectionSize | number | null    | Defines a range of pages in a number of buttons |
+-------------------+----------------+--------+---------+-------------------------------------------------+
| ``ark-paginator`` | currentPage    | number | null    | Selects an specific page                        |
+-------------------+----------------+--------+---------+-------------------------------------------------+


