import { Modal } from 'components/modal'

describe('Modal', () => {
  let container = null
  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    container.remove()
    container = null
  })

  it('can be instantiated', function () {
    container.innerHTML = `
    <ark-modal></ark-modal>
    `

    const modal = container.querySelector('ark-modal')

    expect(modal).toBe(modal.init())
  })

  it('can be instantiated with title and subtitle', function () {
    container.innerHTML = `
    <ark-modal title="MyTitle" subtitle="MySubtitle">
    </ark-modal>
    `

    const modal = container.querySelector('ark-modal')

    expect(
      modal.select('.ark-modal__title').textContent.trim()
    ).toEqual('MyTitle')

    expect(
      modal.select('.ark-modal__subtitle').textContent.trim()
    ).toEqual('MySubtitle')
  })

  it('can be rendered with slots', function () {
    container.innerHTML = /* html */ `
      <ark-modal title="myTitle">
        <div>MyBody</div>
        <div slot="action" close>action</div>
      </ark-modal>
    `

    const modal = container.querySelector('ark-modal')

    expect(
      modal.select('.ark-modal__body').textContent.trim()
    ).toEqual('MyBody')

    expect(
      modal.select(
        '.ark-modal__actions').firstElementChild.hasAttribute('close')
    ).toBeTruthy()
  })

  it('can be opened, closed and toggled', function () {
    container.innerHTML = /* html */ `
      <ark-modal title="myTitle">
        <div>MyBody</div>
        <div slot="action" close>action</div>
      </ark-modal>
    `
    const modal = container.querySelector('ark-modal')

    modal.open()
    expect(modal.hasAttribute('show')).toBeTruthy()
    modal.close()
    expect(modal.hasAttribute('show')).toBeFalsy()
    modal.toggle()
    expect(modal.hasAttribute('show')).toBeTruthy()
    modal.toggle()
    expect(modal.hasAttribute('show')).toBeFalsy()
  })

  it('closes on scrim clicked', () => {
    container.innerHTML = /* html */ `
      <ark-modal title="myTitle">
        <div>MyBody</div>
        <div slot="action" close>action</div>
      </ark-modal>
    `
    const modal = container.querySelector('ark-modal')

    const scrim = modal.select('.ark-modal__scrim')

    modal.open()
    expect(modal.hasAttribute('show')).toBeTruthy()

    scrim.click()
    expect(modal.hasAttribute('show')).toBeFalsy()
  })

  it('closes on child data modal close', () => {
    container.innerHTML = /* html */ `
      <ark-modal title="myTitle">
        <div>MyBody</div>
        <div slot="action" data-modal-close>close</div>
      </ark-modal>
    `
    const modal = container.querySelector('ark-modal')

    const closeDiv = modal.select('[data-modal-close]')

    modal.open()
    expect(modal.hasAttribute('show')).toBeTruthy()

    closeDiv.click()
    expect(modal.hasAttribute('show')).toBeFalsy()
  })

  it('can block its closing scrim', () => {
    container.innerHTML = /* html */ `
      <ark-modal block-scrim>
        <div>MyBody</div>
      </ark-modal>
    `
    const modal = container.querySelector('ark-modal')

    const scrim = modal.select('.ark-modal__scrim')

    modal.open()
    expect(modal.hasAttribute('show')).toBeTruthy()

    scrim.click()
    expect(modal.hasAttribute('show')).toBeTruthy()
  })

  it('can set its content width and height', function () {
    container.innerHTML = /* html */ `
      <ark-modal block-scrim width="70vw" height="50vh">
        <div>MyBody</div>
      </ark-modal>
    `
    const modal = container.querySelector('ark-modal')

    const content = modal.select('.ark-modal__content')
    expect(content.style.width).toEqual('70vw')
    expect(content.style.height).toEqual('50vh')
  })

})
