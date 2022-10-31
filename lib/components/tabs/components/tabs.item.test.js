import { TabsItem } from './tabs.item'
import './tabs'

describe('Tabs Item', () => {
  let container = null
  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    container.remove()
    container = null
  })

  it('can be instantiated', () => {
    container.innerHTML = /* html */ `
      <ark-tabs>
        <ark-tabs-item></ark-tabs-item>
      </ark-tabs>
    `
    const item = container.querySelector('ark-tabs-item')
    expect(item).toBeTruthy()
    
    expect(item).toBe(item.init())
  })
  
  it('can be rendered with content', function () {
    container.innerHTML = /* html */ `
      <ark-tabs>
        <ark-tabs-item></ark-tabs-item>
      </ark-tabs>
    `
    const item = container.querySelector('ark-tabs-item')
    item.setAttribute('id', 'item-1')

    item.innerHTML = /* HTML */ `
      <span>item-1</span>
    `
    expect(item.getAttribute('id')).toEqual('item-1')
  })

  it('can be rendered with type', function () {
    container.innerHTML = /* html */ `
    <ark-tabs>
      <ark-tabs-item></ark-tabs-item>
      <ark-tabs-item></ark-tabs-item>
    </ark-tabs>
  `
    const tabs = document.querySelector('ark-tabs')

    const tabItemTypeLink = tabs.tabs[0]
    tabItemTypeLink.setAttribute('href', 'http')
    tabItemTypeLink.render()
    expect(tabItemTypeLink.querySelector('a')).toBeTruthy()

    const tabItemTypeButton = tabs.tabs[1]
    tabItemTypeButton.render()
    expect(tabItemTypeButton.querySelector('button')).toBeTruthy()
  })

  it('can remove attributes', function () {
    container.innerHTML = /* html */ `
    <ark-tabs>
      <ark-tabs-item></ark-tabs-item>
    </ark-tabs>
  `
    const item = document.querySelector('ark-tabs-item')

    item.setAttribute('name', 'my-item')
    item.setAttribute('id', 'it-1')
    item.setAttribute('title', 'my-title')

    item.setAttribute('active', '')

    item.innerHTML = /* HTML */ `
      <span>item-1</span>
    `
    expect(item.hasAttribute('name')).toBeTruthy()
  })
})
