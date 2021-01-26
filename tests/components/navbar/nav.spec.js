import { Nav } from 'components/navbar'

describe('Nav', () => {
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
    container.innerHTML = `
    <ark-nav></ark-nav>
    `
    const nav = container.querySelector('ark-nav')
    expect(nav).toBeTruthy()

    expect(nav).toBe(nav.init())
  })

  it('can be rendered with content', () => {
    container.innerHTML = `
    <ark-nav>
      <span>mySpan</span>
    </ark-nav>
    `
    const nav = container.querySelector('ark-nav')
    const navElement = nav.select('span')
    expect(navElement.textContent).toEqual('mySpan')
  })

  it('can be used to show the brand of the site', () => {
    container.innerHTML = `
    <ark-nav brand>
      <span>Knowark</span>
    </ark-nav>
    `
    const nav = container.querySelector('ark-nav')

    const attributes = Array.from(nav.attributes).map(
      attribute => attribute.nodeName)

    expect(Object.values(attributes)).toEqual(["brand", "class"])
  })

  it('can toggle its visibility', () => {
    container.innerHTML = `
    <ark-nav>
      <span>Knowark</span>
    </ark-nav>
    `
    const nav = container.querySelector('ark-nav')

    nav.toggleVisibility()
    expect(nav.hasAttribute('collapse')).toBeTruthy()
  })
})
