import { it } from 'node:test';
import assert from 'node:assert/strict';
import { Component } from '#base/index.js'
import './splitview.js'
import './splitview.detail.js'
import './splitview.master.js'

class NestedMaster extends Component {
  constructor () {
    super()
    this.addEventListener('click', (_) => {
      this.emit('nested:master', { value: 'NESTED MASTER VALUE' })
    })
  }
}
Component.define('nested-master', NestedMaster)

class NestedDetail extends Component {
  init (context) {
    if (!context.value) return super.init()

    this.value = context.value
    return super.init()
  }

  render () {
    this.content = this.value
    return super.render()
  }
}
Component.define('nested-detail', NestedDetail)

let container = null

const setup = () => {
  document.body.innerHTML = '';
  container = document.createElement('div')
  document.body.appendChild(container)
};

it('can be instantiated', () => {
  setup();
  container.innerHTML = /* html */`
  <ark-splitview></ark-splitview>
  `
  const splitview = container.querySelector('ark-splitview')

  assert.ok(splitview)
  assert.strictEqual(splitview.init(), splitview)
})

it('can coordinate the master and the detail components', () => {
  setup();
  container.innerHTML = /* html */`
  <ark-splitview>
    <ark-splitview-master master-event="nested:master">
      <nested-master></nested-master>
    </ark-splitview-master>
    <ark-splitview-detail>
      <nested-detail></nested-detail>
    </ark-splitview-detail>
  </ark-splitview>
  `
  const splitview = container.querySelector('ark-splitview')

  const nestedMaster = splitview.select('nested-master')

  nestedMaster.click()

  const nestedDetail = splitview.select('nested-detail')

  assert.deepStrictEqual(nestedDetail.content, 'NESTED MASTER VALUE')
})

it('cleans up global resize listeners when disconnected', () => {
  setup()
  const addEventListener = globalThis.addEventListener
  const removeEventListener = globalThis.removeEventListener
  let resizeAdded = 0
  let resizeRemoved = 0

  globalThis.addEventListener = function (type, listener, options) {
    if (type === 'resize') resizeAdded += 1
    return addEventListener(type, listener, options)
  }

  globalThis.removeEventListener = function (type, listener, options) {
    if (type === 'resize') resizeRemoved += 1
    return removeEventListener(type, listener, options)
  }

  try {
    container.innerHTML = /* html */`
    <ark-splitview></ark-splitview>
    `
    const splitview = container.querySelector('ark-splitview')
    splitview.remove()
  } finally {
    globalThis.addEventListener = addEventListener
    globalThis.removeEventListener = removeEventListener
  }

  assert.ok(resizeAdded > 0)
  assert.ok(resizeRemoved > 0)
})

it('returns early when there is no detail component to render', () => {
  setup()
  container.innerHTML = /* html */`
  <ark-splitview></ark-splitview>
  `
  const splitview = container.querySelector('ark-splitview')

  assert.doesNotThrow(() => {
    splitview.renderDetail({ value: 'ignored' })
  })
})

it('returns early when removing master listener with no master bound', () => {
  setup()
  container.innerHTML = /* html */`
  <ark-splitview></ark-splitview>
  `
  const splitview = container.querySelector('ark-splitview')

  assert.doesNotThrow(() => {
    splitview._removeMasterListener()
  })
})

it('does not rebind master listener when the master is unchanged', () => {
  setup()
  container.innerHTML = /* html */`
  <ark-splitview>
    <ark-splitview-master master-event="nested:master"></ark-splitview-master>
    <ark-splitview-detail>
      <nested-detail></nested-detail>
    </ark-splitview-detail>
  </ark-splitview>
  `
  const splitview = container.querySelector('ark-splitview')
  const master = splitview.master
  const addSpy = master.addEventListener
  let added = 0
  master.addEventListener = function (type, listener, options) {
    added += 1
    return addSpy.call(this, type, listener, options)
  }

  try {
    splitview._removeMasterListener()
    splitview._setMasterListener()
    splitview._setMasterListener()
  } finally {
    master.addEventListener = addSpy
  }

  assert.deepStrictEqual(added, 1)
})

it('returns early when viewport dimensions are unavailable', () => {
  setup()
  container.innerHTML = /* html */`
  <ark-splitview></ark-splitview>
  `
  const splitview = container.querySelector('ark-splitview')
  const originalInnerHeight = globalThis.innerHeight
  const originalInnerWidth = globalThis.innerWidth

  globalThis.innerHeight = undefined
  assert.doesNotThrow(() => splitview.setDimensions())

  globalThis.innerHeight = originalInnerHeight
  globalThis.innerWidth = undefined
  assert.doesNotThrow(() => splitview.setDimensions())

  globalThis.innerWidth = originalInnerWidth
})
