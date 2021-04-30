DROPAREA
********

The ``ark-droparea`` is an easy to use drag & drop component, that allows the user to upload multiple or single files,
defining the limit of size and the specific extension of the files.
    

Examples
========

    **Default droparea, multiple files**

    .. code:: html
        
        <ark-droparea></ark-droparea>

    **Single file droparea, use the single atribute**

    .. code:: html
        
        <ark-droparea single></ark-droparea>




Attributes
----------

+---------+---------+---------+-----+-----------------------------------------------------+
|  Name   |  Type   | Default |     |                     Description                     |
+=========+=========+=========+=====+=====================================================+
| single  | boolean | -       |     | Limits the number of files to a single one          |
+---------+---------+---------+-----+-----------------------------------------------------+
| size    | string  | max     |     | Checks the default checkboxes                       |
+---------+---------+---------+-----+-----------------------------------------------------+
| accept  | string  | null    |     | Indicates the type of files that the server accepts |
+---------+---------+---------+-----+-----------------------------------------------------+
| checked | boolean | -       |     | Indicate if checkbox is checked by default          |
+---------+---------+---------+-----+-----------------------------------------------------+

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
