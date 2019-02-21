import '../../../src/components/button'

describe('Button', () => {
  it('can be instantiated', () => {
    const button = document.createElement('ark-button')
    expect(button).toBeTruthy()
  })

  it('can be rendered without content', function () {
    const button = document.createElement('ark-button')
    button.connectedCallback()
    const buttonElement = button.querySelector('button')
    expect(buttonElement).toBeTruthy()
  })

  it('can be rendered with text content', function () {
    const button = document.createElement('ark-button')
    button.textContent = 'Submit'
    button.connectedCallback()
    const content = button.querySelector('button').textContent
    expect(content).toEqual('Submit')
  })
})
