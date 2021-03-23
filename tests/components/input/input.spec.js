import { Input } from 'components/input'

describe('Input', () => {
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
    container.innerHTML = `<ark-input></ark-input>`
    const component = container.querySelector('ark-input')
    expect(component).toBeTruthy()
  })

  it('sets its value attribute on input event', () => {
    container.innerHTML = `<ark-input></ark-input>`
    const component = container.querySelector('ark-input')
    expect(component.value).toBe('')

    const input = component.querySelector('[data-input]')

    input.value = 'X'
    input.dispatchEvent(new Event('input'))

    expect(component.value).toBe('X')
  })

  it('can be required', () => {
    container.innerHTML = `<ark-input required></ark-input>`
    const component = container.querySelector('ark-input')
    const label = component.querySelector('label')
    expect(label.getAttribute('required')).not.toBeNull()
  })

  it('sets its value and dispatches an alter event', function () {
    container.innerHTML = `<ark-input></ark-input>`
    const component = container.querySelector('ark-input')
    component.value = 'abc'
    expect(component.input.value).toEqual('abc')

    component.value = undefined
    expect(component.value).toEqual('')
    expect(component.input.value).toEqual('')

    let alter = {}
    component.addEventListener('alter', (event) => alter = event)

    component.value = 'xyz'

    expect(alter.detail).toEqual('xyz')
  })

  it('can move attributes', function () {
    container.innerHTML = `
    <ark-input value="https://www.knowark.com" type="url">
    `
    const component = container.querySelector('ark-input')

    expect(component.input.value).toEqual('https://www.knowark.com')
    expect(component.input.type).toEqual('url')
  })
})
