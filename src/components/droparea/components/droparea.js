import { Component } from "../../../base/component"
import { styles } from "../styles"
// @ts-ignore
const tag = "ark-droparea"

export class Droparea extends Component {
  init(context = {}) {
    this.fileList = []
    return super.init()
  }

  render() {
    this.content = /* html */ `
      <form class="ark-droparea__form">
          <h1 class="ark-droparea__message">
          Drag & Drop Files 
          </h1>
          <p>or click to upload</p>
        <input type="file" 
               class="ark-droparea__input"
               id="fileElem" 
               multiple 
                >
        <div class="ark-droparea__gallery"></div>
      </form>
  `
    this.dragDropEvents = ["dragenter", "dragover", "dragleave", "drop"]
    this.dragEvents = this.dragDropEvents.slice(0, 2)
    this.dropEvents = this.dragDropEvents.slice(2)
    this._input = this.select(".ark-droparea__input")

    return super.render()
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

    this.addEventListener("drop", this.handleDrop, false)
    this._input.addEventListener("change", this.onChange, false)
    this.addEventListener("click", this.openInput, false)
  }

  openInput() {
    const input = this._input
    input.click()
  }

  preventDefaults(e) {
    e.preventDefault()
    e.stopPropagation()
  }

  highlight(e) {
    this.dropZone.classList.add("highlight")
  }

  unhighlight(e) {
    this.dropZone.classList.remove("highlight")
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
    if (this.hasAttribute("single")) {
      files = [files[0]]
      this.fileList[0] = files[0]
      this.gallery.innerHTML = `<div><p>${files[0].name}</p></div>`
    } else {
      files = [...files]
      files.forEach((file) => this.fileList.push(file))
      files.forEach(this.previewFile)
    }
  }

  previewFile(file) {
    const gallery = document.querySelector(".ark-droparea__gallery")
    let reader = new FileReader()
    let fileType = file.type.split("/")[0]
    reader.readAsDataURL(file)
    /* istanbul ignore next */
    reader.onloadend = () => {
      const picture = document.createElement("picture")
      const textPreview = document.createElement("div")
      const p = document.createElement("p")
      textPreview.appendChild(p)
      p.innerText = file.name
      picture.style.backgroundImage = `url('${reader.result}')`
      fileType != "image"
        ? gallery.appendChild(textPreview)
        : gallery.appendChild(picture)
    }
  }

  get dropZone() {
    return this.select(".ark-droparea__form")
  }
  get gallery() {
    return this.select(".ark-droparea__gallery")
  }

  get files() {
    return this.fileList
  }
}
Component.define(tag, Droparea, styles)
