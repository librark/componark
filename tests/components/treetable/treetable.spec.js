import { Treetable } from '../../../src/components/treetable'

describe('TreeTable', () => {
  const data = {
    row: {
      values: {
        col1: "Col 1",
        col2: "Col 2",
      },
      children: {
        row1: {
          values: {
            col1: "row1, Col 1",
            col2: "row1, Col 2",
          },
          children: {
            row11: {
              values: {
                col1: "row11, Col 1",
                col2: "row11, Col 2",
              },
              children: {
                row111: {
                  values: {
                    col1: "row111, Col 1",
                    col2: "row111, Col 2",
                  },
                  children: {}
                }
              }
            }
          }
        },
        row2: {
          values: {
            col1: "row2, Col 1",
            col2: "row2, Col 2",
          },
          children: {
            row21: {
              values: {
                col1: "row21, Col 1",
                col2: "row21, Col 2",
              },
              children: {
                row211: {
                  values: {
                    col1: "row211, Col 1",
                    col2: "row211, Col 2",
                  },
                  children: {}
                }
              }
            }
          }
        }
      }
    }
  }

  const headers = [
    { header: 'Name', key: 'expander' },
    { header: 'Col 1', key: 'col1' },
    { header: 'Col 2', key: 'col2' },
  ]

  it('can be set row id', () => {
    const treetable = new Treetable()
    treetable.init({
      rows: 'children',
      cols: 'values',
      headers: headers,
      data: data,
    })
    treetable.render()
    treetable.load()

    const item = treetable.querySelector('[id="1.2.1."]')

    expect(!item.hasAttribute('active')).toBeTruthy()
    item.firstElementChild.click()
    expect(item.hasAttribute('active')).toBeTruthy()
    item.firstElementChild.click()
    expect(!item.hasAttribute('active')).toBeTruthy()
  })

  it('can be set row id', () => {
    const treetable = new Treetable()
    expect(treetable._setRowId("", 0)).toEqual('0.')
    expect(treetable._setRowId("0", 0)).toEqual('1.')
    expect(treetable._setRowId("0.", 0)).toEqual('1.')
    expect(treetable._setRowId("1.", 0)).toEqual('2.')
    expect(treetable._setRowId("1.", 1)).toEqual('1.0.')
    expect(treetable._setRowId("1.0.", 1)).toEqual('1.1.')
    expect(treetable._setRowId("1.1.2.", 2)).toEqual('1.1.3.')
    expect(treetable._setRowId("0.0.1.", 2)).toEqual('0.0.2.')
  })
})
