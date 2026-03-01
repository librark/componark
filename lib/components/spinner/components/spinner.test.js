import { it } from 'node:test'
import assert from 'node:assert/strict'
import './spinner.js'

let container = null

const setup = () => {
  document.body.innerHTML = ''
  container = document.createElement('div')
  document.body.appendChild(container)
}

it('can be instantiated', () => {
  setup()
  container.innerHTML = /* html */ `
    <ark-spinner></ark-spinner>
  `
  const spinner = container.querySelector('ark-spinner')

  assert.ok(spinner)
  assert.strictEqual(spinner, spinner.init())
})

it('Different types of spinner can be used', () => {
  setup()
  container.innerHTML = /* html */ `
    <ark-spinner type="chase"></ark-spinner>
    <ark-spinner type="rect"></ark-spinner>
    <ark-spinner type="loader"></ark-spinner>
    <ark-spinner type="bounce"></ark-spinner>
  `
  const spinner = container.querySelector('ark-spinner')
  assert.ok(spinner.loader)
})

it('Can set the scale of the spinner', () => {
  setup()
  container.innerHTML = /* html */ `
    <ark-spinner scale="2.5" type="chase"></ark-spinner>
  `
  const spinner = container.querySelector('ark-spinner')

  assert.ok(spinner.loader)
  assert.strictEqual(spinner.style.transform.split(')')[0].split('(')[1], spinner.scale)
})
