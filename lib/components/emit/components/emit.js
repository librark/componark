import { Component } from "#base/index.js"

const tag = 'ark-emit'
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

  handle (event) {
    const detail = Object.assign({}, event.detail)

    let data = null
    if (this.bind && this.source) {
      const element = this.closest(this.bind)
      data = Function(`return ${this.source.trim()}`).call(element)
    } else if (this.source) {
      data = JSON.parse(this.source)
    }

    Object.assign(detail, data)

    const value = event.target.value
    if (value) Object.assign(detail, { value })

    const type = this.dispatch || 'emit'
    this.emit(type, detail)
  }

  _pop (selector) {
    const element = this.querySelector(selector)
    element?.remove()
    return element
  }
}
Component.define(tag, Emit)
