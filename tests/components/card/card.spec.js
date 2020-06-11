import { Card } from '../../../src/components/card'

describe('Card', () => {
	it('can be instantiated', () => {
		const element = new Card()
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
		const item = document.createElement('div')
		item.innerHTML = /* html */ `
      <ark-card title="Title" subtitle="Subtitle">
        <img slot="media"/>
        <div>body</div>
        <div slot="action">action</div>
      </ark-card>
    `

		const card = /** @type {Card} */ (item.querySelector('ark-card'))
		card.init().render().load()

		// @ts-ignore
		expect(card.slots.general.length).toBeTruthy()
		// @ts-ignore
		expect(card.slots.media.length).toBeTruthy()
		// @ts-ignore
		expect(card.slots.action.length).toBeTruthy()
	})
})
