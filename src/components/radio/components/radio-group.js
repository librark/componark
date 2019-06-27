/** @typedef {import('./radio-button').RadioButton} RadioButton */
import { getSlots, uuidv4 } from '../../../utils'
import { Component } from '../../component'

export class RadioGroup extends Component {
  init (context) {
    this.label = context['label']
    this.name = context['name'] || this.name || uuidv4()
    return super.init(context)
  }

  reflectedProperties () {
    return ['label']
  }

  render () {
    this.slots = getSlots(this)

    this.innerHTML = /* html */`
      <div class="ark-radio-group__label">
        <small>${this.label}</small>
      </div>
      <div>
        <div class="ark-radio-group__list">
          ${this._getRadioButtons()}
        </div>
        <div class="ark-radio-group__alert">
          ${this._getSlots('alert')}
        </div>
      </div>
    `
    return super.render()
  }

  get value () {
    const input = this.querySelector(
      `ark-radio-button input[name="${this.name}"]:checked`
    )
    return input ? input['value'] : ''
  }

  // ---------------------------------------------------------------------------

  _getSlots (key) {
    if (!this.slots || !this.slots[key]) { return '' }

    return /* html */`
        ${this.slots[key].map(element => `${element.outerHTML}`).join('')}
      `
  }

  _getRadioButtons () {
    const buttons = this.selectAll('ark-radio-button')

    var outerHTML = _ => {
      var aux = ''
      buttons.forEach(button => {
        button.setAttribute('name', this.name)
        button.setAttribute('listen', 'listen')
        button.setAttribute('on-radiobutton:click', '_radioButtonEvent')
        aux += button.outerHTML
      })
      return aux
    }

    return buttons.length ? outerHTML() : ''
  }

  _radioButtonEvent (event) {
    event.stopPropagation()
    event.target.checked()
  }
}
customElements.define('ark-radio-group', RadioGroup)
