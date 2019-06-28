import { Component } from '../../component'
export { ListItem } from './item.js'

export class List extends Component {
  /** @param {Object} context */
  init (context) {
    this.source = context['source'] || null
    this.template = context['template'] || null

    /** @type {Object[]} */
    this.items = []
    this.selected = {}

    return super.init(context)
  }

  render () {
    if (this.items && this.items.length) {
      this.innerHTML = /* html */`
      ${this._renderItems()}
      `
    }
    return super.render()
  }

  async load () {
    if (!this.source) return
    this.items = await this.source()
    return this
  }

  _renderItems () {
    return /* html */`
    ${this.items.map((item, index) => `
      ${this._renderItem(item, index)}
    `).join('')}
    `
  }

  /** @param {Object} item @param {number} index */
  _renderItem (item, index) {
    let content = (this.template ? this.template(item)
      : `${item[Object.keys(item)[0]]}`)

    return /* html */`
    <ark-list-item index="${index}" 
      listen on-list-item:selected="_onSelected">
      ${content}
    </ark-list-item>
    `
  }

  _onSelected (event) {
    const index = event.detail.index
    this.selected = this.items[index]

    this.dispatchEvent(new CustomEvent('list:selected', {
      detail: {
        item: this.selected
      }
    }))
  }
}
customElements.define('ark-list', List)
