import { Component } from '../../component'

export class AccordionTab extends Component {
  init (context) {
    return this
  }

  connectedCallback () {
    this.render()
  }

  render () {
    if (!this.header) {
      this.innerHTML = ''
      return
    }

    this.innerHTML = /* html */`
      <button class="ark-accordion-tab__btn-header">
        <span>${this.header}</span>
      </button>
      <div id="ark-accordion-tab__content">
        ${this.innerHTML}
      </div>
    `

    this._listen()
  }

  _listen () {
    this.querySelector('.ark-accordion-tab__btn-header').addEventListener(
      'click', () => { this.toggle() }
    )
  }

  open () {
    this.classList.add(`ark-accordion-tab--show`)
  }

  close () {
    this.classList.remove(`ark-accordion-tab--show`)
  }

  toggle () {
    this.classList.toggle(`ark-accordion-tab--show`)
  }

  // ---------------------------------------------------------------------------

  get header () {
    return this.hasAttribute('header')
  }
}
customElements.define('ark-accordion-tab', AccordionTab)
