INPUT
*********

The ``ark-input`` element supports all the types of the default 
.. _a link: https://www.w3schools.com/html/html_form_input_types.asp 
``input`` web component.
    

Example
=======

.. code:: html

    <ark-input data-input-text required inline 
        label="Enter some text:" 
        listen on-alter="onTextInput">
    </ark-input>


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
