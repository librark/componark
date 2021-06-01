CHART
*****

The ``ark-chart`` is a web-component implementation of `Chart.js library <https://www.chartjs.org>`_
this make it possible to use several types of charts : ``pie`` , ``doughtnut`` , ``bar`` , ``line`` , ``radar``

Example
=======

    **This component must be initialized with specified details** 

    .. code:: javascript

        const pie = this.select('[data-chart-pie]')
        pie.init({
            details: this._getDetailsPie(pie)
        }).render()

    **details are** ``data`` **and the desired** ``type`` **chart**

    .. code:: javascript

        _getDetailsPie (chart) {
            return {
            type: 'pie',
            data: data(chart)
        }}

    **data is an object that receives** ``labels`` **and** ``datasets`` 
    **, this object can be returned by a function in which we can use the method** ``generateColors(lenght)``
    **to generate boder and background colors of the** ``datasets``

    .. code:: javascript
        
        data (chart) {
            const data = [12, 19, 3, 5, 2, 3]
            const colors = chart.generateColors(data.length)

            return {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [
                {
                label: '# of Votes',
                data: data,
                backgroundColor: colors.backgroundColor,
                borderColor: colors.borderColor,
                borderWidth: 1
                }
            ]
            }
        }


    **Paint a** ``pie`` **chart just by passing it the attribute we defined at the beggining**

    .. code:: html

        <ark-chart data-chart-pie></ark-chart>
    





Attributes
----------

This component doesn't have direct attributes reflected


Properties
----------

+---------+--------+---------+--------------------------------------------------------------+
|  Name   |  Type  | Default |                         Description                          |
+=========+========+=========+==============================================================+
| details | object | null    | Details is an object that needs `data` and `type` properties |
+---------+--------+---------+--------------------------------------------------------------+

+---------------+--------+---------+-------------------------------------------------------------------------------------------+
| Details props |  Type  | Default |                                        Description                                        |
+===============+========+=========+===========================================================================================+
| type          | string | null    | The type of chart to be painted: ``pie`` , ``doughtnut`` , ``bar`` , ``line`` , ``radar`` |
+---------------+--------+---------+-------------------------------------------------------------------------------------------+
| data          | object | null    | Specific data desired to visualize: ``labels`` ``datasets``                               |
+---------------+--------+---------+-------------------------------------------------------------------------------------------+



Methods
-------

**Add a** ``slot`` **attribute on the element to specify the section of the card in wich the content is to be displayed**

+----------------+------------------------------+--------------------------------------------+
|      Name      |          Parameters          |                Description                 |
+================+==============================+============================================+
| generateColors | `sizePallette`,`paletteName` | generate the colors required for the chart |
+----------------+------------------------------+--------------------------------------------+

