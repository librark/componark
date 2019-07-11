/** @typedef {import('../../../src/components').RadioButton} RadioButton */
import { RadioButton } from '../../../src/components/radio'

describe('RadioButton', () => {
  it('can be instantiated', () => {
    const element = /** @type {RadioButton} */ (
      document.createElement('ark-radio-button'))
    expect(element).toBeTruthy()

    var init = element.init({})
    expect(element === init).toBeTruthy()
  })
  it('can be instantiated', () => {
    const element = new RadioButton()
    console.log(element.value)
  })
})
