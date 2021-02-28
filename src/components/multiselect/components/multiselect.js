import { Component } from '../../../base/component'
import { MultiselectList } from './multiselect.list'
// import { uuid } from '../../../base/utils'
// import { MultiselectSelectedItem } from './multiselect.selected-item'
// import { MultiselectSelectedList } from './multiselect.selected-list'

import { styles } from '../styles'

const tag = 'ark-multiselect'
export class Multiselect extends Component {
  constructor () {
    super()
  }
  
  init(context = {}) {
    this.label = this.label
    this.field = context.field || this.field || ''
    this.template = context.template || (data => `${data}`)
    this.items = context.items || []
    
    return super.init()
  }
  
  reflectedProperties () {
    return ['label']
  }
  
  render () {
    this.innerHTML = /* html */ `
    <div class="ark-multiselect">
    <h1>${this.label}</h1>
    <div class="ark-multiselect__field" tabindex="0">
    <input class="ark-multiselect__input" type="text">
    </div>
    <div class="ark-multiselect__popup">
      <ark-multiselect-list><ark-multiselect-list>
    HI
    </div>
    </div>
    `
   
    this._popup = this.select('.ark-multiselect__popup')
    this._field = this.select('.ark-multiselect__field')
    this._input = this.select('.ark-multiselect__input')
    this._list = this.select('ark-multiselect-list')
    
    this.addListItems()
    
    
    return super.render()
  }
  
  async load() {
    this._field.addEventListener('click', this.fieldClickHandler.bind(this))
    this._field.addEventListener('input', this.inputValue.bind(this))
    //this._input.addEventListener('input', this.popupChange.bind(this))
  }




  addListItems(){
      this._list.init({
          field: this.field,
          template:this.template,
          items:this.items
        }).render()
  }
      
  
  fieldClickHandler(){
    this.isOpened ? this.close() : this.open()
  }
  
  showPopup(show){
    this.isOpened = show
    this._popup.style.display = show ? 'block' : 'none'
  }
  
  inputValue(){
    const value = this._input.value
    return value
  }
  
  open(){
    this.showPopup(true)
  }
  close(){
    this.showPopup(false)
  }
  
  get multiselectList () {
    return /** @type {MultiselectList} */(
      this.select('ark-multiselect-list')
    )
  }

  
}

Component.define(tag, Multiselect, styles)

// popupChange(){
//   this.open()
//   this._popup.innerText = this.inputValue()
// }