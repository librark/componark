RADIO
=====

The ``ark-radio`` implements a 
`radio element <https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio>`_
as a form web component.
    

Examples
--------

**radio group with label and multiple radio buttons**

``` html
    <ark-radio-group>
        <ark-radio-button value="op1">Option 1</ark-radio-button>
        <ark-radio-button value="op2">Option 2</ark-radio-button>
        <ark-radio-button value="op3">Option 2</ark-radio-button>
    </ark-radio-group>
```



Attributes
----------

|      Component       |  Name   |  Type   | Default |               Description               |
| :------------------: | :-----: | :-----: | :-----: | :-------------------------------------: |
| ``ark-radio-group``  |  label  | string  |  text   |     radio group accompanying label      |
| ``ark-radio-button`` |  value  | string  |  null   |               radio value               |
| ``ark-radio-button`` | checked | boolean |    -    | Indicate if radio is checked by default |

Properties
----------

|      Component       |  Name   |  Type   | Default |               Description               |
| :------------------: | :-----: | :-----: | :-----: | :-------------------------------------: |
| ``ark-radio-group``  |  label  | string  |  text   |     radio group accompanying label      |
| ``ark-radio-button`` |  value  | string  |  null   |               radio value               |
| ``ark-radio-button`` | checked | boolean |    -    | Indicate if radio is checked by default |

Methods
-------

|  Name   | Parameters |           Description            |
| :-----: | :--------: | :------------------------------: |
|  check  |     -      |          ``checked`` on          |
| unCheck |     -      |         ``checked`` off          |
| toggle  |     -      | toggle the ``checked`` attribute |
