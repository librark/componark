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
    this.global = context.global || window

    return super.init()
  }

  render () {
    this.renderItems()
    return super.render()
  }


  async renderItems () {
    let content = this.items.length ? '' : /* html */ `
      <span type="empty" class="ark-multiselect-list__no-options">Sin Opciones</span>
    `
    this.items.forEach((item, index) => {
      const currentField = item[this.field] || item
      content += /* html */`
        <li id="${index}" field="${currentField}" data-item>
          ${this.template(item)}
        </li>
      `
    })
    this.content = content
  }

  get itemElements(){
    return this.selectAll('li')
  }
}

Component.define(tag, MultiselectList)