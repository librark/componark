import { Component } from '../../../base/component'
import { styles } from '../styles'

const tag = 'ark-spinner'
export class Spinner extends Component {
  init (context = {}) {
    this.size = context.size || this.size || '1.5rem'
    this.border = context.border || this.border || '.3rem'

    return super.init()
  }

  reflectedProperties () {
    return ['size', 'border']
  }

  render () {
    this.innerHTML = /* html */`
      <div data-loader></div>
    `

    if (this.size.trim().length) {
      this.loader.style.width = this.size
      this.loader.style.height = this.size
    }

    if (this.border.trim().length) {
      this.loader.style.border = `${this.border} solid transparent`
      this.loader.style.borderTop = `${this.border} solid var(--primary)` 
    }

    return super.render()
  }

  /** @returns {HTMLElement} */
  get loader () {
    return this.querySelector('[data-loader]')
  }
}
Component.define(tag, Spinner, styles)
