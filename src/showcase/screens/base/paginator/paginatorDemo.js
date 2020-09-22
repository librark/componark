/**
 * @typedef {import('../../loader').List} List
 * @typedef {import('../../loader').Paginator} Paginator
 **/

import { Component } from '../../loader'

export class PaginatorDemo extends Component {
  init (context) {
    return super.init()
  }

  render () {
    this.innerHTML = /* html */ `
      <ark-list></ark-list>
      <ark-paginator listen on-page-change="updateList"></ark-paginator>
    `
    return super.render()
  }

  load () {
    // ========================================================================
    // List
    // ========================================================================
    this.loadPaginator()
    return super.load()
  }

  loadPaginator () {
    const paginato = /** @type {Paginator} */ (this.select('ark-paginator'))
    paginato.init({ collectionSize: this.list.length, pageSize: 1 }).render()
  }

  /** @param {CustomEvent} event */
  updateList (event) {
    event.stopImmediatePropagation()
    const offset = event.detail ? event.detail.offset : 0
    const limit = event.detail ? event.detail.limit : 0

    const template = item => /* html */ `
      <h1>${item.year}</h1>
      <span data-first>FIRST: ${item.first}</span>
      <span> | </span>
      <span data-second>SECOND: ${item.second}</span>
    `

    const source = () => {
      let list = this.list
      if (limit) list = list.slice(0, limit)
      if (offset) list = list.slice(offset)
      return list
    }

    const list = /** @type {List} */ this.select('ark-list')
    list
      .init({
        source: source(),
        template: template
      })
      .render()
  }

  get list () {
    return [
      { first: 'Colombia', second: 'Argentina', year: 2016 },
      { first: 'Uruguay', second: 'Colombia', year: 2017 },
      { first: 'Brasil', second: 'Argentina', year: 2018 },
      { first: 'Perú', second: 'Bolivia', year: 2019 }
    ]
  }
}
customElements.define('demo-paginator', PaginatorDemo)
