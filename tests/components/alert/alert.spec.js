/** @typedef {import('../../../src/components').Alert} Alert */
import { Alert } from '../../../src/components/alert'

describe('Alert', () => {
  it('can be instantiated', () => {
    const alert = new Alert()
    expect(alert).toBeTruthy()

    var init = alert.init({})
    expect(alert === init).toBeTruthy()
  })

  it('can be instantiated', () => {
    const alert = /** @type {Alert} */ (document.createElement('ark-alert'))
    alert.toggle()
    expect(alert.hasAttribute('hidden')).toBeTruthy()
  })

  it('can be rendered with slots', function () {
    const alert = new Alert()
    alert.innerHTML = /* HTML */`
      <div slot="action">Menu</div>
    `
    alert.connectedCallback()

    const content = alert.querySelector('.ark-alert__actions')
    expect(content.childElementCount).toBeTruthy()
  })

  it('can render confirm Button', function () {
    const div = document.createElement('div')

    let alert = /** @type {Alert} */ Alert.launch({
      title: 'hello',
      text: 'word',
      confirmButtonText: 'confirmButtonText'
    }, div)
    alert.render()

    // @ts-ignore
    expect(alert._renderConfirmButton().length).toBeTruthy()

    alert = /** @type {Alert} */ Alert.launch({
      title: 'hello',
      text: 'word',
      confirmButtonText: 'confirmButtonText',
      showConfirmButton: false
    })
    alert.render()

    // @ts-ignore
    expect(!alert._renderConfirmButton().length).toBeTruthy()

    alert = /** @type {Alert} */ Alert.launch({
      title: 'hello',
      text: 'word',
      confirmButtonText: 'confirmButtonText',
      showConfirmButton: 'false'
    })
    alert.render()

    // @ts-ignore
    expect(!alert._renderConfirmButton().length).toBeTruthy()

    alert = /** @type {Alert} */ Alert.launch({
      title: 'hello',
      text: 'word',
      confirmButtonText: 'confirmButtonText',
      showConfirmButton: 'False'
    })
    alert.render()

    // @ts-ignore
    expect(!alert._renderConfirmButton().length).toBeTruthy()

    alert = /** @type {Alert} */ Alert.launch({
      title: 'hello',
      text: 'word',
      confirmButtonText: 'confirmButtonText',
      showConfirmButton: true
    })
    alert.render()

    // @ts-ignore
    expect(alert._renderConfirmButton().length).toBeTruthy()

    alert = /** @type {Alert} */ Alert.launch({
      title: 'hello',
      text: 'word',
      confirmButtonText: 'confirmButtonText',
      showConfirmButton: 'true'
    })
    alert.render()

    // @ts-ignore
    expect(alert._renderConfirmButton().length).toBeTruthy()

    alert = /** @type {Alert} */ Alert.launch({
      title: 'hello',
      text: 'word',
      confirmButtonText: 'confirmButtonText',
      showConfirmButton: ''
    })
    alert.render()

    // @ts-ignore
    expect(alert._renderConfirmButton().length).toBeTruthy()

    alert = /** @type {Alert} */ Alert.launch({
      title: 'hello',
      text: 'word',
      showConfirmButton: false
    })
    alert.render()

    // @ts-ignore
    expect(!alert._renderConfirmButton().length).toBeTruthy()

    alert = /** @type {Alert} */ Alert.launch({
      title: 'hello',
      text: 'word',
      showConfirmButton: true
    })
    alert.render()

    // @ts-ignore
    expect(alert._renderConfirmButton().length).toBeTruthy()
  })

  it('can render cancel Button', function () {
    let alert = /** @type {Alert} */ Alert.launch({
      title: 'hello',
      text: 'word',
      cancelButtonText: 'showCancelButton',
      showCancelButton: false
    })
    alert.render()

    // @ts-ignore
    expect(!alert._renderCancelButton().length).toBeTruthy()

    alert = /** @type {Alert} */ Alert.launch({
      title: 'hello',
      text: 'word',
      cancelButtonText: 'showCancelButton',
      showCancelButton: 'false'
    })
    alert.render()

    // @ts-ignore
    expect(!alert._renderCancelButton().length).toBeTruthy()

    alert = /** @type {Alert} */ Alert.launch({
      title: 'hello',
      text: 'word',
      cancelButtonText: 'showCancelButton',
      showCancelButton: 'False'
    })
    alert.render()

    // @ts-ignore
    expect(!alert._renderCancelButton().length).toBeTruthy()

    alert = /** @type {Alert} */ Alert.launch({
      title: 'hello',
      text: 'word',
      cancelButtonText: 'showCancelButton',
      showCancelButton: true
    })
    alert.render()

    // @ts-ignore
    expect(alert._renderCancelButton().length).toBeTruthy()

    alert = /** @type {Alert} */ Alert.launch({
      title: 'hello',
      text: 'word',
      cancelButtonText: 'showCancelButton',
      showCancelButton: 'true'
    })
    alert.render()

    // @ts-ignore
    expect(alert._renderCancelButton().length).toBeTruthy()

    alert = /** @type {Alert} */ Alert.launch({
      title: 'hello',
      text: 'word',
      cancelButtonText: 'showCancelButton',
      showCancelButton: ''
    })
    alert.render()

    // @ts-ignore
    expect(alert._renderCancelButton().length).toBeTruthy()

    alert = /** @type {Alert} */ Alert.launch({
      title: 'hello',
      text: 'word',
      showCancelButton: false
    })
    alert.render()

    // @ts-ignore
    expect(!alert._renderCancelButton().length).toBeTruthy()

    alert = /** @type {Alert} */ Alert.launch({
      title: 'hello',
      text: 'word',
      showCancelButton: true
    })
    alert.render()

    // @ts-ignore
    expect(alert._renderCancelButton().length).toBeTruthy()
  })

  it('can close from scrim event', function () {
    const div = document.createElement('div')

    /** @type {Alert} */
    const alert = Alert.launch({}, div)
    alert.render()

    alert.toggle()
    expect(alert.hasAttribute('hidden')).toBeTruthy()

    alert.toggle()
    expect(!alert.hasAttribute('hidden')).toBeTruthy()
  })

  it('can close from scrim event showCancelButton false', function () {
    const div = document.createElement('div')

    /** @type {Alert} */
    const alert = Alert.launch({
      title: 'hello',
      text: 'word',
      showCancelButton: false
    }, div)
    alert.render()

    alert.close()
    expect(!div.querySelector('ark-alert')).toBeTruthy()
  })

  it('parse Boolean Value', function () {
    const alert = new Alert()
    // @ts-ignore
    expect(alert._parseBooleanValue('')).toBeTruthy()
    // @ts-ignore
    expect(alert._parseBooleanValue('true')).toBeTruthy()
    // @ts-ignore
    expect(alert._parseBooleanValue(true)).toBeTruthy()
    // @ts-ignore
    expect(!alert._parseBooleanValue('false')).toBeTruthy()
    // @ts-ignore
    expect(!alert._parseBooleanValue(false)).toBeTruthy()
    // @ts-ignore
    expect(!alert._parseBooleanValue(undefined)).toBeTruthy()
    // @ts-ignore
    expect(!alert._parseBooleanValue(123)).toBeTruthy()
    // @ts-ignore
    expect(!alert._parseBooleanValue('123')).toBeTruthy()
  })

  it('hide, show and toggle method', function () {
    const alert = new Alert()
    alert.innerHTML = /* HTML */``
    alert.render()

    alert.hide()
    expect(alert.hasAttribute('hidden')).toBeTruthy()

    alert.show()
    expect(!alert.hasAttribute('hidden')).toBeTruthy()

    alert.toggle()
    expect(alert.hasAttribute('hidden')).toBeTruthy()

    alert.toggle()
    expect(!alert.hasAttribute('hidden')).toBeTruthy()
  })

  it('can be rendered with class', function () {
    const div = document.createElement('div')

    /** @type {Alert} */
    const alert = Alert.launch({
      title: 'hello',
      text: 'word',
      horizontal: '',
      vertical: '',
      showConfirmButton: '',
      confirmButtonText: 'confirm',
      confirmButtonBackground: 'danger',
      showCancelButton: true,
      cancelButtonText: 'Cancel'
    }, div)
    alert.render()

    // @ts-ignore
    expect(alert.cancelButtonBackground === 'light').toBeTruthy()
    // @ts-ignore
    expect(alert.cancelButtonText === 'Cancel').toBeTruthy()
    // @ts-ignore
    expect(alert.confirmButtonBackground === 'danger').toBeTruthy()
    // @ts-ignore
    expect(alert.confirmButtonText === 'confirm').toBeTruthy()
    // @ts-ignore
    expect(alert.vertical === 'center').toBeTruthy()
    // @ts-ignore
    expect(alert.horizontal === 'center').toBeTruthy()
    expect(alert.getAttribute('title') === 'hello').toBeTruthy()
    expect(alert.getAttribute('text') === 'word').toBeTruthy()

    const btn = alert.querySelector('button')
    if (btn) btn.click()

    // expect(!div.querySelector('ark-alert')).toBeTruthy()
  })

  it('can close from scrim event', function () {
    const div = document.createElement('div')

    /** @type {Alert} */
    const alert = Alert.launch({
      title: 'hello',
      text: 'word',
      showConfirmButton: false,
      showCancelButton: false
    }, div)
    // @ts-ignore
    alert.render()

    alert.close()
    expect(!div.querySelector('ark-alert')).toBeTruthy()
  })

  it('can close from scrim event', function () {
    const div = document.createElement('div')

    /** @type {Alert} */
    const alert = Alert.launch({
      title: 'hello',
      text: 'word',
      showConfirmButton: true,
      confirmButtonText: 'confirmButtonText'
    }, div)
    // @ts-ignore
    alert.render()

    alert.close()
    expect(!div.querySelector('ark-alert')).toBeTruthy()
  })

  it('can close from scrim event', function () {
    /** @type {Alert} */
    const alert = Alert.launch({
      title: 'hello',
      text: 'word',
      showConfirmButton: 'false',
      showCancelButton: 'false'
    })
    // @ts-ignore
    alert.render()

    alert.close()
    expect(!alert.querySelector('ark-alert')).toBeTruthy()
    expect(!alert.querySelector('[alert-confirm-button]')).toBeTruthy()
    expect(!alert.querySelector('[alert-cancel-button]')).toBeTruthy()
  })
})
