/** @typedef {import('../../../src/components').Navbar} Navbar */
import { Nav, Navbar } from '../../../src/components/navbar'

describe('Navbar', () => {
  it('can be instantiated', () => {
    const navbar = /** @type {Navbar} */(document.createElement('ark-navbar'))
    expect(navbar).toBeTruthy()

    var init = navbar.init()
    expect(navbar === init).toBeTruthy()
  })

  it('can be rendered without content', function () {
    const navbar = new Navbar()

    const nav1 = new Nav()
    nav1.setAttribute('brand', '')
    nav1.init().render().load()

    const nav2 = new Nav()
    nav2.init().render().load()

    const nav3 = new Nav()
    nav3.setAttribute('toggler', '')
    nav3.setAttribute('navbar-toggler', '')
    nav3.init().render().load()

    navbar.innerHTML = ''
    navbar.appendChild(nav1)
    navbar.appendChild(nav2)
    navbar.appendChild(nav3)

    navbar.init().render().load()

    navbar.onToggleContent(new Event('click'))

    expect(!nav1.hasAttribute('collapse')).toBeTruthy()
    expect(nav2.hasAttribute('collapse')).toBeTruthy()
    expect(!nav3.hasAttribute('collapse')).toBeTruthy()
  })
})
