/** @typedef {import('../../../src/components').Navbar} Navbar */
import '../../../src/components/navbar'

describe('Navbar', () => {
	it('can be instantiated', () => {
		const navbar = /** @type {Navbar} */(document.createElement('ark-navbar'))
		expect(navbar).toBeTruthy()

		var init = navbar.init({})
		expect(navbar === init).toBeTruthy()
	})

	it('can be rendered without content', function () {
		const navbar = /** @type {Navbar} */(document.createElement('ark-navbar'))
		navbar.connectedCallback()

		navbar.toggleContent()

		const classList = Array.from(navbar.classList).filter(item =>
			item === 'ark-navbar--show'
		)

		expect(classList.length).toBeTruthy()
	})

	it('can be rendered without content', function () {
		const navbar = /** @type {Navbar} */(document.createElement('ark-navbar'))

		navbar.defaultContent = /* html */ `
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
