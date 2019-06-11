import { Alert } from '../../../src/components/alert'

describe('Alert', () => {
  it('can be instantiated', () => {
    const alert = document.createElement('ark-alert')
    expect(alert).toBeTruthy()

    var init = alert.init({})
    expect(alert === init).toBeTruthy()
  })

  it('can be instantiated with class', function () {
    const alert = Alert.launch({})
    alert.render()
  })

  it('can be rendered with slots', function () {
    const alert = document.createElement('ark-alert')
    alert.innerHTML = /* HTML */`
      <div slot="action">Menu</div>
    `
    alert.connectedCallback()

    const content = alert.querySelector('.ark-alert__actions')
    expect(content.childElementCount).toBeTruthy()
  })

  it('hide, show and toggle method', function () {
    const alert = document.createElement('ark-alert')
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

    const alert = Alert.launch({
      title: 'hello',
      text: 'word',
      horizontal: '',
      vertical: '',
      showConfirmButton: 'false',
      showCancelButton: true,
      cancelButtonText: 'Cancel'
    }, div)
    alert.render()

    const scrim = alert.querySelector('.ark-alert__scrim')
    scrim.click()

    expect(!div.querySelector('ark-alert')).toBeTruthy()
  })
})
