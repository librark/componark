import { Checkbox } from '../../../src/components/checkbox'

describe('Checkbox', () => {
  it('can be instantiated.', () => {
    const checkbox = new Checkbox()
    checkbox.init().render().load()

    expect(checkbox.value).toEqual('')
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
    expect(!element.hasAttribute('autofocus')).toBeTruthy()
  })
})
