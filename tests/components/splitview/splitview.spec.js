import '../../../src/components/splitview'

/** @typedef {import('../../../src/components').Splitview} Splitview  */

describe('Splitview', () => {
  it('can be instantiated', () => {
    const item = /** @type {Splitview} */ (document.createElement(
      'ark-splitview'))
    expect(item).toBeTruthy()

    const initializedItem = item.init({})
    expect(item === initializedItem).toBeTruthy()
  })

  it('can render a master and detail component', function () {
    const splitview = /** @type {Splitview} */ (document.createElement(
      'ark-splitview'))

    const master = () => /* html */`Master Template`
    const detail = (item) => /* html */`Detail Template ${item}`

    splitview.init({
      master: master,
      detail: detail
    }).render()

    expect(splitview.select('ark-splitview-master'
    ).textContent.trim()).toEqual('Master Template')
  })
})
