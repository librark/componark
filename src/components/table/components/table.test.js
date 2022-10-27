import { Table } from './table.js'

describe('Table', () => {
  it('can be instantiated', () => {
    const table = new Table()
    expect(table).toBeTruthy()

    const init = table.init()
    expect(table === init).toBeTruthy()
  })

  it('can be instantiated without data', () => {
    const table = new Table()
    table.init({}).render()
  })

  it('can be instantiated with data', () => {
    const table = new Table()
    table.init({
      headers: { a: 'A', b: 'B', c: 'C' },
      data: [
        { a: 1, b: 2 }
      ]
    }).render()

    expect(table.querySelectorAll('th').length === 3).toBeTruthy()
  })

  it('can be instantiated with attribute position', () => {
    const table = new Table()
    table.setAttribute('position', '')
    table.init({
      headers: { a: 'A', b: 'B', c: 'C' },
      data: [
        { a: 1, b: 2 }
      ]
    }).render()
    expect(table.querySelectorAll('th').length === 4).toBeTruthy()
  })
})
