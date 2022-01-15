import { Component } from 'base/component/index.js'

const tag = 'demo-list'
export class ListDemo extends Component {
  init (context) {
    return super.init({})
  }

  render () {
    this.innerHTML = /* html */ `
      <h1>Default List</h1>

      <ark-list background="light" color="dark" data-default-list click-disabled></ark-list>

      <h1>Template List <span data-template-selected></span></h1>

      <ark-list background="light" color="primary"  data-template-list action default
        listen on-list:selected="onTemplateListSelected"></ark-list>
    
        <a class="reference" target="_blank" href="https://github.com/knowark/componark/tree/master/src/components/list/README.rst">
        * Reference
        </a>
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
}

const styles = /* css */`
  .ark-list{
    margin-bottom:20px;
  }
`


Component.define(tag, ListDemo, styles)
