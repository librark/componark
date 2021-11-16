import { Multiselect } from '../../../src/components/multiselect/components/multiselect'

describe('Multiselect', () => {
  let container = null
  jest.useFakeTimers()

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
    <ark-multiselect></ark-multiselect>
    `
    const multiselect = container.querySelector('ark-multiselect')

    expect(multiselect).toBeTruthy()
    expect(multiselect).toEqual(multiselect.init())
  })

  it('Click on field opens list', () => {
    container.innerHTML = /* html */ `
    <ark-multiselect></ark-multiselect>
    `
    const multiselect = container.querySelector('ark-multiselect')
    const field = multiselect.querySelector('.ark-multiselect__field')
    const popup = multiselect.querySelector('.ark-multiselect__popup')

    field.click()
    expect(popup.style.display).toBe('block')
    expect(multiselect.isOpened).toBeTruthy()
  })

  it('Click on tag does not open list', () => {
    container.innerHTML = /* html */ `
    <ark-multiselect></ark-multiselect>
    `
    const multiselect = container.querySelector('ark-multiselect')
    const popup = multiselect.querySelector('.ark-multiselect__popup')

    const myItems = ['01 display']

    multiselect
      .init({
        items: myItems,
      })
      .render()
      .load()

    const list = multiselect.multiselectList

    list.itemElements[0].click()

    let tags = multiselect.querySelectorAll('.ark-multiselect__tag')
    tags[0].click()

    expect(multiselect.isOpened).toBeFalsy()
  })

  it('tag can be removed', () => {
    container.innerHTML = /* html */ `
    <ark-multiselect></ark-multiselect>
    `
    const multiselect = container.querySelector('ark-multiselect')

    const myItems = [
      '01 display',
      '02 max-width',
      '03 max-height',
      '04 width',
      '05 height',
    ]

    multiselect
      .init({
        items: myItems,
      })
      .render()
      .load()

    const list = multiselect.multiselectList

    list.itemElements[1].click()
    list.itemElements[2].click()

    let removeButtons = multiselect.querySelectorAll(
      '.ark-multiselect__tag-remove-button'
    )

    removeButtons[0].click()
    removeButtons[1].click()

    expect(multiselect.querySelectorAll('.ark-multiselect__tag-remove-button'))
      .not.toHaveLength
  })

  xit('Click outside element close list', () => {
    container.innerHTML = /* html */ `
    <ark-multiselect></ark-multiselect>
    `
    const multiselect = container.querySelector('ark-multiselect')
    multiselect.addEventListener('focusout', multiselect.focusOut())

    multiselect.click()
    container.click()

    jest.runAllTimers()

    expect(setTimeout).toBeCalledTimes(1)
  })

  it('Clean button clean all tags from field', () => {
    container.innerHTML = /* html */ `
    <ark-multiselect></ark-multiselect>
    `
    const multiselect = container.querySelector('ark-multiselect')
    const myItems = ['01 display', '02 max-width']

    multiselect
      .init({
        items: myItems,
      })
      .render()
      .load()

    const list = multiselect.multiselectList
    const clean = multiselect._clean

    list.itemElements[0].click()
    list.itemElements[1].click()

    expect(multiselect.querySelectorAll('.ark-multiselect__tag').length).toBe(2)
    clean.click()

    expect(multiselect.querySelectorAll('.ark-multiselect__tag').length).toBe(0)
  })

  it('Returns value as string of selected items', () => {
    container.innerHTML = /* html */ `
    <ark-multiselect></ark-multiselect>
    `
    const multiselect = container.querySelector('ark-multiselect')
    const myItems = ['01 display', '02 max-width']

    multiselect
      .init({
        items: myItems,
      })
      .render()
      .load()

    const list = multiselect.multiselectList

    list.itemElements[0].click()
    list.itemElements[1].click()
    expect(multiselect.value).toBe(list.selectedList.join())
  })

  it('Input value can filter list items', () => {
    container.innerHTML = /* html */ `
    <ark-multiselect></ark-multiselect>
    `
    const multiselect = container.querySelector('ark-multiselect')
    const myItems = ['01 display', '02 max-width']

    multiselect
      .init({
        items: myItems,
      })
      .render()
      .load()

    const input = multiselect.querySelector('ark-multiselect-input')
    const list = multiselect.multiselectList
    const field = multiselect._field

    input.value = 'display'
    field.dispatchEvent(new Event('input'))

    expect(list.itemElements[1].style.display).toBe('none')
  })

  it('Input value can filter items of object list', () => {
    container.innerHTML = /* html */ `
    <ark-multiselect></ark-multiselect>
    `

    const multiselect = container.querySelector('ark-multiselect')

    const myItems = [
      { id: '101', name: 'Camila' },
      { id: '102', name: 'Luisa' },
    ]

    const objectField = 'id'
    const template = (item) => `${item['id']} - ${item['name']}`

    multiselect
      .init({
        template: template,
        field: objectField,
        items: myItems,
      })
      .render()
      .load()

    const input = multiselect.querySelector('ark-multiselect-input')
    const list = multiselect.multiselectList
    const field = multiselect._field

    input.value = 'camila'
    field.dispatchEvent(new Event('input'))

    expect(list.itemElements[1].style.display).toBe('none')
  })

  it('Pressing the Enter key focus input and pressing other keys opens the list', () => {
    container.innerHTML = /* html */ `
    <ark-multiselect></ark-multiselect>
    `
    const multiselect = container.querySelector('ark-multiselect')
    const input = multiselect.multiselectInput.firstElementChild

    const popup = multiselect._popup

    multiselect.dispatchEvent(
      new KeyboardEvent('keydown', {
        code: 'Enter',
      })
    )
    multiselect.dispatchEvent(
      new KeyboardEvent('keydown', {
        code: 'KeyA',
      })
    )

    expect(popup.style.display).toBe('block')
  })

  it('Pressing the Escape key closes the list', () => {
    container.innerHTML = /* html */ `
    <ark-multiselect></ark-multiselect>
    `
    const multiselect = container.querySelector('ark-multiselect')

    const popup = multiselect._popup

    multiselect.dispatchEvent(
      new KeyboardEvent('keydown', {
        code: 'KeyA',
      })
    )
    multiselect.dispatchEvent(
      new KeyboardEvent('keydown', {
        code: 'Escape',
      })
    )

    expect(popup.style.display).toBe('none')
  })
})
