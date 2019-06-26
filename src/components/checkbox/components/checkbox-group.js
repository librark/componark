/** @typedef {import('./checkbox').Checkbox} RadioButton */
import { getSlots } from '../../../utils'
import { Component } from '../../component'

export class CheckboxGroup extends Component {
  init (context) {
    this.label = context['label']
    return super.init(context)
  }

  reflectedProperties () {
    return ['label']
  }

  render () {
    this.slots = getSlots(this)

    this.innerHTML = /* html */`
      <div class="ark-checkbox-group__label">
        <small>${this.label}</small>
      </div>
      <div>
        <div class="ark-checkbox-group__list">
          ${this._getCheckbox()}
        </div>
        <div class="ark-checkbox-group__alert">
          ${this._getSlots('alert')}
        </div>
      </div>
    `
    return super.render()
  }

  _getSlots (key) {
    if (!this.slots || !this.slots[key]) { return '' }

    return /* html */`
        ${this.slots[key].map(element => `${element.outerHTML}`).join('')}
      `
  }

  _getCheckbox () {
    const checkboxs = this.selectAll('ark-checkbox')

    var outerHTML = _ => {
      var aux = ''
      checkboxs.forEach(checkbox => {
        aux += checkbox.outerHTML
      })
      return aux
    }

    return checkboxs.length ? outerHTML() : ''
  }

  // ---------------------------------------------------------------------------
  get value () {
    const values = []
    this.querySelectorAll(`ark-checkbox input:checked`).forEach(input => {
      values.push(input['value'])
    })
    return values
  }
}
customElements.define('ark-checkbox-group', CheckboxGroup)
