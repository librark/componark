SWITCH
******

The ``ark-switch`` element is a special button that allows the user to
check between two states (enabled disabled), this is useful for interactions that
need a simple switch to enable or disable objects in an interface.

Examples
========

    **A switch with enabled state by default**
    
    .. code:: html

        <ark-switch checked></ark-switch>

    **A switch with the on-change event**
    
    .. code:: html

        <ark-switch listen on-alter="nameOfEvent"></ark-switch>

Attributes
----------

+----------+--------+---------+-----------------------------------------------------------+
|   Name   |  Type  | Default |                        Description                        |
+==========+========+=========+===========================================================+
| checked  | string | -       | Set the switch to enabled state, the default state is off |
+----------+--------+---------+-----------------------------------------------------------+
| disabled | string | -       | Disables the interaction with the component               |
+----------+--------+---------+-----------------------------------------------------------+

Properties
----------

+----------+--------+---------+-----------------------------------------------------------+
|   Name   |  Type  | Default |                        Description                        |
+==========+========+=========+===========================================================+
| checked  | string | -       | Set the switch to enabled state, the default state is off |
+----------+--------+---------+-----------------------------------------------------------+
| disabled | string | -       | Disables the interaction with the component               |
+----------+--------+---------+-----------------------------------------------------------+

Events
------

+-----------+----------------------+---------------------------------------------------+
|   Name    |        detail        |                    Description                    |
+===========+======================+===================================================+
| on-alter  | value : false - true | Trigger a event when the user click on the switch |
+-----------+----------------------+---------------------------------------------------+



