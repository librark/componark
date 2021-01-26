import { Nav, Navbar } from 'components/navbar'

describe('Navbar', () => {
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
    <ark-navbar></ark-navbar>
    `
    const navbar = container.querySelector('ark-navbar')
    expect(navbar).toBeTruthy()

    expect(navbar).toEqual(navbar.init())
  })

  it('can toggle the visibility of its nav children', function () {
    container.innerHTML = `
    <ark-navbar>
      <ark-nav data-first brand></ark-nav>
      <ark-nav data-second></ark-nav>
      <ark-nav data-third toggler></ark-nav>
    </ark-navbar>
    `
    const navbar = container.querySelector('ark-navbar')

    const toggler = navbar.select('[toggler]')
    toggler.click()

    const nav1 = navbar.select('[data-first]')  
    const nav2 = navbar.select('[data-second]')  
    const nav3 = navbar.select('[data-third]')  

    expect(nav1.hasAttribute('collapse')).toBeFalsy()
    expect(nav2.hasAttribute('collapse')).toBeTruthy()
    expect(nav3.hasAttribute('collapse')).toBeFalsy()
  })
})
