import { it } from 'node:test';
import assert from 'node:assert/strict';
import { Component } from '#base/index.js'
import './splitview.detail.js'

/** @import {SplitViewDetail} from './splitview.detail.js' */

class MockMain extends Component {
  init (context = {}) {
    this.name = this.name || context.name || null
    return super.init(context)
  }

  render () {
    if (this.name) {
      this.content = `${this.name}`
    }
    return super.render()
  }
}
Component.define('mock-main', MockMain)

let container = null

const setup = () => {
  document.body.innerHTML = '';
  container = document.createElement('div')
  document.body.appendChild(container)
};

it('can be instantiated', () => {
  setup();
  container.innerHTML = `
  <ark-splitview-detail>
  </ark-splitview-detail>
  `
  const detail = container.querySelector('ark-splitview-detail')
  assert.ok(detail)

  assert.strictEqual(detail, detail.init())
})

it('can be instantiated with an inner main Component', () => {
  setup();
  container.innerHTML = /* html */`
  <ark-splitview-detail>
    <mock-main>MAIN CONTENT</mock-main>
  </ark-splitview-detail>
  `
  const detail = container.querySelector('ark-splitview-detail')

  assert.deepStrictEqual(detail.firstElementChild.textContent, 'MAIN CONTENT')
})

it('can initialize its main Component', () => {
  setup();
  container.innerHTML = /* html */`
  <ark-splitview-detail>
    <mock-main></mock-main>
  </ark-splitview-detail>
  `
  const detail = container.querySelector('ark-splitview-detail')

  detail.init({ name: 'Servagro' }).render()

  assert.deepStrictEqual(detail.firstElementChild.textContent, 'Servagro')
})

it('can manipulate its hidden attribute', () => {
  setup();
  container.innerHTML = /* html */`
  <ark-splitview-detail>
    <mock-main></mock-main>
  </ark-splitview-detail>
  `
  const detail = container.querySelector('ark-splitview-detail')

  detail.show()
  assert.ok(!detail.hasAttribute('hidden'))

  detail.hide()
  assert.ok(detail.hasAttribute('hidden'))
})

it('listens to close events to hide itself', () => {
  setup();
  container.innerHTML = /* html */`
  <ark-splitview-detail>
    <mock-main></mock-main>
  </ark-splitview-detail>
  `
  const detail = container.querySelector('ark-splitview-detail')
  detail.dispatchEvent(new Event('close'))

  assert.ok(detail.hasAttribute('hidden'))
})
