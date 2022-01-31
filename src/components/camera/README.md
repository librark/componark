CAMERA
======

The ``ark-camera`` allows the user to get access to the current device camera. 


Examples
--------

**The camera needs buttons with events assigned that makes use of the internal methods of the component** 

``` html
    <ark-camera></ark-camera>
    
    <ark-button listen on-click="takepicture">Take photo</ark-button>
    <ark-button listen on-click="startCamera">Start</ark-button>
    <ark-button listen on-click="stopCamera">stop</ark-button>
```

**Define functions to enable the events in the buttons**

``` javascript
    takepicture() {
    this.photo.setAttribute('src', this.camera['dataURL'](200, 200))
    }

    startCamera() {
        this.camera['start']()
    }

    stopCamera() {
        this.camera['stop']()
    }
```


Attributes
----------

|    Name     |  Type  | Default |                    options                     |       Description       |
| :---------: | :----: | :-----: | :--------------------------------------------: | :---------------------: |
|    width    | string |   320   |                       -                        | width of camera window  |
|   height    | string |   320   |                       -                        | height of camera window |
| facing-mode | string |  user   | ``user``, ``environment``, ``left``, ``right`` |   camera orientation    |

Properties
----------

|    Name    |  Type  | Default |                    options                     |       Description       |
| :--------: | :----: | :-----: | :--------------------------------------------: | :---------------------: |
|   width    | string |   320   |                       -                        | width of camera window  |
|   height   | string |   320   |                       -                        | height of camera window |
| facingMode | string |  user   | ``user``, ``environment``, ``left``, ``right`` |   camera orientation    |


Methods
-------

|         Name         |      Parameters       |         Description          |
| :------------------: | :-------------------: | :--------------------------: |
|        start         |           -           |     start device camera      |
|         stop         |           -           |      stop device camera      |
|       dataURL        | ``width``, ``height`` |  Saves a frame as png image  |
| setCameraOrientation |    ``facingMode``     | Set's the camera orientation |
