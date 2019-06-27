import { listen, reflect } from '../../../src/utils'

describe('Helpers', () => {
  /****************************************************************************
   * listen
   ***************************************************************************/
  it('does not allow invalid attribute', () => {
    const element = document.createElement('div')
    element.innerHTML = /* html */`
      <button listen ark-on-click="myMethod"></button>
    `

    listen(element)

    element.querySelector('button').click()
    expect(!element.hasAttribute('clicked-element')).toBeTruthy()
  })

  it('It does not allow to execute undeclared methods.', () => {
    const element = document.createElement('div')
    element.innerHTML = /* html */`
      <button listen on-click="myMethod"></button>
    `

    listen(element)

    element.querySelector('button').click()
    expect(!element.hasAttribute('clicked-element')).toBeTruthy()
  })

  it('can create events', () => {
    const element = document.createElement('div')
    element.innerHTML = /* html */`
      <button listen on-click="myMethod"></button>
    `
    element['myMethod'] = function () {
      element.setAttribute('clicked-element', '')
    }

    listen(element)

    element.querySelector('button').click()
    expect(element.hasAttribute('clicked-element')).toBeTruthy()
  })

  /****************************************************************************
   * reflect
   ***************************************************************************/
  it('can create attribute', () => {
    const element = document.createElement('div')
    const properties = ['myProperty']

    reflect(element, properties)

    element['myProperty'] = 'value'

    expect(element['myProperty']).toBe('value')
    expect(element.hasAttribute('my-property')).toBeTruthy()
  })

  it('cannot create attribute with property undefined', () => {
    const element = document.createElement('div')
    const properties = ['myProperty']

    reflect(element, properties)

    element['myProperty'] = undefined

    expect(element['myProperty']).toBe('')
    expect(!element.hasAttribute('my-property')).toBeTruthy()
  })
})