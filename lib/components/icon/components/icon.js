import { Component } from '../../../base/component/index.js'

const tag = 'ark-icon'
export class Icon extends Component {
  init (_context = {}) {
    this.type = this.type || 'awe'
    this.name = this.name || 'fas cloud'

    return super.init()
  }

  reflectedProperties () {
    return ['type', 'name']
  }

  render () {
    if (['mat', 'material'].includes(this.type)) {
      this.content = /* html */`<i class="material-icons">${this.name}</i>`
    } else {
      this.content = /* html */`<i class="${this.name}"></i>`
    }

    return super.render()
  }
}
Component.define(tag, Icon)
