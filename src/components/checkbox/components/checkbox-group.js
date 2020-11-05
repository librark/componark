import { Component } from '../../component'
import { Checkbox } from './checkbox'

export class CheckboxGroup extends Component {
  init (context = {}) {
    this.label = context.label

    // local variables
    this.defaultContent = this.defaultContent || this.innerHTML

    return super.init()
  }

  reflectedProperties () {
    return ['label']
  }

  render () {
    this.innerHTML = /* html */ `
      <div class="ark-checkbox-group__label">
        <label data-checkbox-group-label>${this.label}</label>
      </div>
      <div>
        <div data-checkbox-list class="ark-checkbox-group__list"></div>
        <div class="ark-checkbox-group__alert">
          ${this.defaultContent}
        </div>
      </div>
    `

    this._renderCheckboxList()
    return super.render()
  }

  load () {
    this.addEventListener('click', this.onAlter.bind(this))
  }

  /** @param {CustomEvent} event */
  onAlter (event) {
    event.stopImmediatePropagation()

    const target = /** @type {HTMLElement} */(event.target)
    const checkbox = /** @type {Checkbox} */ (target.closest('ark-checkbox'))

    if (!checkbox) return

    checkbox.checked = !checkbox.checked

    this.dispatchEvent(
      new CustomEvent('alter', {
        detail: {
          value: this.value,
          origin: event
        }
      })
    )
  }

  _renderCheckboxList () {
    const container = this.querySelector('[data-checkbox-list]')
    this.checkboxList.forEach(checkbox => {
      container.appendChild(checkbox)
    })
  }

  get checkboxList () {
    return /** @type {NodeListOf<Checkbox>} */(this.selectAll('ark-checkbox'))
  }

  /** @returns {string} */
  get value () {
    const values = []

    this.selectAll('ark-checkbox[checked]').forEach((
			/** @type {Checkbox} */ checkbox
    ) => values.push(checkbox.value))

    return values.join()
  }

  /** @param {string} values */
  set value (values) {
    const currentValues = (values || '').split(',')
    this.checkboxList.forEach(checkbox => checkbox.checked = Boolean(
      currentValues.find(value => value === checkbox.value)
    ))
  }
}
customElements.define('ark-checkbox-group', CheckboxGroup)
