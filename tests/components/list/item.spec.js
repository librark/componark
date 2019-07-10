/** @typedef {import('../../../src/components').ListItem} ListItem */
import { ListItem } from '../../../src/components/list'

describe('List item', () => {
  it('can be instantiated', () => {
    const item = /** @type {ListItem} */(
      document.createElement('ark-list-item'))
    expect(item).toBeTruthy()

    var init = item.init({})
    item.click()
    expect(item === init).toBeTruthy()
  })

  it('can be rendered', function () {
    const item = new ListItem()
    item.render()
    expect(item.outerHTML).toEqual('<ark-list-item index=""></ark-list-item>')
  })
})
