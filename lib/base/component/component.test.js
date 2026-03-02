import { it, mock } from 'node:test'
import assert from 'node:assert/strict'
import { Component } from './component.js'

class MockComponent extends Component {
  init (context = {}) {
    this.context = context
    this.data = {}
    this.dependency = undefined
    this.code = this.code || null
    return super.init()
  }

  reflectedProperties () { return ['code'] }

  customHandler (/** @type {CustomEvent} */ event) {
    event.detail.code.push(this.code)
  }

  erroringHandler (_event) {
    throw new Error('Something went wrong!')
  }

  async asyncErroringHandler (_event) {
    const callback = async () => {
      throw new Error('Something went async wrong!')
    }
    await callback()
  }

  render () {
    this.dependency = this.resolve('Dependency')
    return super.render()
  }
}
Component.define('mock-component', MockComponent)

class MockContentComponent extends Component {
  render () {
    this.content = '<p>MOCK_CONTENT</p>'
    return super.render()
  }
}
Component.define('mock-content-component', MockContentComponent)

class AsyncLoadComponent extends Component {
  async load () {
    throw new Error('Async Load Error!')
  }
}
Component.define('async-load-component', AsyncLoadComponent)

let container = null
let component = null

const setup = () => {
  document.body.innerHTML = ''
  container = document.createElement('div')
  container.innerHTML = '<mock-component code="XYZ123"></mock-component>'
  component = container.querySelector('mock-component')
  document.body.append(container)
}

it('can be instantiated', () => {
  setup()
  assert.ok(component)
})

it('has an stable public api', () => {
  setup()
  assert.deepStrictEqual(typeof component.constructor.define, 'function')
  assert.deepStrictEqual(typeof component.init, 'function')
  assert.deepStrictEqual(typeof component.reflectedProperties, 'function')
  assert.deepStrictEqual(typeof component.connectedCallback, 'function')
  assert.deepStrictEqual(typeof component.render, 'function')
  assert.deepStrictEqual(typeof component.load, 'function')
  assert.deepStrictEqual(typeof component.select, 'function')
  assert.deepStrictEqual(typeof component.selectAll, 'function')
  assert.deepStrictEqual(typeof component.emit, 'function')
  assert.notStrictEqual(typeof component.content, undefined)
})

it('has an init method through which state is set', () => {
  setup()
  const response = component.init({ attribute: 'value' })
  assert.strictEqual(response, component)
})

it('can set its content via a property', () => {
  setup()
  component.content = '<p>Hello World</p>'
  const paragraph = component.querySelector('p')
  assert.strictEqual(component.content, '<p>Hello World</p>')
  assert.strictEqual(paragraph.outerHTML, '<p>Hello World</p>')
})

it('can have some of its attributes reflected as properties', () => {
  setup()
  assert.strictEqual(component.code, 'XYZ123')
})
it('has an asynchronous load method which is empty by default', async () => {
  setup()
  assert.strictEqual(await component.load(), undefined)
})

it('sets its tag name as class when rendered', () => {
  setup()
  component.render()
  assert.deepStrictEqual(component.className, 'mock-component')
})

it('keeps its previous classes after rendering', () => {
  setup()
  component.classList.add('custom-class')
  component.classList.add('custom-class')
  component.classList.add('special-class')
  component.render()
  assert.deepStrictEqual(component.className, 'mock-component custom-class special-class')
})

it('emits custom events', () => {
  setup()
  let detail = null
  const handler = (event) => { detail = event.detail }
  component.addEventListener('fire', handler)

  component.emit('fire', { location: 'indoors' })

  assert.deepStrictEqual(detail, { location: 'indoors' })
})

it('calls the load method on connectedCallback', async () => {
  setup()
  const component = /** @type {Component} */ (
    document.createElement('mock-component'))
  const initSpy = mock.method(component, 'init')
  const renderSpy = mock.method(component, 'render')
  const loadSpy = mock.method(component, 'load')

  document.body.append(component)

  assert.strictEqual(initSpy.mock.calls.length, 1)
  assert.strictEqual(renderSpy.mock.calls.length, 1)
  assert.strictEqual(loadSpy.mock.calls.length, 1)
  initSpy.mock.restore()
  renderSpy.mock.restore()
  loadSpy.mock.restore()
})

