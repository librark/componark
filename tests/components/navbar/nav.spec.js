import { Nav } from '../../../src/components/navbar'

describe('Nav', () => {
	it('can be instantiated', () => {
		const nav = /** @type {Nav} */(document.createElement('ark-nav'))
		expect(nav).toBeTruthy()

		const init = nav.init({})
		expect(nav === init).toBeTruthy()
	})

	it('can be rendered with content', function () {
		const nav = /** @type {Nav} */(document.createElement('ark-nav'))
		nav.innerHTML = /* HTML */`
      <span>mySpan</span>
    `
		nav.connectedCallback()
		const navElement = nav.querySelector('span')
		expect(navElement.textContent).toEqual('mySpan')
	})

	it('can be rendered with content', function () {
		const nav = new Nav()
		nav.setAttribute('brand', '')

		nav.init().render().load()

		nav.toggleHide()
	})

	it('can be toggle hide', function () {
		const nav = new Nav()
		nav.init().render().load()

		nav.toggleHide()

		expect(nav.style.display).toEqual('flex')

		nav.toggleHide()

		expect(nav.style.display).toEqual('none')
	})
})
