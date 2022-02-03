TABS
====

The ``ark-tabs`` component groups a set of items in tabs, making it easy to switch between different views.
    

Examples
--------

**A group of tabs pointing to content**

``` html
    <ark-tabs listen on-tabs:selected="onSelectedTab">
        <ark-tabs-item title="tab 1" tab="example-1">
        </ark-tabs-item>
        <ark-tabs-item title="tab 2" tab="example-2"> 
        </ark-tabs-item>
        <ark-tabs-item title="tab 3" tab="example-3">
        </ark-tabs-item>
    </ark-tabs>
```


Attributes
----------

|     Component     |  Name  |  Type   | Default |                              Description                               |
| :---------------: | :----: | :-----: | :-----: | :--------------------------------------------------------------------: |
|   ``ark-tabs``    | active | boolean |  null   |                        Selects the current tab                         |
| ``ark-tabs-item`` | title  | string  |  null   |             Specifies the name displayed in the tab button             |
| ``ark-tabs-item`` |  tab   | string  |  null   | Provides a reference to the content displayed when the tab is selected |

Properties
----------

|     Component     |    Name    |  Type   | Default |                                  Description                                   |
| :---------------: | :--------: | :-----: | :-----: | :----------------------------------------------------------------------------: |
|   ``ark-tabs``    |   active   | boolean |  null   |                            Selects the current tab                             |
|   ``ark-tabs``    |    tabs    | boolean |  null   |                             Returns a list of tabs                             |
|   ``ark-tabs``    | currentTab | boolean |  null   |                        Returns the current tab selected                        |
| ``ark-tabs-item`` |   title    | string  |  null   |                Specifies the name that shows in the tab button                 |
| ``ark-tabs-item`` |    tab     | string  |  null   | Provides a reference to the content that is displayed when the tab is selected |


Methods
-------

|   Component   |    Name    | Parameters |       Description        |
| :-----------: | :--------: | :--------: | :----------------------: |
| ark-tabs-item | _getType() |     -      | returns the type of item |
