/** @typedef {import('./checkbox').Checkbox} Checkbox */
import { Component } from '../../component'

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
        <small data-checkbox-group-label>${this.label}</small>
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

    checkbox.toggle()

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
    const checkboxList = this.selectAll('ark-checkbox')

    checkboxList.forEach(checkbox => {
      container.appendChild(checkbox)
    })
  }

  /** @returns {string[]} */
  get value () {
    const values = []

    this.selectAll('ark-checkbox[checked]').forEach((
			/** @type {Checkbox} */ checkbox
    ) => values.push(checkbox.value))

    return values
  }

  /** @param {string[]} values */
  set value (values) {
    values.forEach(value => {
      const checkbox = /** @type {Checkbox} */(this.select(
        `ark-checkbox[value="${value}"]`
      ))

      if (checkbox) {
        checkbox.checked = true
        checkbox.render()
      }
    })
  }
}
customElements.define('ark-checkbox-group', CheckboxGroup)
