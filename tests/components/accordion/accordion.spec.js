import '../../../src/components/accordion'

describe('Alert', () => {
  it('can be instantiated', () => {
    const accordion = document.createElement('ark-accordion')
    expect(accordion).toBeTruthy()

    var init = accordion.init()
    expect(accordion === init).toBeTruthy()
  })
  it('can be rendered without content', () => {
    const accordion = document.createElement('ark-accordion')
    accordion.connectedCallback()
    expect(!accordion.innerHTML.trim().length).toBeTruthy()
  })
  it('can be renderd with closeOthers', () => {
    const accordion = document.createElement('ark-accordion')
    var att = document.createAttribute('closeOthers')
    att.value = 'true'
    accordion.setAttributeNode(att)

    accordion.appendChild(generateTab('tab 1'))
    accordion.appendChild(generateTab('tab 2'))
    accordion.appendChild(generateTab('tab 3'))

    accordion.connectedCallback()

    const tabs = accordion.querySelectorAll('ark-accordion-tab')

    var btn = tabs[0].querySelector('button')
    if (btn) btn.click()
  })
  it('can be renderd without closeOthers', () => {
    const accordion = document.createElement('ark-accordion')
    var att = document.createAttribute('closeOthers')
    att.value = 'false'
    accordion.setAttributeNode(att)

    accordion.appendChild(generateTab('tab 1'))
    accordion.appendChild(generateTab('tab 2'))
    accordion.appendChild(generateTab('tab 3'))

    accordion.connectedCallback()

    const tabs = accordion.querySelectorAll('ark-accordion-tab')

    var btn = tabs[0].querySelector('.ark-accordion-tab__btn-header')
    if (btn) btn.click()
  })

  function generateTab (header) {
    const tab = document.createElement('ark-accordion-tab')
    var att = document.createAttribute('header')
    att.value = header
    tab.setAttributeNode(att)

    tab.innerHTML = /* html */`<h1>${header}</h1>`

    tab.connectedCallback()
    return tab
  }
})
