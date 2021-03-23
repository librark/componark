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
    this.global = context.global || window
    
    return super.init()
  }
  
  reflectedProperties () {
    return ['label']
  }
  
  render () {
    this.className = 'ark-multiselect'
    this.innerHTML = /* html */ `
      <h1>${this.label}</h1>
      <div class="ark-multiselect__field" tabindex="0">
      <input placeholder="Add" class="ark-multiselect__input" type="text">
      </div>
      <div class="ark-multiselect__popup">
        <ark-multiselect-list><ark-multiselect-list>
      HI
      </div>
    `
    
   
    this._popup = this.select('.ark-multiselect__popup')
    this._field = this.select('.ark-multiselect__field')
    this._input = this.select('.ark-multiselect__input')
    this._list = this.select('ark-multiselect-list')

    
    this.addListItems()
    //this.refreshItems()
    //this.filterItems()
    
    return super.render()
  }
  
  async load() {
    this._field.addEventListener('click', this.fieldClickHandler.bind(this))
    this._field.addEventListener('focusout', this.focusOut.bind(this))
    this._list.addEventListener('click', this.listClickHandler.bind(this))
    this._field.addEventListener('input', this.inputValue.bind(this))
    //this._input.addEventListener('blur', this.fieldClickHandler.bind(this))
  }

  addListItems(){
      this._list.init({
          field: this.field,
          template:this.template,
          items:this.items
        }).render().load()
  }

  async focusOut(){
    setTimeout(()=>{this.close()},200)
    this.dispatchEvent
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
    console.log(value)
    return value
  }
  
  selectItem(item){
    
    if(item.tagName === 'LI' && !item.hasAttribute('selected')){ 
      item.setAttribute('selected', '')
      this.refreshField()
      item.remove()
      this.close()
        // let index = 0
        // for (let li of this.multiselectList.itemElements) {
        //   index++
        // }
    }
    
  }

  refreshField(){
    const selectedItems = this.querySelectorAll('li[selected]')

    for(let i = 0; i < selectedItems.length; i++){
      this._field.insertBefore(this.createTag(selectedItems[i]),this._field.firstElementChild)
    }

  }

  refreshItems(){
    const itemElements = this.multiselectList.itemElements
    for(let i=0; i<itemElements.length; i++){
      const itemElement = itemElements[i]
      itemElement.setAttribute("role","option")
      itemElement.setAttribute('aria-selected',itemElement.hasAttribute('selected'))
      itemElement.setAttribute('tabindex','-1')
    }
  }

  listClickHandler(event){
    const item = event.target
    this.selectItem(item)
  }

  createTag(item){
    const tag = document.createElement('div')
    tag.className = 'ark-multiselect__tag'

    const tagText = document.createElement('div')
    tagText.className = 'ark-multiselect__tag-text'
    tagText.textContent = item.textContent
    
    const removeButton = document.createElement('div')
    removeButton.className = 'ark-multiselect__tag-remove-button'
    removeButton.addEventListener('click', this.removeTag.bind(this,tag,item))

    tag.appendChild(tagText)
    tag.appendChild(removeButton)

    console.log(this._field.lastElementChild)

    return tag
  }

  removeTag(tag,item,event){
      tag.remove()
      item.style.display = 'block'
      event.stopPropagation()
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