import { Component } from '../../../base/component'

const tag = 'ark-multiselect-list'

export class MultiselectList extends Component {
  constructor () {
    super()
    //this.selectedIndex = -1
  }

  init (context) {
    this.field = context.field || ''
    this.template = context.template || (data => `${data}`)
    this.items = context.items || []

    return super.init()
  }

  render () {
    this.renderItems()
    return super.render()
  }


  renderItems () {
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
    this.innerHTML = content
  }
}

Component.define(tag, MultiselectList)