/** @typedef {import('../../../src/components').ListItem} ListItem */
import { ListItem } from '../../../src/components/list'

describe('List item', () => {
  it('can be instantiated', () => {
    const item = new ListItem()
    item.connectedCallback()
    expect(item.outerHTML).toEqual('<ark-list-item></ark-list-item>')
  })
  it('can be rendered with data', function () {
    const item = new ListItem()
    item.init({ data: 'my data' }).render()
    expect(item.innerHTML.trim()).toEqual('my data')
  })
  it('can be rendered with template', function () {
    const item = new ListItem()
    item
      .init({
        data: 'my data',
        template: data => /* html */ `<span>${data}</span>`
      })
      .render()
    expect(item.innerHTML.trim()).toEqual('<span>my data</span>')
  })
  it('can be rendered with template', function () {
    const item = new ListItem()
    item
      .init({
        data: 'my data',
        template: data => /* html */ `<span>${data}</span>`
      })
      .render()

    item.addEventListener('list-item:selected', event => {
      expect(event.detail.data).toEqual('my data')
    })
    item.click()
  })
})
