import { Gallery } from "components/gallery"

describe("Gallery", () => {
  let container = null

  beforeEach(() => {
    container = document.createElement("div")
    document.body.appendChild(container)
  })

  afterEach(() => {
    container.remove()
    container = null
  })

  it("can be instantiated", () => {
    container.innerHTML = /* html */ `
    <ark-gallery></ark-gallery>`

    const gallery = container.querySelector("ark-gallery")

    expect(gallery).toBe(gallery.init())
  })

  it("image thumbnails can be rendered", () => {
    container.innerHTML = /* html */ `
    <ark-gallery images="https://picsum.photos/200/300?random=1, 
                         https://picsum.photos/200/300?random=2, 
                         https://picsum.photos/200/300?random=3">
    </ark-gallery>
    `

    const gallery = container.querySelector("ark-gallery")
    const li = gallery.querySelectorAll("li")

    expect(li.length).toBe(gallery.imageList.length)
  })

  it("image thumbnails can be selected", () => {
    container.innerHTML = /* html */ `
    <ark-gallery images="https://picsum.photos/200/300?random=1, 
                         https://picsum.photos/200/300?random=2, 
                         https://picsum.photos/200/300?random=3">
    </ark-gallery>
    `

    const gallery = container.querySelector("ark-gallery")
    const images = gallery.querySelectorAll(".ark-gallery__thumbnail")
    const selectedImage = gallery.querySelector(".ark-gallery__selected")

    images[1].click()
    expect(selectedImage.src).toBe(gallery.imageList[1].trim())
    images[2].click()
    expect(selectedImage.src).toBe(gallery.imageList[2].trim())
  })

  it("Attribute width and height are reflected on selected image", () => {
    container.innerHTML = /* html */ `
    <ark-gallery images="https://picsum.photos/?random=1, 
                         https://picsum.photos/?random=2, 
                         https://picsum.photos/?random=3"
                 width="1280px"
                 height="720px">
    </ark-gallery>
    `

    const gallery = container.querySelector("ark-gallery")
    const images = gallery.querySelectorAll(".ark-gallery__thumbnail")
    const selectedImage = gallery.querySelector(".ark-gallery__selected")

    expect(selectedImage.getAttribute("width")).toBe("1280px")
    expect(selectedImage.getAttribute("height")).toBe("720px")
  })
})
