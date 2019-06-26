/** @typedef {import('../../../src/components').AccordionTab} AccordionTab */
import { Accordion, AccordionTab } from '../../../src/components'

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

    tab1.toggle()
    tab2.toggle()

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

    tab1.toggle()
    tab2.toggle()

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

    tab1.toggle()
    tab2.toggle()

    expect(tab1.hasAttribute('active')).toBeTruthy()
    expect(tab2.hasAttribute('active')).toBeTruthy()
  })
})
