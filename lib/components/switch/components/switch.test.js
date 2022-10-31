import { Component } from 'base/component'
import {
  Switch
} from './switch.js'


describe('Switch', () => {
  let container = null
  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    container.remove()
    container = null
  })

  it('can be instantiated', () => {
    container.innerHTML = /* html */`
      <ark-switch></ark-switch>
    `
    const switchElement = container.querySelector('.ark-switch')

    expect(switchElement).toBeTruthy()
    expect(switchElement.init()).toBe(switchElement)
  })

  it('Properties are reflected in the slider', () => {
    container.innerHTML = /* html */`
    <ark-switch checked></ark-switch>
    <ark-switch disabled></ark-switch>
    `

    const switchChecked = container.querySelector('.ark-switch[checked]')
    const switchDisabled = container.querySelector('.ark-switch[disabled]')


    expect(switchChecked.firstElementChild.hasAttribute('checked')).toBeTruthy()
    expect(switchDisabled.firstElementChild.hasAttribute('disabled')).toBeTruthy()
  })

  it('Can change its status when clicked', () => {
    container.innerHTML = /* html */`
      <ark-switch></ark-switch>
    `
    const switchElement = container.querySelector('[data-switch]')
    
    switchElement.click()
    expect(switchElement.hasAttribute('checked')).toBeTruthy()
    
    switchElement.click()
    expect(switchElement.hasAttribute('checked')).toBeFalsy()
  })

  it('Can not interact when has disabled attribute', () => {
    container.innerHTML = /* html */`
      <ark-switch disabled></ark-switch>
    `
    const switchElement = container.querySelector('[data-switch]')
    
    switchElement.click()
    expect(switchElement.hasAttribute('checked')).toBeFalsy()
  })

  it('Emits a false or true value on alter event', () => {
    container.innerHTML = /* html */`
      <ark-switch listen on-alter="onSwitchAlter"></ark-switch>
    `
    const switchElement = container.querySelector('.ark-switch')
    const dataSwitch = switchElement.select('[data-switch]')
    

    dataSwitch.click()
    expect(switchElement.value).toBeTruthy()
    dataSwitch.click()
    expect(switchElement.value).toBeFalsy()

  })
  
})