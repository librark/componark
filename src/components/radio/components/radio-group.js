/** @typedef {import('./radio-button').RadioButton} RadioButton */
import { uuidv4 } from '../../../utils'
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
    this.radioButtonList = this.selectAll('ark-radio-button')
    this.selectAll('ark-radio-button').forEach(button => button.remove())

    this.innerHTML = /* html */`
      <div class="ark-radio-group__label">
        <small>${this.label}</small>
      </div>
      <div>
        <div data-radiobutton-list class="ark-radio-group__list"></div>
        <div class="ark-radio-group__alert">
          ${this.innerHTML}
        </div>
      </div>
    `

    this._renderRadioButtonList()
    return super.render()
  }

  get value () {
    const input = this.querySelector(
      `ark-radio-button input[name="${this.name}"]:checked`
    )
    return input ? input['value'] : ''
  }

  // ---------------------------------------------------------------------------
  /** @param {Event} event */
  _change (event) {
    event.stopPropagation()

    const target = (/** @type {RadioButton} */ (event.target))
    target.checked()

    this.dispatchEvent(new CustomEvent('alter', {
      detail: { value: this.value }
    }))
  }

  _renderRadioButtonList () {
    const container = this.querySelector('[data-radiobutton-list]')

    this.radioButtonList.forEach(button => {
      button.setAttribute('name', this.name)
      button.setAttribute('listen', '')
      button.setAttribute('on-alter', '_change')

      if (container) container.appendChild(button)
    })
  }

  _radioButtonEvent (event) {
    event.stopPropagation()
    event.target.checked()
  }
}
customElements.define('ark-radio-group', RadioGroup)
