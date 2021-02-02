import { Component } from '../../../base/component'

export class TabsItem extends Component {
  constructor () {
    super()
    this.defaultContent = this.defaultContent || this.innerHTML
  }

  init (context = {}) {
    this.title = context.title
    return super.init()
  }

  reflectedProperties () {
    return ['title', 'tab']
  }

  render () {
    this.innerHTML = /* html */ `
      <${this._getType()}>
        ${this.defaultContent}
        <span>${this.title}</span>
      </${this._getType()}>
    `
    return super.render()
  }

  _getType () {
    return this.hasAttribute('href') ? 'a' : 'button'
  }
}
Component.define('ark-tabs-item', TabsItem)
