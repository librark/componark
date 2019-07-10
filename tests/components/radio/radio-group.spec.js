/** @typedef {import('../../../src/components').RadioGroup} RadioGroup */
// import { RadioButton, RadioGroup } from '../../../src/components/radio'

describe('RadioGroup', () => {
  it('can be instantiated', () => {
    const element = /** @type {RadioGroup} */ (
      document.createElement('ark-radio-group'))
    expect(element).toBeTruthy()

    var init = element.init({})
    expect(element === init).toBeTruthy()
  })
})
