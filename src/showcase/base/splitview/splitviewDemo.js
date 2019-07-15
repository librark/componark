/** @typedef {import('../../../components').Splitview} Splitview */
import { Component } from '../../../components/component'

export class SplitviewDemo extends Component {
  init (context) {
    this.type = context['type'] || 'ark'
    return super.init(context)
  }

  render () {
    this.innerHTML = /* html */`
      <h1>Splitview</h1>
      <ark-splitview master-event="list:selected"></ark-splitview>
    `
    return super.render()
  }

  async load () {
    // =========================================================================
    // splitview
    // =========================================================================
    const masterTemplate = () => /* html */`
      <ark-list></ark-list>
    `

    const detailTemplate = (item) => /* html */`
      <h1>DETAIL</h1>
      <hr/>
      <h4>First: ${item.first} - Second: ${item.second}</h4>
      <h5>Year ${item.year}</h5>
    `

    const splitview = /** @type {Splitview} */ (
      this.select('ark-splitview').init({
        masterTemplate: masterTemplate,
        detailTemplate: detailTemplate
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

    const list = await splitview.master.select('ark-list').init({
      source: source,
      template: template
    }).load()
    list.render()

    return this
  }
}
customElements.define('demo-splitview', SplitviewDemo)
