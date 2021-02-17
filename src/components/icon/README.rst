ICON
****

The ``ark-icon`` presents a simple way to add icons.
Supports `material icons <https://material.io/resources/icons/>`_
and `font awesome free icons <https://fontawesome.com/icons>`_

Examples
========

    **Fontawesome free icons: just use** ``name`` **attribute and specify the style prefix and icon**

    .. code:: html

        <ark-icon name="fas fa-address-book"></ark-icon>
        <ark-icon name="far fa-address-book"></ark-icon>

    **Material icons: use** ``type="mat"`` **and specify the icon in the** ``name`` **attribute**

    .. code:: html

        <ark-icon type="mat" name="face"></ark-icon>
        <ark-icon type="mat" name="shopping_cart"></ark-icon>


Attributes and Properties
-------------------------

**Material icons**

+------+---------------+--------------+
| Name |    Options    | Description  |
+======+===============+==============+
| type | mat           | icon library |
+------+---------------+--------------+
| name | all available | icon name    |
+------+---------------+--------------+

**Fontawsome free icons**

+------+---------------+----------------------------------------+
| Name |    Options    |              Description               |
+======+===============+========================================+
| name | all available | icon name format: ``prefix icon_name`` |
+------+---------------+----------------------------------------+