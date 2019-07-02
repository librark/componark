/** @typedef {import(
 *  '../../../src/components/accordion').AccordionTab} AccordionTab */

import { AccordionTab } from '../../../src/components/accordion'

describe('Accordion Tab', () => {
  it('can be instantiated', () => {
    const tab = new AccordionTab()
    tab.connectedCallback()
    expect(tab.outerHTML.trim()).toBe('<ark-accordion-tab></ark-accordion-tab>')
  })

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
})
