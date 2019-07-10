/** @typedef {import('../../../src/components').CheckboxGroup} CheckboxGroup */
/** @typedef {import('../../../src/components').Checkbox} Checkbox */
import { CheckboxGroup, Checkbox } from '../../../src/components/checkbox'

describe('Checkbox', () => {
  it('can be instantiated', () => {
    const element = /** @type {CheckboxGroup} */ (
      document.createElement('ark-checkbox-group'))
    expect(element).toBeTruthy()

    var init = element.init({})
    expect(element === init).toBeTruthy()
  })
  it('can be instantiated', () => {
    const element = new CheckboxGroup()
    element.setAttribute('label', 'my group')
    element.render()

    const label = element.querySelector('[data-checkbox-group-label]')
    expect(label.textContent.trim()).toEqual('my group')
  })

  it('returns selected values', () => {
    const element = new CheckboxGroup()

    const checkbox1 = new Checkbox()
    checkbox1.value = 'op1'
    checkbox1.render()
    checkbox1.checked()

    const checkbox2 = new Checkbox()
    checkbox2.value = 'op2'
    checkbox2.render()

    element.appendChild(checkbox1)
    element.appendChild(checkbox2)

    element.render()

    expect(element.value[0]).toEqual('op1')
  })

  it('returns selected values', () => {
    const element = new CheckboxGroup()
    element.innerHTML = /* html */`
      <span slot="alert">Error</span>
    `
    element.render()

    expect(
      element.querySelector('[slot="alert"]').textContent.trim()
    ).toEqual('Error')
  })
})