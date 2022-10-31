import { Component } from '../../../base/component/index.js'
import styles from '../styles/index.js'

const tag = 'ark-tabs-item'
export class TabsItem extends Component {
  constructor () {
    super()
    this.defaultContent = this.defaultContent || this.content
  }

  init (context = {}) {
    this.title = context.title
    return super.init()
  }

  reflectedProperties () {
    return ['title', 'tab']
  }

  render () {
    this.content = /* html */ `
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
Component.define(tag, TabsItem, styles)
