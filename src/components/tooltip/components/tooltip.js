import { Component } from '../../../base/component/index.js'
import styles from '../styles/index.js'

const tag = 'ark-tooltip'
export class Tooltip extends Component {
  constructor () {
    super()
    this.defaultContent = this.defaultContent || this.innerHTML
  }

  init (context = {}) {
    this.position = context.position || this.position || 'bottom'
    this.text = context.text || this.text
    return super.init()
  }

  reflectedProperties () {
    return ['position', 'text']
  }

  render () {
    this.content = /* html */ `
      <div class="ark-tooltip__content">
        ${this.defaultContent}
      </div>
      <small class="ark-tooltip__text ark-tooltip__${this.position}">
        ${this.text}
      </small>
    `

    return super.render()
  }
}
Component.define(tag, Tooltip, styles)
