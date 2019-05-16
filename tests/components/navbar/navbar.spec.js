import '../../../src/components/navbar'

describe('Navbar', () => {
  it('can be instantiated', () => {
    const navbar = document.createElement('ark-navbar')
    expect(navbar).toBeTruthy()

    var init = navbar.init()
    expect(navbar === init).toBeTruthy()
  })

  it('can be rendered without content', function () {
    const navbar = document.createElement('ark-navbar')
    navbar.connectedCallback()

    navbar.toggleContent()

    const classList = Array.from(navbar.classList).filter(item =>
      item === 'ark-navbar--show'
    )

    expect(classList.length).toBeTruthy()
  })

  it('can be rendered without content', function () {
    const navbar = document.createElement('ark-navbar')

    navbar.innerHTML = /* html */ `
      <span ark-navbar-toggle></span>
    `

    navbar.connectedCallback()

    navbar.querySelector('[ark-navbar-toggle]').click()

    const classList = Array.from(navbar.classList).filter(item =>
      item === 'ark-navbar--show'
    )

    expect(classList.length).toBeTruthy()
  })
})
