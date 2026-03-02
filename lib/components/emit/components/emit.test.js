import { it } from 'node:test';
import assert from 'node:assert/strict';
import './emit.js'

let container = null

const setup = () => {
  document.body.innerHTML = '';
  container = document.createElement('div')
  document.body.appendChild(container)
};

it('can be instantiated', () => {
  setup();
  container.innerHTML = `
  <ark-emit></ark-emit>
  `

  const emit = container.querySelector('ark-emit')
  assert.deepStrictEqual(emit, emit.init())
})

it('emits a target event when handling the one listened at', () => {
  setup();
  container.innerHTML = `
  <ark-emit receive="click" dispatch="custom">
    <button>Sending a click event when pressed!</button>
  </ark-emit>
  `
  const emit = container.querySelector('ark-emit')
  let customCalled = false
  emit.addEventListener('custom', (event) => { customCalled = true })

  container.querySelector('button').click()

  assert.strictEqual(customCalled, true)
})

it('listens to click events and dispatches emit events by default', () => {
  setup();
  container.innerHTML = `
  <ark-emit>
    <button>Sending a click event when pressed!</button>
  </ark-emit>
  `
  const emit = container.querySelector('ark-emit')
  let emitCalled = false
  emit.addEventListener('emit', (event) => { emitCalled = true })

  container.querySelector('button').click()

  assert.strictEqual(emitCalled, true)
})

it('it carries over the json data given to it', () => {
  setup();
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
  assert.strictEqual(dataElement, null)

  emit.addEventListener('emit', (event) => {
    const detail = event.detail
    assert.deepStrictEqual(detail, data)
  })

  container.querySelector('button').click()
})

it('it merges upstream event details', () => {
  setup();
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
    assert.deepStrictEqual(detail, {
      id: '7a792bda-6f8a-44ed-a63a-a48bba1e76bf',
      name: 'John Doe',
      age: 34,
      job: 'programmer'
    })
  })

  container.querySelector('[data-inner]').click()
})

it('receives the target.value of regular events', async () => {
  setup();
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
    assert.deepStrictEqual(detail, { value: 'XYZ' })
  })

  input.dispatchEvent(inputEvent)
})

it('binds to the given ancestor referenced by a selector', async () => {
  setup();
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
    assert.deepStrictEqual(detail, {
      name: 'John',
      surname: 'Doe'
    })
  })

  container.querySelector('button').click()
})

it('emits error when given invalid JSON data', () => {
  setup()
  container.innerHTML = `
  <ark-emit>
    <data>{ invalid json }</data>
    <button>Sending a click event when pressed!</button>
  </ark-emit>
  `
  const emit = container.querySelector('ark-emit')
  let errorEvent = null
  emit.addEventListener('error', (event) => {
    errorEvent = event
  })

  container.querySelector('button').click()

  assert.ok(errorEvent)
})

it('emits error when bound source expression is invalid', () => {
  setup()
  container.innerHTML = `
  <div class="grandparent">
    <ark-emit bind=".grandparent">
      <data>{ invalid:</data>
      <button>Send</button>
    </ark-emit>
  </div>
  `
  const emit = container.querySelector('ark-emit')
  let errorEvent = null
  emit.addEventListener('error', (event) => {
    errorEvent = event
  })

  container.querySelector('button').click()

  assert.ok(errorEvent)
})

it('ignores bound expressions when the ancestor selector does not match', () => {
  setup()
  container.innerHTML = `
  <div class="parent">
    <ark-emit bind=".missing">
      <data>{ value: 'A' }</data>
      <button>Send</button>
    </ark-emit>
  </div>
  `
  const emit = container.querySelector('ark-emit')
  let detail = null
  emit.addEventListener('emit', (event) => {
    detail = event.detail
  })

  container.querySelector('button').click()

  assert.deepStrictEqual(detail, {})
})
