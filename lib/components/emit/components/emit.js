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
    const type = this['dispatch'] || 'emit'
    const detail = {}
    this.emit(type, detail)
  }
}
Component.define(tag, Emit)
