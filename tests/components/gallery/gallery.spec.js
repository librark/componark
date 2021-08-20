import { Gallery } from 'components/gallery'

describe('Gallery', () => {
  let container = null

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    container.remove()
    container = null
  })

  it('can be instantiated', () => {
    container.innerHTML = /* html */ `
    <ark-gallery></ark-gallery>`

    const gallery = container.querySelector('ark-gallery')

    expect(gallery).toBe(gallery.init())
  })

  it('image thumbnails can be rendered', () => {
    container.innerHTML = /* html */ `
    <ark-gallery images="https://picsum.photos/200/300?random=1| 
                         https://picsum.photos/200/300?random=2| 
                         https://picsum.photos/200/300?random=3">
    </ark-gallery>
    `

    const gallery = container.querySelector('ark-gallery')
    const li = gallery.querySelectorAll('li')

    expect(li.length).toBe(gallery.imageList.length)
  })

  it('image thumbnails can be selected', () => {
    container.innerHTML = /* html */ `
    <ark-gallery images="https://myphoto/dog.png|https://myphoto/cat.png">
    </ark-gallery>
    `

    const gallery = container.querySelector('ark-gallery')
    const thumbnails = container.querySelectorAll('[data-thumbnail]')
    const image = gallery.querySelector('[data-image]')

    thumbnails[0].click()
    expect(image.src).toBe(gallery.imageList[0].trim())

    thumbnails[1].click()
    expect(image.src).toBe(gallery.imageList[1].trim())
  })

  it('Attribute width and height are reflected on selected image', () => {
    container.innerHTML = /* html */ `
    <ark-gallery images="https://myPhoto/dog.png|https://myPhoto/cat.png"
    width="1280px"
    height="720px">
    </ark-gallery>
    `

    const gallery = container.querySelector('ark-gallery')
    const thumbnails = container.querySelectorAll('[data-thumbnail]')
    const image = gallery.querySelector('[data-image]')

    expect(image.getAttribute('width')).toBe('1280px')
    expect(image.getAttribute('height')).toBe('720px')
  })
})
