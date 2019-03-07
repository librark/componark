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
    const content = button.querySelector('button').textContent.trim()
    expect(content).toEqual('Submit')
  })

  it('can be rendered with attribute', function () {
    const button = document.createElement('ark-button')

    const attr = document.createAttribute('myAttr')
    button.setAttributeNode(attr)

    button.connectedCallback()

    const buttonElement = button.querySelector('button')
    expect(buttonElement.getAttribute('myAttr').value).toBeUndefined()
  })

  it('can be rendered with attribute value', function () {
    const button = document.createElement('ark-button')

    const attr = document.createAttribute('myAttr')
    attr.value = 'ok'
    button.setAttributeNode(attr)

    button.connectedCallback()

    const buttonElement = button.querySelector('button')
    expect(buttonElement.getAttribute('myAttr')).toEqual('ok')
  })

  it('can be rendered with tag <a>', function () {
    const button = document.createElement('ark-button')
    const attr = document.createAttribute('href')
    attr.value = '#'
    button.setAttributeNode(attr)

    button.connectedCallback()
    const aElement = button.querySelector('a')
    expect(aElement).toBeTruthy()
  })
})
