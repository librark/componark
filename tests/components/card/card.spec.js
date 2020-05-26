/** @typedef {import('../../../src/components').Card} Card */
import '../../../src/components/card'

describe('Card', () => {
	it('can be instantiated', () => {
		const element = /** @type {Card} */ (document.createElement('ark-card'))
		expect(element).toBeTruthy()

		const init = element.init()
		expect(element === init).toBeTruthy()
	})

	it('can be rendered without content', function () {
		const element = /** @type {Card} */ (document.createElement('ark-card'))
		element.connectedCallback()
		expect(!element.innerHTML.trim().length).toBeTruthy()
	})

	it('can be rendered with content', function () {
    const element = /** @type {Card} */ (document.createElement('ark-card'))

		element.innerHTML = /* html */`
      <img src="" slot="media"/>
    `
		element.setAttribute('title', 'my title')

		element.init({})
		element.render()
    element.load()
	})
})
