import { Component } from '../../../base/component'

const tag = 'ark-multiselect-input'
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
    this.addEventListener('click', this.onClick.bind(this))
    return super.render()
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
    this.keydownOptions(key)
  }

  /** @param {event} event */
  onInput (event) {
    event.stopImmediatePropagation()
    //this.input.style.width = `${this.input.scrollWidth}px`
    this.dispatchCustomEvent('alter')
  }

  /** @param {event} event */
  onFocus (event) {
    event.stopImmediatePropagation()
    this.input.setAttribute('focus', 'true')
    this.dispatchCustomEvent('focus')
  }

  /** @param {event} event */
  onBlur (event) {
    event.stopImmediatePropagation()
    this.input.removeAttribute('focus')
    this.dispatchCustomEvent('blur')
  }

  /** @param {string} key */
  keydownOptions (key) {
    let isValid = true
    isValid = !this.input.hasAttribute('focus') || !!!this.input.value.length

    if (isValid) { this.dispatchCustomEvent('keydown', { key }) }
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

  set value (value) {
    this.input.value = value
  }
}

Component.define(tag, MultiselectInput)
