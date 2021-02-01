import { Component } from 'base/component'
import {  SplitViewDetail } from 'components/splitview'

class MockMain extends Component {
  init(context={}) {
    this.name = context.name
    return super.init(context)
  }

  render() {
    if (this.name) {
      this.content = `${this.name}`
    }
    return super.render()
  }
} 
Component.define('mock-main', MockMain)

describe('SplitViewDetail', () => {
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
    <ark-splitview-detail>
    </ark-splitview-detail>
    `
    const detail = container.querySelector('ark-splitview-detail')
    expect(detail).toBeTruthy()

    expect(detail).toBe(detail.init())
  })

  it('can be instantiated with an inner main Component', () => {
    container.innerHTML = `
    <ark-splitview-detail>
      <mock-main>MAIN CONTENT</mock-main>
    </ark-splitview-detail>
    `
    const detail = container.querySelector('ark-splitview-detail')

    const main = detail.select('.ark-splitview-detail__main')
    expect(main.firstElementChild.textContent).toEqual('MAIN CONTENT')
  })

  it('can initialize its main Component', () => {
    container.innerHTML = `
    <ark-splitview-detail>
      <mock-main></mock-main>
    </ark-splitview-detail>
    `
    const detail = container.querySelector('ark-splitview-detail')

    detail.init({name: 'Servagro'}).render()

    const main = detail.select('.ark-splitview-detail__main')
    expect(main.firstElementChild.textContent).toEqual('Servagro')
  })


  it('can manipulate its hidden attribute', () => {
    container.innerHTML = `
    <ark-splitview-detail>
      <mock-main></mock-main>
    </ark-splitview-detail>
    `
    const detail = container.querySelector('ark-splitview-detail')

    detail.show()
    expect(detail.hasAttribute('hidden')).toBeFalsy()

    detail.hide()
    expect(detail.hasAttribute('hidden')).toBeTruthy()

    detail.toggle()
    expect(detail.hasAttribute('hidden')).toBeFalsy()

    detail.toggle()
    expect(detail.hasAttribute('hidden')).toBeTruthy()
  })

  xit('can be instantiated with attribute', () => {
    const detail = new SplitViewDetail().init({
      title: 'my title',
      data: 'ok',
      backButtonIcon: () => /* html */ '<span data-button>icon</span>'
    })
    detail.render()

    expect(
      detail.querySelector(
        '[data-master-title]'
      ).textContent.trim() === 'my title'
    ).toBeTruthy()

    expect(
      detail.querySelector('[data-button]').textContent.trim() === 'icon'
    ).toBeTruthy()
  })
})
