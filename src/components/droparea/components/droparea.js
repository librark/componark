import {
  Component
} from "../../../base/component"
import {
  styles
} from "../styles"
// @ts-ignore
const tag = "ark-droparea"

export class Droparea extends Component {
  init(context = {}) {
    this.fileList = []
    this.accept = context.accept || this.accept
    return super.init()
  }

  render() {
    this.content = /* html */ `
      <form class="ark-droparea__form">
          <h1 class="ark-droparea__message">
              Drag & Drop 
                  <small>${this.accept ? this.accept : ""} Files</small> 
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

  reflectedProperties() {
    return ["size", "accept"]
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
      if (this.validate(files)) {
        this.fileList[0] = files[0]
        this.gallery.innerHTML = `<div><p>${files[0].name}</p></div>`
      }
    } else {
      files = [...files]
      if (this.validate(files)) {
        files.forEach((file) => {
          this.fileList.push(file)
          this.previewFile(file)
          this.validate(files)
        })
      }
    }
  }

  validate(fileList) {
    if (!this.accept || this.accept.length === 0) return true
    const acceptList = this.accept.split(",").map((s) => s.trim().toLowerCase())
    if (acceptList.length === 0) return true
    const hasAudio = acceptList.indexOf("audio/*") >= 0
    const hasVideo = acceptList.indexOf("video/*") >= 0
    const hasImage = acceptList.indexOf("image/*") >= 0
    const hasText = acceptList.indexOf("text/*") >= 0

    for (let i = 0, len = fileList.length; i < len; ++i) {
      let ext = "." + fileList[i].name.split(".").pop().toLowerCase()
      if (acceptList.indexOf(ext) >= 0) continue
      if (hasAudio && fileList[i].type.split("/")[0] === "audio") continue
      if (hasVideo && fileList[i].type.split("/")[0] === "video") continue
      if (hasImage && fileList[i].type.split("/")[0] === "image") continue
      if (hasText && fileList[i].type.split("/")[0] === "text") continue
      if (acceptList.indexOf(fileList[i].type) >= 0) continue

      // did not match anything in accept
      const message = `${fileList[i].name} is not valid a valid file format, only accepts ${this.accept} files`
      //alert(message)
      return false
    }

    return true
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
      fileType != "image" ?
        gallery.appendChild(textPreview) :
        gallery.appendChild(picture)
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