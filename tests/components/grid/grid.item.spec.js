/** @typedef {import('../../../src/components').GridItem} GridItem */
import '../../../src/components/grid'

describe('Grid Item', () => {
  it('can be instantiated', () => {
    const grid = /** @type {GridItem} */(
      document.createElement('ark-grid-item'))
    expect(grid).toBeTruthy()

    var init = grid.init({})
    expect(grid === init).toBeTruthy()
  })

  it('can be rendered without content', function () {
    const grid = /** @type {GridItem} */(
      document.createElement('ark-grid-item'))
    grid.connectedCallback()
  })
})