it('catches and re-raises connectedCallback errors', async () => {
  setup()
  const component = /** @type {Component} */ (
    document.createElement('mock-component'))
  const consoleErrorMock = mock.method(console, 'error', () => {})
  component.render = () => {
    throw new Error('Render Error!')
  }

  try {
    component.connectedCallback()
  } catch (error) {
    assert.deepStrictEqual(error.message, 'Render Error!')
  } finally {
    consoleErrorMock.mock.restore()
  }
})

it('emits an error event when async load fails', async () => {
  setup()
  const component = document.createElement('async-load-component')
  let errorEvent = null

  component.addEventListener('error', (event) => {
    errorEvent = event
  })

  document.body.appendChild(component)

  await new Promise(resolve => setTimeout(resolve, 0))

  assert.ok(errorEvent)
  assert.deepStrictEqual(errorEvent.detail.message, 'Async Load Error!')
})

it('selects the children matching a selector', () => {
  setup();
  container.innerHTML = `
  <mock-component>
    <div class="blue"></div>
    <div class="red"></div>
    <div class="red"></div>
  </mock-component>
  `
  const component = container.querySelector('mock-component')

  const blue = component.select('.blue')
  assert.deepStrictEqual(blue.tagName, 'DIV')

  const red = component.selectAll('.red')
  assert.deepStrictEqual(red.length, 2)
})

it('retrieves its slots through the slots method', () => {
  setup();
  container.innerHTML = `
  <mock-component>
    <div slot="header" class="header"></div>
    <div class="body"></div>
    <div class="aside"></div>
    <div slot="footer" class="footer"></div>
  </mock-component>
  `
  const component = container.querySelector('mock-component')

  assert.deepStrictEqual(component.slots, {
    header: [component.select('.header')],
    general: [component.select('.body'), component.select('.aside')],
    footer: [component.select('.footer')]
  })
})

it('binds its properties to children events', async () => {
  setup();
  container.innerHTML = `
  <mock-component>
    <input type="text" listen on-input="{{ data.value = data }}"></input>
  </mock-component>
  `

  const component = container.querySelector('mock-component')
  const input = component.select('input')

  input.dispatchEvent(
    new globalThis.InputEvent('input', { bubbles: true, data: 'E' })
  )

  assert.deepStrictEqual(component.data.value, 'E')
})

it('binds multiple handlers to the same event', async () => {
  setup();
  container.innerHTML = `
  <mock-component>
    <input type="text"
      listen
      on-input="{{ data.value = data }}"
      on-input-1="{{ data.value1 = data }}"
      on-input-2="{{ data.value2 = data }}"
      on-input-3="{{ data.value3 = data }}"
    ></input>
  </mock-component>
  `

  const component = container.querySelector('mock-component')
  const input = component.select('input')

  input.dispatchEvent(
    new globalThis.InputEvent('input', { bubbles: true, data: 'E' })
  )

  assert.deepStrictEqual(component.data.value, 'E')
  assert.deepStrictEqual(component.data.value1, 'E')
  assert.deepStrictEqual(component.data.value2, 'E')
  assert.deepStrictEqual(component.data.value3, 'E')
})

it('binds to the target.value event property by default', async () => {
  setup()
  container.innerHTML = `
  <mock-component>
    <input type="text" listen on-input="{{ data.value }}"></input>
  </mock-component>
  `
  const component = container.querySelector('mock-component')
  const input = component.select('input')
  input.value = 'X'
  const inputEvent = new globalThis.InputEvent('input', { bubbles: true })

  input.dispatchEvent(inputEvent)

  assert.deepStrictEqual(component.data.value, 'X')
})

