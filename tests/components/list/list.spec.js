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
      let list = /** @type {List} */ (document.createElement('ark-list'))
      const context = {
        source: async () => [
          { first: 'Colombia', second: 'Argentina', year: 2016 },
          { first: 'Uruguay', second: 'Colombia', year: 2017 },
          { first: 'Brasil', second: 'Argentina', year: 2018 },
          { first: 'Perú', second: 'Bolivia', year: 2019 }
        ]
      }

      list = await list.init(context).load()
      list.render()

      const items = list.querySelectorAll('[data-item]')

      expect(items.length).toEqual(4)
      expect(items[0].textContent.trim()).toEqual('Colombia')
      expect(items[1].textContent.trim()).toEqual('Uruguay')
      expect(items[2].textContent.trim()).toEqual('Brasil')
      expect(items[3].textContent.trim()).toEqual('Perú')

      expect(list).toBeTruthy()
    })

  it('can be given a template function to render each item',
    async () => {
      let list = /** @type {List} */ (document.createElement('ark-list'))
      const source = async () => [
        { first: 'Colombia', second: 'Argentina', year: 2016 },
        { first: 'Uruguay', second: 'Colombia', year: 2017 },
        { first: 'Brasil', second: 'Argentina', year: 2018 },
        { first: 'Perú', second: 'Bolivia', year: 2019 }
      ]
      const template = (item) => /* html */`
      <h1>${item.year}</h1>
      <span data-first>FIRST: ${item.first}</span>
      <span> | </span>
      <span data-second>SECOND: ${item.second}</span>
      `

      const context = {
        source: source,
        template: template
      }

      list = await list.init(context).load()
      list.render()

      const items = list.querySelectorAll('[data-item]')
      expect(items.length).toEqual(4)

      const firstItem = items[0]

      expect(firstItem.querySelector('[data-first]').innerHTML
      ).toEqual('FIRST: Colombia')
      expect(firstItem.querySelector('[data-second]').innerHTML
      ).toEqual('SECOND: Argentina')

      const lastItem = items[3]

      expect(lastItem.querySelector('[data-first]').innerHTML
      ).toEqual('FIRST: Perú')
      expect(lastItem.querySelector('[data-second]').innerHTML
      ).toEqual('SECOND: Bolivia')

      expect(list).toBeTruthy()
    })
})
