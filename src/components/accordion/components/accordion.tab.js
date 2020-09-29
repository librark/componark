import { Component } from 'components/component'

export class AccordionTab extends Component {
  /** @param {Object} context */
  init (context = {}) {
    this.header = context.header

    // local variables
    this.defaultContent = this.defaultContent || this.innerHTML
    this.index = this.index || null

    return super.init()
  }

  reflectedProperties () {
    return ['header', 'index']
  }

  render () {
    this.innerHTML = this.header ? this.innerHTML = /* html */ `
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
customElements.define('ark-accordion-tab', AccordionTab)
