import { RadioButton } from '../../../src/components/radio'

describe('RadioButton', () => {
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

    container.innerHTML = /* html */ `
        <ark-radio-group label="Radio Buttons">
          <ark-radio-button value="op1">Option 1</ark-radio-button>
          <ark-radio-button value="op2">Option 2</ark-radio-button>
          <ark-radio-button value="op3">Option 3</ark-radio-button>
        </ark-radio-group>
    `
    const element = container.querySelector('ark-radio-button')
    expect(element).toBeTruthy()

    const init = element.init({})
    expect(element === init).toBeTruthy()
  })

  it('can be instantiated', () => {


    container.innerHTML = /* html */ `
      <ark-radio-group label="Radio Buttons">
        <ark-radio-button value="op1">Option 1</ark-radio-button>
        <ark-radio-button value="op2">Option 2</ark-radio-button>
        <ark-radio-button value="op3">Option 3</ark-radio-button>
      </ark-radio-group>
    `
    const element = container.querySelector('ark-radio-button')
    element.value = 'op1'
    element.connectedCallback()

    element.check()
    expect(element.hasAttribute('checked')).toBeTruthy()

    element.unCheck()
    expect(!element.hasAttribute('checked')).toBeTruthy()

    element.toggle()
    expect(element.hasAttribute('checked')).toBeTruthy()

    element.toggle()
    expect(!element.hasAttribute('checked')).toBeTruthy()
  })

  it('It does not allow changing the type of element.', () => {

    container.innerHTML = /* html */ `
      <ark-radio-group label="Radio Buttons">
        <ark-radio-button value="op1">Option 1</ark-radio-button>
        <ark-radio-button value="op2">Option 2</ark-radio-button>
        <ark-radio-button value="op3">Option 3</ark-radio-button>
      </ark-radio-group>
    `

    const element = container.querySelector('ark-radio-button')
    element.setAttribute('type', 'text')
    element.setAttribute('value', '')
    element.setAttribute('data-valid', '')
    element.setAttribute('autofocus', 'autofocus')
    element.connectedCallback()

    element.unCheck()
    expect(!element.hasAttribute('checked')).toBeTruthy()
  })

  it('It does not allow changing the type of element.', () => {

   container.innerHTML = /* html */ `
      <ark-radio-group label="Radio Buttons">
        <ark-radio-button value="op1">Option 1</ark-radio-button>
        <ark-radio-button value="op2">Option 2</ark-radio-button>
        <ark-radio-button value="op3">Option 3</ark-radio-button>
      </ark-radio-group>
    `
    const element = container.querySelector('ark-radio-button')
    element.value = 'op1'
    expect(element.value).toEqual('op1')
  })

  it('can render several times', () => {
    container.innerHTML = /* html */ `
      <ark-radio-group label="Radio Buttons">
        <ark-radio-button value="op1">Option 1</ark-radio-button>
        <ark-radio-button value="op2">Option 2</ark-radio-button>
        <ark-radio-button value="op3">Option 3</ark-radio-button>
      </ark-radio-group>
    `
    const radio = container.querySelector('ark-radio-button')

    radio.init({})
    radio.init({})
    radio.init({})
    radio.render()
    radio.render().load()

    expect(radio.querySelectorAll('input').length).toEqual(1)
  })
})
