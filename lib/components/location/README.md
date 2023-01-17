LOCATION
========

The ``ark-location`` component makes use of the [Geolocation API](https://developer.mozilla.org/es/docs/WebAPI/Using_geolocation). It provides a simple and fast way for the user to provide their location.


Examples
--------

Default list :
--------------

**Assign the** ``getCurrentPosition()`` **method as an asycrounous function to a button**
**The component returns latitude and longitude coordinates**

```javascript
    async getCurrentPosition () {
    this.querySelector('[data-position]').innerHTML = ''

    const position = await this.location['getCurrentPosition']()

    this.querySelector('[data-position]').innerHTML = `
        Lat: ${position.coords.latitude} Lng: ${position.coords.longitude}
        `
    }
```

``` html
    <div>
        <ark-button listen on-click="getCurrentPosition">
        Get position
        </ark-button>
        <ark-button listen on-click="resetPosition">
        Reset position
        </ark-button>
        <span data-position></span>
        </div>
    <ark-location></ark-location>
```


Attributes
----------

_


Properties
----------

_
