CARD
****

The ``ark-card`` creates a card that display content and actions on a single topic. 
    

Examples
========

    **An ark-card with content displayed in an specific slot**

    .. code-block:: html

        <ark-card title="Title" subtitle="subtitle [Hello World]">
            <img slot="media" src="${Image}" alt="" />

            <div>
            body
            </div>

            <ark-button background="secondary" color="dark" slot="actions">btn 1</ark-button>
            <ark-button background="dark" slot="actions">btn 2</ark-button>
        </ark-card>


Attributes
----------

+----------+--------+---------+--------------------------------------------------------------------------------+
|   Name   |  Type  | Default |                                  Description                                   |
+==========+========+=========+================================================================================+
| title    | string | null    | Creates a title that displays in the header of the card                        |
+----------+--------+---------+--------------------------------------------------------------------------------+
| subtitle | string | null    | Creates a subtitle that displays in the header of the card and after the title |
+----------+--------+---------+--------------------------------------------------------------------------------+

Properties
----------

+----------+--------+---------+--------------------------------------------------------------------------------+
|   Name   |  Type  | Default |                                  Description                                   |
+==========+========+=========+================================================================================+
| title    | string | null    | Creates a title that displays in the header of the card                        |
+----------+--------+---------+--------------------------------------------------------------------------------+
| subtitle | string | null    | Creates a subtitle that displays in the header of the card and after the title |
+----------+--------+---------+--------------------------------------------------------------------------------+


Slots
-----

**Add a** ``slot`` **attribute on the element to specify the section of the card in wich the content is to be displayed**

+---------+------------------------------------------------------------------+
|  Name   |                           Description                            |
+=========+==================================================================+
| general | Every element that has not a slot specified displays in the body |
+---------+------------------------------------------------------------------+
| media   | Slot for displaying images that shows on top of all content      |
+---------+------------------------------------------------------------------+
| header  | If it is specified displays on top                               |
+---------+------------------------------------------------------------------+
| actions | Displays in the right bottom section of card, ideal for buttons  |
+---------+------------------------------------------------------------------+
