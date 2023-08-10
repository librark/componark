import { listen, reflect, set, get, keys } from './helpers.js'

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

  it('can listen events', () => {
    const element = document.createElement('div')
    element.binding = 'listen'
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

  it('ignores missing methods when listening', () => {
    const element = document.createElement('div')
    element.binding = 'listen'
    element.innerHTML = /* html */`
      <button listen on-click="missing"></button>
    `
    // @ts-ignore
    element.myMethod = function () {
      element.setAttribute('clicked-element', '')
    }

    listen(element)

    element.querySelector('button').click()
    expect(element.hasAttribute('clicked-element')).toBeFalsy()
  })

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

  it('sets an object properties by a given path', () => {
    const object = {}

    set(object, 'value.data', 'Hello')

    expect(object.value.data).toEqual('Hello')
  })

  it('gets an object properties by a given path', () => {
    const object = { state: { data: { value: 25 } }, data: 13 }

    let value = get(object, 'data')

    expect(value).toEqual(13)

    value = get(object, 'state.data.value')

    expect(value).toEqual(25)

    const fallback = get(object, 'state.missing.value', 7)

    expect(fallback).toEqual(7)
  })

  it('retrieves the object keys of truthy values', () => {
    const background = 'primary'
    const shadow = 'small'
    const color = ''

    const classes = {
      [`background-${background}`]: background,
      [`color-${color}`]: color,
      [`shadow-${shadow}`]: shadow
    }

    const result = keys(classes)

    expect(result).toEqual('background-primary shadow-small')
  })
})
