/** @typedef {import('../../../src/components').Alert} Alert */
import { Alert } from '../../../src/components/alert'

describe('Alert', () => {
  it('can be instantiated', () => {
    const alert = new Alert()
    expect(alert).toBeTruthy()

    var init = alert.init({})
    expect(alert === init).toBeTruthy()
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

  it('can close from scrim event', function () {
    const div = document.createElement('div')

    /** @type {Alert} */
    const alert = Alert.launch({
      title: 'hello',
      text: 'word',
      showConfirmButton: true,
      confirmButtonText: 'confirmButtonText'
    }, div)
    alert.connectedCallback()

    alert.close()
    expect(!div.querySelector('ark-alert')).toBeTruthy()
  })

  it('can close from scrim event', function () {
    const div = document.createElement('div')

    /** @type {Alert} */
    const alert = Alert.launch({}, div)
    alert.connectedCallback()

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
    alert.connectedCallback()

    alert.close()
    expect(!div.querySelector('ark-alert')).toBeTruthy()
  })

  it('can close from scrim event showCancelButton false', function () {
    const alert = new Alert()

    alert.showCancelButton = false
    expect(alert._renderCancelButton()).toBe('')

    alert.showCancelButton = true
    expect(alert._renderCancelButton().length).toBeTruthy()

    alert.showCancelButton = true
    alert.cancelButtonText = ''
    expect(!alert._renderCancelButton().length).toBeTruthy()

    alert.showConfirmButton = false
    expect(alert._renderConfirmButton()).toBe('')

    alert.showConfirmButton = true
    expect(alert._renderConfirmButton().length).toBeTruthy()

    alert.showConfirmButton = true
    alert.confirmButtonText = ''
    expect(!alert._renderConfirmButton().length).toBeTruthy()
  })

  it('parse Boolean Value', function () {
    const alert = new Alert()
    expect(alert._parseBooleanValue('')).toBeTruthy()
    expect(alert._parseBooleanValue('true')).toBeTruthy()
    expect(alert._parseBooleanValue(true)).toBeTruthy()
    expect(!alert._parseBooleanValue('false')).toBeTruthy()
    expect(!alert._parseBooleanValue(false)).toBeTruthy()
    expect(!alert._parseBooleanValue(undefined)).toBeTruthy()
    expect(!alert._parseBooleanValue(123)).toBeTruthy()
    expect(!alert._parseBooleanValue('123')).toBeTruthy()
  })

  it('hide, show and toggle method', function () {
    const alert = new Alert()
    alert.innerHTML = /* HTML */``
    alert.connectedCallback()

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
    alert.connectedCallback()

    expect(alert.cancelButtonBackground === 'light').toBeTruthy()
    expect(alert.cancelButtonText === 'Cancel').toBeTruthy()
    expect(alert.confirmButtonBackground === 'danger').toBeTruthy()
    expect(alert.confirmButtonText === 'confirm').toBeTruthy()
    expect(alert.vertical === 'center').toBeTruthy()
    expect(alert.horizontal === 'center').toBeTruthy()
    expect(alert.getAttribute('title') === 'hello').toBeTruthy()
    expect(alert.getAttribute('text') === 'word').toBeTruthy()

    const btn = alert.querySelector('button')
    if (btn) btn.click()

    expect(!div.querySelector('ark-alert')).toBeTruthy()
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
    alert.connectedCallback()

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
      confirmButtonText: '<<<<'
    }, div)
    alert.connectedCallback()

    alert.close()
    expect(!div.querySelector('ark-alert')).toBeTruthy()
  })
})
