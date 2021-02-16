PAGINATOR
*********

The ``ark-paginator`` component allows the user to select a specific page from a range of pages.
   

Examples
========

    **This component needs to initialize with** ``collectionSize`` **and** ``pageSize`` **properties to display the button and pages needed**
        
        .. code-block:: javascript

            const paginator = this.select('ark-paginator')
            paginator.init({ collectionSize: 4, pageSize: 1 }).render()

    **The** ``ark-paginator`` **component receive an** ``on-page-change`` **event that points to the data that's going to be displayed**  
        
        .. code-block:: html

            <ark-paginator listen on-page-change="updateList"></ark-paginator>
        

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


