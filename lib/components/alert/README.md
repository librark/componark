# Alert


Shows a floating message to inform or warn.


### Example


``` javascript   
  Alert.launch({
    title: 'Warning',
    text: 'Are you sure you want to continue?',
    showConfirmButton: true,
    confirmButtonText: 'Confirm',
    confirmButtonBackground: 'info',
    showCancelButton: true,
    cancelButtonText: 'Cerrar',
    cancelButtonBackground: 'dark',
    horizontal: 'end',
    vertical: 'end'
  }, this)
```

``` html
  <ark-alert></ark-alert>
```

## Attributes

|    Name    | Default |      Description       |
| :--------: | :-----: | :--------------------: |
|   title    |    -    |      alert title       |
|    text    |    -    |     alert content      |
| horizontal | center  | horizontal orientation |
|  vertical  | center  |  vertical orientation  |

## Properties

|    Name    | Default |      Description       |
| :--------: | :-----: | :--------------------: |
|   title    |    -    |      alert title       |
|    text    |    -    |     alert content      |
| horizontal | center  | horizontal orientation |
|  vertical  | center  |  vertical orientation  |

## Methods

|  Name  |   Parameters    |      Description       |
| :----: | :-------------: | :--------------------: |
| launch | context, parent |    launch the alert    |
| close  |        -        |     alert content      |
|  show  |        -        | horizontal orientation |
|  hide  |        -        |  vertical orientation  |
| toggle |        -        |  vertical orientation  |



