import { Component } from '../../component'

export class MultiselectInput extends Component {
  /** @param {{}} context */
  init (context) {
    return super.init()
  }

  render () {
    this.innerHTML = /* html */ `
      <input type="text" listen on-input="onInput" on-keydown="onkeyDown"
        on-blur="onBlur" on-focus="onFocus"/>
		`
    return super.render()
  }

  load () {
    this.addEventListener('click', this.onClick.bind(this))
  }

  /** @param {MouseEvent} event */
  onClick (event) {
    event.stopImmediatePropagation()
    this.input.focus()
  }

  /** @param {KeyboardEvent} event */
  onkeyDown (event) {
    event.stopImmediatePropagation()
    const key = event.key
    this.dispatchCustomEvent('keydown', { key })
  }

  /** @param {event} event */
  onInput (event) {
    event.stopImmediatePropagation()
    this.dispatchCustomEvent('alter')
  }

  /** @param {event} event */
  onFocus (event) {
    event.stopImmediatePropagation()
    this.dispatchCustomEvent('focus')
  }

  /** @param {event} event */
  onBlur (event) {
    event.stopImmediatePropagation()
    this.dispatchCustomEvent('blur')
  }

  dispatchCustomEvent (name, detail = {}) {
    this.dispatchEvent(new CustomEvent(`multiselect-input:${name}`, {
      bubbles: true, detail
    }))
  }

  get input () {
    return /** @type {HTMLInputElement} */(this.querySelector('input'))
  }

  get value () {
    return this.input.value
  }
}
customElements.define('ark-multiselect-input', MultiselectInput)
