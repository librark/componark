import { Component } from '../../../base/component/index.js'
import './droparea-preview.js'
import styles from '../styles/index.js'
// @ts-ignore
const tag = 'ark-droparea'

export class Droparea extends Component {
  init(context = {}) {
    this.fileList = []
    this.contextFiles = context.contextFiles || this.contextFiles || []
    this.accept = context.accept || this.accept
    this.single = this.hasAttribute('single')
    this.maxSize = context.maxSize || this.maxSize || ''
    return super.init()
  }

  render() {
    this.content = /* html */ `
    <form class="${tag}__form">
      <div class="${tag}__header">
        <div class="${tag}__open">${this.title || 'Upload'}</div>
        <input id="fileElement"class="${tag}__input" type="file" 
          data-input multiple />
      </div>
      <ark-droparea-preview></ark-droparea-preview>
    </form>
    `
    this.dragDropEvents = ['dragenter', 'dragover', 'dragleave', 'drop']
    this.dragEvents = this.dragDropEvents.slice(0, 2)
    this.dropEvents = this.dragDropEvents.slice(2)
    this._input = this.select('.ark-droparea__input')
    this.openButton = this.select('.ark-droparea__open')

    return super.render()
  }

  reflectedProperties() {
    return ['size', 'accept', 'maxSize', 'title']
  }

  async load() {
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
    this._input.addEventListener('change', this.onChange.bind(this))
    this.openButton.addEventListener('click', this.openInput.bind(this))

    /* istanbul ignore else */
    if (this.contextFiles) {
      await this.handleFiles(this.contextFiles)
    }
  }

  openInput(event) {
    event.stopPropagation()
    const input = this.select('[data-input]')
    input.click()
  }

  preventDefaults(event) {
    event.preventDefault()
    event.stopPropagation()
  }

  highlight(event) {
    this.dropZone.classList.add('highlight')
  }

  unhighlight(event) {
    this.dropZone.classList.remove('highlight')
  }

  handleDrop(event) {
    event.stopPropagation()
    let data = event.dataTransfer
    let files = data.files
    this.handleFiles(files)
  }

  onChange(event) {
    event.stopPropagation()
    const input = event.target
    const files = input.files
    this.handleFiles(files)
  }

  handleFiles(files) {
    if (this.single) {
      files = [files[0]]
      if (
        files[0] != undefined &&
        this.validate(files) &&
        !this.preview.fileExists(files[0]) &&
        this.maxSizeValidate(files[0])
      ) {
        this.fileList[0] = files[0]
        this.preview.querySelector('[data-preview-list]').innerHTML = ''
        this.preview.previewFile(files[0])
      }
    } else {
      files = [...files]
      if (!files.includes(undefined) && this.validate(files)) {
        files.forEach((file) => {
          /*istanbul ignore else*/
          if (!this.preview.fileExists(file) && this.maxSizeValidate(file)) {
            this.fileList.push(file)
            this.preview.previewFile(file)
          }
        })
      }
    }
    this.preview.dispatchAlterEvent()
  }

  validate(fileList) {
    if (!this.accept || this.accept.length === 0) return true
    const acceptList = this.accept.split(',').map(
      (s) => s.trim().toLowerCase())
    const hasAudio = acceptList.indexOf('audio') >= 0
    const hasVideo = acceptList.indexOf('video') >= 0
    const hasImage = acceptList.indexOf('image') >= 0
    const hasText = acceptList.indexOf('text') >= 0

    for (let i = 0, len = fileList.length; i < len; ++i) {
      let ext = '' + fileList[i].name.split('.').pop().toLowerCase()
      if (acceptList.indexOf(ext) >= 0) continue
      if (hasAudio && fileList[i].type.split('/')[0] === 'audio') continue
      if (hasVideo && fileList[i].type.split('/')[0] === 'video') continue
      if (hasImage && fileList[i].type.split('/')[0] === 'image') continue
      if (hasText && fileList[i].type.split('/')[0] === 'text') continue

      return false
    }

    return true
  }

  maxSizeValidate (file) {
    return true
  }

  get dropZone() {
    return this.select('.ark-droparea__form')
  }

  get preview() {
    return this.select('ark-droparea-preview')
  }

  get mediaList() {
    return this.preview.mediaList
  }
}

Component.define(tag, Droparea, styles)
