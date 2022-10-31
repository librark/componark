Accordion
*********

The accordion presents a collapsable list of elements.


Example
=======

```html
<ark-accordion>
  <ark-accordion-tab header="First">
    <span>The content of the first tab</span>
  </ark-accordion-tab>
  <ark-accordion-tab header="Second">
    <span>The content of the second tab</span>
  </ark-accordion-tab>
</ark-accordion>
```


Accordion
=========

```html
<ark-accordion></ark-accordion>
```


Accordion Tab
=============

```html
<ark-accordion-tab></ark-accordion-tab>
```


Attributes
----------

| Name   | Default | Description      |
|--------|---------|------------------|
| index  | n/a     | tab index        |
| header | -       | tab header       |
| active | -       | active indicator |


Properties
----------

| Name   | Default | Description      |
|--------|---------|------------------|
| index  | n/a     | tab index        |
| header | -       | tab header       |


Methods
-------

| Name   | Parameters | Description                   |
|--------|------------|-------------------------------|
| open   | -          | set the 'active' attribute    |
| close  | -          | remove the 'active' attribute |
| toggle | -          | toggle the 'active' attribute |
