import './emit.js'

describe('Emit', () => {
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
    <ark-emit></ark-emit>
    `

    const emit = container.querySelector('ark-emit')
    expect(emit).toEqual(emit.init())
  })

  it('emits a target event when handling the one listened at', () => {
    container.innerHTML = `
    <ark-emit receive="click" dispatch="custom">
      <button>Sending a click event when pressed!</button>
    </ark-emit>
    `
    const emit = container.querySelector('ark-emit')
    let customCalled = false
    emit.addEventListener('custom', (event) => { customCalled = true })

    container.querySelector('button').click()

    expect(customCalled).toBe(true)
  })

  it('listens to click events and dispatches emit events by default', () => {
    container.innerHTML = `
    <ark-emit>
      <button>Sending a click event when pressed!</button>
    </ark-emit>
    `
    const emit = container.querySelector('ark-emit')
    let emitCalled = false
    emit.addEventListener('emit', (event) => { emitCalled = true })

    container.querySelector('button').click()

    expect(emitCalled).toBe(true)
  })
})
