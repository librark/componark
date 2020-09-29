import './radio-button'

/** @typedef {import('./radio-button').RadioButton} RadioButton */
import { Component } from 'components/component'
import { uuid } from 'utils'

export class RadioGroup extends Component {
  init (context = {}) {
    this.label = context.label || this.label || ''
    this.name = context.name || this.name || uuid()

    // local variables
    this.defaultContent = this.defaultContent || this.innerHTML
    return super.init()
  }

  reflectedProperties () {
    return ['label']
  }

  render () {
    this.innerHTML = /* html */ `
      <div class="ark-radio-group__label">
        <small data-radio-group-label>${this.label}</small>
      </div>
      <div>
        <div data-radiobutton-list class="ark-radio-group__list"></div>
        <div class="ark-radio-group__alert">
          ${this.defaultContent}
        </div>
      </div>
    `

    this._renderRadioButtonList()
    return super.render()
  }

  load () {
    this.addEventListener('click', this.onAlter.bind(this))
  }

  /** @param {CustomEvent} event */
  onAlter (event) {
    event.stopImmediatePropagation()
    const target = /** @type {HTMLElement} */(event.target)
    const button = /** @type {RadioButton} */(
      target.closest('ark-radio-button')
    )

    if (!button) return
    button.check()

    this.radioButtons.forEach(item => {
      if (item.value !== button.value) item.unCheck()
    })

    this.dispatchEvent(
      new CustomEvent('alter', {
        detail: {
          value: this.value,
          origin: event
        }
      })
    )
  }

  _renderRadioButtonList () {
    const container = this.querySelector('[data-radiobutton-list]')
    this.radioButtons.forEach(button => {
      button.setAttribute('name', this.name)
      container.appendChild(button)
    })
  }

  get radioButtons () {
    return /** @type {NodeListOf<RadioButton>} */ (
      this.selectAll('ark-radio-button')
    )
  }

  get value () {
    const button = /** @type {RadioButton} */ (
      this.select('ark-radio-button[checked]')
    )

    return button ? button.value : ''
  }
}
customElements.define('ark-radio-group', RadioGroup)
