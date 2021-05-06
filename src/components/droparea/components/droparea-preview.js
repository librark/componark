import { Component } from "../../../base/component"

import { Droparea } from "./droparea"
// @ts-ignore
const tag = "ark-droparea-preview"

export class DropareaPreview extends Component {
  init(context = {}) {
    return super.init()
  }

  render() {
    this.content = /* html */ `
         <ul class="ark-droparea-preview__list drag-sort-enable"></ul>
        `
    return super.render()
  }

  previewFile(file) {
    const blobUrl = URL.createObjectURL(file)
    const fileType = file.type.split("/")[0]
    const fileList = this.droparea.fileList
    const previewZone = this.select(".ark-droparea-preview__list")
    const picture = document.createElement("li")
    picture.className = "ark-droparea-preview__frame"
    const removeButton = document.createElement("button")
    removeButton.innerText = "⨯"
    removeButton.className = "ark-droparea__remove"

    if (fileType != "image") {
      picture.innerHTML = `<p>${file.name}</p>`
      picture.setAttribute("data", `${blobUrl}`)
    } else {
      picture.style.backgroundImage = `url('${blobUrl}')`
    }

    picture.appendChild(removeButton)
    removeButton.addEventListener("click", this.removeFile.bind(this, file))
    previewZone.appendChild(picture)
    picture.addEventListener("click", this.getFileIndex.bind(this, file))
    picture.setAttribute("draggable", true)
    this.toggleVisibility()
    this.enableDragSort("drag-sort-enable")
  }

  toggleVisibility() {
    const previewZone = this.select(".ark-droparea-preview__list")
    this.files.length !== 0
      ? (previewZone.style.visibility = "visible")
      : (previewZone.style.visibility = "hidden")
  }
  /* DragSort Functionality */
  enableDragSort(listClass) {
    const sortableLists = this.getElementsByClassName(listClass)
    Array.prototype.map.call(sortableLists, (list) => {
      this.enableDragList(list)
    })
  }

  enableDragList(list) {
    Array.prototype.map.call(list.children, (item) => {
      this.enableDragItem(item)
    })
  }

  enableDragItem(item) {
    item.setAttribute("draggable", true)
    item.addEventListener("drag", this.handleDrag.bind(this, item))
    item.addEventListener("dragend", this.handleDrop, false)
  }

  handleDrag(item, event) {
    const selectedItem = item,
      list = selectedItem.parentNode,
      x = event.clientX,
      y = event.clientY

    selectedItem.classList.add("drag-sort-active")
    let swapItem =
      document.elementFromPoint(x, y) === null
        ? selectedItem
        : document.elementFromPoint(x, y)

    if (list === swapItem.parentNode) {
      swapItem =
        swapItem !== selectedItem.nextSibling ? swapItem : swapItem.nextSibling
      list.insertBefore(selectedItem, swapItem)
    }
  }

  handleDrop(item) {
    item.target.classList.remove("drag-sort-active")
  }

  fileExists(file) {
    const present = this.files.some((item) => item.name === file.name)
    return present
  }

  removeFile(file, event) {
    let element = event.target
    const fileIndex = this.droparea.fileList.indexOf(file)
    this.droparea.fileList.splice(fileIndex, 1)
    /* istanbul ignore next */
    element.parentNode.remove()
    this.toggleVisibility()
  }

  getFileIndex(file, event) {
    event.stopPropagation()
    console.log(this.droparea.fileList.indexOf(file))
    return this.droparea.fileList.indexOf(file)
  }

  get droparea() {
    return this.parentNode
  }

  get picture() {
    return this.querySelector(".ark-droparea-preview__image")
  }

  get files() {
    return this.droparea.fileList
  }
}

Component.define(tag, DropareaPreview)

