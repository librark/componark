import { Sidebar } from '../../../src/components/sidebar/components/sidebar'

describe('Sidebar', () => {
  it('can be instantiated', () => {
    const item = new Sidebar()
    expect(item).toBeTruthy()

    const init = item.init()
    expect(item === init).toBeTruthy()
  })

  it('can be rendered with content', function () {
    const item = document.createElement('div')
    item.innerHTML = /* html */ `
      <ark-sidebar>
        <div slot="header">Menu</div>
        <div>body</div>
        <div slot="footer">footer</div>
      </ark-sidebar>
    `

    const sidebar = /** @type {Sidebar} */ (item.querySelector('ark-sidebar'))
    sidebar.init().render().load()

    expect(sidebar.slots.header.length).toBeTruthy()
    expect(sidebar.slots.footer.length).toBeTruthy()
    expect(sidebar.slots.general.length).toBeTruthy()
  })

  it('can be opened with opened attribute', function () {
    const item = new Sidebar()
    const att = document.createAttribute('opened')
    item.setAttributeNode(att)
    item.connectedCallback()

    const isClass = Array.from(item.classList).filter(l =>
      l === 'ark-sidebar--opened').length

    expect(isClass).toBeTruthy()
  })

  it('can be closed', function () {
    const item = new Sidebar()
    const att = document.createAttribute('opened')
    item.setAttributeNode(att)
    item.init({})
    item.connectedCallback()

    item.slots = {}

    let isClass = Array.from(item.classList).filter(l =>
      l === 'ark-sidebar--opened').length

    expect(isClass).toBeTruthy()

    item.close()
    isClass = Array.from(item.classList).filter(l =>
      l === 'ark-sidebar--opened').length

    expect(!isClass).toBeTruthy()
  })

  it('can be closed with toggle option', function () {
    const item = new Sidebar()
    const att = document.createAttribute('opened')
    item.setAttributeNode(att)
    item.init()
    item.connectedCallback()

    let isClass = Array.from(item.classList).filter(l =>
      l === 'ark-sidebar--opened').length

    expect(isClass).toBeTruthy()

    item.toggle()
    isClass = Array.from(item.classList).filter(l =>
      l === 'ark-sidebar--opened').length

    expect(!isClass).toBeTruthy()
  })

  it('can be closed with scrim option', function () {
    const item = new Sidebar()
    const att = document.createAttribute('opened')
    item.setAttributeNode(att)
    item.connectedCallback()

    let isClass = Array.from(item.classList).filter(l =>
      l === 'ark-sidebar--opened').length

    expect(isClass).toBeTruthy()

    const scrim = item.querySelector('.ark-sidebar__scrim')
    // @ts-ignore
    scrim.click()

    isClass = Array.from(item.classList).filter(l =>
      l === 'ark-sidebar--opened').length

    expect(!isClass).toBeTruthy()
  })

  it('can be rendered without slots', function () {
    const item = new Sidebar()

    item.innerHTML = /* html */`
      <div slot="header">Menu</div>
    `

    item.init().render().load()
    item.connectedCallback()

    expect(item.slots).toBeTruthy()
  })
})
