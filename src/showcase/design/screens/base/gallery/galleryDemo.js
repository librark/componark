import { Component } from 'base/component'

const tag = 'demo-gallery'
export class GalleryDemo extends Component {
  init(context) {
    return super.init(context)
  }

  render() {
    this.innerHTML = /* html */ `
      <h1>Gallery component</h1>

      <ark-gallery images="${this.getImages()}" width="400px"></ark-gallery>

      <p>Gallery with single image</p>
      <ark-gallery images="https://i.insider.com/5484d9d1eab8ea3017b17e29?width=600&format=jpeg&auto=webp" width="400px"></ark-gallery>

      <a class="reference" target="_blank" href="https://github.com/knowark/componark/tree/master/src/components/gallery/README.rst">
      * Reference
      </a>
    `

    this.getImages()

    return super.render()
  }

  getImages() {
    const images = []

    for (let i = 0; i < 10; i++) {
      images.push(`https://picsum.photos/id/102${i}/500`)
    }

    return images.join('|')
  }
}

const styles = /* css */ `
.demo-gallery {
  width:100%;
}  

.ark-gallery {
    min-width:40%;
    max-width: 500px;
}

.ark-gallery__image {
  align-items: center;
}

.ark-gallery__selected {
  width: 100%;
}

h1 {
  align-self: flex-start;
}
`
Component.define(tag, GalleryDemo, styles)
