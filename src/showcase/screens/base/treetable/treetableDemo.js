/**
 * @typedef {import('../../loader').Treetable} Treetable
 **/
import { Component } from '../../loader'
import data from './assets/diccionario.json'

export class TreetableDemo extends Component {
  init (context) {
    return super.init(context)
  }

  render () {
    this.innerHTML = /* html */`
      <div>
        <ark-Treetable></ark-Treetable>
      </div>
    `

    return super.render()
  }

  load () {
    const headers = [
      { header: 'Name', key: 'expander' },
      { header: 'Balance', key: 'balance' },
      { header: 'Balance Init', key: 'balance_init' },
      { header: 'Credit', key: 'credit' },
      { header: 'Debit', key: 'debit' }
    ]

    this.treetable.init({
      cols: 'values',
      rows: 'children',
      data: data,
      headers: headers
    }).render()

    return super.load()
  }

  /** @returns {Treetable} */
  get treetable () {
    return this.select('ark-Treetable')
  }
}
customElements.define('demo-treetable', TreetableDemo)
