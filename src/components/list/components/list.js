import { Component } from '../../component'

export class List extends Component {
  /** @param {Object} context */
  init (context) {
    this.source = context['source'] || null
    this.template = context['template'] || null

    /** @type {Object[]} */
    this.items = []

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
    <div data-index="${index}" data-item>
      ${content}
    </div>
    `
  }
}
customElements.define('ark-list', List)
