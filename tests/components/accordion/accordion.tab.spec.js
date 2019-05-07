import '../../../src/components/accordion'

describe('Alert', () => {
  it('can be instantiated', () => {
    const accordion = document.createElement('ark-accordion-tab')
    expect(accordion).toBeTruthy()

    var init = accordion.init()
    expect(accordion === init).toBeTruthy()
  })
  it('can be rendered without header', () => {
    const tab = document.createElement('ark-accordion-tab')
    tab.connectedCallback()
    expect(!tab.innerHTML.trim().length).toBeTruthy()
  })
  it('can be rendered with content', () => {
    const tab = document.createElement('ark-accordion-tab')
    var att = document.createAttribute('header')
    att.value = 'my header'
    tab.setAttributeNode(att)

    tab.innerHTML = /* html */`<h1>tab 1</h1>`

    tab.connectedCallback()
    expect(!tab.classList.length).toBeTruthy()

    const btn = tab.querySelector('.ark-accordion-tab__btn-header')
    if (btn) btn.click()

    expect(tab.classList[0] === 'ark-accordion-tab--show').toBeTruthy()
  })
  it('can open content', () => {
    const tab = document.createElement('ark-accordion-tab')
    var att = document.createAttribute('header')
    att.value = 'my header'
    tab.setAttributeNode(att)

    tab.innerHTML = /* html */`<h1>tab 1</h1>`

    tab.connectedCallback()
    expect(!tab.classList.length).toBeTruthy()

    tab.open()

    expect(tab.classList[0] === 'ark-accordion-tab--show').toBeTruthy()
  })
  it('can close content', () => {
    const tab = document.createElement('ark-accordion-tab')
    var att = document.createAttribute('header')
    att.value = 'my header'
    tab.setAttributeNode(att)

    tab.innerHTML = /* html */`<h1>tab 1</h1>`

    tab.connectedCallback()
    expect(!tab.classList.length).toBeTruthy()

    const btn = tab.querySelector('.ark-accordion-tab__btn-header')
    if (btn) {
      btn.click()
      expect(tab.classList[0] === 'ark-accordion-tab--show').toBeTruthy()
    }

    tab.close()
    expect(!tab.classList.length).toBeTruthy()
  })
})
