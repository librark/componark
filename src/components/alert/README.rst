Alert
*****

Shows a floating message to inform or warn.


Example
=======

.. code:: javascript

    Alert.launch({
      title: 'Warning',
      text: 'Are you sure you want to continue?',
      showConfirmButton: true,
      confirmButtonText: 'Confirm',
      confirmButtonBackground: 'info',
      showCancelButton: true,
      cancelButtonText: 'Cerrar',
      cancelButtonBackground: 'dark',
      horizontal: 'end',
      vertical: 'end'
    }, this)

.. code:: html

   <ark-alert></ark-alert>


Alert
=====

.. code:: html

   <ark-alert></ark-alert>


Attributes
----------

+------------+---------+------------------------+
| Name       | Default | Description            |
+============+=========+========================+
| title      | -       | alert title            |
+------------+---------+------------------------+
| text       | -       | alert content          |
+------------+---------+------------------------+
| horizontal | center  | horizontal orientation |
+------------+---------+------------------------+
| vertical   | center  | vertical orientation   |
+------------+---------+------------------------+


Properties
----------

+------------+---------+------------------------+
| Name       | Default | Description            |
+============+=========+========================+
| title      | -       | alert title            |
+------------+---------+------------------------+
| text       | -       | alert content          |
+------------+---------+------------------------+
| horizontal | center  | horizontal orientation |
+------------+---------+------------------------+
| vertical   | center  | vertical orientation   |
+------------+---------+------------------------+

Methods
-------

+--------+-----------------+-----------------------------+
| Name   | Parameters      | Description                 |
+========+=================+=============================+
| launch | context, parent | launch the alert            |
+--------+-----------------+-----------------------------+
| close  | -               | remove the alert            |
+--------+-----------------+-----------------------------+
| show   | -               | show the alert              |
+--------+-----------------+-----------------------------+
| hide   | -               | hide the alert              |
+--------+-----------------+-----------------------------+
| toggle | -               | toggle the alert visibility |
+--------+-----------------+-----------------------------+
