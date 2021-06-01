MAP
***

The ``ark-map`` component provides an interactive map.
This component implements the `Leaflet library: <https://leafletjs.com>`_

    

Examples
========

    **The** ``token`` **attribute is needed to acquire access and display the map correctly**

    .. code:: html
        
        <ark-map height="60vh" token="${this.token}" zoom="8"></ark-map>

    
    **Token in method**

    .. code:: javascript

         get token () {
            return ('pk.eyJ1IjoiaXRudWJhcmsiLCJhIjoiY2trcHlwMXlm' + 
            'MGRrNjJ4bnlzbzRoZ2E3dCJ9.3fFQAbt-mME6ZizosagKEA')
        }




Attributes
----------

+--------+--------+-----------+---------------------------------------------+
|  Name  |  Type  |  Default  |                 Description                 |
+========+========+===========+=============================================+
| token  | string | empty     | Access code, is required to display the map |
+--------+--------+-----------+---------------------------------------------+
| width  | string | 100%      | Width of map                                |
+--------+--------+-----------+---------------------------------------------+
| height | string | 50vh      | Height of map                               |
+--------+--------+-----------+---------------------------------------------+
| lat    | string | 2.44073   | Latitude coordinate                         |
+--------+--------+-----------+---------------------------------------------+
| lon    | string | -76.60234 | Longitude coordinate                        |
+--------+--------+-----------+---------------------------------------------+
| zoom   | string | 13        | Initial zoom                                |
+--------+--------+-----------+---------------------------------------------+



Properties
----------

+--------+--------+-----------+---------------------------------------------+
|  Name  |  Type  |  Default  |                 Description                 |
+========+========+===========+=============================================+
| token  | string | empty     | Access code, is required to display the map |
+--------+--------+-----------+---------------------------------------------+
| width  | string | 100%      | Width of map                                |
+--------+--------+-----------+---------------------------------------------+
| height | string | 50vh      | Height of map                               |
+--------+--------+-----------+---------------------------------------------+
| lat    | string | 2.44073   | Latitude coordinate                         |
+--------+--------+-----------+---------------------------------------------+
| lon    | string | -76.60234 | Longitude coordinate                        |
+--------+--------+-----------+---------------------------------------------+
| zoom   | string | 13        | Initial zoom                                |
+--------+--------+-----------+---------------------------------------------+


Methods
-------

+-----------------+-----------------+------------------------------------------------+
|      Name       |   parameters    |                  Description                   |
+=================+=================+================================================+
| ``addMarker()`` | ``lat``,``lon`` | Adds a marker based in latitude and longitude. |
+-----------------+-----------------+------------------------------------------------+
