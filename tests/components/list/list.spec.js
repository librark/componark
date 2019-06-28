import '../../../src/components/list'

/** @typedef {import('../../../src/components').List} List  */

describe('List', () => {
  it('can be instantiated', () => {
    const list = /** @type {List} */ (document.createElement('ark-list'))
    expect(list).toBeTruthy()

    var init = list.init({})
    expect(list === init).toBeTruthy()
  })

  it('can be rendered without content', () => {
    const list = /** @type {List} */ (document.createElement('ark-list'))
    list.connectedCallback()
    expect(list).toBeTruthy()
  })

  it('can be given an items retrieval function to render the items',
    async () => {
      const list = /** @type {List} */ (document.createElement('ark-list'))
      const context = {
        source: async () => [
          { first: 'Colombia', second: 'Argentina', year: 2016 },
          { first: 'Uruguay', second: 'Colombia', year: 2017 },
          { first: 'Brasil', second: 'Argentina', year: 2018 },
          { first: 'Perú', second: 'Bolivia', year: 2019 }
        ]
      }
      await list.init(context).load()

      const items = list.querySelectorAll('li')

      console.log('INNER HTML LIST ||||||||||||||||||||||', list.outerHTML)
      expect(items.length).toEqual(4)
      expect(items[0].innerHTML).toEqual('Colombia')
      expect(items[1].innerHTML).toEqual('Uruguay')
      expect(items[2].innerHTML).toEqual('Brasil')
      expect(items[3].innerHTML).toEqual('Perú')

      expect(list).toBeTruthy()
    })
})
