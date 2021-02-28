import { Component } from '../../../base/component'

export class MultiselectList extends Component {
  constructor () {
    super()
    this.selectedIndex = -1
  }

  /**
   * @param {{
   *  field: string
   *  template: function
   *  items: object[],
   *  global?: window
   * }} context
   **/
  init (context) {
    this.field = context.field || ''
    this.template = context.template || (data => `${data}`)
    this.items = context.items || []

    // LOCAL
    this.global = context.global || window

    return super.init()
  }

  render () {
    this.renderItems()

    this.querySelectorAll("[data-item]").forEach(item => {
      item.addEventListener('mouseenter', this.onMouseEnter.bind(this))
      item.addEventListener('mouseleave', this.onMouseleave.bind(this))
    })

    this.addEventListener('click', this.onClick.bind(this))
    this.global.addEventListener('click', event => this.close())

    return super.render()
  }

  disconnectCallback () {
    this.global.removeEventListener('click', event => this.close())
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

  /** @param {MouseEvent} event */
  onMouseEnter (event) {
    event.stopImmediatePropagation()
    const target = /** @type {HTMLElement} */(event.target)
    this.selectItem(target)
  }

  /** @param {MouseEvent} event */
  onMouseleave (event) {
    event.stopImmediatePropagation()
    const target = /** @type {HTMLElement} */(event.target)
    target.removeAttribute('selected')
  }

  /** @param {MouseEvent} event */
  onClick (event) {
    event.stopImmediatePropagation()
    const target = /** @type {HTMLElement} */(event.target)
    const item = /** @type {HTMLElement} */target.closest('li[data-item]')
    if (!item) return


    this.dispatchEvent(new CustomEvent('multiselect-list:add', {
      bubbles: true,
      detail: this.selectedDataItem
    }))
  }

  open () {
    this.setAttribute('show', 'show')
  }

  close () {
    this.selectedIndex = -1
    this.removeAttribute('show')
  }

  selectUp () {
    this.selectedIndex--
    if (this.selectedIndex < 0) this.selectedIndex = this.liElements.length - 1
    this.updateCurrentSelectedItem()
  }

  selectDown () {
    this.selectedIndex++
    if (this.selectedIndex >= this.liElements.length) this.selectedIndex = 0
    this.updateCurrentSelectedItem()
  }

  updateCurrentSelectedItem () {
    if (this.selectedItem) this.selectedItem.removeAttribute('selected')
    const item = this.liElements[this.selectedIndex]
    if (item) item.setAttribute('selected', '')
  }

  clearSelectedItems () {
    this.querySelectorAll('[selected]').forEach(
      item => item.removeAttribute('selected')
    )
  }

  /** @param {HTMLElement} item */
  selectItem (item) {
    item.setAttribute('selected', '')

    let index = 0
    for (let li of this.liElements) {
      index++

      // if (this.liElements[i].hasAttribute('selected')) {
      //   this.selectedIndex = i
      //   continue
      // }
    }
  }

  get selectedItem () {
    return this.querySelector('[selected]')
  }

  get selectedDataItem () {
    const item = this.selectedItem
    const field = item.getAttribute('field')
    const text = item.textContent.trim()
    return { field, text }
  }

  get liElements () {
    return this.querySelectorAll('li')
  }
}
Component.define('ark-multiselect-list', MultiselectList)
