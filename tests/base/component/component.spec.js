 import { Component } from 'base/component'

class MockComponent extends Component {
  init(context = {}) {
    this.context = context
    return super.init()
  }
  reflectedProperties() { return ['code'] }
}
Component.define('mock-component', MockComponent)


describe('Component', () => {
  let container = null
  let component = null
  beforeEach(() => {
    container = document.createElement('div')
    container.innerHTML = `<mock-component code="XYZ123"></mock-component>`
    component = container.querySelector('mock-component')
  })

  afterEach(() => {
    container.remove()
    container = null
    component = null
  })

  it('can be instantiated', () => {
    expect(component).toBeTruthy()
  })

  it('has an stable public api', () => {
    expect(typeof component.constructor.define).toEqual('function')
    expect(typeof component.init).toEqual('function')
    expect(typeof component.reflectedProperties).toEqual('function')
    expect(typeof component.connectedCallback).toEqual('function')
    expect(typeof component.render).toEqual('function')
    expect(typeof component.load).toEqual('function')
    expect(typeof component.select).toEqual('function')
    expect(typeof component.selectAll).toEqual('function')
    expect(typeof component.emit).toEqual('function')
    expect(typeof component.content).toBeDefined()
  })

  it('has an init method through which state is set', () => {
    const response = component.init({attribute: 'value'})
    expect(response).toBe(component)
  })

  it('can set its content via a property', () => {
    component.content = `<p>Hello World</p>`
    const paragraph = component.querySelector('p')
    expect(component.content).toBe(`<p>Hello World</p>`)
    expect(paragraph.outerHTML).toBe(`<p>Hello World</p>`)
  })

  it('can have some of its attributes reflected as properties', () => {
    expect(component.code).toBe('XYZ123')
  })

  it('sets its tag name as class when rendered', () => {
    component.render()
    expect(component.className).toEqual('mock-component')
  })

  it('emits custom events', () => {
    let detail = null
    const handler = (event) => {detail = event.detail}
    component.addEventListener('fire', handler)

    component.emit('fire', {location: 'indoors'})

    expect(detail).toEqual({location: 'indoors'})
  })

  it('updates the component when connected', () => {
    const spy = jest.spyOn(component, 'update')

    component.connectedCallback()

    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('calls render and load on update', async () => {
    const renderSpy = jest.spyOn(component, 'render')
    const loadSpy = jest.spyOn(component, 'load')

    await component.update()

    expect(renderSpy).toHaveBeenCalledTimes(1)
    expect(loadSpy).toHaveBeenCalledTimes(1)
  })

  it('catches and re-raises update errors', async () => {
    expect.assertions(1)
    const renderSpy = jest.spyOn(component, 'render')
    const loadSpy = jest.spyOn(component, 'load')

    component.load = async () => { throw new Error('Load Error!') }

    try {
      await component.update()
    } catch (error) {
      expect(error.message).toEqual('Load Error!')
    }
  })

  it('selects the children matching a selector', () => {
    container.innerHTML = `
    <mock-component>
      <div class="blue"></div>
      <div class="red"></div>
      <div class="red"></div>
    </mock-component>
    `
    const component = container.querySelector('mock-component')

    const blue = component.select('.blue')
    expect(blue.tagName).toEqual('DIV')

    const red = component.selectAll('.red')
    expect(red.length).toEqual(2)
  })
})