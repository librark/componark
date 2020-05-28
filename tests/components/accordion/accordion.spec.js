import { Accordion, AccordionTab } from '../../../src/components/accordion'

describe('Accordion', () => {
	it('can be instantiated', () => {
		const accordion = new Accordion()

		const tab1 = new AccordionTab()
		tab1.setAttribute('header', 'tab1')
		tab1.init().render()

		const tab2 = new AccordionTab()
		tab2.setAttribute('header', 'tab2')
		tab2.init().render()

		accordion.append(tab1)
		accordion.append(tab2)

		accordion.init().render().load()

		const eventClick = new Event('click')

		tab1.toggle(eventClick)
		tab2.toggle(eventClick)

		expect(tab1.hasAttribute('active')).toBeTruthy()
		expect(tab2.hasAttribute('active')).toBeTruthy()

		tab2.toggle(eventClick)
		expect(!tab2.hasAttribute('active')).toBeTruthy()
	})

	it('can be instantiated multiple', () => {
		const accordion = new Accordion()
		accordion.setAttribute('multiple', '')

		const tab1 = new AccordionTab()
		tab1.setAttribute('header', 'tab1')
		tab1.init().render()

		const tab2 = new AccordionTab()
		tab2.setAttribute('header', 'tab2')
		tab2.init().render()

		accordion.append(tab1)
		accordion.append(tab2)

		accordion.init().render().load()

		expect(accordion.multiple).toBeTruthy()

		const eventClick = new Event('click')

		tab1.toggle(eventClick)
		expect(tab1.hasAttribute('active')).toBeTruthy()
		expect(!tab2.hasAttribute('active')).toBeTruthy()

		tab2.toggle(eventClick)
		expect(!tab1.hasAttribute('active')).toBeTruthy()
		expect(tab2.hasAttribute('active')).toBeTruthy()

		tab2.toggle(eventClick)
		expect(!tab1.hasAttribute('active')).toBeTruthy()
		expect(!tab2.hasAttribute('active')).toBeTruthy()
	})
})
