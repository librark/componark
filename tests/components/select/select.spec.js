import { container } from 'webpack'
import { Select } from '../../../src/components/select'

describe('Select', () => {

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
    container.innerHTML =/* html */ `
        <ark-select></ark-select>
    `

    const item = container.querySelector('ark-select')
    expect(item).toBeTruthy()

    const init = item.init()
    expect(item === init).toBeTruthy()
  })

  it('can be rendered with content', function () {
    container.innerHTML =/* html */ `
        <ark-select></ark-select>
    `
    
    const item = container.querySelector('ark-select')
    // @ts-ignore
    item.defaultContent = /* html */`
      <option>myOption</option>
    `
    item.connectedCallback()
    const itemElement = item.querySelector('option')
    expect(itemElement.textContent).toEqual('myOption')
  })

  it('can be rendered with attributes', function () {
    container.innerHTML =/* html */ `
        <ark-select></ark-select>
    `
    const item = container.querySelector('ark-select')
    const att = document.createAttribute('placeholder')
    att.value = 'placeholder'
    item.setAttributeNode(att)

    // @ts-ignore
    item.defaultContent = /* html */`
      <option>myOption</option>
    `
    item.connectedCallback()
    const itemElement = item.querySelector('option')
    expect(itemElement.textContent).toEqual('myOption')
  })

  it('can be rendered with attributes', function () {
    container.innerHTML =/* html */ `
        <ark-select></ark-select>
    `
    
    const item = container.querySelector('ark-select')
    const att = document.createAttribute('autofocus')
    item.setAttributeNode(att)

    item.connectedCallback()
    const itemElement = item.querySelector('select')
    expect(!itemElement.getAttribute('autofocus')).toBeTruthy()
  })

  it('can be rendered with attributes', function () {
    container.innerHTML =/* html */ `
        <ark-select label="my select">
          <option value="op1">opcion 1</option>
          <option value="op2">opcion 2</option>
          <option value="op3">opcion 3</option>
        </ark-select>
    `
    const select= container.querySelector('ark-select')
    select.init({ label: 'my select' })
    select.connectedCallback()

    const event = new CustomEvent('change')
    // @ts-ignore
    select._change(event)

    const element = select.querySelector('option')
    element.value = 'op2'

    expect(select.value).toEqual('op2')

    select.innerHTML = ''
    expect(select.value).toEqual('')
  })
})
