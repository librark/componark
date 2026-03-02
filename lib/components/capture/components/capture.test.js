import { it } from 'node:test'
import assert from 'node:assert/strict'
import './capture.js'

let container = null

const setup = () => {
  document.body.innerHTML = ''
  container = document.createElement('div')
  document.body.appendChild(container)
}

it('can be instantiated', () => {
  setup()
  container.innerHTML = `
  <ark-capture></ark-capture>
  `

  const capture = container.querySelector('ark-capture')
  assert.deepStrictEqual(capture, capture.init())
})

it('renders the given data detail', () => {
  setup()
  container.innerHTML = `
  <ark-capture>
    <data>
      {
        "name": "John Doe",
        "job": "Programmer"
      }
    </data>
    <output></output>
  </ark-capture>
  `

  const capture = container.querySelector('ark-capture')
  capture.init().render()
  const output = capture.querySelector('output')

  assert.deepStrictEqual(capture.children.length, 1)
  assert.ok(output.innerHTML.includes('John Doe'))
  assert.ok(output.innerHTML.includes('Programmer'))
})

it('renders json data on the given template on the given output', () => {
  setup()
  container.innerHTML = `
  <ark-capture>
    <data>
      {
        "name": "John Doe",
        "job": "Programmer"
      }
    </data>
    <template>
      <div id="output">
        <strong>\${this.name}</strong>
        <strong>\${this.job}</strong>
      </div>
    </template>
    <output></output>
  </ark-capture>
  `

  const capture = container.querySelector('ark-capture')
  capture.init().render()
  const output = capture.querySelector('output')

  assert.deepStrictEqual(capture.children.length, 1)
  assert.ok(output.children[0].innerHTML.includes('John Doe'))
  assert.ok(output.children[0].innerHTML.includes('Programmer'))
})

it('captures specific custom events and renders its details', () => {
  setup()
  container.innerHTML = `
  <ark-capture receive="custom">
    <template>
      <div id="output">
        <strong>\${this.name}</strong>
        <strong>\${this.job}</strong>
      </div>
    </template>
    <output></output>
    <p>Adjoint Element</p>
  </ark-capture>
  `

  const capture = container.querySelector('ark-capture')
  capture.init().render()
  capture.addEventListener('custom', capture.handle.bind(capture))
  const output = capture.querySelector('output')

  capture.dispatchEvent(new CustomEvent('custom', {
    bubbles: true,
    detail: {
      name: 'Richard Roe', job: 'Analyst'
    }
  }))

  assert.deepStrictEqual(capture.children.length, 2)
  assert.ok(output.children[0].innerHTML.includes('Richard Roe'))
  assert.ok(output.children[0].innerHTML.includes('Analyst'))

  capture.dispatchEvent(new CustomEvent('custom', {
    bubbles: true,
    detail: {
      name: 'Megan More', job: 'Manager'
    }
  }))

  assert.deepStrictEqual(capture.children.length, 2)
  assert.ok(output.children[0].innerHTML.includes('Megan More'))
  assert.ok(output.children[0].innerHTML.includes('Manager'))
})

it('emits error when data JSON is invalid', () => {
  setup()
  const holder = document.createElement('div')
  holder.innerHTML = `
  <ark-capture>
    <data>{ invalid json }</data>
    <output></output>
  </ark-capture>
  `
  const capture = holder.querySelector('ark-capture')
  let errorEvent = null
  capture.addEventListener('error', (event) => {
    errorEvent = event
  })

  capture.init().render()

  assert.ok(errorEvent)
})

it('emits error when template cannot be compiled', () => {
  setup()
  const holder = document.createElement('div')
  holder.innerHTML = `
  <ark-capture>
    <data>{"name":"John"}</data>
    <template>\${this.name</template>
    <output></output>
  </ark-capture>
  `
  const capture = holder.querySelector('ark-capture')
  let errorEvent = null
  capture.addEventListener('error', (event) => {
    errorEvent = event
  })

  capture.init().render()

  assert.ok(errorEvent)
  assert.deepStrictEqual(capture.querySelector('output').innerHTML, '')
})

it('emits error when template evaluation fails at runtime', () => {
  setup()
  const holder = document.createElement('div')
  holder.innerHTML = `
  <ark-capture>
    <data>{"name":"John"}</data>
    <template>\${this.profile.name}</template>
    <output></output>
  </ark-capture>
  `
  const capture = holder.querySelector('ark-capture')
  let errorEvent = null
  capture.addEventListener('error', (event) => {
    errorEvent = event
  })

  capture.init().render()

  assert.ok(errorEvent)
  assert.deepStrictEqual(capture.querySelector('output').innerHTML, '')
})
