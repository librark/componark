import { getSlots } from '../../../src/utils/slots'

describe('Slots', () => {
  it('can be rendered without content', () => {
    const item = document.createElement('div')
    const slots = getSlots(item)
    expect(!slots['general'].length).toBeTruthy()
  })

  it('can be rendered with content', () => {
    const item = document.createElement('div')

    const obj = document.createElement('div')

    item.appendChild(obj)
    const slots = getSlots(item)
    expect(slots['general'].length).toBeTruthy()
  })

  it('can be rendered with value slot', () => {
    const item = document.createElement('div')

    const obj = document.createElement('div')
    const att = document.createAttribute('slot')
    att.value = 'mySlot'
    obj.setAttributeNode(att)

    item.appendChild(obj)
    const slots = getSlots(item)
    expect(slots['mySlot'].length).toBeTruthy()
  })

  it('can be rendered with multiple values slot', () => {
    const item = document.createElement('div')

    const obj = document.createElement('div')
    const att = document.createAttribute('slot')
    att.value = 'mySlot'
    obj.setAttributeNode(att)

    item.appendChild(obj)

    const obj2 = document.createElement('div')
    const att2 = document.createAttribute('slot')
    att2.value = 'mySlot'
    obj2.setAttributeNode(att2)

    item.appendChild(obj2)
    const slots = getSlots(item)
    expect(slots['mySlot'].length).toBeTruthy()
  })
})
