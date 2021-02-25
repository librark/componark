import { Component } from '../../../base/component'
// import { uuid } from '../../../base/utils'
// import { MultiselectInput } from './multiselect.input'
// import { MultiselectList } from './multiselect.list'
// import { MultiselectSelectedItem } from './multiselect.selected-item'
// import { MultiselectSelectedList } from './multiselect.selected-list'

import { styles } from '../styles'

const tag = 'ark-multiselect'
export class Multiselect extends Component {
  constructor () {
    super()
  }

 
  init (context) {
    // this.label = context.label || this.label
    // this.value = context.value || this.value || ''
    // this.field = context.field || this.field || ''
    // this.template = context.template || (data => `${data}`)
    // this.filter = context.filter || (items => items)

    // Local
    // this.selectedList = []
    // this.global = context.global || window

    return super.init()
  }

  reflectedProperties () {
    return ['label']
  }

  render () {
    this.innerHTML = /* html */ `
		`
    return super.render()
  }

  load () {
    
  }

  disconnectedCallback () {
    
  }

}

Component.define(tag, Multiselect, styles)
