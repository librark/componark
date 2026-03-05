import { Component } from "#base/index.js"

const tag = 'ark-splitview-detail'
/**
 * Detail slot wrapper for split-view component.
 */
export class SplitViewDetail extends Component {
  constructor () {
    super()
    this.addEventListener(
      'close', this.onClose.bind(this))
  }

  /** @param {object} context
   *  @returns {this} */
  init (context = {}) {
    this.binding = 'splitview-detail-listen'

    const [main] = this.slots.general

    this.main = this.main || main

    if (this.main && this.main.init) {
      this.main.init(context)
    }

    return super.init(context)
  }

  /** @returns {this} */
  render () {
    this.content = ''
    this.append(this.main)

    return super.render()
  }

  /** @param {Event} event
   * @returns {void} */
  onClose (event) {
    event.stopPropagation()
    this.hide()
  }

  /** @returns {void} */
  show () {
    this.removeAttribute('hidden')
  }

  /** @returns {void} */
  hide () {
    this.setAttribute('hidden', '')
  }
}
Component.define(tag, SplitViewDetail)
