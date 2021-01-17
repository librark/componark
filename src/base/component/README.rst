Component
*********

This is the base class for the *Componark* library of web components. It might
be used in application code as well as to create new custom elements, which can
of course use the pre-built components in this library in their composition.


Reference
=========


Usage
-----


A new component (i.e. custom element) should be created by just extending the
*Component* base class.

.. code:: javascript

   import { Component } from 'base/component'

   class MyComponent extends Component {

   }


Lifecycle
---------

The lifecycle of the Componark's base component overlaps with that of the
standard `custom elements specification <https://developer.mozilla.org/en-US/
docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks>`_.
Howerver, the *Component* base class provides additional extension points to
simplify state management and the rendering process.

- constructor()
    - **init(context: object)**
- connectedCallback()
    - **async update()**
        - **render()**
        - **async load()**

