import { Button } from 'components/button'

describe('Button', () => {
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
    container.innerHTML = `
    <ark-button></ark-button>
    `
    const button = container.querySelector('ark-button')
    expect(button).toBeTruthy()
    expect(button).toBe(button.init())
  })

  it('replicates its attributes in its inner element', () => {
    container.innerHTML = `
    <ark-button class="custom" type="submit"></ark-button>
    `
    const button = container.querySelector('ark-button')
    const element = button.firstElementChild

    expect(element.tagName).toEqual('BUTTON')
    expect(element.type).toEqual('submit')
    expect(element.className).toEqual('ark-button__button')
  })

  it('can be rendered with a child anchor (<a>)', () => {
    container.innerHTML = `
    <ark-button href="https://www.google.com/"></ark-button>
    `
    const button = container.querySelector('ark-button')
    const element = button.firstElementChild

    expect(element.tagName).toEqual('A')
    expect(element.href).toEqual('https://www.google.com/')
  })

  it('can be rendered as a floating action button (fab)', () => {
    container.innerHTML = `
    <ark-button fab></ark-button>
    `
    const button = container.querySelector('ark-button')

    expect(button.horizontal).toEqual('end')
    expect(button.vertical).toEqual('end')
  })
})
