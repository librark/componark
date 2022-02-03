SPLITVIEW
=========

The ``ark-splitview`` provides an interface composed of a ``master`` view of list items, clicking this items displays content in the ``detail`` view. 
This component, being responsive, displays two columns on wide screen devices, while on mobile, the ``master`` view as well as the ``detail``, occupies the entire width of the viewport.

    

Examples
--------

**The splitview use an** ``ark-splitview`` **element with** ``ark-splitview-master`` **inside that displays the list using an** ``ark-list`` **component.**
**For the porpose of displaying the details of each item** ``ark-splitview-detail`` **is needed, in this example** ``demo-splitview-detail`` **is a custom component that reaches the specific item information**

```html
    <ark-splitview>
        <ark-splitview-master resize master-event="list:selected">
        <ark-list data-list></ark-list>
        </ark-splitview-master>

        <ark-splitview-detail title="Demo">
        <ark-icon slot="icon" name='fas fa-chevron-left'></ark-icon>
        <demo-splitview-detail></demo-splitview-detail>
        </ark-splitview-detail>

    </ark-splitview>    
```

Attributes
----------

|        Component         | Name  |  Type  | Default |           Description            |
|:------------------------:|:-----:|:------:|:-------:|:--------------------------------:|
| ``ark-splitview-detail`` | title | string | null    | Specifies a title for the detail |


Properties
----------

|        Component         | Name  |  Type  | Default |           Description            |
|:------------------------:|:-----:|:------:|:-------:|:--------------------------------:|
| ``ark-splitview-detail`` | title | string | null    | Specifies a title for the detail |


Methods
-------

|        Component         |  Name  | parameters |           Description            |
|:------------------------:|:------:|:----------:|:--------------------------------:|
| ``ark-splitview-detail`` | show   | -          | Shows the content in detail view |
| ``ark-splitview-detail`` | hide   | -          | Hide the contents of detail view |
| ``ark-splitview-detail`` | toggle | -          | Toggle between show and hide     |


Slots
-----

**Add a** ``slot`` **attribute in** ``ark-splitview-detail`` **component to specify the section in wich the content is to be displayed**

|  Name   |                                     Description                                      |
|:-------:|:------------------------------------------------------------------------------------:|
| general | Every element that has not a slot specified displays in the body                     |
| icon    | Slot for displaying a back icon at the top left of the detail view on mobile screens |
