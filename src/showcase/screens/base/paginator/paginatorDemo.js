import { Component } from 'base/component'

const tag = 'demo-paginator'
export class PaginatorDemo extends Component {

  render () {
    this.innerHTML = /* html */ `
      <ark-list data-list></ark-list>
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
    const paginator = this.select('ark-paginator')
    paginator.init({ collectionSize: this.list.length, pageSize: 1 }).render()
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
    
    this.select('[data-list]').init({
      source: source(),
      template: template
    }).render()
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
Component.define(tag, PaginatorDemo)