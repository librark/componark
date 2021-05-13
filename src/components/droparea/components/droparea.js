import { Component } from '../../../base/component'
import { DropareaPreview } from './droparea-preview'
import { styles } from '../styles'
// @ts-ignore
const tag = 'ark-droparea'

export class Droparea extends Component {
  init(context = {}) {
    this.fileList = []
    this.accept = context.accept || this.accept
    this.single = this.hasAttribute('single')
    this.maxSize = context.maxSize || this.maxSize || ''
    return super.init()
  }

  render() {
    this.content = /* html */ `
      <form class="ark-droparea__form">
          <h1 class="ark-droparea__message">
              Drag & Drop 
                  <small>${this.accept ? this.accept : ''} Files </small> 
                  <p data-message></p>
          </h1>
          <div class="ark-droparea__open">or click to upload</div>
        <input type="file" 
               class="ark-droparea__input"
               id="fileElem"
               data-input
               multiple
                >
      </form>
      <ark-droparea-preview></ark-droparea-preview>
      `
    this.dragDropEvents = ['dragenter', 'dragover', 'dragleave', 'drop']
    this.dragEvents = this.dragDropEvents.slice(0, 2)
    this.dropEvents = this.dragDropEvents.slice(2)
    this._input = this.select('.ark-droparea__input')
    this.openButton = this.select('.ark-droparea__open')

    return super.render()
  }

  reflectedProperties() {
    return ['size', 'accept', 'maxSize']
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
    this._input.addEventListener('change', this.onChange, false)
    this.openButton.addEventListener('click', this.openInput, false)
  }

  openInput(e) {
    e.stopPropagation()
    const input = this.nextElementSibling
    input.click()
  }

  preventDefaults(e) {
    e.preventDefault()
    e.stopPropagation()
  }

  highlight(e) {
    this.dropZone.classList.add('highlight')
  }

  unhighlight(e) {
    this.dropZone.classList.remove('highlight')
  }

  handleDrop(e) {
    e.stopPropagation()
    let data = e.dataTransfer
    let files = data.files
    this.handleFiles(files)
  }

  onChange(e) {
    e.stopPropagation()
    const droparea = this.parentElement.parentElement
    const input = e.target
    const files = input.files
    droparea.handleFiles(files)
  }

  handleFiles(files) {
    if (this.single) {
      files = [files[0]]
      /* istanbul ignore else */
      if (
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
      if (this.validate(files)) {
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
    const acceptList = this.accept.split(',').map((s) => s.trim().toLowerCase())
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

  maxSizeValidate(file) {
    if (!this.maxSize) {
      return true
    } else {
      const sizeInMB = (file.size / (1024 * 1024)).toFixed(3)
      const validation = sizeInMB <= this.maxSize
      !validation
        ? (this.select('[data-message]').innerText = 'File too large')
        : (this.select('[data-message]').innerText = '')
      return validation
    }
  }

  get dropZone() {
    return this.select('.ark-droparea__form')
  }

  get preview() {
    return this.select('ark-droparea-preview')
  }
}

Component.define(tag, Droparea, styles)
