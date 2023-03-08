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
    this.template = context.template || this.template || ((data) => `${data}`)

    return super.init()
  }

  render () {
    const data = JSON.parse(this.querySelector('data')?.textContent || null)
    const source = data || this.source

    const contentTemplate  = this.querySelector('template')?.innerHTML
    this.template = (
      contentTemplate ? this._format(contentTemplate) : this.template)

    this.content = this.template(source)

    return super.render()
  }

  handle (event) {
    const source = event.detail
    this.init({ source }).render()
  }

  _format (template) {
    return (data) => Function(`return \`${template}\``).call(data)
  }
}
Component.define(tag, Capture)
