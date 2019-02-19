import { Button } from '../../../src/components/button/button.js'

describe('Button', () => {
  it('can be instantiated', () => {
    const button = Object.create(Button.prototype, {})
    expect(button).toBeTruthy()
  })
})
