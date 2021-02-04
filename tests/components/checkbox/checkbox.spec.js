import { Checkbox } from 'components/checkbox'
import { container } from 'webpack'

describe('Checkbox', () => {
  let container = null

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    container.remove()
    container = null
  })

  it('can be instantiated.', () => {
    container.innerHTML = /* html */`
      <ark-checkbox.group>
            <ark-checkbox value="1" checked></ark-checkbox>
            <ark-checkbox value="2"></ark-checkbox>
            <ark-checkbox value="3"></ark-checkbox>
      </ark-checkbox-group>
    
    `
    const checkbox = container.querySelector('ark-checkbox')
    checkbox.init().render().load()

    expect(checkbox.value).toEqual('1')
    expect(checkbox.checked).toEqual(false)

    checkbox.init({
      value: '123',
      checked: true
    }).render().load()

    expect(checkbox.value).toEqual('123')
    expect(checkbox.checked).toEqual(true)
    expect(checkbox.hasAttribute('checked')).toBeTruthy()

    checkbox.init({
      value: '456',
      checked: false
    }).render().load()

    expect(checkbox.value).toEqual('456')
    expect(checkbox.checked).toEqual(false)
    expect(!checkbox.hasAttribute('checked')).toBeTruthy()

    checkbox.check()
    expect(checkbox.checked).toEqual(true)

    checkbox.unCheck()
    expect(checkbox.checked).toEqual(false)

    checkbox.toggle()
    expect(checkbox.checked).toEqual(true)

    checkbox.toggle()
    expect(checkbox.checked).toEqual(false)
  })

  it('It does not allow changing the type of element.', () => {
    const element = new Checkbox()
    element.setAttribute('type', 'text')
    element.setAttribute('value', '')
    element.setAttribute('data-valid', '')
    element.setAttribute('autofocus', 'autofocus')
    element.connectedCallback()

    expect(element.hasAttribute('type')).toBeTruthy()
    expect(element.hasAttribute('value')).toBeTruthy()
  })
})
