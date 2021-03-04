import { Component } from 'base/component'

const tag = 'demo-chart'
export class ChartDemo extends Component {
  init (context) {
    return super.init()
  }

  render () {
    this.innerHTML = /* html */ `
    <!-- DOCUMENTATION -->
      <p>
        <a href="https://www.chartjs.org" target="_blank">ChartJs</a>
        <a href="https://github.com/google/palette.js/tree/master" target="_blank">
          paletteJs
        </a>
      </p>

      <p>This is a Chart.</p>
      <ark-chart data-chart-pie></ark-chart>
      <ark-chart data-chart-doughnut></ark-chart>
      <ark-chart data-chart-bar></ark-chart>
      <ark-chart data-chart-line></ark-chart>
      <ark-chart data-chart-radar></ark-chart>

      <br>

      <a href="https://github.com/knowark/componark/blob/master/src/components/chart/README.rst">
      * Reference
      </a>
    `

    return super.render()
  }

  load () {
    this._initElement()

    return super.load()
  }

  _initElement () {
    const pie = this.select('[data-chart-pie]')
    pie.init({
      details: this._getDetailsPie(pie)
    }).render()

    const doughnut = this.select('[data-chart-doughnut]')
    doughnut.init({
      details: this._getDetailsDoughnut(doughnut)
    }).render()

    const bar = this.select('[data-chart-bar]')
    bar.init({
      details: this._getDetailsBar(bar)
    }).render()

    const line = this.select('[data-chart-line]')
    line.init({
      details: this._getDetailsLine(line)
    }).render()

    const radar = this.select('[data-chart-radar]')
    radar.init({
      details: this._getDetailsRadar(radar)
    }).render()
  }

  _getDetailsDoughnut (chart) {
    return {
      type: 'doughnut',
      data: this._data(chart)
    }
  }

  _getDetailsPie (chart) {
    return {
      type: 'pie',
      data: this._data(chart)
    }
  }

  _getDetailsRadar (chart) {
    return {
      type: 'radar',
      data: this._data(chart)
    }
  }

  _getDetailsLine (chart) {
    return {
      type: 'line',
      data: this._data(chart)
    }
  }

  _getDetailsBar (chart) {
    return {
      type: 'bar',
      data: this._data(chart)
    }
  }

  _data (chart) {
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
}
Component.define(tag, ChartDemo)
