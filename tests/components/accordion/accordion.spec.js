/** @typedef {import(
 *  '../../../src/components/accordion').AccordionTab} AccordionTab */
import { Accordion, AccordionTab } from '../../../src/components/accordion'

describe('Accordion', () => {
  it('can be instantiated', () => {
    const accordion = new Accordion()
    accordion.connectedCallback()
    expect(accordion.outerHTML.trim()).toBe('<ark-accordion></ark-accordion>')
  })

  it('can open all the tabs', () => {
    const accordion = new Accordion()

    const tab1 = new AccordionTab()
    tab1.setAttribute('header', 'tab 1')
    tab1.connectedCallback()
    accordion.appendChild(tab1)

    const tab2 = new AccordionTab()
    tab2.setAttribute('header', 'tab 2')
    tab2.connectedCallback()
    accordion.appendChild(tab2)

    accordion.connectedCallback()

    const eventClick = new Event('click')

    tab1.toggle(eventClick)
    tab2.toggle(eventClick)

    expect(tab1.hasAttribute('active')).toBeTruthy()
    expect(tab2.hasAttribute('active')).toBeTruthy()
  })

  it('can open only one tabs', () => {
    const accordion = new Accordion()
    accordion.setAttributeNode(document.createAttribute('close-others'))

    const tab1 = new AccordionTab()
    tab1.setAttribute('header', 'tab 1')
    tab1.connectedCallback()
    accordion.appendChild(tab1)

    const tab2 = new AccordionTab()
    tab2.setAttribute('header', 'tab 2')
    tab2.connectedCallback()
    accordion.appendChild(tab2)

    accordion.connectedCallback()

    const eventClick = new Event('click')

    tab1.toggle(eventClick)
    tab2.toggle(eventClick)

    expect(!tab1.hasAttribute('active')).toBeTruthy()
    expect(tab2.hasAttribute('active')).toBeTruthy()
  })

  it('can open all tab with false close-others attribute', () => {
    const accordion = new Accordion()
    accordion.setAttribute('close-others', 'false')

    const tab1 = new AccordionTab()
    tab1.setAttribute('header', 'tab 1')
    tab1.connectedCallback()
    accordion.appendChild(tab1)

    const tab2 = new AccordionTab()
    tab2.setAttribute('header', 'tab 2')
    tab2.connectedCallback()
    accordion.appendChild(tab2)

    accordion.connectedCallback()

    const eventClick = new Event('click')

    tab1.toggle(eventClick)
    tab2.toggle(eventClick)

    expect(tab1.hasAttribute('active')).toBeTruthy()
    expect(tab2.hasAttribute('active')).toBeTruthy()
  })
})
