import { Treetable } from '../../../src/components/treetable'

describe('TreeTable', () => {
  it('can be instantiated', () => {
    const treetable = new Treetable()
    // expect(treetable._setRowId("", 0)).toEqual('0.')
    // expect(treetable._setRowId("0", 0)).toEqual('1.')
    // expect(treetable._setRowId("1.", 0)).toEqual('2.')
    // expect(treetable._setRowId("1.", 1)).toEqual('1.0.')
    // expect(treetable._setRowId("1.0.", 1)).toEqual('1.1.')
    // expect(treetable._setRowId("1.1.2.", 2)).toEqual('1.1.3.')
    // expect(treetable._setRowId("0.0.1.", 2)).toEqual('0.0.2.')

    expect(treetable._setRowId("", 0)).toEqual('0.')
    expect(treetable._setRowId("0.", 0)).toEqual('1.')
    expect(treetable._setRowId("1.", 0)).toEqual('2.')

    expect(treetable._setRowId("1.", 1)).toEqual('1.0.')
  })
})
