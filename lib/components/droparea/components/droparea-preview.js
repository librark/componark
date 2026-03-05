import { Component } from '#base/index.js'
import './droparea.js'

/** @import {Droparea} from './droparea.js' */

const tag = 'ark-droparea-preview'
/**
 * Renders file previews and drag-sort ordering.
 */

export class DropareaPreview extends Component {
  constructor () {
    super()
    this._objectUrls = new Map()
    this._onDragEnd = this.handleDrop.bind(this)
  }

  /** @param {object} context
   *  @returns {this} */
  init (context = {}) {
    return super.init()
  }

  /** @returns {void} */
  disconnectedCallback () {
    this.revokeAllFiles()
    super.disconnectedCallback()
  }

  /** @returns {this} */
  render () {
    this.content = /* html */ `
         <ul data-preview-list class="ark-droparea-preview__list drag-sort-enable"></ul>
        `
    return super.render()
  }

  /**
   * @param {File} file
   * @returns {void}
   */
  previewFile (file) {
    const blobUrl = this.getObjectURL(file)
    const fileType = file.type.split('/')[0]
    const previewZone = this.select('[data-preview-list]')
    const picture = document.createElement('li')
    picture.className = 'ark-droparea-preview__frame'
    const removeButton = document.createElement('button')
    removeButton.innerText = '⨯'
    removeButton.className = 'ark-droparea__remove'

    if (fileType != 'image') {
      const text = document.createElement('p')
      text.textContent = file.name
      picture.appendChild(text)
      picture.setAttribute('data', `${blobUrl}`)
    } else {
      picture.style.backgroundImage = `url('${blobUrl}')`
    }

    removeButton.addEventListener('click', this.removeFile.bind(this, file))
    picture.appendChild(removeButton)
    previewZone.appendChild(picture)
    this.toggleVisibility()

    if (!this.droparea.hasAttribute('single')) {
      picture.setAttribute('index', String(this.fileIndex(file)))
      this.enableDragSort('drag-sort-enable')
    }
  }

  /** @returns {void} */
  toggleVisibility () {
    const previewZone = this.select('[data-preview-list]')
    this.files.length !== 0
      ? (previewZone.style.display = 'grid')
      : (previewZone.style.display = 'none')
  }

  /* DragSort Functionality */

  /** @param {string} listClass
   *  @returns {void} */
  enableDragSort (listClass) {
    const sortableLists = this.getElementsByClassName(listClass)
    Array.prototype.map.call(sortableLists, (list) => {
      this.enableDragList(list)
    })
  }

  /** @param {HTMLUListElement} list
   *  @returns {void} */
  enableDragList (list) {
    Array.prototype.map.call(list.children, (item) => {
      this.enableDragItem(item)
    })
  }

  /** @param {HTMLElement} item
   *  @returns {void} */
  enableDragItem (item) {
    if (item.hasAttribute('data-drag-enabled')) return

    item.setAttribute('data-drag-enabled', '')
    item.setAttribute('draggable', 'true')
    item.addEventListener('drag', this.handleDrag.bind(this, item))
    item.addEventListener('dragend', this._onDragEnd, false)
  }

  /* istanbul ignore next */
  /** @param {HTMLLIElement} item
   * @param {DragEvent} event
   * @returns {void} */
  handleDrag (item, event) {
    const selectedItem = item
    const list = /** @type {HTMLElement} */ (selectedItem.parentElement)
    const x = event.clientX
    const y = event.clientY

    selectedItem.classList.add('drag-sort-active')
    let swapItem = /** @type {ChildNode|null} */ (
      document.elementFromPoint(x, y))
    if (!swapItem) swapItem = selectedItem

    if (list && swapItem && list === swapItem.parentNode) {
      swapItem = (
        swapItem !== selectedItem.nextSibling
          ? swapItem
          : swapItem.nextSibling)
      list.insertBefore(selectedItem, /** @type {ChildNode|null} */ (swapItem))
    }
  }

  /** @param {DragEvent} event
   * @returns {void} */
  handleDrop (event) {
    const target = /** @type {HTMLElement|null} */ (event.target)
    if (!target) return
    const droparea = /** @type {Droparea|null} */ (target.closest('ark-droparea'))
    if (!droparea) return

    droparea.preview.createNewFileList()
    target.classList.remove('drag-sort-active')
    droparea.preview.dispatchAlterEvent()
  }
  /* ---------------------------------------------------- */

  /** @returns {void} */
  dispatchAlterEvent () {
    this.emit('alter', this.mediaList)
  }

  /** @returns {void} */
  createNewFileList () {
    const nodeList = this.querySelectorAll('li')
    const newList = []
    nodeList.forEach((item, index) => {
      newList.push(this.droparea.fileList[item.getAttribute('index')])
      item.setAttribute('index', String(index))
    })
    this.droparea.fileList = newList
  }

  /**
   * @param {File} file
   * @returns {boolean}
   */
  fileExists (file) {
    return this.files.some((item) => item.name === file.name)
  }

  /** @param {File} file
   * @returns {string} */
  getObjectURL (file) {
    if (this._objectUrls.has(file)) return this._objectUrls.get(file)

    const url = URL.createObjectURL(file)
    this._objectUrls.set(file, url)
    return url
  }

  /** @param {File} file
   * @returns {void} */
  revokeFile (file) {
    const url = this._objectUrls.get(file)
    if (!url) return

    this._objectUrls.delete(file)
    URL.revokeObjectURL?.(url)
  }

  /** @returns {void} */
  revokeAllFiles () {
    for (const url of this._objectUrls.values()) {
      URL.revokeObjectURL?.(url)
    }
    this._objectUrls.clear()
  }

  /** @returns {void} */
  clearPreview () {
    const previewZone = this.select('[data-preview-list]')
    previewZone && (previewZone.textContent = '')
    this.toggleVisibility()
  }

  /** @param {File} file
   * @param {MouseEvent} event
   * @returns {void} */
  removeFile (file, event) {
    const element = /** @type {HTMLElement|null} */ (event.target)
    if (!element) return
    const fileIndex = this.droparea.fileList.indexOf(file)
    if (fileIndex < 0) return

    this.revokeFile(file)
    this.droparea.fileList.splice(fileIndex, 1)
    element.parentElement?.remove()
    this.selectAll('li').forEach((item, index) =>
      item.setAttribute('index', String(index))
    )
    this.toggleVisibility()
    this.dispatchAlterEvent()
  }

  /** @param {File} file
   * @returns {number} */
  fileIndex (file) {
    return this.droparea.fileList.indexOf(file)
  }

  /** @returns {Droparea} */
  get droparea () {
    return /** @type {Droparea} */ (this.closest('ark-droparea'))
  }

  /** @returns {Array<{name:string,type:string,size:number,url:string}>} */
  get mediaList () {
    const mediaList = []
    this.droparea.fileList.map((file) => {
      mediaList.push({
        name: file.name,
        type: file.type,
        size: file.size,
        url: this.getObjectURL(file)
      })
    })
    return mediaList
  }

  get files () {
    return this.droparea.fileList
  }
}

Component.define(tag, DropareaPreview)
