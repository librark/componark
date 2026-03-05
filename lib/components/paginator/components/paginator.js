import { Component } from '#base/index.js'
import styles from '../styles/index.js'

const tag = 'ark-paginator'
/**
 * Pagination control component.
 */
export class Paginator extends Component {
  /** @param {object} context
   *  @returns {this} */
  init (context = {}) {
    this.binding = 'paginator-listen'
    this.collectionSize = (
      context.collectionSize || this.collectionSize || '120')
    this.pageSize = context.pageSize || this.pageSize || '60'
    this.currentPage = context.currentPage || this.currentPage || '1'
    this.displayedPages = (
      context.displayedPages || this.displayedPages || '12')

    this.global = context.global || window

    return super.init()
  }

  reflectedProperties () {
    return ['collectionSize', 'pageSize', 'displayedPages', 'currentPage']
  }

  /** @returns {this} */
  render () {
    this._grabSlots()
    this.content = /* html */`
      <div class="ark-paginator__body">
        <div data-start class="ark-paginator__buttons">
        </div>

        <div data-middle paginator-listen on-click="_move"
        class="ark-paginator__pages"></div>

        <div data-end class="ark-paginator__buttons">
        </div>
      </div>
    `

    this.querySelector('[data-start]').appendChild(
      this._buildButton(this.firstButton, '_first', '<<'))
    this.querySelector('[data-start]').appendChild(
      this._buildButton(this.previousButton, '_prev', '<'))

    for (const page of this.currentPages) {
      /** @type {[string, string][]} */
      const attributes = [['data-page', String(page)]]
      if ((Number(page) === Number(this.currentPage))) {
        attributes.unshift(['active', ''])
      }
      this.querySelector('[data-middle]').appendChild(
        this._buildButton(this.pageButton, null, `${page}`, attributes))
    }

    this.querySelector('[data-end]').appendChild(
      this._buildButton(this.nextButton, '_next', '>'))
    this.querySelector('[data-end]').appendChild(
      this._buildButton(this.lastButton, '_last', '>>'))

    return super.render()
  }

  /** @returns {number} */
  get totalPages () {
    return Math.ceil(this.collectionSize / this.pageSize)
  }

  /** @returns {number[]} */
  get currentPages () {
    const displayedPages = Math.min(
      parseInt(this.displayedPages), this.totalPages)
    const currentPage = parseInt(this.currentPage)
    let startPage = Math.max(currentPage - Math.trunc(displayedPages / 2), 1)
    startPage = Math.min(1 + this.totalPages - displayedPages, startPage)

    return Array.from({ length: displayedPages }, (_, i) => i + startPage)
  }

  /** @returns {void} */
  _notifyChange () {
    const page = parseInt(this.currentPage)
    const limit = parseInt(this.pageSize)
    const offset = (page - 1) * limit
    this.emit('page-changed', { page, limit, offset })
  }

  /** @param {number} currentPage */
  /** @param {number} currentPage
   * @returns {void} */
  _setCurrentPage (currentPage) {
    if (currentPage > 0 && currentPage <= this.totalPages) {
      this.currentPage = currentPage
      this.render()
      this._notifyChange()
    }
  }

  /** @param {Event} event
   * @returns {void} */
  _first (event) {
    event.stopPropagation()
    this._setCurrentPage(1)
  }

  /** @param {Event} event
   * @returns {void} */
  _prev (event) {
    event.stopPropagation()
    this._setCurrentPage(parseInt(this.currentPage) - 1)
  }

  /** @param {Event} event
   * @returns {void} */
  _move (event) {
    event.stopPropagation()
    const target = /** @type {HTMLElement} */ (event.target)
    const page = parseInt(target.dataset.page)
    this._setCurrentPage(page)
  }

  /** @param {Event} event
   * @returns {void} */
  _next (event) {
    event.stopPropagation()
    this._setCurrentPage(parseInt(this.currentPage) + 1)
  }

  /** @param {Event} event
   * @returns {void} */
  _last (event) {
    event.stopPropagation()
    this._setCurrentPage(this.totalPages)
  }

  /** @returns {void} */
  _grabSlots() {
    const [pageButton] = [this.slots.page].flat()
    this.pageButton = this.pageButton ?? pageButton
    const [firstButton] = [this.slots.first].flat()
    this.firstButton = this.firstButton ?? firstButton
    const [previousButton] = [this.slots.previous].flat()
    this.previousButton = this.previousButton ?? previousButton
    const [nextButton] = [this.slots.next].flat()
    this.nextButton = this.nextButton ?? nextButton
    const [lastButton] = [this.slots.last].flat()
    this.lastButton = this.lastButton ?? lastButton
  }

  /**
   * @param {HTMLButtonElement|null} element
   * @param {string|null} handler
   * @param {string} content
   * @param {Array<[string,string]>} attributes
   * @returns {HTMLButtonElement}
   */
  _buildButton (element, handler, content, attributes = []) {
    const button = /** @type {HTMLButtonElement} */ (
      (element ?? document.createElement('button')).cloneNode(true))
    button.innerHTML = button.innerHTML || content
    if (handler) {
      button.setAttribute('paginator-listen', '')
      button.setAttribute('on-click', handler)
    }
    attributes.forEach(([key, value]) => button.setAttribute(key, value))
    return button
  }
}

Component.define(tag, Paginator, styles)
