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
    this.label = this.label
    //this.global = context.global || window
    // this.value = context.value || this.value || ''
    // this.field = context.field || this.field || ''
    // this.template = context.template || (data => `${data}`)
    // this.filter = context.filter || (items => items)

    // Local
    // this.selectedList = []

    return super.init()
  }

  reflectedProperties () {
    return ['label']
  }

  render () {
    this.innerHTML = /* html */ `
    <div class="ark-multiselect"}>
      <h1>${this.label}</h1>
      <div class="ark-multiselect__field" tabindex="0"></div>
      <div class="ark-multiselect__popup">
      HI IM POPUP
      </div>
      </div>
		`
   
    this._popup = this.select('.ark-multiselect__popup')
   
    return super.render()
  }

  load () {
  }
  
  showPopup(show){
    this.isOpened = show
    this._popup.display = show ? 'block' : 'none'
  }

  open(){
    this.showPopup(true)
  }
  close(){
    this.showPopup(false)
  }
  

  // disconnectedCallback () {
    
  // }

  // isRequired () {
  //   return this.hasAttribute('required') ? 'required' : ''
  // }

}

Component.define(tag, Multiselect, styles)
