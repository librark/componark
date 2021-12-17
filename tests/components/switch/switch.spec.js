import { Component } from 'base/component'
import {
  Switch
} from 'components/switch'


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
    container.innerHTML = `
      <ark-switch></ark-switch>
    `
    const switchElement = container.querySelector('.ark-switch')

    expect(switchElement).toBeTruthy()
    expect(switchElement.init()).toBe(switchElement)
  })

  it('Properties are reflected in the slider', () => {
    container.innerHTML = `
    <ark-switch checked></ark-switch>
    <ark-switch disabled></ark-switch>
    `

    const switchChecked = container.querySelector('.ark-switch[checked]')
    const switchDisabled = container.querySelector('.ark-switch[disabled]')


    expect(switchChecked.firstElementChild.hasAttribute('checked')).toBeTruthy()
    expect(switchDisabled.firstElementChild.hasAttribute('disabled')).toBeTruthy()
  })

  it('Can change its status when clicked', () => {
    container.innerHTML = `
      <ark-switch></ark-switch>
    `
    const switchElement = container.querySelector('[data-switch]')
    
    switchElement.click()
    expect(switchElement.hasAttribute('checked')).toBeTruthy()
    
    switchElement.click()
    expect(switchElement.hasAttribute('checked')).toBeFalsy()
  })

  it('Can not interact when has disabled attribute', () => {
    container.innerHTML = `
      <ark-switch disabled></ark-switch>
    `
    const switchElement = container.querySelector('[data-switch]')
    
    switchElement.click()
    expect(switchElement.hasAttribute('checked')).toBeFalsy()
    
  })
  


})