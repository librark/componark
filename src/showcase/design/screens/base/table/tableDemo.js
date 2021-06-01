import { Component } from 'base/component'

export class TableDemo extends Component {
  init (context) {
    return super.init(context)
  }

  render () {
    this.innerHTML = /* html */`

      <p>This is a table.</p>
      <ark-table position></ark-table>
    `

    return super.render()
  }

  load () {
    this._initTable()

    return super.load()
  }

  _initTable () {
    const table = this.select('ark-table')

    table.init({
      headers: { a: 'A', b: 'B', c: 'C' },
      data: [
        { a: 1, b: 2 },
        { a: 3, b: 4 },
        { c: 5 }
      ]
    })

    table.render()
  }
}
Component.define('demo-table', TableDemo)
