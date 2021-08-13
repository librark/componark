SIDEBAR
*******

The ``ark-sidebar`` provides a collapsible side content window.

Examples
========

    **A sidebar with a header, body and footer**
    
    .. code-block:: html

        <ark-sidebar>
            <div slot="header">My Menu</div>
            <div>body</div>
            <div slot="footer">footer</div>
        </ark-sidebar>
    
    **assign open method to a button**

    .. code-block:: javascript

        const sidebar = this.querySelector('ark-sidebar')
        sidebar['open']()



Attributes
----------

+--------+---------+----------+--------------------------------------------------------------------+
|  Name  |  Type   | Default  |                            Description                             |
+========+=========+==========+====================================================================+
| opened | boolean | null     | If present shows the sidebar window                                |
+--------+---------+----------+--------------------------------------------------------------------+
| side   | string  | 'left'   | Changes the side from which the sidebar is displayed (right, left) |
+--------+---------+----------+--------------------------------------------------------------------+
| width  | string  | 'normal' | Changes the max width of the navbar ("compact", "normal", "wide")  |
+--------+---------+----------+--------------------------------------------------------------------+


Properties
----------

+--------+---------+----------+--------------------------------------------------------------------+
|  Name  |  Type   | Default  |                            Description                             |
+========+=========+==========+====================================================================+
| opened | boolean | null     | If present shows the sidebar window                                |
+--------+---------+----------+--------------------------------------------------------------------+
| side   | string  | 'left'   | Changes the side from which the sidebar is displayed (right, left) |
+--------+---------+----------+--------------------------------------------------------------------+
| width  | string  | 'normal' | Changes the max width of the navbar ("compact", "normal", "wide")  |
+--------+---------+----------+--------------------------------------------------------------------+



Methods
-------

+--------+------------+-------------------------------+
|  Name  | Parameters |          Description          |
+========+============+===============================+
| open   | -          | Shows the navbar window       |
+--------+------------+-------------------------------+
| close  | -          | Close the navbar window       |
+--------+------------+-------------------------------+
| toggle | -          | Toggle between open and close |
+--------+------------+-------------------------------+

Slots
-----

**Add a** ``slot`` **attribute on the element to specify the section of the card in wich the content is to be displayed**

+---------+------------------------------------------------------------------+
|  Name   |                           Description                            |
+=========+==================================================================+
| general | Every element that has not a slot specified displays in the body |
+---------+------------------------------------------------------------------+
| Header  | Displays content at the top of the navbar                        |
+---------+------------------------------------------------------------------+
| Footer  | Displays content at the bottom ot the navbar                     |
+---------+------------------------------------------------------------------+
