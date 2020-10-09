import { TabsItem } from '../../../src/components/tabs'

describe('Tabs Item', () => {
  it('can be instantiated', () => {
    const item = new TabsItem()
    expect(item).toBeTruthy()

    const init = item.init()
    expect(item === init).toBeTruthy()

    init.init().render().load()
  })

  it('can be rendered with content', function () {
    const item = new TabsItem()
    item.setAttribute('id', 'item-1')

    item.innerHTML = /* HTML */ `
      <span>item-1</span>
    `
    item.connectedCallback()

    expect(item.getAttribute('id') === 'item-1').toBeTruthy()
  })

  it('can be rendered with type', function () {
    const tabItemTypeLink = new TabsItem()
    tabItemTypeLink.setAttribute('href', 'http')
    tabItemTypeLink.init().render().load()
    expect(tabItemTypeLink.querySelector('a')).toBeTruthy()

    const tabItemTypeButton = new TabsItem()
    tabItemTypeButton.init().render().load()
    expect(tabItemTypeButton.querySelector('button')).toBeTruthy()
  })

  it('can remove attributes', function () {
    const item = new TabsItem()

    item.setAttribute('name', 'my-item')
    item.setAttribute('id', 'it-1')
    item.setAttribute('title', 'my-title')

    item.setAttribute('active', '')

    item.innerHTML = /* HTML */ `
      <span>item-1</span>
    `
    item.connectedCallback()

    expect(item.hasAttribute('name')).toBeTruthy()
  })
})
