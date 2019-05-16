import '../../../src/components/table'

describe('Table', () => {
  it('can be instantiated', () => {
    const table = document.createElement('ark-table')
    expect(table).toBeTruthy()

    var init = table.init({})
    expect(table === init).toBeTruthy()
  })

  it('can be instantiated with date', () => {
    const table = document.createElement('ark-table')
    table.connectedCallback()

    table.init({
      headers: { a: 'A', b: 'B', c: 'C' },
      data: [
        { a: 1, b: 2 }
      ]
    })

    table.render()
  })

  it('can be instantiated with attribute position', () => {
    const table = document.createElement('ark-table')

    const att = document.createAttribute('position')
    table.setAttributeNode(att)

    table.connectedCallback()

    table.init({
      headers: { a: 'A', b: 'B', c: 'C' },
      data: [
        { a: 1, b: 2 }
      ]
    })

    table.render()
  })
})
