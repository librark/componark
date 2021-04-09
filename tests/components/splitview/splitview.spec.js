import { Component } from 'base/component'
import {
  SplitView, SplitViewDetail, SplitViewMaster
} from 'components/splitview'

class NestedMaster extends Component {
  constructor() {
    super()
    this.addEventListener('click', (_) => {
      this.emit('nested:master', {value: 'NESTED MASTER VALUE'})

    })
  }
}
Component.define('nested-master', NestedMaster)

class NestedDetail extends Component {
  init(context) {
    this.value = context.value
    return super.init()
  }

  render() {
    this.content = this.value
    return super.render()
  }
}
Component.define('nested-detail', NestedDetail)


describe('SplitView', () => {
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
    <ark-splitview></ark-splitview>
    `
    const splitview = container.querySelector('ark-splitview')

    expect(splitview).toBeTruthy()
    expect(splitview.init()).toBe(splitview)
  })

  it('can coordinate the master and the detail components', () => {
    container.innerHTML = `
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

    expect(nestedDetail.content).toEqual('NESTED MASTER VALUE')
  })
})
