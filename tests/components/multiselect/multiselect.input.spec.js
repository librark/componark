import {
  MultiselectInput
} from '../../../src/components/multiselect/components/multiselect.input'

describe('Multiselect Input', () => {
  it('On Focus', () => {
    const multiselectInput = new MultiselectInput()
    multiselectInput.init().render().load()
    expect(multiselectInput.input).toBeTruthy()

    expect(!multiselectInput.focused).toBeTruthy()
  })
})
