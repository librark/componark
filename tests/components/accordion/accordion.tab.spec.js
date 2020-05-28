import { AccordionTab } from '../../../src/components/accordion'

describe('Accordion Tab', () => {
	it('can open content', () => {
		const tab = new AccordionTab()
		tab.setAttribute('header', 'my header')
		tab.connectedCallback()

		const header = tab.querySelector('[data-accordion-tab-header]')
		expect(header.innerHTML.trim()).toBe('my header')

		tab.open()
		expect(tab.hasAttribute('active')).toBeTruthy()

		tab.close()
		expect(!tab.hasAttribute('active')).toBeTruthy()

		const eventClick = new Event('click')

		tab.toggle(eventClick)
		expect(tab.hasAttribute('active')).toBeTruthy()

		tab.toggle(eventClick)
		expect(!tab.hasAttribute('active')).toBeTruthy()
	})

	it('can open content', () => {
		const tab = new AccordionTab()
		tab.setAttribute('header', '')
		tab.connectedCallback()
		tab.init().render()

		expect(tab.innerHTML.trim()).toBe('')
	})
})
