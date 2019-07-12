/**
 * @typedef {import('../../../src/components').RadioGroup} RadioGroup
 * @typedef {import('../../../src/components').RadioButton} RadioButton
 */
import { RadioButton, RadioGroup } from '../../../src/components/radio'

describe('RadioGroup', () => {
  it('can be instantiated', () => {
    const element = /** @type {RadioGroup} */ (
      document.createElement('ark-radio-group'))
    expect(element).toBeTruthy()

    var init = element.init({})
    expect(element === init).toBeTruthy()
  })

  it('can be instantiated', () => {
    const element = new RadioGroup()
    element.setAttribute('label', 'my group')
    element.connectedCallback()

    const label = element.querySelector('[data-radio-group-label]')
    expect(label.textContent.trim()).toEqual('my group')
  })

  it('returns selected values', () => {
    const group = new RadioGroup()

    const radio1 = new RadioButton()
    radio1.value = 'op1'
    radio1.render()

    const radio2 = new RadioButton()
    radio2.value = 'op2'
    radio2.render()

    group.appendChild(radio1)
    group.appendChild(radio2)

    group.render()
    radio1.checked()

    radio1.addEventListener('click', event => {
      // @ts-ignore
      group._change(event)
    })
    radio1.click()

    expect(group.value).toEqual('op1')
  })

  it('returns selected values', () => {
    const element = new RadioGroup()
    element.innerHTML = /* html */`
      <span slot="alert">Error</span>
    `
    element.render()

    expect(
      element.querySelector('[slot="alert"]').textContent.trim()
    ).toEqual('Error')
  })

  it('can it initialize without content', () => {
    const group = new RadioGroup()

    const radio1 = new RadioButton()
    radio1.value = 'op1'
    radio1.render()
    radio1.checked()

    const radio2 = new RadioButton()
    radio2.value = 'op2'
    radio2.render()

    group.appendChild(radio1)
    group.appendChild(radio2)

    group.render()
    group.innerHTML = /* html */``

    // @ts-ignore
    group._renderRadioButtonList()

    expect(group.innerHTML.trim()).toEqual('')
  })
})
