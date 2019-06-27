/**
 * @typedef {import('../../../components').Splitview} Splitview
 * @typedef {import('../../../components').List} List
 **/

import { Component } from '../../../components/component'

export class SplitviewDemo extends Component {
  init (context) {
    this.type = context['type'] || 'ark'
    return super.init(context)
  }

  render () {
    this.innerHTML = /* html */`
      <ark-splitview>
        <h1>Splitview</h1>

        <ark-splitview-master master-event="list:selected">
          <ark-list></ark-list>
        </ark-splitview-master>

      </ark-splitview>
    `
    return super.render()
  }

  async load () {
    // =========================================================================
    // splitview
    // =========================================================================
    const detailTemplate = (item) => /* html */`
      <h1>DETAIL</h1>
      <hr/>
      <h4>First: ${item.first} - Second: ${item.second}</h4>
      <h5>Year ${item.year}</h5>
    `

    const splitview = /** @type {Splitview} */ (
      this.select('ark-splitview').init({
        detailTemplate: detailTemplate,
        title: 'Resultados'
      }).render())

    // =========================================================================
    // List
    // =========================================================================
    const template = (item) => /* html */`
      <h1>${item.year}</h1>
      <span data-first>FIRST: ${item.first}</span>
      <span> | </span>
      <span data-second>SECOND: ${item.second}</span>
    `

    const source = async () => [
      { first: 'Colombia', second: 'Argentina', year: 2016 },
      { first: 'Uruguay', second: 'Colombia', year: 2017 },
      { first: 'Brasil', second: 'Argentina', year: 2018 },
      { first: 'Perú', second: 'Bolivia', year: 2019 }
    ]

    const list = /** @type {List} */ (
      splitview.master.querySelector('ark-list')
    )
    await list.init({
      source: source,
      template: template
    }).load()
    list.render()

    return this
  }
}
customElements.define('demo-splitview', SplitviewDemo)
