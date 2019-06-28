import { Component } from '../../../components/component'

export class ListDemo extends Component {
  init (context) {
    this.type = context['type'] || 'ark'
    return super.init({})
  }

  render () {
    this.innerHTML = /* html */`
      ${this._setupContent()}
    `
    // this._setupFrame('[mobile]', '360px')
    // this._setupFrame('[tablet]', '768px')
    // this._setupFrame('[desktop]', '960px')

    return super.render()
  }

  _setupFrame (selector, width) {
    const content = this._setupContent()
    const frame = document.createElement('iframe')
    frame.setAttribute('src', `/${this.type}.html`)
    frame.setAttribute('frameborder', '1')
    frame.setAttribute('width', width)
    frame.setAttribute('height', '640px')
    frame.onload = () => {
      const frameBody = frame.contentDocument.querySelector('body')
      const app = frameBody.querySelector('app-showcase-ark')
      const main = document.createElement('main')
      main.innerHTML = content

      app.parentNode.removeChild(app)
      frameBody.prepend(main)
    }

    this.querySelector(selector).appendChild(frame)
  }

  _setupContent () {
    return /* html */`
      <h1>Default List</h1>

      <ark-list data-default-list></ark-list>

      <h1>Template List <span data-template-selected></span></h1>

      <ark-list data-template-list listen 
        on-list:selected="onTemplateListSelected"></ark-list>

    `
  }

  async load () {
    const source = async () => [
      { first: 'Colombia', second: 'Argentina', year: 2016 },
      { first: 'Uruguay', second: 'Colombia', year: 2017 },
      { first: 'Brasil', second: 'Argentina', year: 2018 },
      { first: 'Perú', second: 'Bolivia', year: 2019 }
    ]

    // DEFAULT LIST

    const defaultList = await this.select('[data-default-list]').init({
      source: source
    }).load()
    defaultList.render()

    // TEMPLATE LIST

    const template = (item) => /* html */`
      <h1>${item.year}</h1>
      <span data-first>FIRST: ${item.first}</span>
      <span> | </span>
      <span data-second>SECOND: ${item.second}</span>
    `

    const templateList = await this.select('[data-template-list]').init({
      source: source,
      template: template
    }).load()
    templateList.render()

    return this
  }

  onTemplateListSelected (event) {
    const item = event.detail.item

    this.select('[data-template-selected]').innerText = (
      `${item.year} - ${item.first}`)
  }
}
customElements.define('demo-list', ListDemo)
