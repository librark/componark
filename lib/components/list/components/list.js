import { Component } from '#base/index.js'
import { ListItem } from './item.js'

const tag = 'ark-list'

/**
 * List component (array-driven rendering).
 */
export class List extends Component {
  constructor () {
    super()
    this.addEventListener('click', this._onSelected.bind(this))
    this.addEventListener('delete', this._onDeleted.bind(this))
  }

  /** @param {object} context
   *  @returns {this} */
  init (context = {}) {
    this.source = /** @type {Array} */ (context.source) || this.source || []
    this.template = context.template || this.template || ((data) => `${data}`)

    return super.init()
  }

  /** @returns {this} */
  render () {
    const listData = this.select('data')
    const list = this._parseJSON(listData?.textContent)
    const source = list || this.source
    const sourceList = Array.isArray(source) ? source : []

    const itemTemplate = (this.select('template'))?.innerHTML
    this.template = itemTemplate ? this._format(itemTemplate) : this.template

    this.content = ''

    sourceList.forEach((data, index) => {
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

  /** @param {number} start
   *  @param {number} [deleteCount=1]
   *  @returns {void}
   */
  delete (start, deleteCount = 1) {
    this.source.splice(start, deleteCount)
    const deletions = []
    for (let i = start; i < (deleteCount + start); i++) {
      const item = this.select(`ark-list-item:nth-of-type(${i + 1})`)
      item && deletions.push(item)
    }
    deletions.map(item => item.remove())
  }

  /** @param {string} template
   * @returns {(data: any)=>string} */
  _format (template) {
    let render = null

    try {
      render = Function(`return \`${template}\``)
    } catch (error) {
      this.emit('error', error)
    }

    return (data) => {
      if (!render) return ''

      try {
        return render.call(data)
      } catch (error) {
        this.emit('error', error)
        return ''
      }
    }
  }

  /** @param {MouseEvent} event
   * @returns {void} */
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

  /** @param {MouseEvent} event
   * @returns {void} */
  _onDeleted (event) {
    event.stopImmediatePropagation()

    const target = /** @type {HTMLElement} */ (event.target)
    const item = /** @type {ListItem} */ (target.closest('ark-list-item'))
    if (!item) return

    this.delete(Number(item.index))
  }

  /** @param {string|null} source
   * @returns {any[]|null} */
  _parseJSON (source) {
    if (!source) return null

    try {
      return JSON.parse(source)
    } catch (error) {
      this.emit('error', error)
      return null
    }
  }
}
Component.define(tag, List)
