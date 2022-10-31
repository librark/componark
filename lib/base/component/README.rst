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

This is a custom element *standard* method. The constructor *must not*
receive any parameters and is invoked every time a new instance of a
*Component* is **created**. The default constructor implementation calls the
**init()** method with an empty object and that is the place in which custom
initialization of state should be performed when using componark. The automatic
syncronization between reflected properties and attributes is also done inside
the constructor.

init(context: object)
^^^^^^^^^^^^^^^^^^^^^

The **init()** method is the place where state initialization of the component
should be made. It is called without context arguments by the constructor on
component creation and thus, should resiliently handle any form of attributes
received to set the state of the component before **rendering**. The *init()*
method should be called as well in parent components, for *updating* the
state of the nested component and then explicitly invoking **render()** to
present those changes in the user interface. The **init()** method returns the
current instance (i.e. *this*) to enable chaining, so don't forget to return
*super.init()* when extending this method.

connectedCallback()
^^^^^^^^^^^^^^^^^^^

The *connectedCallback()* method is one of the default lifecycle callbacks or
reactions of the `custom elements specification
<https://developer.mozilla.org/en-US/docs/Web/Web_Components/
Using_custom_elements#using_the_lifecycle_callbacks>`_. This method shouldn't
be extended directly by Componark's components as there are other methods in
this reference which are better suited to provide customization and extension.
The **connectedCallback()** is invoked every time a *Component* is inserted
into the *DOM* (i.e. injected in the page).

async update()
^^^^^^^^^^^^^^

The *update()* method is an *asynchronous* consolidation method whose purpose
is to simultaneously call **render()** and **load()**. The *update()* method is
called by the *connectedCallback()* standard reaction and after first injection
might also be called explicitly by user code.

render()
^^^^^^^^

This method should be extended by every component to set its visual
representation (i.e. html) based on its current state. The produced document
string should be assigned to the **content** property of the *Component*
which in turn will inject it into the *DOM*. Conditionals, loops and any kind
of logic can be used inside the *render()* method to dynamically set the
*Components* presentation based on its attributes, properties or any other
environmental state. The **render()** method returns the current instance
(i.e. *this*) to enable chaining, so don't forget to return *super.render()*
when extending this method.

async load()
^^^^^^^^^^^^

The *load()* lifecycle asynchronous method is the place where custom data
fetching or other kinds of asynchronous operations should be performed. This
method is invoked by *connectedCallback()* every time the *Component* is
injected into the DOM (in an indirect manner through *update()*). After
finishing its asynchronous tasks (e.g. obtaining some requested external data)
the *load()* method might change the component's state and presentation and
even explicitly call *render()*.
