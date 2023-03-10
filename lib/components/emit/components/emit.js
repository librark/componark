import { Component } from '../../../base/component/index.js'

const tag = 'ark-emit'
export class Emit extends Component {
  constructor () {
    super()
    const type = this['receive'] || 'click'
    this.addEventListener(type, this.handle.bind(this))
  }

  reflectedProperties () {
    return ['receive', 'dispatch']
  }

  handle (event) {
    const detail = Object.assign({}, event.detail)
    const data = JSON.parse(this._pop(':scope > data')?.textContent || null)
    this.source = data || this.source

    if (this.source) {
      Object.assign(detail, this.source)
    }
    const type = this['dispatch'] || 'emit'
    this.emit(type, detail)
  }

  _pop (selector) {
    const element = this.querySelector(selector)
    element?.remove()
    return element
  }
}
Component.define(tag, Emit)
