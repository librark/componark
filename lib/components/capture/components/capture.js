import { Component } from "#base/index.js"

const tag = 'ark-capture'
/** Template-driven renderer component. */
export class Capture extends Component {
  constructor () {
    super()
    this.receive = this.receive || 'emit'
    this.addEventListener(this.receive, this.handle.bind(this))
  }

  reflectedProperties () {
    return ['receive']
  }

  /** @param {object} context
   *  @returns {this} */
  init (context = {}) {
    const data = this._parseJSON(this._pop(':scope > data')?.textContent)
    this.source = /** @type {object} */ (
      context.source) || data || this.source || {}
    this.template = context.template || this.template || (
      (data) => `${JSON.stringify(data)}`)

    return super.init()
  }

  /** @returns {this} */
  render () {
    const outputTemplate = this._pop(':scope > template')?.innerHTML
    this.template = (
      outputTemplate ? this._format(outputTemplate) : this.template)

    const output = this.querySelector(':scope > output')
    if (this.template && output) {
      output.innerHTML = this.template(this.source)
    }

    return super.render()
  }

  /** @param {{detail:any}} event */
  handle (event) {
    const source = event.detail
    this.init({ source }).render()
  }

  /**
   * @param {string} template
   * @returns {(data: any) => string}
   */
  _format (template) {
    let render = null

    try {
      render = Function(`return \`${template}\``)
    } catch (error) {
      this.emit('error', error)
    }

    return (data) => {
      if (!render) return ''

      try {
        return render.call(data)
      } catch (error) {
        this.emit('error', error)
        return ''
      }
    }
  }

  /**
   * @param {string} selector
   * @returns {HTMLElement|null}
   */
  _pop (selector) {
    const element = this.querySelector(selector)
    element?.remove()
    return /** @type {HTMLElement|null} */ (element)
  }

  /**
   * @param {string|null} source
   * @returns {object|null}
   */
  _parseJSON (source) {
    if (!source) return null

    try {
      return JSON.parse(source)
    } catch (error) {
      this.emit('error', error)
      return null
    }
  }
}
Component.define(tag, Capture)
