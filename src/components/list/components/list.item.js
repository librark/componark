import { Component } from '../../../base/component'

const tag = 'ark-list-item'
export class ListItem extends Component {
  init (context = {}) {
    this.index = context.index
    this.data = context.data || null
    this.template = context.template || (data => `${data}`)

    return super.init()
  }

  reflectedProperties () {
    return ['index']
  }

  render () {
    this.content = this.template(this.data)


    return super.render()
  }
}
Component.define(tag, ListItem)