it('binds to the detail custom event property', async () => {
  setup();
  container.innerHTML = `
  <mock-component>
    <input type="text" listen on-alter="{{ data.value }}"></input>
  </mock-component>
  `

  const component = container.querySelector('mock-component')
  const input = component.select('input')

  input.dispatchEvent(
    new globalThis.CustomEvent('alter', { bubbles: true, detail: 'A' }))

  assert.deepStrictEqual(component.data.value, 'A')
})

it('performs basic transformations to event properties', async () => {
  setup();
  container.innerHTML = `
  <mock-component>
    <input type="text" listen on-alter="{{ data.value | number }}"></input>
  </mock-component>
  `

  const component = container.querySelector('mock-component')
  const input = component.select('input')

  input.dispatchEvent(
    new globalThis.CustomEvent('alter', { bubbles: true, detail: '777' }))

  assert.deepStrictEqual(component.data.value, 777)
})

it('performs object assignment of event details', async () => {
  setup();
  container.innerHTML = `
  <mock-component>
    <input type="text" listen on-alter="{{ local | object }}"></input>
  </mock-component>
  `

  const component = container.querySelector('mock-component')
  const input = component.select('input')

  const detail = { name: 'Sprite', brand: 'Coca-Cola' }
  input.dispatchEvent(
    new globalThis.CustomEvent('alter', { bubbles: true, detail }))

  assert.deepStrictEqual(component.local, { name: 'Sprite', brand: 'Coca-Cola' })
})

it('performs nested object assignment of event details', async () => {
  setup();
  container.innerHTML = `
  <mock-component>
    <input type="text" listen on-alter="{{ local.zone | object }}"></input>
  </mock-component>
  `

  const component = container.querySelector('mock-component')
  component.local.zone = {}
  const input = component.select('input')

  const detail = { country: 'USA', city: 'Atlanta' }
  input.dispatchEvent(
    new globalThis.CustomEvent('alter', { bubbles: true, detail }))

  assert.deepStrictEqual(component.local, {
    zone: {
      country: 'USA',
      city: 'Atlanta' 
    }
  })
})

it('listens to events and handles them with its own methods', async () => {
  setup();
  container.innerHTML = `
    <mock-component code="ABC123">
      <input type="text" listen on-alter="customHandler"></input>
    </mock-component>
  `

  const component = container.querySelector('mock-component')
  const input = component.select('input')

  const event = new globalThis.CustomEvent(
    'alter', { bubbles: true, detail: { code: [] } })
  input.dispatchEvent(event)

  assert.deepStrictEqual(event.detail.code, ['ABC123'])
})

it('listens to events and redirects them to target components', async () => {
  setup();
  container.innerHTML = `
    <mock-component code="ABC123">
      <input type="text" listen on-alter="customHandler@#child"></input>
      <mock-component id="child" code="XYZ890"></mock-component>
    </mock-component>
  `

  const component = container.querySelector('mock-component')
  const input = component.select('input')

  const event = new globalThis.CustomEvent(
    'alter', { bubbles: true, detail: { code: [] } })
  input.dispatchEvent(event)

  assert.deepStrictEqual(event.detail.code, ['XYZ890'])
})

it('does not launch and event if the target is not found', async () => {
  setup();
  container.innerHTML = `
    <mock-component code="ABC123">
      <input type="text" listen on-alter="customHandler@#missing"></input>
      <mock-component id="child" code="XYZ890"></mock-component>
    </mock-component>
  `

  const component = container.querySelector('mock-component')
  const input = component.select('input')

  const event = new globalThis.CustomEvent(
    'alter', { bubbles: true, detail: { code: [] } })
  input.dispatchEvent(event)

  assert.deepStrictEqual(event.detail.code, [])
})


it('listens to clicks and redirects them to target components', async () => {
  setup();
  container.innerHTML = `
    <mock-component code="ABC123">
      <div type="text" listen on-click="customHandler@#child">
        <button id="action">Action</button>
      </div>
      <mock-component id="child" code="XYZ890"></mock-component>
    </mock-component>
  `

  const component = container.querySelector('mock-component')
  const button = component.select('#action')

  const event = new globalThis.CustomEvent(
    'click', { bubbles: true, detail: { code: [] } })
  button.dispatchEvent(event)

  assert.deepStrictEqual(event.detail.code, ['XYZ890'])
})

