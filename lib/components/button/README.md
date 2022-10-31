BUTTON
======

The `ark-button` component, is an implementation of [HTML button](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button)

## Examples

Use the theme style attributes: ``background`` and  ``color`` to make different types of buttons that communicates actions

``` html
  <ark-button background="primary">primary</ark-button>
  <ark-button background="secondary" color="dark">secondary</ark-button>
  <ark-button background="success">success</ark-button>
  <ark-button background="danger">danger</ark-button>
  <ark-button background="warning" color="dark">warning</ark-button>
  <ark-button background="info" color="dark">info</ark-button>
  <ark-button background="dark">dark</ark-button>
  <ark-button background="muted">muted</ark-button>
  <ark-button background="light" color="dark">light</ark-button>
  <ark-button background="white">white</ark-button>
```
**A disabled button**

``` html
    <ark-button background="disabled" disabled>DISABLED</ark-button>
```
**An outline button**

``` html
    <ark-button outline="primary">primary</ark-button>
```

**A floating action button (FAB)**, uses special attributes ``horizontal`` and ``vertical`` to represents the primary actions of a screen

``` html
  <ark-button fab background="primary">
  </ark-button>
```

Attributes
----------

|    Name    |                 Default                  |            Options             |                  Description                   |
| :--------: | :--------------------------------------: | :----------------------------: | :--------------------------------------------: |
| horizontal |                   n/a                    |  ``center``, ``start``, `end`  |          sets the horizontal position          |
|  vertical  |                   n/a                    |  ``center``, ``start``, `end`  |          sets the horizontal position          |
|    fab     | ``horizontal="end"``, ``vertical="end"`` |               --               |       Transforms the button in a fab one       |
|    size    |                 ``big``                  | ``small``, ``medium``, ``big`` | Change the size of the button(fab button only) |
|  position  |                 ``left``                 |      ``left``, ``right``       |        Change the position of the icon         |


Properties
----------

|    Name    |                 Default                  |            Options             |                  Description                   |
| :--------: | :--------------------------------------: | :----------------------------: | :--------------------------------------------: |
| horizontal |                   n/a                    |  ``center``, ``start``, `end`  |          sets the horizontal position          |
|  vertical  |                   n/a                    |  ``center``, ``start``, `end`  |          sets the horizontal position          |
|    fab     | ``horizontal="end"``, ``vertical="end"`` |               --               |       Transforms the button in a fab one       |
|    size    |                 ``big``                  | ``small``, ``medium``, ``big`` | Change the size of the button(fab button only) |
|  position  |                 ``left``                 |      ``left``, ``right``       |        Change the position of the icon         |


Slots
-----

Add a ``slot`` attribute to an element inside the ``ark-button`` component to specify the section in wich the content is to be displayed

|  Name   |                           Description                            |
| :-----: | :--------------------------------------------------------------: |
| general | Every element that has not a slot specified displays in the body |
|  icon   |            Slot for display an icon inside the button            |
