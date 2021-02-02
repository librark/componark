import { RadioButton } from './radio-button'
import { Component } from '../../../base/component'
import { uuid } from '../../../base/utils'
import { styles } from '../styles'

const tag = 'ark-radio-group'
export class RadioGroup extends Component {
  constructor () {
    super()
    this.defaultContent = this.defaultContent || this.innerHTML
    this.name = uuid()
  }

  /**
   * @param {{
   *  label?: string
   * }} context
   */
  init (context = {}) {
    this.label = context.label || this.label || ''
    return super.init()
  }

  reflectedProperties () {
    return ['label']
  }

  render () {
    this.innerHTML = /* html */ `
      <div class="ark-radio-group__label">
        <label data-radio-group-label>${this.label}</label>
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

    this.radioButtons.forEach(
      item => item.checked = item.value === button.value
    )

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
      container.appendChild(button.init({ name: this.name }).render())
    })
  }

  get radioButtons () {
    return /** @type {NodeListOf<RadioButton>} */ (
      this.selectAll('ark-radio-button')
    )
  }

  /** @returns {string} */
  get value () {
    const button = /** @type {RadioButton} */ (
      this.select('ark-radio-button[checked]')
    )
    return button ? button.value : ''
  }

  /** @param {string} value */
  set value (value) {
    const button = /** @type {RadioButton} */ (
      this.select(`ark-radio-button[value="${value}"]`)
    )
    if (button) button.checked = true
  }
}
Component.define(tag, RadioGroup,styles)
