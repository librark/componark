GALLERY
*******

The ``ark-gallery`` component is a simple image gallery that receives a list
of images, as URLs separated by pipes, and renders them in an organized
slider, ideal for product detail. This component allows the user to select
each image to preview it.

Examples
========

    .. code:: html

        | <ark-gallery images="https://picsum.photos/200/300?random=1 |
        | https://picsum.photos/200/300?random=2                      |
                         https://picsum.photos/200/300?random=3">
        </ark-gallery>



Attributes
----------

+---------+---------------------------+---------------------------------------------------------------------+
|  Name   |          Options          |                             Description                             |
+=========+===========================+=====================================================================+
| images  | (image url)               | Recieves a list of images url separated by pipes                    |
+---------+---------------------------+---------------------------------------------------------------------+
| size    | (units: px, % ,rem, etc.) | configures the height of the container, default (400px)             |
+---------+---------------------------+---------------------------------------------------------------------+
| contain | .                         | The height of the image adjust to the container                     |
+---------+---------------------------+---------------------------------------------------------------------+
| cover   | .                         | The height of the image covers the total size of the container      |
+---------+---------------------------+---------------------------------------------------------------------+
| single  | .                         | Adjust the behaviour and style when the gallery have only one image |
+---------+---------------------------+---------------------------------------------------------------------+


Properties
----------

+---------+---------------------------+---------------------------------------------------------------------+
|  Name   |          Options          |                   Description                                       |
+=========+===========================+=====================================================================+
| images  | (image url)               | Receives a list of image urls separated by pipes                    |
+---------+---------------------------+---------------------------------------------------------------------+
| contain | .                         | The height of the image adjust to the container                     |
+---------+---------------------------+---------------------------------------------------------------------+
| cover   | .                         | The height of the image covers the total size of the container      |
+---------+---------------------------+---------------------------------------------------------------------+
| single  | .                         | Adjust the behaviour and style when the gallery have only one image |
+---------+---------------------------+---------------------------------------------------------------------+
