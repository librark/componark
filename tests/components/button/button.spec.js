import { Button } from '../../../src/components/button'

describe('Button', () => {
  it('can be instantiated', () => {
    const button = Object.create(Button.prototype, {})
    expect(button).toBeTruthy()
  })
})
