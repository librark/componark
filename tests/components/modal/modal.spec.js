import { Modal } from '../../../src/components/modal/components/modal'

describe('Modal', () => {
  it('can render content', function () {
    const modal = new Modal()
    modal.init({
      title: 'title',
      subtitle: 'subtitle'
    }).render().load()

    expect(
      modal.querySelector('.ark-card__title').textContent.trim()
    ).toEqual('title')

    expect(
      modal.querySelector('.ark-card__subtitle').textContent.trim()
    ).toEqual('subtitle')
  })

  it('can be rendered with slots', function () {
    const element = document.createElement('div')
    element.innerHTML = /* html */ `
      <ark-modal title="myTitle">
        <div>body</div>
        <div slot="action" close>action</div>
      </ark-modal>
    `

    let modal = /** @type {Modal} */(element.querySelector('ark-modal'))
    modal.init().render().load()

    expect(modal.slots.general.length).toBeTruthy()
    expect(modal.slots.action.length).toBeTruthy()

    element.innerHTML = /* html */ `
      <ark-modal title="myTitle">
        <div slot="action" close>action</div>
      </ark-modal>
    `

    modal = /** @type {Modal} */(element.querySelector('ark-modal'))
    modal.init()
    modal.slots.general = null
    modal.render().load()

    expect(modal.slots.action.length).toBeTruthy()
  })

  it('can be toggle', function () {
    const modal = new Modal()
    modal.init()
    modal.slots = null

    modal.render()
    modal.load()

    modal.toggle()
    expect(modal.hasAttribute('show')).toBeTruthy()

    modal.toggle()
    expect(!modal.hasAttribute('show')).toBeTruthy()
  })

  it('can be open', function () {
    const modal = new Modal()
    modal.init().render().load()
    modal.open()
    expect(modal.hasAttribute('show')).toBeTruthy()
  })

  it('can be close', function () {
    const modal = new Modal()
    modal.init().render()
    modal.close()
    expect(!modal.hasAttribute('show')).toBeTruthy()
  })

  it('can be attribute block-scrim', function () {
    const modal = new Modal()
    modal.init().render()

    modal.setAttribute('block-scrim', '')

    modal.load()

    expect(modal.hasAttribute('block-scrim')).toBeTruthy()
  })

  it('can remove attributes', function () {
    const item = new Modal()

    item.setAttribute('name', 'my-item')
    item.setAttribute('id', 'it-1')
    item.setAttribute('title', 'my-title')

    item.setAttributeNode(document.createAttribute('open'))

    item.innerHTML = /* HTML */ ''
    item.connectedCallback()

    expect(!item.getAttribute('open')).toBeTruthy()
  })

  it('can render content null', function () {
    const item = new Modal()
    item.setAttribute('width', '100px')
    item.setAttribute('height', '100px')
    item.init().render().load()

    // @ts-ignore
    expect(item._generateContent(null)).toEqual('')
  })
})
