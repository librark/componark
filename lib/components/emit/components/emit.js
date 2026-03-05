import { Component } from "#base/index.js"

const tag = 'ark-emit'
/**
 * Declarative event forwarding component.
 */
export class Emit extends Component {
  constructor () {
    super()
    this.bind = /** @type {string} */ (this.bind)
    this.receive = /** @type {string} */ (this.receive)
    this.dispatch = /** @type {string} */ (this.dispatch)
    this.source = this._pop(':scope > data')?.textContent
    this.addEventListener(this.receive || 'click', this.handle.bind(this))
  }

  reflectedProperties () {
    return ['receive', 'dispatch', 'bind']
  }

  /** @param {CustomEvent} event
   * @returns {void} */
  handle (event) {
    const detail = Object.assign({}, event.detail)

    let data = null
    if (this.bind && this.source) {
      data = this._resolveBoundData()
    } else if (this.source) {
      data = this._parseJSON(this.source)
    }

    Object.assign(detail, data)

    const value = /** @type {HTMLInputElement|null} */ (event.target)?.value
    if (value) Object.assign(detail, { value })

    const type = this.dispatch || 'emit'
    this.emit(type, detail)
  }

  /** @param {string} selector
   * @returns {Element|null} */
  _pop (selector) {
    const element = this.querySelector(selector)
    element?.remove()
    return element
  }

  /** @returns {any|null} */
  _resolveBoundData () {
    const element = this.closest(this.bind)
    if (!element) return null

    try {
      return Function(`return ${this.source.trim()}`).call(element)
    } catch (error) {
      this.emit('error', error)
      return null
    }
  }

  /** @param {string} source
   * @returns {object|null} */
  _parseJSON (source) {
    try {
      return JSON.parse(source)
    } catch (error) {
      this.emit('error', error)
      return null
    }
  }
}
Component.define(tag, Emit)
