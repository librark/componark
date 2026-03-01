import { it } from 'node:test';
import assert from 'node:assert/strict';
import './splitview.master.js'

let container = null

const setup = () => {
  document.body.innerHTML = '';
  container = document.createElement('div')
  document.body.appendChild(container)
};

it('can be instantiated', () => {
  setup();
  container.innerHTML = /* html */`
  <ark-splitview-master>
  </ark-splitview-master>
  `
  const master = container.querySelector('ark-splitview-master')
  master.init()
  master.connectedCallback()

  assert.ok(master)
  assert.strictEqual(master, master.init())
  assert.deepStrictEqual(master.getAttribute('master-event'), '')
})

it('can be instantiated with master-event attribute', () => {
  setup();
  container.innerHTML = `
  <ark-splitview-master master-event="my-event">
  </ark-splitview-master>
  `
  const master = container.querySelector('ark-splitview-master')
  assert.deepStrictEqual(master.getAttribute('master-event'), 'my-event')
  assert.deepStrictEqual(master.masterEvent, 'my-event')
})

it('can throw a master-change event', () => {
  setup();
  container.innerHTML = `
  <ark-splitview-master master-event="click">
    <button>Button</button>
  </ark-splitview-master>
  `
  const master = container.querySelector('ark-splitview-master')
  const button = master.select('button')

  let masterEvent = null
  master.addEventListener('master-change', (event) => { masterEvent = event })

  button.click()

  assert.ok(masterEvent)
})
