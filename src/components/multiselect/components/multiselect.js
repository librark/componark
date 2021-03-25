import { Component } from '../../../base/component'
import { MultiselectList } from './multiselect.list'
import { MultiselectInput } from './multiselect.input'
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
    this.fieldContent = /* html */ `
      <ark-multiselect-input></ark-multiselect-input>
    `
    this.innerHTML = /* html */ `
      <h1>${this.label}</h1>
      <div class="ark-multiselect__field" tabindex="0">
        ${this.fieldContent}
      </div>
      <div class="ark-multiselect__field--remove">╳</div>
      <div class="ark-multiselect__popup">
        <ark-multiselect-list><ark-multiselect-list>
      </div>
    `
    
   
    this._popup = this.select('.ark-multiselect__popup')
    this._field = this.select('.ark-multiselect__field')
    this._input = this.select('.ark-multiselect__input')
    this._list = this.select('ark-multiselect-list')
    this._clean = this.select('.ark-multiselect__field--remove')

    this.addListItems()
    //this.filterItems()
    this.refreshField()
    
    return super.render()
  }
  
  load() {
    this._field.addEventListener('click', this.fieldClickHandler.bind(this))
    this._field.addEventListener('focusout', this.focusOut.bind(this))
    this._list.addEventListener('click', this.listClickHandler.bind(this))
    this._field.addEventListener('input', this.inputValue.bind(this))
    this._clean.addEventListener('click',this.cleanTags.bind(this))

  }

  async addListItems(){
     await this._list.init({
          field: this.field,
          template:this.template,
          items:this.items
        }).render().load()
  }

  focusOut(){
    setTimeout(()=>{
      this.close()
    },200)
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
  
  selectItem(item){
    
    if(item.tagName === 'LI' && !item.hasAttribute('selected')){ 
      item.setAttribute('selected', '')
      this.refreshField()
    }
    
  }

  refreshField(){
    this._field.innerHTML = this.fieldContent
    const selectedItems = this.querySelectorAll('li[selected]')
    
      for(let i = 0; i < selectedItems.length; i++){
        this._field.insertBefore(this.createTag(selectedItems[i]),this._field.firstElementChild)
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
    this.dispatchAlertEvent()
    return tag
  }

  removeTag(tag,item,event){
      tag.remove()
      item.style.display = 'block'
      item.removeAttribute('selected')
      this.dispatchAlertEvent()
  }

  cleanTags(item,event){
    const selectedItems = this.querySelectorAll('li[selected]');
    for(let i = 0; i < selectedItems.length; i++){
     selectedItems[i].removeAttribute('selected');
    }
    this.dispatchAlertEvent()
    this._field.innerHTML = this.fieldContent

  }

  dispatchAlertEvent(){
    this.emit('alter', this.value)
  }
  
  open(){
    this.showPopup(true)
  }
  close(){
    this.showPopup(false)
  }

  // get multiselectInput(){
  //   return this.select('ark-multiselect-input')
  // }
  
  get multiselectList () {
    return /** @type {MultiselectList} */(
      this.select('ark-multiselect-list')
    )
  }

  get value () {
    return this.multiselectList.selectedList.join()
  }

  
}

Component.define(tag, Multiselect, styles)