import '../../../src/components/icon'

describe('Icon', () => {
  it('can be instantiated', () => {
    const icon = document.createElement('ark-icon')
    expect(icon).toBeTruthy()
  })

  it('can be rendered without content', function () {
    // const icon = document.createElement('ark-icon')
    // icon.connectedCallback()
    // const iconElement = icon.querySelector('icon')
    // expect(iconElement).toBeTruthy()
  })

  it('can be rendered with text content', function () {
    // const icon = document.createElement('ark-icon')
    // icon.textContent = 'Submit'
    // icon.connectedCallback()
    // const content = icon.querySelector('icon').textContent
    // expect(content).toEqual('Submit')
  })
})
