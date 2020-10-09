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

    expect(!tab1.hasAttribute('active')).toBeTruthy()
    expect(!tab2.hasAttribute('active')).toBeTruthy()

    const hederTab1 = /** @type {HTMLElement} */(
      tab1.querySelector('.ark-accordion-tab__btn-header')
    )

    const hederTab2 = /** @type {HTMLElement} */(
      tab2.querySelector('.ark-accordion-tab__btn-header')
    )

    hederTab1.click()
    expect(tab1.hasAttribute('active')).toBeTruthy()
    expect(!tab2.hasAttribute('active')).toBeTruthy()

    hederTab2.click()
    expect(!tab1.hasAttribute('active')).toBeTruthy()
    expect(tab2.hasAttribute('active')).toBeTruthy()
  })

  it('can be event delegation', () => {
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

    expect(!tab1.hasAttribute('active')).toBeTruthy()
    expect(!tab2.hasAttribute('active')).toBeTruthy()

    tab1.click()

    expect(!tab1.hasAttribute('active')).toBeTruthy()
    expect(!tab2.hasAttribute('active')).toBeTruthy()

    const heder = /** @type {HTMLElement} */(
      tab1.querySelector('.ark-accordion-tab__btn-header')
    )

    if (heder) heder.click()

    expect(tab1.hasAttribute('active')).toBeTruthy()
    expect(!tab2.hasAttribute('active')).toBeTruthy()
  })

  it('can be instantiated multiple', () => {
    const accordion = new Accordion()
    accordion.setAttribute('multiple', 'multiple')

    const tab1 = new AccordionTab()
    tab1.setAttribute('header', 'tab1')
    tab1.init().render()

    const tab2 = new AccordionTab()
    tab2.setAttribute('header', 'tab2')
    tab2.init().render()

    accordion.append(tab1)
    accordion.append(tab2)

    accordion.init().render().load()

    expect(!tab1.hasAttribute('active')).toBeTruthy()
    expect(!tab2.hasAttribute('active')).toBeTruthy()

    tab1.open()
    expect(tab1.hasAttribute('active')).toBeTruthy()
    expect(!tab2.hasAttribute('active')).toBeTruthy()

    tab2.open()
    expect(tab1.hasAttribute('active')).toBeTruthy()
    expect(tab2.hasAttribute('active')).toBeTruthy()

    tab2.close()
    expect(tab1.hasAttribute('active')).toBeTruthy()
    expect(!tab2.hasAttribute('active')).toBeTruthy()

    tab1.close()
    expect(!tab1.hasAttribute('active')).toBeTruthy()
    expect(!tab2.hasAttribute('active')).toBeTruthy()

    const heder = /** @type {HTMLElement} */(
      tab1.querySelector('.ark-accordion-tab__btn-header')
    )

    if (heder) heder.click()
  })
})
