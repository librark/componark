import { Spinner } from './spinner.js'

describe('Spinner', () => {
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
      <ark-spinner></ark-spinner>
    `
    const spinner = container.querySelector('ark-spinner')

    expect(spinner).toBeTruthy
    expect(spinner).toBe(spinner.init())
  })

  it('Different types of spinner can be used', () => {
    container.innerHTML = /* html */ `
      <ark-spinner type="chase"></ark-spinner>
      <ark-spinner type="rect"></ark-spinner>
      <ark-spinner type="loader"></ark-spinner>
      <ark-spinner type="bounce"></ark-spinner>
    `
    const spinner = container.querySelector('ark-spinner')
    const loader = spinner.loader

    expect(spinner.loader).toBeCalled
  })

  it('Can set the size of the spinner', () => {
    container.innerHTML = /* html */ `
      <ark-spinner size="2.5" type="chase"></ark-spinner>
    `
    const spinner = container.querySelector('ark-spinner')

    expect(spinner.loader).toBeCalled
    expect(spinner.style.transform.split(')')[0].split('(')[1]).toBe(
      spinner.size
    )
  })
})
