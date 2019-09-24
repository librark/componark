/** @typedef {import('../../../src/components/chart').Chart} Chart */
import { Chart } from '../../../src/components/chart'

describe('Chart', () => {
	it('can be instantiated', () => {
		const element = /** @type {Chart} */ (document.createElement('ark-chart'))
		expect(element).toBeTruthy()

		var init = element.init()
		expect(element === init).toBeTruthy()

		element.disconnectedCallback()
	})
	it('can be instantiated', () => {
		const chart = new Chart()
		chart.connectedCallback()
		expect(!chart.chart).toBeTruthy()
	})
	it('can be instantiated with empty object', () => {
		const chart = new Chart()
		chart.init({ details: {} }).render()
		expect(!chart.chart).toBeTruthy()
		// @ts-ignore
		chart._resizeCanvas()
	})
	it('can be instantiated with details', () => {
		const chart = new Chart()
		chart.init({ details: { type: 'bar' } }).render()
		expect(chart.chart).toBeTruthy()
		// @ts-ignore
		chart._resizeCanvas()
	})
	it('get Colors', () => {
		const chart = new Chart()

		let colors = chart.generateColors(0)
		expect(colors.backgroundColor.length).toEqual(0)
		expect(colors.borderColor.length).toEqual(0)

		colors = chart.generateColors(1)
		expect(colors.backgroundColor.length).toEqual(1)
		expect(colors.borderColor.length).toEqual(1)

		colors = chart.generateColors(null)
		expect(colors.backgroundColor.length).toEqual(0)
		expect(colors.borderColor.length).toEqual(0)
	})
})
