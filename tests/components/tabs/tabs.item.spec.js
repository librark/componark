import '../../../src/components/tabs'

describe('Sidebar', () => {
  it('can be instantiated', () => {
    const item = document.createElement('ark-tabs-item')
    expect(item).toBeTruthy()

    var init = item.init()
    expect(item === init).toBeTruthy()
  })

  it('can be rendered with content', function () {
    const item = document.createElement('ark-tabs-item')

    item.setAttribute('id', 'item-1')

    item.innerHTML = /* HTML */`
      <span>item-1</span>
    `
    item.connectedCallback()

    expect(item.getAttribute('id') === 'item-1').toBeTruthy()
  })

  it('can remove attributes', function () {
    const item = document.createElement('ark-tabs-item')

    item.setAttribute('name', 'my-item')
    item.setAttribute('id', 'it-1')
    item.setAttribute('title', 'my-title')

    item.setAttributeNode(document.createAttribute('active'))

    item.innerHTML = /* HTML */`
      <span>item-1</span>
    `
    item.connectedCallback()

    expect(!item.getAttribute('name')).toBeTruthy()
  })

  it('can be rendered with tag <a>', function () {
    const item = document.createElement('ark-tabs-item')
    item.setAttribute('href')

    item.innerHTML = /* HTML */`
      <span>item-1</span>
    `
    item.connectedCallback()

    const element = item.querySelector('a')
    expect(element).toBeTruthy()
  })
})
