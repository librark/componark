import { Accordion, AccordionTab } from '../../../src/components/accordion'

describe('Accordion', () => {
  let container = null
  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    container.remove()
    container = null
  })

  it('can be instantiated', () => {
    container.innerHTML = `
    <ark-accordion>
      <ark-accordion-tab data-tab1 header="First Tab">
        <span>First Content</span>
      </ark-accordion-tab>
      <ark-accordion-tab data-tab2 header="Second Tab">
        <span>Second Content</span>
      </ark-accordion-tab>
    </ark-accordion>
    `
    const accordion = container.querySelector('ark-accordion')
    accordion.init().render()

    const tab1 = accordion.select('[data-tab1]')
    expect(tab1.getAttribute('header')).toEqual('First Tab')
    expect(tab1.getAttribute('index')).toEqual('0')

    const tab2 = accordion.select('[data-tab2]')
    expect(tab2.getAttribute('header')).toEqual('Second Tab')
    expect(tab2.getAttribute('index')).toEqual('1')
  })

  it('can handle events delegation', () => {
    container.innerHTML = `
    <ark-accordion>
      <ark-accordion-tab data-tab1 header="First Tab">
        <span>First Content</span>
      </ark-accordion-tab>
      <ark-accordion-tab data-tab2 header="Second Tab">
        <span>Second Content</span>
      </ark-accordion-tab>
    </ark-accordion>
    `
    const accordion = container.querySelector('ark-accordion')

    const tab1 = accordion.select('[data-tab1]')
    const tab2 = accordion.select('[data-tab2]')

    expect(tab1.hasAttribute('active')).toBeFalsy()
    expect(tab2.hasAttribute('active')).toBeFalsy()

    tab1.click()

    expect(tab1.hasAttribute('active')).toBeTruthy()
    expect(tab2.hasAttribute('active')).toBeFalsy()

    tab2.click()

    expect(tab1.hasAttribute('active')).toBeFalsy()
    expect(tab2.hasAttribute('active')).toBeTruthy()
  })

  it('can have multiple items opened', () => {
    container.innerHTML = `
    <ark-accordion>
      <ark-accordion-tab data-tab1 header="First Tab">
        <span>First Content</span>
      </ark-accordion-tab>
      <ark-accordion-tab data-tab2 header="Second Tab">
        <span>Second Content</span>
      </ark-accordion-tab>
    </ark-accordion>
    `
    const accordion = container.querySelector('ark-accordion')
    accordion.setAttribute('multiple', 'multiple')

    const tab1 = accordion.select('[data-tab1]')
    const tab2 = accordion.select('[data-tab2]')

    expect(tab1.hasAttribute('active')).toBeFalsy()
    expect(tab2.hasAttribute('active')).toBeFalsy()

    tab1.click()

    expect(tab1.hasAttribute('active')).toBeTruthy()
    expect(tab2.hasAttribute('active')).toBeFalsy()

    tab2.click()

    expect(tab1.hasAttribute('active')).toBeTruthy()
    expect(tab2.hasAttribute('active')).toBeTruthy()
  })
})
