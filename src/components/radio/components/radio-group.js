import './radio-button'

/** @typedef {import('./radio-button').RadioButton} RadioButton */
import { Component } from '../../component'
import { uuidv4 } from '../../../utils'

export class RadioGroup extends Component {
  init(context = {}) {
    this.label = context['label'] || this.label || ''
    this.name = context['name'] || this.name || uuidv4()

    // local variables
    this.defaultContent = this.defaultContent || this.innerHTML
    return super.init()
  }

  reflectedProperties() {
    return ['label']
  }

  render() {
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

  load() {
    this.addEventListener('radio-button:alter', this.onAlter.bind(this))

    return super.load()
  }

  // --------------------------------------------------------------------------
  /** @param {CustomEvent} event */
  onAlter(event) {
    event.stopImmediatePropagation()

    const value = event.detail.value

    this._checkButtons(value)

    this.dispatchEvent(
      new CustomEvent('alter', {
        detail: {
          value: this.value,
          origin: event
        }
      })
    )
  }

  // --------------------------------------------------------------------------

  _checkButtons(value) {
    this.selectAll('ark-radio-button').forEach(
      (/** @type {RadioButton} */ radio) => {
        if (radio.value === value) {
          radio.check()
        } else {
          radio.uncheck()
        }
      }
    )
  }

  _renderRadioButtonList() {
    const container = this.querySelector('[data-radiobutton-list]')
    const radioButtonList = this.selectAll('ark-radio-button')

    radioButtonList.forEach(button => {
      button.setAttribute('name', this.name)
      container.appendChild(button)
    })
  }

  // --------------------------------------------------------------------------

  get value() {
    const button = /** @type {RadioButton} */ (
      this.select('ark-radio-button[checked]')
    )

    return button ? button.value : ''
  }
}
customElements.define('ark-radio-group', RadioGroup)
