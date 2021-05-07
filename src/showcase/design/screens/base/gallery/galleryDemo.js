import { Component } from "base/component"

const tag = "demo-gallery"
export class GalleryDemo extends Component {
  init(context) {
    return super.init(context)
  }

  render() {
    this.innerHTML = /* html */ `
      <h1>Gallery component</h1>

      <ark-gallery images="${this.getImages()}"></ark-gallery>

      <a class="reference" target="_blank" href="https://github.com/knowark/componark/tree/master/src/components/gallery/README.rst">
      * Reference
      </a>
    `

    this.getImages()

    return super.render()
  }
  /* 
  RANDOM IMAGE API
  
  https://source.unsplash.com/random/sig=1 
  
  Products Collections
  
  https://source.unsplash.com/collection/8272759/sig=1
  
  */

  getImages() {
    const images = []

    for (let i = 0; i < 5; i++) {
      images.push(
        `https://source.unsplash.com/collection/9371913/1720x920/?sig=${i}`
      )
    }

    return images.join()
  }
}
const styles = /* css */ `
.demo-gallery{
  width:100%;
}  
.ark-gallery{
    min-width:40%;
    max-width: 50%
  }

h1{
  align-self: flex-start;
}
`
Component.define(tag, GalleryDemo, styles)
