import { Component } from '../../component'

export class MultiselectList extends Component {
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

    return super.render()
  }

  load () {
    this.addEventListener('click', this.onClick.bind(this))
    this.global.addEventListener('click', event => this.close())
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
    target.setAttribute('active', '')
  }

  /** @param {MouseEvent} event */
  onMouseleave (event) {
    event.stopImmediatePropagation()
    const target = /** @type {HTMLElement} */(event.target)
    target.removeAttribute('active')
  }

  /** @param {MouseEvent} event */
  onClick (event) {
    event.stopImmediatePropagation()
    const target = /** @type {HTMLElement} */(event.target)
    const item = /** @type {HTMLElement} */target.closest('li[data-item]')
    if (!item) return

    const field = item.getAttribute('field')
    const textContent = item.textContent.trim()

    this.dispatchEvent(new CustomEvent('multiselect-list:add', {
      bubbles: true,
      detail: { field, text: textContent }
    }))
  }

  open () {
    this.setAttribute('show', 'show')
  }

  close () {
    this.removeAttribute('show')
  }
}
customElements.define('ark-multiselect-list', MultiselectList)
