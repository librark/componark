import { Component } from "../../../base/component"
import { styles } from "../styles"

const tag = "ark-gallery"

export class Gallery extends Component {
  init(context = {}) {
    this.images = context.images || this.images || []
    return super.init()
  }

  reflectedProperties() {
    return ["images"]
  }

  render() {
    this.content = /* html */ `
    <div class="ark-gallery__image">
      <img src="${this.imageList[0]}" alt="product image">
    </div>
    <ul class="ark-gallery__thumbnails"></ul>
    `
    this.handleImages(this.images)

    return super.render()
  }

  handleImages(images) {
    const imagesList = this.imageList
    imagesList.forEach((image) => {
      this.createThumbnails(image)
    })
  }

  createThumbnails(image) {
    const galleryThumbnails = this.galleryThumbnails
    const thumbnail = document.createElement("li")
    const imageFrame = document.createElement("div")
    imageFrame.style.backgroundImage = `url(${image})`
    thumbnail.className = "ark-gallery__thumbnail"
    thumbnail.appendChild(imageFrame)
    galleryThumbnails.appendChild(thumbnail)
  }

  get galleryThumbnails() {
    return this.select(".ark-gallery__thumbnails")
  }

  get imageList() {
    return this.images.split(",")
  }
}

Component.define(tag, Gallery, styles)
