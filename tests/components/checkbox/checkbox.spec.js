/** @typedef {import('../../../src/components').Checkbox} Checkbox */
import { Checkbox } from '../../../src/components/checkbox'

describe('Checkbox', () => {
  it('can be instantiated', () => {
    const element = /** @type {Checkbox} */ (
      document.createElement('ark-checkbox'))
    expect(element).toBeTruthy()

    var init = element.init({})
    expect(element === init).toBeTruthy()
  })

  it('can be instantiated', () => {
    const element = new Checkbox()
    element.value = 'op1'
    element.render()

    const input = element.querySelector('[data-checkbox]')
    expect(input['value']).toEqual('op1')

    expect(element.value).toEqual('op1')

    element.checked()
    expect(element.isChecked()).toBeTruthy()

    element.unchecked()
    expect(!element.isChecked()).toBeTruthy()

    element.toggel()
    expect(element.isChecked()).toBeTruthy()

    element.toggel()
    expect(!element.isChecked()).toBeTruthy()
  })

  it('It does not allow changing the type of element.', () => {
    const element = new Checkbox()
    element.setAttribute('type', 'text')
    element.setAttribute('value', '')
    element.render()

    // @ts-ignore
    element._onChange()
    expect(element.isChecked()).toBeTruthy()
  })
})
