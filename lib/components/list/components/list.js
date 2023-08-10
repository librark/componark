import { Component } from '../../../base/component/index.js'
import { ListItem } from './list.item.js'

const tag = 'ark-list'

export class List extends Component {
  constructor () {
    super()
    this.addEventListener('click', this._onSelected.bind(this))
    this.addEventListener('delete', this.onDeleted.bind(this))
  }

  /** @param {Object} context */
  init (context = {}) {
    this.source = /** @type {Array} */ (context.source) || this.source || []
    this.template = context.template || this.template || ((data) => `${data}`)

    return super.init()
  }

  render () {
    const listData = this.select('data')
    const list = JSON.parse(listData?.textContent || null)
    const source = list || this.source

    const itemTemplate = (this.select('template'))?.innerHTML
    this.template = itemTemplate ? this._format(itemTemplate) : this.template

    this.content = ''

    source.forEach((data, index) => {
      const item = new ListItem()

      if (this.hasAttribute('click-disabled')) {
        item.setAttribute('click-disabled', '')
      }

      this.appendChild(item)

      item.init({
        data,
        template: this.template,
        index
      }).render()
    })

    return super.render()
  }

  /** @param {number} start @param {number?} deleteCount  */
  delete (start, deleteCount = 1) {
    this.source.splice(start, deleteCount)
    const deletions = []
    for (let i = start; i < (deleteCount + start); i++) {
      const item = this.select(`ark-list-item:nth-of-type(${i + 1})`)
      item && deletions.push(item)
    }
    deletions.map(item => item.remove())
  }

  _format (template) {
    return (data) => Function(`return \`${template}\``).call(data)
  }

  /** @param {MouseEvent} event */
  _onSelected (event) {
    event.stopImmediatePropagation()

    const target = /** @type {HTMLElement} */ (event.target)
    const item = /** @type {ListItem} */ (target.closest('ark-list-item'))

    if (!item || item.hasAttribute('click-disabled')) return

    this.dispatchEvent(
      new CustomEvent('list-selected', {
        bubbles: true,
        detail: {
          index: item.index,
          data: item.data,
          origin: event
        }
      })
    )
  }

  /** @param {MouseEvent} event */
  onDeleted (event) {
    event.stopImmediatePropagation()

    const target = /** @type {HTMLElement} */ (event.target)
    const item = /** @type {ListItem} */ (target.closest('ark-list-item'))

    this.delete(Number(item.index))
  }
}
Component.define(tag, List)
