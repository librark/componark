/** @typedef {import('../../../src/components').Icon} Icon */
import '../../../src/components/icon'

describe('Icon', () => {
  it('can be instantiated', () => {
    const icon = /** @type {Icon} */(document.createElement('ark-icon'))
    expect(icon).toBeTruthy()

    var init = icon.init({})
    expect(icon === init).toBeTruthy()
  })

  it('can be rendered with default variables', function () {
    const icon = /** @type {Icon} */(document.createElement('ark-icon'))
    icon.connectedCallback()
    const iconElement = icon.querySelector('i')
    expect(iconElement).toBeTruthy()
  })

  it('can be rendered with undefined variables', function () {
    const icon = /** @type {Icon} */(document.createElement('ark-icon'))
    const type = document.createAttribute('type')
    type.value = 'md'
    icon.setAttributeNode(type)
    icon.connectedCallback()
    const iconElement = icon.querySelector('i')
    expect(iconElement).toBeNull()
  })
})
