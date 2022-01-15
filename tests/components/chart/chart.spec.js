import '../../../src/components/chart/index.js'

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
    expect(chart.chart).toBeFalsy()
  })

  it('can be instantiated with details', () => {
    container.innerHTML = `
    <ark-chart></ark-chart>
    `
    const chart = container.querySelector('ark-chart')

    let givenElement = null
    let givenDetails = null

    class MockChartJs {
      constructor(element, details) {
        givenElement = element
        givenDetails = details
      }
    }

    const lib = MockChartJs
    const details = {type: 'bar', data: testData(chart)}
    chart.init({lib, details}).render()

    const canvas = chart.querySelector('canvas')
    expect(canvas).toBeTruthy()
    expect(givenElement).toBe(canvas)
    expect(givenDetails).toBe(details)
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
