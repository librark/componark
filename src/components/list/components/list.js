import { Component } from '../../component'

export class List extends Component {
  /** @param {Object} context */
  init (context) {
    this.source = context['source'] || null

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
    this.render()
  }

  _renderItems () {
    return /* html */`
    <ul>
      ${this.items.map((item, index) => `
        ${this._renderItem(item, index)}
      `).join('')}
    </ul>
    `
  }

  /** @param {Object} item @param {number} index */
  _renderItem (item, index) {
    return /* html */`
    <li>${item[Object.keys(item)[0]]}</li>
    `
  }
}
customElements.define('ark-list', List)
