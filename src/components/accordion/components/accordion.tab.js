import { Component } from 'base/component'
import { html, css } from 'base/utils'

const tag = 'ark-accordion-tab'
export class AccordionTab extends Component {
  constructor () {
    super()
    this.defaultContent = this.defaultContent || this.innerHTML
  }

  /** @param {Object} context */
  init (context = {}) {
    this.header = context.header
    return super.init(context)
  }

  reflectedProperties () {
    return ['header', 'index']
  }

  render () {
    this.content = this.header ? html`
      <div class="ark-accordion-tab__btn-header">
        <small data-accordion-tab-header>${this.header}</small>
      </div>
      <div class="ark-accordion-tab__content">
        ${this.defaultContent}
      </div>
    ` : ''

    return super.render()
  }

  open () {
    this.setAttribute('active', 'true')
  }

  close () {
    this.removeAttribute('active')
  }

  toggle () {
    this.hasAttribute('active') ? this.close() : this.open()
  }
}
Component.define(tag, AccordionTab)
