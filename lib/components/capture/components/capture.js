import { Component } from '../../../base/component/index.js'

const tag = 'ark-capture'
export class Capture extends Component {
  constructor () {
    super()
    const type = this['receive'] || 'emit'
    this.addEventListener(type, this.handle.bind(this))
  }

  reflectedProperties () {
    return ['receive']
  }

  /** @param {Object} context */
  init (context = {}) {
    this.source = /** @type {object} */ (context.source) || this.source || {}
    this.template = context.template || this.template || (
      (data) => `${JSON.stringify(data)}`)

    return super.init()
  }

  render () {
    const data = JSON.parse(this._pop(':scope > data')?.textContent || null)
    this.source = data || this.source

    const outputTemplate  = this._pop(':scope > template')?.innerHTML
    this.template = (
      outputTemplate ? this._format(outputTemplate) : this.template)

    const output = this.querySelector(':scope > output')
    if (this.template && output) {
      output.innerHTML = this.template(this.source)
    }

    return super.render()
  }

  handle (event) {
    const source = event.detail
    this.init({ source }).render()
  }

  _format (template) {
    return (data) => Function(`return \`${template}\``).call(data)
  }

  _pop (selector) {
    const element = this.querySelector(selector)
    element?.remove()
    return element
  }
}
Component.define(tag, Capture)
