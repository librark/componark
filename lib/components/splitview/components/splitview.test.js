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
