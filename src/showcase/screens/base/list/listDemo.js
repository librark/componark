import { Component } from 'base/component'

const tag = 'demo-list'
export class ListDemo extends Component {
  init (context) {
    return super.init({})
  }

  render () {
    this.innerHTML = /* html */ `${this.styles}
      <h1>Default List</h1>

      <ark-list data-default-list click-disabled no-borders></ark-list>

      <h1>Template List <span data-template-selected></span></h1>

      <ark-list data-template-list action default
        listen on-list:selected="onTemplateListSelected"></ark-list>

      <p>Atributos:</p>
      <ul>
        <li>action</li>
      </ul>
    `

    return super.render()
  }

  load () {
    const sourceDefault = ['Colombia', 'Uruguay', 'Brasil', 'Perú']

    // DEFAULT LIST

    const defaultList = this.select('[data-default-list]')
    defaultList
      .init({
        source: sourceDefault
      })
      .render()

    // TEMPLATE LIST

    const sourceTemplate = [
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
    templateList
      .init({
        source: sourceTemplate,
        template: template
      })
      .render()

    return super.load()
  }

  onTemplateListSelected (event) {
    const detail = event.detail

    const index = detail.index
    const data = detail.data

    this.select('[data-template-selected]').innerText = `
      [${index}]    ${data.year} - ${data.first}
    `.trim()
  }

  get styles () {
    return /* html */ `
      <style>
        demo-list ark-list{
          margin: 1rem;
        }
      </style>
    `
  }
}
Component.define(tag, ListDemo)
