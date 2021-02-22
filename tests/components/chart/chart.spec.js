import { Chart } from '../../../src/components/chart'

describe('Chart', () => {
  let container = null

  function testData (chart) {
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

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    container.remove()
    container = null
  })

  it('can be instantiated', () => {
    container.innerHTML = `
    <ark-chart></ark-chart>
    `
    const chart = container.querySelector('ark-chart')
    expect(chart).toBeTruthy()
    expect(chart).toBe(chart.init())
  })

  it('can be instantiated', () => {
    container.innerHTML = `
    <ark-chart></ark-chart>
    `
    const chart = container.querySelector('ark-chart')
    expect(!chart.chart).toBeTruthy()
  })


  it('can be instantiated with details', () => {
    container.innerHTML = `
    <ark-chart></ark-chart>
    `
    const chart = container.querySelector('ark-chart')

    const details = {type: 'bar', data: testData(chart)}

    chart.init({details}).render()

    const canvas = chart.querySelector('canvas')
    
    expect(canvas).toBeTruthy()
  })

  it('generates its colors', () => {
    container.innerHTML = `
    <ark-chart></ark-chart>
    `
    const chart = container.querySelector('ark-chart')

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
