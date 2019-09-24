import { Component } from '../components'
/** @typedef {import('../components').Chart} Chart */

export class ChartDemo extends Component {
	init (context) {
		this.type = context['type'] || 'ark'
		return super.init()
	}

	render () {
		this.innerHTML = /* html */ `
    <!-- DOCUMENTATION -->
      <p>
        <a href="https://www.chartjs.org">ChartJs</a>
        <a href="https://github.com/google/palette.js/tree/master">paletteJs</a>
      </p>

      <div>
        <p>MOBILE (360px).</p>
        <hr align="left" width="360px"/>
      </div>

      <iframe data-mobile src="/${this.type}.html" frameborder="1"
      width="360px"></iframe>

      <div>
        <p>TABLET (768px).</p>
        <hr align="left" width="768px" />
      </div>

      <iframe data-tablet src="/${this.type}.html" frameborder="1"
      width="768px"></iframe>

      <div>
        <p>DESKTOP (960px).</p>
        <hr align="left" width="960px" />
      </div>

      <iframe data-desktop src="/${this.type}.html" frameborder="1"
      width="960px"></iframe>

      <div>
        <p>THIS DISPLAY.</p>
        <hr align="left" width="960px" />
      </div>

      <div data-display>
        ${this._setupContent()}
      </div>
    `

		return super.render()
	}

	load () {
		this._setup()
		return super.load()
	}

	_setup () {
		this._setupFrame('[data-mobile]')
		this._setupFrame('[data-tablet]')
		this._setupFrame('[data-desktop]')
		this._initElement(this)
	}

	_setupContent () {
		return /* html */ `
        <p>This is a Chart.</p>
        <ark-chart data-chart-pie></ark-chart>
        <ark-chart data-chart-doughnut></ark-chart>
        <ark-chart data-chart-bar></ark-chart>
        <ark-chart data-chart-line></ark-chart>
        <ark-chart data-chart-radar></ark-chart>
    `
	}

	_setupFrame (frameName) {
		const content = this._setupContent()
		const frame = this.querySelector(frameName)
		frame.onload = () => {
			const frameBody = frame.contentDocument.querySelector('body')
			const app = frameBody.querySelector('app-showcase-ark')
			const main = document.createElement('main')
			main.innerHTML = content
			this._initElement(main)

			app.parentNode.removeChild(app)
			frameBody.prepend(main)
		}
	}

	_initElement (main) {
		const pie = /** @type {Chart} */ (main.querySelector('[data-chart-pie]'))
		pie
			.init({
				details: this._getDetailsPie(pie)
			})
			.render()

		const doughnut = /** @type {Chart} */ (main.querySelector(
			'[data-chart-doughnut]'
		))
		doughnut
			.init({
				details: this._getDetailsDoughnut(doughnut)
			})
			.render()

		const bar = /** @type {Chart} */ (main.querySelector('[data-chart-bar]'))
		bar
			.init({
				details: this._getDetailsBar(bar)
			})
			.render()

		const line = /** @type {Chart} */ (main.querySelector('[data-chart-line]'))
		line
			.init({
				details: this._getDetailsLine(line)
			})
			.render()

		const radar = /** @type {Chart} */ (main.querySelector(
			'[data-chart-radar]'
		))
		radar
			.init({
				details: this._getDetailsRadar(radar)
			})
			.render()
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
