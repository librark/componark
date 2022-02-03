import { Component } from 'base/component/index.js'

const tag = 'demo-paginator'
export class PaginatorDemo extends Component {
  init(context = {}) {
    this.limit = 1
    this.offset = 0
    this.page = 1
    return super.init(context)
  }

  render() {
    this.content = /* html */ `
      <ark-list background="light" color="dark"></ark-list>
      <ark-paginator listen on-page-changed="onPageChanged" 
        displayed-pages="4" page-size="1"></ark-paginator>

      <a 
        target="_blank" 
        href="https://github.com/knowark/componark/blob/master/src/components/paginator/README.md" 
        class="reference">
      * Reference
      </a>
    `
    return super.render()
  }

  async load() {
    const template = (item) => /* html */ `
    <h1>${item.year}</h1>
    <span data-first>FIRST: ${item.first}</span>
    <span> | </span>
    <span data-second>SECOND: ${item.second}</span>
    `

    const source = () => {
      let list = this.list
      if (this.limit) list = list.slice(0, this.limit)
      if (this.offset) list = list.slice(this.offset)
      return list
    }

    this.select('ark-list')
      .init({
        source: source(),
        template: template,
      })
      .render()

    const paginator = this.select('ark-paginator')
    paginator
      .init({
        collectionSize: this.list.length,
        currentPage: this.page,
      })
      .render()
    return super.load()
  }

  /** @param {CustomEvent} event */
  async onPageChanged(event) {
    event.stopPropagation()
    this.limit = event.detail.limit
    this.offset = event.detail.offset
    this.page = event.detail.page
    await this.update()
  }

  get list() {
    return [
      { first: 'Colombia', second: 'Argentina', year: 2016 },
      { first: 'Uruguay', second: 'Colombia', year: 2017 },
      { first: 'Brasil', second: 'Argentina', year: 2018 },
      { first: 'Perú', second: 'Bolivia', year: 2019 },
      { first: 'Argentina', second: 'Argentina', year: 2020 },
      { first: 'Chile', second: 'Colombia', year: 2021 },
      { first: 'Colombia', second: 'Argentina', year: 2022 },
      { first: 'Uruguay', second: 'Bolivia', year: 2023 },
    ]
  }
}
Component.define(tag, PaginatorDemo)
