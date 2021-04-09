import { Component } from '../../../base/component'

const tag = 'ark-splitview-detail'
export class SplitViewDetail extends Component {
  init(context = {}) {
    this.binding = 'splitview-detail-listen'

    const slots = this.slots()

    const [main] = slots['general']
    const [icon] = slots['icon'] || []

    this.main = this.main || main
    this.icon = this.icon || icon

    if (this.main && this.main.init) {
      this.main.init(context)
    }

    return super.init(context)
  }

  reflectedProperties() {
    return ['title']
  }

  render () {
    this.content = `
    <div class="ark-splitview-detail__header">
      <button splitview-detail-listen on-click="hide"
        class="ark-splitview-detail__close">
      </button>
      <div data-master-title class="ark-splitview-detail__title">
        ${this.title}
      </div>
    </div>
    <div class="ark-splitview-detail__main">
    </div>
    `

    this.select('.ark-splitview-detail__close').append(this.icon)
    this.select('.ark-splitview-detail__main').append(this.main)

    if (this.main && this.main.render) {
      this.main.render()
    }
   
    return super.render()
  }

  show () {
    this.removeAttribute('hidden')
  }

  hide () {
    this.setAttribute('hidden', '')
  }

  toggle () {
    this.toggleAttribute('hidden')
  }
}
Component.define(tag, SplitViewDetail)
