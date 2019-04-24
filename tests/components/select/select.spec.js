import '../../../src/components/select'

describe('Select', () => {
  it('can be instantiated', () => {
    const item = document.createElement('ark-select')
    expect(item).toBeTruthy()

    var init = item.init()
    expect(item === init).toBeTruthy()
  })

  it('can be rendered with content', function () {
    const item = document.createElement('ark-select')
    item.innerHTML = /* HTML */`
      <option>myOption</option>
    `
    item.connectedCallback()
    const itemElement = item.querySelector('option')
    expect(itemElement.textContent).toEqual('myOption')
  })

  it('can be rendered with attributes', function () {
    const item = document.createElement('ark-select')
    const att = document.createAttribute('placeholder')
    att.value = 'placeholder'
    item.setAttributeNode(att)

    item.innerHTML = /* HTML */`
      <option>myOption</option>
    `
    item.connectedCallback()
    const itemElement = item.querySelector('option')
    expect(itemElement.textContent).toEqual('myOption')
  })

  it('can be rendered with attributes', function () {
    const item = document.createElement('ark-select')
    const att = document.createAttribute('autofocus')
    item.setAttributeNode(att)

    item.connectedCallback()
    const itemElement = item.querySelector('select')
    expect(!itemElement.getAttribute('autofocus')).toBeTruthy()
  })
})
