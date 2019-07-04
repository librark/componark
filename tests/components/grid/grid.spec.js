/** @typedef {import('../../../src/components').Grid} Grid */
import '../../../src/components/grid'

describe('Grid', () => {
  it('can be instantiated', () => {
    const grid = /** @type {Grid} */(document.createElement('ark-grid'))
    expect(grid).toBeTruthy()

    var init = grid.init({})
    expect(grid === init).toBeTruthy()
  })

  it('can be rendered without content', function () {
    const grid = /** @type {Grid} */(document.createElement('ark-grid'))
    grid.connectedCallback()
  })
})
