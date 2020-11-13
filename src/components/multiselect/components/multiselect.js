import { Component } from '../../component'
import { MultiselectInput } from './multiselect.input'
import { MultiselectList } from './multiselect.list'
import { MultiselectSelectedItem } from './multiselect.selected-item'
import { MultiselectSelectedList } from './multiselect.selected-list'
import { uuid } from '../../../utils'


export class Multiselect extends Component {
  constructor () {
    super()
    this.id = this.id || uuid()
  }

  /**
   * @param {{
   *  label?: string
   *  value?: string
   *  field?: string
   *  template?: function
   *  filter?: function
   *  global?
   * }} context
   **/
  init (context) {
    this.label = context.label || this.label
    this.value = context.value || this.value || ''
    this.field = context.field || this.field || ''
    this.template = context.template || (data => `${data}`)
    this.filter = context.filter || (items => items)

    // Local
    this.selectedList = []
    this.global = context.global || window

    return super.init()
  }

  reflectedProperties () {
    return ['label']
  }

  render () {
    this.innerHTML = /* html */ `
      <div id="${this.id}">
        <div class="ark-multiselect__label">
          <label>${this.label}</label>
        </div>
        <div class="ark-multiselect__body">
          <ark-multiselect-selected-list>
            <ark-multiselect-input></ark-multiselect-input>
          </ark-multiselect-selected-list>
          <div class="ark-multiselect__actions">
            <button class="ark-multiselect__remove-all"
            listen on-click="onRemoveAll">&times;</button>
          </div>
        </div>
        <ark-multiselect-list></ark-multiselect-list>
      </div>
		`
    return super.render()
  }

  load () {
    this.addEventListener(
      'multiselect-input:keydown',
      this.onMultiselectInputKeydown.bind(this)
    )
    this.addEventListener(
      'multiselect-input:alter',
      this.onMultiselectInputAlter.bind(this)
    )
    this.addEventListener(
      'multiselect-input:focus',
      this.onMultiselectInputFocus.bind(this)
    )
    this.addEventListener(
      'multiselect-input:blur',
      this.onMultiselectInputBlur.bind(this)
    )
    this.addEventListener(
      'multiselect-list:add',
      this.onMultiselectListAdd.bind(this)
    )
    this.addEventListener(
      'multiselect-selected-list:alter',
      this.onMultiselectSelectedListAlter.bind(this)
    )
    this.addEventListener(
      'multiselect-selected-list:click',
      this.onMultiselectSelectedListClick.bind(this)
    )
    this.global.addEventListener(
      'mouseup', this.onMultiselectMouseup.bind(this)
    )
  }

  disconnectedCallback () {
    this.global.removeEventListener(
      'mouseup', this.onMultiselectMouseup.bind(this)
    )
  }

  /** @param {MouseEvent} event */
  onMultiselectMouseup (event) {
    const target = /** @type {HTMLElement} */(event.target)
    const multiselect = target.closest(`ark-multiselect[id="${this.id}"]`)
    if (!multiselect) this.multiselectList.close()
  }

  /** @param {CustomEvent} event */
  onMultiselectInputKeydown (event) {
    event.stopImmediatePropagation()
    // console.log(">> keydown", event)
  }

  /** @param {CustomEvent} event */
  async onMultiselectInputAlter (event) {
    event.stopImmediatePropagation()
    await this.filterItems()
  }

  /** @param {CustomEvent} event */
  async onMultiselectInputFocus (event) {
    event.stopImmediatePropagation()
    await this.filterItems()
  }

  /** @param {CustomEvent} event */
  onMultiselectInputBlur (event) {
    event.stopImmediatePropagation()
    // this.multiselectList.close()
  }

  /** @param {CustomEvent} event */
  onMultiselectListAdd (event) {
    event.stopImmediatePropagation()
    this.multiselectList.close()

    const field = event.detail.field
    const text = event.detail.text
    const item = new MultiselectSelectedItem()

    item.init({ field, title: text }).render()
    this.multiselectSelectedList.addItem(item)
    this.multiselectInput.input.value = ''
  }

  /** @param {CustomEvent} event */
  onMultiselectSelectedListAlter (event) {
    event.stopImmediatePropagation()
    this.multiselectList.close()
    this.dispatchAlterEvent()
  }

  /** @param {CustomEvent} event */
  onMultiselectSelectedListClick (event) {
    event.stopImmediatePropagation()
    this.multiselectList.open()
    this.multiselectInput.input.focus()
  }

  /** @param {MouseEvent} event */
  onRemoveAll (event) {
    event.stopImmediatePropagation()
    this.multiselectSelectedList.removeItems()
  }

  dispatchAlterEvent () {
    this.dispatchEvent(
      new CustomEvent('alter', {
        detail: {
          value: this.value,
        }
      })
    )
  }

  async filterItems () {
    let items = await this.filter(this.multiselectInput.value)
    const selectedList = this.multiselectSelectedList.value

    items = items.filter(item => !selectedList.find(
      field => (item[this.field] || item).toString() === field
    ))

    this.multiselectList.init({
      field: this.field,
      template: this.template,
      items
    }).render().open()
  }

  get value () {
    if (!this.multiselectSelectedList) return ""
    return this.multiselectSelectedList.value.join()
  }

  set value (value) { }

  get multiselectInput () {
    return /** @type {MultiselectInput} */(
      this.select('ark-multiselect-input')
    )
  }

  get multiselectList () {
    return /** @type {MultiselectList} */(
      this.select('ark-multiselect-list')
    )
  }

  get multiselectSelectedList () {
    return /** @type {MultiselectSelectedList} */(
      this.select('ark-multiselect-selected-list')
    )
  }
}
customElements.define('ark-multiselect', Multiselect)
