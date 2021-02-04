import { RadioButton, RadioGroup } from '../../../src/components/radio'

describe('RadioGroup', () => {
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
      
    const radioButtons = container.querySelectorAll('ark-radio-button')

    const radio1 = radioButtons[0]
    expect(radio1).toBeTruthy()

    radio1.connectedCallback()
    radio1.innerHTML = 'op1'
    radio1.init({name:''}).render()

    const radio2 = radioButtons[1]
    radio2.connectedCallback()
    radio2.innerHTML = 'op2'
    radio2.init({name:''}).render()

    const radio3 = radioButtons[2]
    radio3.connectedCallback()
    radio3.innerHTML = 'op3'
    radio3.init({name:''}).render()

    const group = container.querySelector('ark-radio-group')
    group.innerHTML = ''
    group.appendChild(radio1)
    group.appendChild(radio2)
    group.appendChild(radio3)
    group.init().render().load()

    radio1.click()
  })

  it('can be instantiated', () => {
    container.innerHTML = /* html */ `
    <ark-radio-group label="Radio Buttons">
      <ark-radio-button value="op1">Option 1</ark-radio-button>
      <ark-radio-button value="op2">Option 2</ark-radio-button>
      <ark-radio-button value="op3">Option 3</ark-radio-button>
    </ark-radio-group>
    `

    const element = container.querySelector('ark-radio-group')
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
    const element = container.querySelector('ark-radio-group')
    element.setAttribute('label', 'my group')
    element.connectedCallback()

    const label = element.querySelector('[data-radio-group-label]')
    expect(label.textContent.trim()).toEqual('my group')
    expect(!element.value.trim().length).toBeTruthy()
  })

  it('returns selected values', () => {
    container.innerHTML = /* html */ `
      <ark-radio-group label="Radio Buttons">
        <ark-radio-button value="op1">Option 1</ark-radio-button>
        <ark-radio-button value="op2">Option 2</ark-radio-button>
        <ark-radio-button value="op3">Option 3</ark-radio-button>
      </ark-radio-group>
    `

    const group = container.querySelector('ark-radio-group')
    const radioButtons = container.querySelectorAll('ark-radio-button')

    const radio1 = radioButtons[0]
    radio1.value = 'op1'

    const radio2 = radioButtons[1]
    radio2.value = 'op2'

    // @ts-ignore
    group.defaultContent = null
    group.appendChild(radio1)
    group.appendChild(radio2)
    group.load()

    expect(!group.value.trim().length).toBeTruthy()
  })

  it('returns selected values Group', () => {
    container.innerHTML = /* html */ `
      <ark-radio-group label="Radio Buttons">
        <ark-radio-button value="op1">Option 1</ark-radio-button>
        <ark-radio-button value="op2" checked>Option 2</ark-radio-button>
        <ark-radio-button value="op3">Option 3</ark-radio-button>
      </ark-radio-group>
    `

    const radioGroup = /** @type {RadioGroup} */ (
      container.querySelector('ark-radio-group')
    )

    radioGroup.init({}).render().load()

    const radioButtons = container.querySelectorAll('ark-radio-button')


    radioButtons.forEach(radio => {
      radio.init({}).render().load()
    })

    const radio0 = /** @type {RadioButton} */ (
      radioButtons[0]
    )
    const radio1 = /** @type {RadioButton} */ (
      radioButtons[1]
    )
    const radio2 = /** @type {RadioButton} */ (
      radioButtons[2]
    )

    expect(radio1.value).toEqual('op2')

    radio1.click()
    expect(radioGroup.value).toEqual('op2')

    radio0.click()
    radio1.click()
    radio2.click()
    
    expect(radio2.value).toEqual('op3')

    radioGroup.click()
  })
})
