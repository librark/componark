import { Alert } from 'components/alert'

describe('Alert', () => {
  it('can be instantiated', () => {
    const alert = new Alert()
    alert.init()
    expect(alert).toBeTruthy()

    expect(alert).toBe(alert.init({}))

    expect(!alert.title).toBeTruthy()
    expect(!alert.text).toBeTruthy()
    expect(alert.horizontal).toEqual('center')
    expect(alert.vertical).toEqual('center')
    expect(alert.showConfirmButton).toBeTruthy()
    expect(alert.confirmButtonText).toEqual('Aceptar')
    expect(alert.confirmButtonBackground).toEqual('primary')
    expect(alert.showCancelButton).toBeTruthy()
    expect(alert.cancelButtonText).toEqual('Cancelar')
    expect(alert.cancelButtonBackground).toEqual('light')
  })

  it('can be initialized', () => {
    const alert = new Alert()
    alert.connectedCallback()

    alert.init({
      title: 'Hola mundo',
      text: 'Contenido',
      horizontal: 'end',
      vertical: 'left',
      showConfirmButton: false,
      confirmButtonText: 'confirmButtonText',
      confirmButtonBackground: 'red',
      showCancelButton: false,
      cancelButtonText: 'cancelButtonText',
      cancelButtonBackground: 'blue'
    })

    expect(alert.title).toEqual('Hola mundo')
    expect(alert.text).toEqual('Contenido')
    expect(alert.horizontal).toEqual('end')
    expect(alert.vertical).toEqual('left')
    expect(alert.showConfirmButton).toBeFalsy()
    expect(alert.confirmButtonText).toEqual('confirmButtonText')
    expect(alert.confirmButtonBackground).toEqual('red')
    expect(alert.showCancelButton).toBeFalsy()
    expect(alert.cancelButtonText).toEqual('cancelButtonText')
    expect(alert.cancelButtonBackground).toEqual('blue')
  })

  it('can close from scrim event', function () {
    const div = document.createElement('div')

    /** @type {Alert} */
    const alert = Alert.launch({}, div)
    alert.render()

    alert.close()
    expect(!alert.hasAttribute('hidden')).toBeTruthy()

    alert.toggle()
    expect(alert.hasAttribute('hidden')).toBeTruthy()

    alert.toggle()
    expect(!alert.hasAttribute('hidden')).toBeTruthy()
  })

  it('can close from scrim event on cancel', function () {
    const container = document.createElement('div')
    const alert = Alert.launch({
      title: 'hello',
      text: 'word',
      showCancelButton: true,
      showConfirmButton: true
    }, container)
    alert.render()

    expect(container.querySelector('ark-alert')).toBeTruthy()
    const cancel = alert.select('.ark-alert__cancel')

    cancel.click()
    expect(container.querySelector('ark-alert')).toBeFalsy()
  })

  it('can close from scrim event on confirm', function () {
    const container = document.createElement('div')
    const alert = Alert.launch({
      title: 'hello',
      text: 'word',
      showCancelButton: true,
      showConfirmButton: true
    }, container)
    alert.render()

    expect(container.querySelector('ark-alert')).toBeTruthy()
    const confirm = alert.select('.ark-alert__confirm')

    confirm.click()
    expect(container.querySelector('ark-alert')).toBeFalsy()
  })

  it('can have no buttons', function () {
    const alert = Alert.launch({
      title: 'hello',
      text: 'word',
      showCancelButton: false,
      showConfirmButton: false
    })
    alert.render()

    expect(document.body.querySelector('ark-alert')).toBeTruthy()
    const confirm = alert.select('.ark-alert__confirm')
    const cancel = alert.select('.ark-alert__cancel')
    expect(confirm).toBeFalsy()
    expect(cancel).toBeFalsy()
  })
})
