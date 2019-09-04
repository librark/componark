/** @typedef {import('../../../src/components').Sidebar} Sidebar */
import '../../../src/components/sidebar'

describe('Sidebar', () => {
	it('can be instantiated', () => {
		const item = /** @type {Sidebar} */(document.createElement('ark-sidebar'))
		expect(item).toBeTruthy()

		var init = item.init()
		expect(item === init).toBeTruthy()
	})

	it('can be rendered with content', function () {
		const item = /** @type {Sidebar} */(document.createElement('ark-sidebar'))
		item.innerHTML = /* HTML */`
      <div slot="header">Menu</div>
      <div>body</div>
      <div slot="footer">footer</div>
    `
		item.init({})
		item.connectedCallback()
	})

	it('can be opened with opened attribute', function () {
		const item = /** @type {Sidebar} */(document.createElement('ark-sidebar'))
		const att = document.createAttribute('opened')
		item.setAttributeNode(att)
		item.connectedCallback()

		const isClass = Array.from(item.classList).filter(l =>
			l === 'ark-sidebar--opened').length

		expect(isClass).toBeTruthy()
	})

	it('can be closed', function () {
		const item = /** @type {Sidebar} */(document.createElement('ark-sidebar'))
		const att = document.createAttribute('opened')
		item.setAttributeNode(att)
		item.init({})
		item.connectedCallback()

		item['slots'] = {}

		let isClass = Array.from(item.classList).filter(l =>
			l === 'ark-sidebar--opened').length

		expect(isClass).toBeTruthy()

		item.close()
		isClass = Array.from(item.classList).filter(l =>
			l === 'ark-sidebar--opened').length

		expect(!isClass).toBeTruthy()
	})

	it('can be closed with toggle option', function () {
		const item = /** @type {Sidebar} */(document.createElement('ark-sidebar'))
		const att = document.createAttribute('opened')
		item.setAttributeNode(att)
		item.init({})
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
		const item = /** @type {Sidebar} */(document.createElement('ark-sidebar'))
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
})
