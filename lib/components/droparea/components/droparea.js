import { Component } from '#base/index.js'
import styles from '../styles/index.js'
import './droparea-preview.js'

/** @import {DropareaPreview} from './droparea-preview.js' */

const tag = 'ark-droparea'
/**
 * Drag-and-drop and file input area.
 * Emits:
 * - `alter` with current media list details.
 */

export class Droparea extends Component {
  constructor () {
    super()
    this._onChange = this.onChange.bind(this)
    this._onOpenInput = this.openInput.bind(this)
  }

  /** @param {object} context
   *  @returns {this} */
  init (context = {}) {
    this.fileList = []
    this.contextFiles = context.contextFiles || this.contextFiles || []
    this.accept = context.accept || this.accept
    this.single = this.hasAttribute('single')
    this.maxSize = context.maxSize || this.maxSize || ''
    return super.init()
  }

  /** @returns {this} */
  render () {
    this._grabSlots()
    this.content = /* html */ `
    <form class="${tag}__form">
      <div data-content class="${tag}__header">
        <div class="${tag}__open">${this.title || 'Upload'}</div>
      </div>
      <ark-droparea-preview></ark-droparea-preview>
    </form>
    `
    this.querySelector('[data-content]').appendChild(
      this._buildFileInput(this.fileInput))
    this.dragDropEvents = ['dragenter', 'dragover', 'dragleave', 'drop']
    this.dragEvents = this.dragDropEvents.slice(0, 2)
    this.dropEvents = this.dragDropEvents.slice(2)
    this._input = this.select('.ark-droparea__input')
    this.openButton = this.select('.ark-droparea__open')

    return super.render()
  }

  /** @returns {string[]} */
  reflectedProperties () {
    return ['size', 'accept', 'maxSize', 'title']
  }

  /** @returns {Promise<void>} */
  async load () {
    this._detachListeners()

    this.dragDropEvents.forEach((eventName) => {
      this.addEventListener(eventName, this.preventDefaults, false)
    })

    this.dragEvents.forEach((eventName) => {
      this.addEventListener(eventName, this.highlight, false)
    })

    this.dropEvents.forEach((eventName) => {
      this.addEventListener(eventName, this.unhighlight, false)
    })

    this.addEventListener('drop', this.handleDrop, false)
    this._input?.addEventListener('change', this._onChange)
    this.openButton?.addEventListener('click', this._onOpenInput)

    /* istanbul ignore else */
    if (this.contextFiles) {
      await this.handleFiles(this.contextFiles)
    }
  }

  /** @returns {void} */
  disconnectedCallback () {
    this._detachListeners()
    super.disconnectedCallback()
  }

  /** @returns {void} */
  _detachListeners () {
    if (this.dragDropEvents) {
      this.dragDropEvents.forEach((eventName) => {
        this.removeEventListener(eventName, this.preventDefaults, false)
      })
    }

    if (this.dragEvents) {
      this.dragEvents.forEach((eventName) => {
        this.removeEventListener(eventName, this.highlight, false)
      })
    }

    if (this.dropEvents) {
      this.dropEvents.forEach((eventName) => {
        this.removeEventListener(eventName, this.unhighlight, false)
      })
    }

    this.removeEventListener('drop', this.handleDrop, false)
    this._input?.removeEventListener('change', this._onChange)
    this.openButton?.removeEventListener('click', this._onOpenInput)
  }

  /** @param {Event} event
   *  @returns {void} */
  openInput (event) {
    event.stopPropagation()
    const input = this.select('[data-input]')
    input.click()
  }

  /** @param {Event} event
   *  @returns {void} */
  preventDefaults (event) {
    event.preventDefault()
    event.stopPropagation()
  }

  /** @param {Event} event
   *  @returns {void} */
  highlight (event) {
    this.dropZone.classList.add('highlight')
  }

  /** @param {Event} event
   *  @returns {void} */
  unhighlight (event) {
    this.dropZone.classList.remove('highlight')
  }

  /** @param {DragEvent} event
   *  @returns {void} */
  handleDrop (event) {
    event.stopPropagation()
    const data = event.dataTransfer
    const files = data.files
    this.handleFiles(files)
  }

  /** @param {Event} event
   *  @returns {void} */
  onChange (event) {
    event.stopPropagation()
    const input = /** @type {HTMLInputElement} */ (event.target)
    const files = input.files
    this.handleFiles(files)
  }

  /** @param {FileList|File[]} files
   *  @returns {void} */
  handleFiles (files) {
    if (this.single) {
      files = [files[0]]
      if (
        files[0] != undefined &&
        this.validate(files) &&
        !this.preview.fileExists(files[0]) &&
        this.maxSizeValidate(files[0])
      ) {
        this.fileList[0] && this.preview.revokeFile(this.fileList[0])
        this.fileList[0] = files[0]
        this.preview.clearPreview()
        this.preview.previewFile(files[0])
      }
    } else {
      files = [...files]
      if (!files.includes(undefined) && this.validate(files)) {
        files.forEach((file) => {
          /* istanbul ignore else */
          if (!this.preview.fileExists(file) && this.maxSizeValidate(file)) {
            this.fileList.push(file)
            this.preview.previewFile(file)
          }
        })
      }
    }
    this.preview.dispatchAlterEvent()
  }

  /**
   * @param {File[]|FileList} fileList
   * @returns {boolean}
   */
  validate (fileList) {
    if (!this.accept || this.accept.length === 0) return true
    const acceptList = this.accept.split(',').map(
      (s) => s.trim().toLowerCase())
    const hasAudio = acceptList.indexOf('audio') >= 0
    const hasVideo = acceptList.indexOf('video') >= 0
    const hasImage = acceptList.indexOf('image') >= 0
    const hasText = acceptList.indexOf('text') >= 0

    for (let i = 0, len = fileList.length; i < len; ++i) {
      const ext = '' + fileList[i].name.split('.').pop().toLowerCase()
      if (acceptList.indexOf(ext) >= 0) continue
      if (hasAudio && fileList[i].type.split('/')[0] === 'audio') continue
      if (hasVideo && fileList[i].type.split('/')[0] === 'video') continue
      if (hasImage && fileList[i].type.split('/')[0] === 'image') continue
      if (hasText && fileList[i].type.split('/')[0] === 'text') continue

      return false
    }

    return true
  }

  /** @param {File} file
   * @returns {boolean} */
  maxSizeValidate (file) {
    return true
  }

  /** @returns {void} */
  _grabSlots() {
    const [fileInput] = [this.slots.general].flat()
    this.fileInput = this.fileInput ?? fileInput
  }

  /** @param {HTMLInputElement|undefined} element
   * @returns {HTMLInputElement} */
  _buildFileInput (element) {
    const input = element ?? document.createElement('input')
    const attributes = [['class', `${tag}__input`],
      ['type', 'file'], ['data-input', ''], ['multiple', '']]
    attributes.forEach(([key, value]) => input.setAttribute(key, value))
    return input
  }
  
  /** @returns {HTMLFormElement} */
  get dropZone () {
    return /** @type {HTMLFormElement} */ (
      this.querySelector('.ark-droparea__form'))
  }

  /** @returns {DropareaPreview} */
  get preview () {
    return /** @type {DropareaPreview} */ (this.select('ark-droparea-preview'))
  }

  /** @returns {Array<{name:string,type:string,size:number,url:string}>} */
  get mediaList () {
    return this.preview.mediaList
  }
}

Component.define(tag, Droparea, styles)
