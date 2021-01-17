import { listen, reflect } from 'base/utils'

describe('Helpers', () => {
  it('does not allow invalid attribute', () => {
    const element = document.createElement('div')
    element.innerHTML = /* html */`
      <button on-open="click" listen on-click="click" on-click="myMethod"
      on-close="click"></button>
    `

    listen(element)

    element.querySelector('button').click()
    expect(!element.hasAttribute('clicked-element')).toBeTruthy()
  })

  it('does not allow invalid attribute', () => {
    const element = document.createElement('div')
    element.innerHTML = /* html */`
	    <button listen ark-on-click="myMethod"></button>
	  `

    listen(element)

    element.querySelector('button').click()
    expect(!element.hasAttribute('clicked-element')).toBeTruthy()
  })

  it('attribute ', () => {
    const button = document.createElement('button')
    button.setAttribute('listen', '')
    button.setAttribute('on-abc', 'method')
    button.setAttribute('on-xyz', 'method')

    const content = document.createElement('div')
    content.appendChild(button)

    listen(content)
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
    // @ts-ignore
    element.myMethod = function () {
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

    // @ts-ignore
    element.myProperty = 'value'

    // @ts-ignore
    expect(element.myProperty).toBe('value')
    expect(element.hasAttribute('my-property')).toBeTruthy()
  })

  it('cannot create attribute with property undefined', () => {
    const element = document.createElement('div')
    const properties = ['myProperty']

    reflect(element, properties)

    // @ts-ignore
    element.myProperty = undefined

    // @ts-ignore
    expect(element.myProperty).toBe('')
    expect(!element.hasAttribute('my-property')).toBeTruthy()
  })
})
