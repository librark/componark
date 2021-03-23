import { Component } from '../../../base/component'
import { styles } from '../styles'

const tag = 'ark-paginator'
export class Paginator extends Component {
  init (context = {}) {
    this.binding = 'paginator-listen'
    this.collectionSize = (
      context.collectionSize || this.collectionSize || '120')
    this.pageSize = context.pageSize || this.pageSize || '24'
    this.currentPage = context.currentPage || this.currentPage || '1'
    this.displayedPages = (
      context.displayedPages || this.displayedPages || '12')

    this.global = context.global || window

    return super.init()
  }

  reflectedProperties () {
    return ['collectionSize', 'pageSize', 'displayedPages', 'currentPage']
  }

  render () {
    this.content = /* html */ `
      <div class="ark-paginator__body">
        <div class="ark-paginator__buttons">
          <button paginator-listen on-click="_first">&#60;&#60;</button>
          <button paginator-listen on-click="_prev">&#60;</button>
        </div>

        <div paginator-listen on-click="_move" class="ark-paginator__pages">
          ${this.currentPages.map((page) => (
          `<button ${page == this.currentPage ? 'active' : ''} 
            data-page="${page}">${page}</button>`)). join('')}
        </div>

        <div class="ark-paginator__buttons">
          <button paginator-listen on-click="_next">&#62;</button>
          <button paginator-listen on-click="_last">&#62;&#62;</button>
        </div>
      </div>
    `

    return super.render()
  }

  get totalPages () {
    return Math.ceil(this.collectionSize / this.pageSize)
  }

  get currentPages () {
    const displayedPages = parseInt(this.displayedPages)
    const currentPage = parseInt(this.currentPage)
    let startPage = Math.max(currentPage - Math.trunc(displayedPages / 2), 1)
    startPage = Math.min(1 + this.totalPages - displayedPages, startPage)

    return Array.from({length: displayedPages}, (_, i) => i + startPage)
  }

  _notifyChange () {
    const page = parseInt(this.currentPage)
    const pageSize = parseInt(this.pageSize)
    const offset = (page - 1) * pageSize
    this.emit('page-changed', {
      page: page,
      offset: offset,
      limit: offset + pageSize
    })
  }

  /** @param {number} currentPage */
  _setCurrentPage (currentPage) {
    if (currentPage > 0 && currentPage <= this.totalPages) {
      this.currentPage = currentPage
      this.render()
      this._notifyChange()
    }
  }

  /** @param {Event} event */
  _first (event) {
    event.stopPropagation()
    this._setCurrentPage(1)
  }

  /** @param {Event} event */
  _prev (event) {
    event.stopPropagation()
    this._setCurrentPage(parseInt(this.currentPage) - 1)
  }

  /** @param {Event} event */
  _move (event) {
    event.stopPropagation()
    const page = parseInt(event.target.dataset.page)
    this._setCurrentPage(page)
  }

  /** @param {Event} event */
  _next (event) {
    event.stopPropagation()
    this._setCurrentPage(parseInt(this.currentPage) + 1)
  }

  /** @param {Event} event */
  _last (event) {
    event.stopPropagation()
    this._setCurrentPage(this.totalPages)
  }
}

Component.define(tag, Paginator, styles)
