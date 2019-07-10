/** @typedef {import('../../../src/components').Table} Table */
import { Table } from '../../../src/components/table'

describe('Table', () => {
  it('can be instantiated', () => {
    const table = /** @type {Table} */(document.createElement('ark-table'))
    expect(table).toBeTruthy()

    var init = table.init({})
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
