import { Component } from '../../loader'
/** @typedef {import('../../loader').Chart} Chart */

export class ChartDemo extends Component {
	init (context) {
		return super.init()
	}

	render () {
		this.innerHTML = /* html */ `
    <!-- DOCUMENTATION -->
      <p>
        <a href="https://www.chartjs.org">ChartJs</a>
        <a href="https://github.com/google/palette.js/tree/master">
          paletteJs
        </a>
      </p>

      <p>This is a Chart.</p>
      <ark-chart data-chart-pie></ark-chart>
      <ark-chart data-chart-doughnut></ark-chart>
      <ark-chart data-chart-bar></ark-chart>
      <ark-chart data-chart-line></ark-chart>
      <ark-chart data-chart-radar></ark-chart>
    `

		return super.render()
	}

	load () {
		this._initElement()

		return super.load()
	}

	_initElement () {
		const pie = /** @type {Chart} */ (this.querySelector('[data-chart-pie]'))
		pie.init({
			details: this._getDetailsPie(pie)
		}).render()

		const doughnut = /** @type {Chart} */ (this.querySelector(
			'[data-chart-doughnut]'
		))
		doughnut.init({
			details: this._getDetailsDoughnut(doughnut)
		}).render()

		const bar = /** @type {Chart} */ (this.querySelector('[data-chart-bar]'))
		bar.init({
			details: this._getDetailsBar(bar)
		}).render()

		const line = /** @type {Chart} */ (this.querySelector('[data-chart-line]'))
		line.init({
			details: this._getDetailsLine(line)
		}).render()

		const radar = /** @type {Chart} */ (this.querySelector(
			'[data-chart-radar]'
		))
		radar.init({
			details: this._getDetailsRadar(radar)
		}).render()
	}

	/** @param {Chart} chart */
	_getDetailsDoughnut (chart) {
		return {
			type: 'doughnut',
			data: this._data(chart)
		}
	}

	/** @param {Chart} chart */
	_getDetailsPie (chart) {
		return {
			type: 'pie',
			data: this._data(chart)
		}
	}

	/** @param {Chart} chart */
	_getDetailsRadar (chart) {
		return {
			type: 'radar',
			data: this._data(chart)
		}
	}

	/** @param {Chart} chart */
	_getDetailsLine (chart) {
		return {
			type: 'line',
			data: this._data(chart)
		}
	}

	/** @param {Chart} chart */
	_getDetailsBar (chart) {
		return {
			type: 'bar',
			data: this._data(chart)
		}
	}

	/** @param {Chart} chart */
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
customElements.define('demo-chart', ChartDemo)
