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

    //getting data-img background-image:
    const backgroundImage = image.style.backgroundImage
    const imageSource = backgroundImage.slice(4, -1).replace(/"/g, "")

    thumbnails[0].click()
    expect(imageSource).toBe(gallery.imageList[0].trim())
  })

  it('Attributes are reflected on image', () => {
    container.innerHTML = /* html */ `
    <ark-gallery images="https://myPhoto/dog.png|https://myPhoto/cat.png"
    size="300px" contain>
    </ark-gallery>
    `

    const gallery = container.querySelector('ark-gallery')
    const image = gallery.querySelector('[data-image]')

    expect(image.getAttribute('size')).toBe('300px')
    expect(image.hasAttribute('contain')).toBeTruthy()
  })
})
