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

  it('it carries over the json data given to it', () => {
    expect.assertions(2)
    const data = {
      id: '7a792bda-6f8a-44ed-a63a-a48bba1e76bf',
      name: 'John Doe'
    }
    container.innerHTML = `
    <ark-emit>
      <data>${JSON.stringify(data)}</data>
      <button>Sending a click event when pressed!</button>
    </ark-emit>
    `

    const emit = container.querySelector('ark-emit')

    const dataElement = emit.querySelector('data')
    expect(dataElement).toBe(null)

    emit.addEventListener('emit', (event) => {
      const detail = event.detail
      expect(detail).toEqual(data)
    })

    container.querySelector('button').click()
  })

  it('it merges upstream event details', () => {
    expect.assertions(1)
    const data = {
      id: '7a792bda-6f8a-44ed-a63a-a48bba1e76bf',
      name: 'John Doe'
    }
    container.innerHTML = `
    <ark-emit data-outer receive="inner" dispatch="outer">
      <data>
        {
          "age": 34,
          "job": "programmer"
        }
      </data>
      <ark-emit data-inner dispatch="inner">
        <data>${JSON.stringify(data)}</data>
        <button>Sending a click event when pressed!</button>
      </ark-emit>
    </ark-emit>
    `

    const emit = container.querySelector('[data-outer]')
    emit.addEventListener('outer', (event) => {
      const detail = event.detail
      expect(detail).toEqual({
        id: '7a792bda-6f8a-44ed-a63a-a48bba1e76bf',
        name: 'John Doe',
        age: 34,
        job: 'programmer'
      })
    })

    container.querySelector('[data-inner]').click()
  })

  it('receives the target.value of regular events', async () => {
    expect.assertions(1)

    container.innerHTML = `
    <ark-emit receive="change">
      <input type="text"></input>
    </ark-emit>
    `
    const input = container.querySelector('input')
    const inputEvent = new Event('change', { bubbles: true })
    const target = { name: 'input', value: 'XYZ' }
    Object.defineProperty(
      inputEvent, 'target', { writable: false, value: target })

    const emit = container.querySelector('ark-emit')
    emit.addEventListener('emit', (event) => {
      const detail = event.detail
      expect(detail).toEqual({ value: 'XYZ' })
    })

    input.dispatchEvent(inputEvent)
  })

  it('binds to the given ancestor referenced by a selector', async () => {
    expect.assertions(1)

    container.innerHTML = `
    <div class="grandparent" data-name="John", data-surname="Doe">
      <div class="parent">
        <ark-emit bind=".grandparent">
          <data>
            {
              name: this.dataset.name,
              surname: this.dataset.surname
            }
          </data>
          <button>Sending a click event when pressed!</button>
        </ark-emit>
      </div>
    </div>
    `

    const emit = container.querySelector('ark-emit')
    emit.addEventListener('emit', (event) => {
      const { detail } = event
      expect(detail).toEqual({
        name: 'John',
        surname: 'Doe'
      })
    })

    container.querySelector('button').click()
  })
})
