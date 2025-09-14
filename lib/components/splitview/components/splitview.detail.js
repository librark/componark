import { Component } from "#base/index.js"

const tag = 'ark-splitview-detail'
export class SplitViewDetail extends Component {
  constructor () {
    super()
    this.addEventListener(
      'close', this.onClose.bind(this))
  }

  init (context = {}) {
    this.binding = 'splitview-detail-listen'

    const [main] = this.slots.general

    this.main = this.main || main

    if (this.main && this.main.init) {
      this.main.init(context)
    }

    return super.init(context)
  }

  render () {
    this.content = ''
    this.append(this.main)

    return super.render()
  }

  /** @param {Event} event */
  onClose (event) {
    event.stopPropagation()
    this.hide()
  }

  show () {
    this.removeAttribute('hidden')
  }

  hide () {
    this.setAttribute('hidden', '')
  }
}
Component.define(tag, SplitViewDetail)
