MODAL
*****

The ``ark-modal`` displays a box/pop-up window with a title, subtitle, content and actions on top of the page 

    

Examples
========

    **A modal needs a button with the** ``open`` **or** ``toggle`` **methods applied as an event**
    
    .. code-block:: html

        <ark-button btn-open>open</ark-button>
        <ark-button btn-toggle>toggle</ark-button>
    
    **define the events for buttons**

    .. code-block:: javascript

        const open = this.querySelector('[btn-open]')
        open.addEventListener('click', _ => this.modal['open']())

        const toggle = this.querySelector('[btn-toggle]')
        toggle.addEventListener('click', _ => this.modal['toggle']())



    **Ark-modal, with respective title, subtitle, content and actions**

    .. code-block:: html

        <ark-modal title="My Title" subtitle="My Subtitle"
        horizontal="center" vertical="center"
        width="80vw" height="40vh">
            <ark-button slot="action">Aceptar</ark-button>
            <ark-button slot="action" close>Cerrar</ark-button>
        <ark-modal>



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
