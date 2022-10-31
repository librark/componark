import { Component } from '../../../base/component/index.js'
import styles from '../styles/index.js'

const tag = 'ark-gallery'

export class Gallery extends Component {
  init(context = {}) {
    this.images = context.images || this.images || []
    this.size = context.size || this.size || '150px'
    return super.init()
  }

  reflectedProperties() {
    return ['images', 'size']
  }

  render() {
    if (this.imageList.length === 1) {
      this.content = /* html */ `
      <div single class="ark-gallery__images">
        <div data-image style="background-image: url('${this.imageList[0]}'); height:${this.size}"></div>
        </div>
        `
      } else {
        this.content = /* html */ `
        <ul data-thumbnails class="ark-gallery__thumbnails"></ul>
        <div class="ark-gallery__images">
        <div data-image style="background-image: url('${this.imageList[0]}'); height:${this.size};"></div>
       </div>
       `

      this.imageList.forEach((image) => {
        this.createThumbnails(image)
      })
    }

    this.moveAttributes()

    return super.render()
  }

  async load() {
    const thumbnails = this.select('[data-thumbnails]')
    if (thumbnails) {
      thumbnails.addEventListener('click', this.selectImages.bind(this))
    }
  }

    moveAttributes() {
    Array.from(this.attributes).forEach((attribute) => {
      if (attribute.name != 'images') {
        this.select('[data-image]').setAttribute(
          attribute.name,
          attribute.value
        )
      }
    })
  }

  selectImages(event) {
    let thumbnail = event.target.closest('[data-thumbnail]')
    /*istanbul ignore else*/
    if (thumbnail) {
      thumbnail = thumbnail.style.backgroundImage
      const image = thumbnail.slice(4, -1).replace(/"/g, '')
      this.select('[data-image]').style.backgroundImage = `url('${image}')`
    }
  }

  createThumbnails(image) {
    const galleryThumbnails = this.select('[data-thumbnails]')
    const thumbnail = /*html*/ `
      <li class="ark-gallery__thumbnail">
        <div data-thumbnail style="background-image:url(${image});">
        </div>
      </li>
    `
    galleryThumbnails.innerHTML += thumbnail
  }

  get imageList() {
    return this.images.split('|')
  }
}

Component.define(tag, Gallery, styles)