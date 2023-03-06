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
    const dataElement = this.querySelector(':scope > data')
    if (dataElement) {
      Object.assign(detail, JSON.parse(dataElement.textContent))
    }
    const type = this['dispatch'] || 'emit'
    this.emit(type, detail)
  }
}
Component.define(tag, Emit)
