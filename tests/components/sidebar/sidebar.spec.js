import { Sidebar } from 'components/sidebar'

describe('Sidebar', () => {
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
    <ark-sidebar></ark-sidebar>
    `
    const sidebar = container.querySelector('ark-sidebar')
    expect(sidebar).toBeTruthy()

    expect(sidebar).toBe(sidebar.init())
  })

  it('can be opened, closed and toggled', () => {
    container.innerHTML = `
    <ark-sidebar></ark-sidebar>
    `
    const sidebar = container.querySelector('ark-sidebar')

    expect(sidebar.hasAttribute('opened')).toBeFalsy()
    sidebar.open()
    expect(sidebar.hasAttribute('opened')).toBeTruthy()
    sidebar.close()
    expect(sidebar.hasAttribute('opened')).toBeFalsy()
    sidebar.toggle()
    expect(sidebar.hasAttribute('opened')).toBeTruthy()
    sidebar.toggle()
    expect(sidebar.hasAttribute('opened')).toBeFalsy()
  })

  it('can position slotted children elements', () => {
    container.innerHTML = `
    <ark-sidebar>
      <div slot="header" class="first">Custom Header</div>
      <div slot="footer" class="second">Custom Footer</div>
      <ul class="third">
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    </ark-sidebar>
    `
    const sidebar = container.querySelector('ark-sidebar')

    const header = sidebar.select('.ark-sidebar__header')
    expect(header.firstElementChild).toBe(sidebar.select('.first'))

    const footer = sidebar.select('.ark-sidebar__footer')
    expect(footer.firstElementChild).toBe(sidebar.select('.second'))

    const body = sidebar.select('.ark-sidebar__body')
    expect(body.firstElementChild).toBe(sidebar.select('.third'))
  })

  it('closes itself on scrim click', function () {
    container.innerHTML = `
    <ark-sidebar></ark-sidebar>
    `
    const sidebar = container.querySelector('ark-sidebar')

    sidebar.open()
    expect(sidebar.hasAttribute('opened')).toBeTruthy()

    const scrim = sidebar.select('.ark-sidebar__scrim')
    scrim.click()
    expect(sidebar.hasAttribute('opened')).toBeFalsy()
  })
})
