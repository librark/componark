import { Select } from '../../../src/components/select'

describe('Select', () => {
  it('can be instantiated', () => {
    const item = /** @type {Select} */(document.createElement('ark-select'))
    expect(item).toBeTruthy()

    const init = item.init()
    expect(item === init).toBeTruthy()
  })

  it('can be rendered with content', function () {
    const item = /** @type {Select} */(document.createElement('ark-select'))
    // @ts-ignore
    item.defaultContent = /* HTML */`
      <option>myOption</option>
    `
    item.connectedCallback()
    const itemElement = item.querySelector('option')
    expect(itemElement.textContent).toEqual('myOption')
  })

  it('can be rendered with attributes', function () {
    const item = /** @type {Select} */(document.createElement('ark-select'))
    const att = document.createAttribute('placeholder')
    att.value = 'placeholder'
    item.setAttributeNode(att)

    // @ts-ignore
    item.defaultContent = /* HTML */`
      <option>myOption</option>
    `
    item.connectedCallback()
    const itemElement = item.querySelector('option')
    expect(itemElement.textContent).toEqual('myOption')
  })

  it('can be rendered with attributes', function () {
    const item = /** @type {Select} */(document.createElement('ark-select'))
    const att = document.createAttribute('autofocus')
    item.setAttributeNode(att)

    item.connectedCallback()
    const itemElement = item.querySelector('select')
    expect(!itemElement.getAttribute('autofocus')).toBeTruthy()
  })
  it('can be rendered with attributes', function () {
    const select = new Select()
    select.innerHTML = /** html */`
      <option value="op1">opcion 1</option>
      <option value="op2">opcion 2</option>
      <option value="op3">opcion 3</option>
    `
    select.init({ label: 'my select' })
    select.connectedCallback()

    const event = new CustomEvent('change')
    // @ts-ignore
    select._change(event)

    const element = (/** @type {Select} */ (
      select.querySelector('[data-select]')))
    element.value = 'op2'

    expect(select.value).toEqual('op2')

    select.innerHTML = ''
    expect(select.value).toEqual('')
  })
})
