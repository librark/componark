import { Component } from '../../component'

export class AccordionTab extends Component {
  constructor () {
    super()
    this.defaultContent = this.defaultContent || this.innerHTML
    this.index = ''
  }

  /** @param {Object} context */
  init (context = {}) {
    this.header = context.header
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
