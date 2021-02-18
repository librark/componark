NAVBAR
******

The ``ark-navbar`` component is an easily stackable navigation bar.
To stack navigation bars, put an ``ark-nav`` inside the container component ``ark-navbar`` that groups them.
    

Examples
========

    **Classic navbar with brand and hamburguer button**

    .. code:: html

        <ark-navbar background="dark" color="danger" justify="between">
            <ark-nav brand>
            <ark-button>
                <ark-icon name='fas fa-bars'></ark-icon>
            </ark-button>
            <span>Componark</span>
            </ark-nav>
        </ark-navbar>

    **Simple nav with elements**

    .. code:: html
    
        <ark-navbar background="dark" color="danger" justify="between">
            <ark-nav background="secondary" color="success">
            <span>Element 1</span>
            <span>Element 2</span>
            <span>Element 3</span>
            </ark-nav>
        </ark-navbar>
    
    **A toggler plug-in that allows to collapse the navs without specified** ``brand`` **attribute**
    
    .. code:: html
        
        <ark-nav toggler>
          <span>User</span>
          <ark-button>
            <ark-icon name='fas fa-ellipsis-v'></ark-icon>
          </ark-button>
        </ark-nav>



Attributes
----------

+-------------+---------+---------+---------+--------------------------------------------------------------------+
|  Component  |  Name   |  Type   | Default |                            Description                             |
+=============+=========+=========+=========+====================================================================+
| ``ark-nav`` | brand   | boolean | --      | A main visible nav where the brand is located                      |
+-------------+---------+---------+---------+--------------------------------------------------------------------+
| ``ark-nav`` | toggler | string  | --      | A nav with an incorporated event that collapse navs with elements. |
+-------------+---------+---------+---------+--------------------------------------------------------------------+

Properties
----------

+-------------+---------+---------+---------+--------------------------------------------------------------------+
|  Component  |  Name   |  Type   | Default |                            Description                             |
+=============+=========+=========+=========+====================================================================+
| ``ark-nav`` | brand   | boolean | --      | A main visible nav where the brand is located                      |
+-------------+---------+---------+---------+--------------------------------------------------------------------+
| ``ark-nav`` | toggler | string  | --      | A nav with an incorporated event that collapse navs with elements. |
+-------------+---------+---------+---------+--------------------------------------------------------------------+
