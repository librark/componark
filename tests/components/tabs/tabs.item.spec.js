import { Tabs } from '../../../src/components/tabs'

describe('Tabs Item', () => {
  it('can be instantiated', () => {
    const item = new Tabs()
    expect(item).toBeTruthy()

    const init = item.init()
    expect(item === init).toBeTruthy()
  })

  it('can be rendered with content', function () {
    const item = new Tabs()
    item.setAttribute('id', 'item-1')

    item.innerHTML = /* HTML */ `
      <span>item-1</span>
    `
    item.connectedCallback()

    expect(item.getAttribute('id') === 'item-1').toBeTruthy()
  })

  it('can remove attributes', function () {
    const item = new Tabs()

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
