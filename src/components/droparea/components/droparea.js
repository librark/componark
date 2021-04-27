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
    return super.init()
  }

  render() {
    this.content = /* html */ `
      <form class="ark-droparea__form">
          <ark-icon type="mat" name="cloud_upload"></ark-icon>
          <h1 class="ark-droparea__message">
          Drag & Drop Files 
        </h1>
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

    this.fileList = []
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
    let data = e.dataTransfer
    let files = data.files
    this.handleFiles(files)
  }

  onChange(e) {
    const droparea = this.parentElement.parentElement
    const input = e.target
    const files = input.files
    droparea.handleFiles(files)
  }

  handleFiles(files) {
    files = [...files]
    files.forEach(this.previewFile)
    files.forEach((file) => this.fileList.push(file))
  }


  previewFile(file) {
    const gallery = document.querySelector(".ark-droparea__gallery")
    let reader = new FileReader()
    let fileType = file.type.split("/")[0]
    reader.readAsDataURL(file)
    /* istanbul ignore next */
    reader.onloadend = () => {
      let picture = document.createElement("picture")
      let p = document.createElement("p")
      p.innerText = file.name
      picture.style.backgroundImage = `url('${reader.result}')`
      fileType != "image" ?
        gallery.appendChild(p) :
        gallery.appendChild(picture)
    }
  }

  get dropZone() {
    return this.select(".ark-droparea__form")
  }

  get getFiles() {
    return this.fileList
  }
}
Component.define(tag, Droparea, styles)