import { SplitViewMaster } from './master'

describe('SplitViewMaster', () => {
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
    container.innerHTML = /*html*/`
    <ark-splitview-master>
    </ark-splitview-master>
    `
    const master = container.querySelector('ark-splitview-master')
    master.init()
    master.connectedCallback()

    expect(master).toBeTruthy()
    expect(master).toBe(master.init())
    expect(master.getAttribute('master-event')).toBeNull()
  })

  it('can be instantiated with master-event attribute', () => {
    container.innerHTML = `
    <ark-splitview-master master-event="my-event">
    </ark-splitview-master>
    `
    const master = container.querySelector('ark-splitview-master')
    expect(master.getAttribute('master-event')).toEqual('my-event')
    expect(master.masterEvent).toEqual('my-event')
  })

  it('can throw a master-change event', () => {
    container.innerHTML = `
    <ark-splitview-master master-event="click">
      <button>Button</button>
    </ark-splitview-master>
    `
    const master = container.querySelector('ark-splitview-master')
    const button = master.select('button')

    let masterEvent = null
    master.addEventListener('master-change', (event) => {masterEvent = event})

    button.click()

    expect(masterEvent).toBeTruthy()
  })
})
