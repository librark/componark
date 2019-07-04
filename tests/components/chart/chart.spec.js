/** @typedef {import('../../../src/components/chart').Chart} Chart */
import { Chart } from '../../../src/components/chart'

describe('Chart', () => {
  it('can be instantiated', () => {
    const element = /** @type {Chart} */ (document.createElement('ark-chart'))
    expect(element).toBeTruthy()

    var init = element.init({})
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
})
