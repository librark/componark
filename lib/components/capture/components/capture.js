import { Component } from '../../../base/component/index.js'

const tag = 'ark-capture'
export class Capture extends Component {
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

  _format (template) {
    return (data) => Function(`return \`${template}\``).call(data)
  }
}
Component.define(tag, Capture)
