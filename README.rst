ComponArk
#########

Pragmatic Web Components Library


Introduction
============

Componark is a collection of ready to use web components to propel the creation
of user interfaces. A common *Component* base class is provided to ensure
inter-component compatibility and common development idioms. This class is only
a thin wrapper on top of the *HTMLElement* custom elements class, and might be
extended in your own application code to create new components.

Render
======

The **render()** function must **set the innerHTML** property of an element and
and must **return its outerHTML** property.

Reference
=========

- `Base Component <src/base/component>`_

Theming
#######

For theming one may use:

- primary
- secondary
