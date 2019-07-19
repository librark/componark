import { Component } from '../components'

export class ListDemo extends Component {
  init (context) {
    this.type = context['type'] || 'ark'
    return super.init({})
  }

  render () {
    this.innerHTML = /* html */ `
      <h1>Default List</h1>

      <ark-list data-default-list></ark-list>

      <h1>Template List <span data-template-selected></span></h1>

      <ark-list data-template-list listen
        on-list:selected="onTemplateListSelected" default></ark-list>
    `

    return super.render()
  }

  async load () {
    const sourceDefault = async () => ['Colombia', 'Uruguay', 'Brasil', 'Perú']

    // DEFAULT LIST

    const defaultList = this.select('[data-default-list]')
    await defaultList
      .init({
        source: sourceDefault
      })
      .load()

    // TEMPLATE LIST

    const sourceTemplate = async () => [
      { first: 'Colombia', second: 'Argentina', year: 2016 },
      { first: 'Uruguay', second: 'Colombia', year: 2017 },
      { first: 'Brasil', second: 'Argentina', year: 2018 },
      { first: 'Perú', second: 'Bolivia', year: 2019 }
    ]

    const template = item => /* html */ `
      <h1>${item.year}</h1>
      <span data-first>FIRST: ${item.first}</span>
      <span> | </span>
      <span data-second>SECOND: ${item.second}</span>
    `

    const templateList = this.select('[data-template-list]')
    await templateList
      .init({
        source: sourceTemplate,
        template: template
      })
      .load()

    return super.load()
  }

  onTemplateListSelected (event) {
    const item = event.detail.item

    this.select('[data-template-selected]').innerText = `${item.year} - ${
      item.first
    }`
  }
}
customElements.define('demo-list', ListDemo)
