import { Component } from '../../../base/component/index.js'
import './multiselect.list.js'
import './multiselect.input.js'
import styles from '../styles/index.js'

const tag = 'ark-multiselect'
export class Multiselect extends Component {
  constructor() {
    super()
  }

  init(context = {}) {
    this.label = this.label
    this.field = context.field || this.field || ''
    this.template = context.template || ((data) => `${data}`)
    this.items = context.items || []
    this.global = context.global || window

    return super.init()
  }

  reflectedProperties() {
    return ['label']
  }

  render() {
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
    this._clean = this.select('.ark-multiselect__field--remove')

    this.addListItems()
    this.refreshField()

    return super.render()
  }

  async load() {
    this._field.addEventListener('click', (event) => {
      event.stopPropagation()
      this.showPopup(true)
    })

    const multiselectList = this.select('ark-multiselect-list')

    multiselectList.addEventListener('mouseup', (event) => {
      event.stopPropagation()
      this.showPopup(false)
    })

    multiselectList.addEventListener('click', (event) => {
      const item = event.target
      this.selectItem(item)
    })

    this._field.addEventListener('input', this.filterItems.bind(this))

    this._clean.addEventListener('click', this.cleanTags.bind(this))
    this.addEventListener('keydown', this.keyDownHandler.bind(this))
  }

  async addListItems() {
    await this.select('ark-multiselect-list')
      .init({
        field: this.field,
        template: this.template,
        items: this.items,
      })
      .render()
      .load()
  }

  filterItems() {
    let inputValue = this.select('ark-multiselect-input').value
    const filter = inputValue.toUpperCase()
    const items = this.select('ark-multiselect-list').itemElements
    let text
    items.forEach((item, index) => {
      let name = this.items[index].name
      text = !name ? item.getAttribute('field') : name
      text.toUpperCase().indexOf(filter) > -1
        ? (items[index].style.display = '')
        : (items[index].style.display = 'none')
    })
  }

  showPopup(show) {
    this.isOpened = show
    this._popup.style.display = show ? 'block' : 'none'
  }

  selectItem(item) {
    const items = this.select('ark-multiselect-list').itemElements

    if (item.tagName === 'LI' && !item.hasAttribute('selected')) {
      item.setAttribute('selected', '')
    }

    this.refreshField()

    items.forEach((item) => {
      item.style.display = ''
    })
  }

  refreshField() {
    this._field.innerHTML = this.fieldContent
    const selectedItems = this.querySelectorAll('li[selected]')

    for (let i = 0; i < selectedItems.length; i++) {
      this._field.insertBefore(
        this.createTag(selectedItems[i]),
        this._field.firstElementChild
      )
    }
  }

  createTag(item) {
    const tag = document.createElement('div')
    tag.className = 'ark-multiselect__tag'

    const tagText = document.createElement('div')
    tagText.className = 'ark-multiselect__tag-text'
    tagText.textContent = item.textContent

    const removeButton = document.createElement('div')
    removeButton.className = 'ark-multiselect__tag-remove-button'
    removeButton.addEventListener('click', this.removeTag.bind(this, tag, item))

    tag.addEventListener('click', (e) => e.stopPropagation())
    tag.appendChild(tagText)
    tag.appendChild(removeButton)
    this.emit('alter', this.value)
    return tag
  }

  removeTag(tag, item, event) {
    event.stopPropagation()
    this._field.blur()
    tag.remove()
    item.style.display = 'block'
    item.removeAttribute('selected')
    this.emit('alter', this.value)
  }

  cleanTags(event) {
    event.stopPropagation()
    const selectedItems = this.querySelectorAll('li[selected]')
    for (let i = 0; i < selectedItems.length; i++) {
      selectedItems[i].removeAttribute('selected')
    }
    this.emit('alter', this.value)
    this._field.innerHTML = this.fieldContent
  }

  keyDownHandler(event) {
    switch (event.code) {
      case 'Enter':
        this.select('ark-multiselect-input').firstElementChild.focus()
        break
      case 'Escape':
        this.showPopup(false)
        break
      default:
        this.select('ark-multiselect-input').firstElementChild.focus()
        this.showPopup(true)
    }
  }

  get value() {
    const list = this.select('ark-multiselect-list')
    return list.selectedList.join()
  }
}

Component.define(tag, Multiselect, styles)
