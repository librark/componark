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


Methods
-------

constructor()
^^^^^^^^^^^^^

This is a custom element's *standard* method. The constructor *must not*
receive any parameters and is invoked every time a new instance of a
*Component* is **created**. The default constructor implementation calls the
**init()** method without parameters and that is the place in which custom
initialization of state should be performed when using componark. The automatic
syncronization between reflected properties and attributes is also done inside
the constructor.
