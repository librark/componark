import { Tabs } from './tabs.js'

describe('Tabs', () => {
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
    
    container.innerHTML =/* html */`
        <ark-tabs></ark-tabs>
    `
    const tabs = container.querySelector('ark-tabs')
    expect(tabs).toBe(tabs.init())
  })

  it('can be rendered without active attribute', () => {
    container.innerHTML = /* html */ `
    <ark-tabs>
      <ark-tabs-item id="t-1" active>
      <ark-icon name="far fa-address-book"></ark-icon>
      <span>span-1</span>
      </ark-tabs-item>
      <ark-tabs-item id="t-2">
      <ark-icon name="far fa-address-book"></ark-icon>
      <span>span-2 asdf asdfs</span>
      </ark-tabs-item>
    </ark-tabs>`

    const tabs = document.querySelector('ark-tabs')

    const element = tabs.querySelector('[active]')
    expect(element.getAttribute('id')).toBe('t-1')
  })

  it('can be rendered with active attribute', () => {
    container.innerHTML = /* html */ `
    <ark-tabs>
      <ark-tabs-item id="t-1">
      <ark-icon name="far fa-address-book"></ark-icon>
      <span>span-1</span>
      </ark-tabs-item>
      <ark-tabs-item id="t-2" active>
      <ark-icon name="far fa-address-book"></ark-icon>
      <span>span-2 asdf asdfs</span>
      </ark-tabs-item>
    </ark-tabs>`

    const tabs = document.querySelector('ark-tabs')
    const tabItem = tabs.querySelector('[active]')
    expect(tabItem.getAttribute('id')).toBe('t-2')
  })

  it('can be rendered replace active attribute', () => {
    container.innerHTML = /* html */ `
    <ark-tabs>
      <ark-tabs-item id="t-1">
      <ark-icon name="far fa-address-book"></ark-icon>
      <span>span-1</span>
      </ark-tabs-item>
      <ark-tabs-item id="t-2">
      <ark-icon name="far fa-address-book"></ark-icon>
      <span>span-2 asdf asdfs</span>
      </ark-tabs-item>
    </ark-tabs>`

    const tabs = document.querySelector('ark-tabs')

    const element = tabs.querySelector('[id="t-1"]')
    // @ts-ignore
    tabs.click()
    element.click()
    expect(element.getAttribute('active')).toBeTruthy
    
    const element2 = tabs.querySelector('[id="t-2"]')
    expect(element2.getAttribute('active')).toBeFalsy
  })
})
