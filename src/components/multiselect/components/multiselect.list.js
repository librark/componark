import { Component } from '../../../base/component'

const tag = 'ark-multiselect-list'

export class MultiselectList extends Component {
  constructor () {
    super()
    //this.selectedIndex = -1
  }

  init (context = {}) {
    this.field = context.field || ''
    this.template = context.template 
    this.items = context.items || []

    return super.init()
  }

  render () {
    this.renderItems()
    return super.render()
  }


  async renderItems () {
    let content = this.items.length ? '' : /* html */ `
      <span class="ark-multiselect-list__no-options">Sin Opciones</span>
    `
    this.items.forEach((item, index) => {
      const currentField = item[this.field] || item
      content += /* html */`
        <li id="${index}" field="${currentField}" type="none" data-item>
          ${this.template(item)}
        </li>
      `
    })
    this.content = content
  }
}

Component.define(tag, MultiselectList)