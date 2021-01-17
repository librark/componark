Component
=========

This is the base class for the *Componark* library of web components. It might
be used in application code as well to create new custom elements, which can
of course use the pre-built components in this library in their composition.


Reference
---------

A new component (i.e. custom element) should be created by just extending the
*Component* base class.

.. code:: javascript

   import { Component } from 'base/component'

   class MyComponent extends Component {

   }


