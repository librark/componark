CHECKBOX
********

The ``ark-checkbox`` implements a 
`checkbox <https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox>`_
as a form web component.
    

Examples
========

    **Checkbox group with label and multiple checkboxes**

    .. code-block:: html
        
        <ark-checkbox-group label="Checkboxs">
            <ark-checkbox value="op1" checked>Opcion 1</ark-checkbox>
            <ark-checkbox value="op2">Opcion 2</ark-checkbox>
            <ark-checkbox value="op3">Opcion 3</ark-checkbox>
        </ark-checkbox-group>



Attributes
----------

+---------+---------+---------+--------------------------------------------+
|  Name   |  Type   | Default |                Description                 |
+=========+=========+=========+============================================+
| label   | string  | text    | Checkbox group accompanying label          |
+---------+---------+---------+--------------------------------------------+
| value   | string  | null    | Checkbox value                             |
+---------+---------+---------+--------------------------------------------+
| checked | boolean |    -    | Indicate if checkbox is checked by default |
+---------+---------+---------+--------------------------------------------+

Properties
----------

+---------+---------+---------+--------------------------------------------+
|  Name   |  Type   | Default |                Description                 |
+=========+=========+=========+============================================+
| label   | string  | text    | Checkbox group accompanying label          |
+---------+---------+---------+--------------------------------------------+
| value   | string  | null    | Checkbox value                             |
+---------+---------+---------+--------------------------------------------+
| checked | boolean |    -    | Indicate if checkbox is checked by default |
+---------+---------+---------+--------------------------------------------+


Methods
-------

+---------+------------+----------------------------------+
|  Name   | Parameters |           Description            |
+=========+============+==================================+
| check   | -          | ``checked`` on                   |
+---------+------------+----------------------------------+
| unCheck | -          | ``checked`` off                  |
+---------+------------+----------------------------------+
| toggle  | -          | toggle the ``checked`` attribute |
+---------+------------+----------------------------------+
