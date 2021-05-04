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

    **With the attributes accept and max-size**

    .. code:: html
        
        <ark-droparea accept="jpg, png, gif" max-size="10mb" ></ark-droparea>




Attributes
----------

+----------+---------+------------+--------------------------------------------------------------------------------------------+
|   Name   |  Type   |  Default   |                                        Description                                         |
+==========+=========+============+============================================================================================+
| single   | boolean | (multiple) | Limits the number of files to a single one, if not set, recieves multiple files by default |
+----------+---------+------------+--------------------------------------------------------------------------------------------+
| max-size | string  | (no limit) | Specifies the size of the file in bytes                                                    |
+----------+---------+------------+--------------------------------------------------------------------------------------------+
| accept   | string  | (any)      | Indicates the type of files, with values separated by commas: (png, jpeg, gif, etc.)       |
+----------+---------+------------+--------------------------------------------------------------------------------------------+

Properties
----------

+---------+---------+------------+--------------------------------------------------------------------------------------------+
|  Name   |  Type   |  Default   |                                        Description                                         |
+=========+=========+============+============================================================================================+
| single  | boolean | (multiple) | Limits the number of files to a single one, if not set, recieves multiple files by default |
+---------+---------+------------+--------------------------------------------------------------------------------------------+
| maxSize | string  | (no limit) | Specifies the size of the file in bytes                                                    |
+---------+---------+------------+--------------------------------------------------------------------------------------------+
| accept  | string  | (any)      | Indicates the type of files, with values separated by commas: (png, jpeg, gif, etc.)       |
+---------+---------+------------+--------------------------------------------------------------------------------------------+