it('listens to events and pipes them to target components', async () => {
  setup();
  container.innerHTML = `
    <mock-component code="ABC123">
      <div type="text" listen on-change="replaceChildren%detail.name@#child">
        <button id="action">Action</button>
      </div>
      <div id="child">
        Hello
      </div>
    </mock-component>
  `
  const component = container.querySelector('mock-component')
  const button = component.select('#action')

  const event = new globalThis.CustomEvent(
    'change', { bubbles: true, detail: { name: 'World' } })
  button.dispatchEvent(event)

  const child = container.querySelector('#child')
  assert.deepStrictEqual(child.textContent.trim(), 'World')
})

it('emits an error event on declared listeners', async () => {
  setup();
  container.innerHTML = `
  <mock-component>
    <input type="text" listen on-alter="erroringHandler"></input>
  </mock-component>
  `

  const component = container.querySelector('mock-component')

  let errorEvent = {}
  component.addEventListener('error', (event) => { errorEvent = event })

  const input = component.select('input')

  input.dispatchEvent(
    new globalThis.CustomEvent(
      'alter', { bubbles: true, detail: 'I will error!' }
    ))

  assert.deepStrictEqual(errorEvent.detail.message, 'Something went wrong!')
})

it('emits an error event on declared async listeners', async () => {
  setup();
  container.innerHTML = `
  <mock-component>
    <input type="text" listen on-alter="asyncErroringHandler"></input>
  </mock-component>
  `

  const component = container.querySelector('mock-component')

  let errorEvent = {}
  component.addEventListener('error', (event) => { errorEvent = event })

  const input = component.select('input')

  input.dispatchEvent(
    new globalThis.CustomEvent(
      'alter', { bubbles: true, detail: 'I will error!' }
    ))

  // Sleep
  await new Promise(resolve => setTimeout(resolve, 0))

  assert.deepStrictEqual(errorEvent.detail.message, 'Something went async wrong!')
})

it('resolves its resource dependencies using events propagation', () => {
  setup();
  const listener = (event) => {
    const resource = event.detail.resource
    event.detail[resource] = 'RESOLVED_DEPENDENCY'
  }
  document.addEventListener('resolve', listener)
  container.innerHTML = `
  <mock-component></mock-component>
  `
  const component = container.querySelector('mock-component')

  assert.deepStrictEqual(component.dependency, 'RESOLVED_DEPENDENCY')
  document.removeEventListener('resolve', listener)
})

it('provides the dependencies requested to it by child components', () => {
  setup();
  class ParentComponent extends MockComponent {
    provide (resource) {
      if (resource === 'Dependency') {
        return `RESOURCE: ${resource} PROVIDED BY: ${this.id}`
      }
      if (resource === 'state') return { key: 'value' }
    }
  }
  Component.define('parent-component', ParentComponent)

  container.innerHTML = `
  <parent-component id="parent">
    <mock-component id="child"></mock-component>
  </parent-component>
  `

  const child = container.querySelector('#child')

  assert.deepStrictEqual(child.dependency, 'RESOURCE: Dependency PROVIDED BY: parent')

  const state = child.resolve('state')
  assert.deepStrictEqual(state, { key: 'value' })

  const unknown = child.resolve('unknown')
  assert.strictEqual(unknown, undefined)
})

it('provides a styleNames utility function for setting styles', () => {
  setup();
  container.innerHTML = `
  <mock-component class></mock-component>
  `
  const component = container.querySelector('mock-component')
  const background = 'primary'
  const shadow = 'small'
  const color = ''
  const styleMap = {
    [`background-${background}`]: background,
    [`color-${color}`]: color,
    [`shadow-${shadow}`]: shadow
  }

  const result = component.styleNames(styleMap)

  assert.deepStrictEqual(result, 'background-primary shadow-small')
})
