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
    <ul class="ark-gallery__thumbnails"></ul>
    <div class="ark-gallery__image">
      <img data-selected-image class="ark-gallery__selected" src="${this.imageList[0]}" alt="product image">
    </div>
    `

    this.moveAttributes()
    this.imageSelected = this.select("[data-selected-image]")
    if (!this.imageSelected.getAttribute("width")) {
      this.imageSelected.style.maxWidth = "100%"
      this.imageSelected.style.minWidth = "250px"
    }
    this.handleImages(this.images)

    return super.render()
  }

  moveAttributes() {
    Array.from(this.attributes).forEach((attribute) => {
      if (attribute.name != "images") {
        this.select("[data-selected-image]").setAttribute(
          attribute.name,
          attribute.value
        )
      }
    })
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

    thumbnail.addEventListener(
      "click",
      this.selectImage.bind(this, this.imageView, image)
    )

    galleryThumbnails.appendChild(thumbnail)
  }

  selectImage(imageView, src, event) {
    const target = event.target
    const image = imageView.firstElementChild
    image.src = src
  }

  get galleryThumbnails() {
    return this.select(".ark-gallery__thumbnails")
  }

  get imageView() {
    return this.select("div.ark-gallery__image")
  }

  get imageList() {
    return this.images.split(",")
  }
}

Component.define(tag, Gallery, styles)
