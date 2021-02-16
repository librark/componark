TABS
****

The ``ark-tabs`` component provides groups a set of items, making easy to switch between different views.
    

Examples
========

    **radio group with label and multiple radio buttons**

    .. code-block:: html
        
        <ark-tabs listen on-tabs:selected="onSelectedTab">
            <ark-tabs-item title="tab 1" tab="example-1">
            </ark-tabs-item>
            <ark-tabs-item title="tab 2" tab="example-2"> 
            </ark-tabs-item>
            <ark-tabs-item title="tab 3" tab="example-3">
            </ark-tabs-item>
        </ark-tabs>



Attributes
----------

+-------------------+--------+---------+---------+--------------------------------------------------------------------------------+
|     Component     |  Name  |  Type   | Default |                                  Description                                   |
+===================+========+=========+=========+================================================================================+
| ``ark-tabs``      | active | boolean | null    | Selects the current tab                                                        |
+-------------------+--------+---------+---------+--------------------------------------------------------------------------------+
| ``ark-tabs-item`` | title  | string  | null    | Specifies the name that shows in the tab button                                |
+-------------------+--------+---------+---------+--------------------------------------------------------------------------------+
| ``ark-tabs-item`` | tab    | string  | -       | Provides a reference to the content that is displayed when the tab is selected |
+-------------------+--------+---------+---------+--------------------------------------------------------------------------------+

Properties
----------

+-------------------+------------+---------+---------+--------------------------------------------------------------------------------+
|     Component     |    Name    |  Type   | Default |                                  Description                                   |
+===================+============+=========+=========+================================================================================+
| ``ark-tabs``      | active     | boolean | null    | Selects the current tab                                                        |
+-------------------+------------+---------+---------+--------------------------------------------------------------------------------+
| ``ark-tabs``      | tabs       | boolean | null    | Returns a list of tasb                                                         |
+-------------------+------------+---------+---------+--------------------------------------------------------------------------------+
| ``ark-tabs``      | currentTab | boolean | null    | Returns the current tab selected                                               |
+-------------------+------------+---------+---------+--------------------------------------------------------------------------------+
| ``ark-tabs-item`` | title      | string  | null    | Specifies the name that shows in the tab button                                |
+-------------------+------------+---------+---------+--------------------------------------------------------------------------------+
| ``ark-tabs-item`` | tab        | string  | -       | Provides a reference to the content that is displayed when the tab is selected |
+-------------------+------------+---------+---------+--------------------------------------------------------------------------------+


Methods
-------

+---------------+------------+------------+--------------------------+
|   Component   |    Name    | Parameters |       Description        |
+===============+============+============+==========================+
| ark-tabs-item | _getType() | -          | returns the type of item |
+---------------+------------+------------+--------------------------+
