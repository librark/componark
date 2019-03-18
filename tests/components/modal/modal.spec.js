import '../../../src/components/modal'

describe('Modal', () => {
  it('can be instantiated', () => {
    const modal = document.createElement('ark-modal')
    expect(modal).toBeTruthy()
  })

  it('can be rendered with slots', function () {
    const modal = document.createElement('ark-modal')
    modal.innerHTML = /* HTML */`
      <div slot="action">Menu</div>
    `
    modal.connectedCallback()

    const content = modal.querySelector('.ark-modal__actions')
    expect(content.childElementCount).toBeTruthy()
  })

  it('can be hidden', function () {
    const modal = document.createElement('ark-modal')
    modal.connectedCallback()

    const btn = modal.querySelector('[close]')
    btn.click()

    const atts = Array.from(modal.attributes).filter(a => a.name === 'hidden')
    expect(atts.length).toBeTruthy()
  })

  it('can be hidden', function () {
    const modal = document.createElement('ark-modal')
    modal.connectedCallback()

    const btn = modal.querySelector('.ark-modal__scrim')
    btn.click()

    const atts = Array.from(modal.attributes).filter(a => a.name === 'hidden')
    expect(atts.length).toBeTruthy()
  })

  it('can be hidden by close method', function () {
    const modal = document.createElement('ark-modal')
    modal.connectedCallback()
    modal.close()

    const atts = Array.from(modal.attributes).filter(a => a.name === 'hidden')
    expect(atts.length).toBeTruthy()
  })

  it('can be oppend by open method', function () {
    const modal = document.createElement('ark-modal')
    modal.connectedCallback()

    modal.close()
    expect(Array.from(modal.attributes).filter(
      a => a.name === 'hidden').length).toBeTruthy()

    modal.open()
    expect(!Array.from(modal.attributes).filter(
      a => a.name === 'hidden').length).toBeTruthy()
  })

  it('can be hidden by toggle method', function () {
    const modal = document.createElement('ark-modal')
    modal.connectedCallback()

    modal.open()
    expect(!Array.from(modal.attributes).filter(
      a => a.name === 'hidden').length).toBeTruthy()

    modal.toggle()
    expect(Array.from(modal.attributes).filter(
      a => a.name === 'hidden').length).toBeTruthy()

    modal.toggle()
    expect(!Array.from(modal.attributes).filter(
      a => a.name === 'hidden').length).toBeTruthy()
  })

  it('can remove attributes', function () {
    const item = document.createElement('ark-modal')

    item.setAttribute('name', 'my-item')
    item.setAttribute('id', 'it-1')
    item.setAttribute('title', 'my-title')

    item.setAttributeNode(document.createAttribute('hidden'))

    item.innerHTML = /* HTML */``
    item.connectedCallback()

    expect(!item.getAttribute('hidden')).toBeTruthy()
  })
})
