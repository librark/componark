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

+------------------------+---------+---------+---------+--------------------------------------------+
|       Component        |  Name   |  Type   | Default |                Description                 |
+========================+=========+=========+=========+============================================+
| ``ark-checkbox-group`` | label   | string  | text    | Checkbox group accompanying label          |
+------------------------+---------+---------+---------+--------------------------------------------+
| ``ark-checkbox-group`` | value   | string  | null    | Checks the default checkboxes              |
+------------------------+---------+---------+---------+--------------------------------------------+
| ``ark-checkbox``       | value   | string  | null    | Checkbox value                             |
+------------------------+---------+---------+---------+--------------------------------------------+
| ``ark-checkbox``       | checked | boolean | -       | Indicate if checkbox is checked by default |
+------------------------+---------+---------+---------+--------------------------------------------+

Properties
----------
+------------------------+---------+---------+---------+--------------------------------------------+
|       Component        |  Name   |  Type   | Default |                Description                 |
+========================+=========+=========+=========+============================================+
| ``ark-checkbox-group`` | label   | string  | text    | Checkbox group accompanying label          |
+------------------------+---------+---------+---------+--------------------------------------------+
| ``ark-checkbox-group`` | value   | string  | null    | Checks the default checkboxes              |
+------------------------+---------+---------+---------+--------------------------------------------+
| ``ark-checkbox``       | value   | string  | null    | Checkbox value                             |
+------------------------+---------+---------+---------+--------------------------------------------+
| ``ark-checkbox``       | checked | boolean | -       | Indicate if checkbox is checked by default |
+------------------------+---------+---------+---------+--------------------------------------------+


Methods
-------

+--------------+------------+------------------------------------------+
|     Name     | Parameters |               Description                |
+==============+============+==========================================+
| checkboxList | -          | returns the list of `ark-checkbox` nodes |
+--------------+------------+------------------------------------------+
| check        | -          | ``checked`` on                           |
+--------------+------------+------------------------------------------+
| unCheck      | -          | ``checked`` off                          |
+--------------+------------+------------------------------------------+
| toggle       | -          | toggle the ``checked`` attribute         |
+--------------+------------+------------------------------------------+
