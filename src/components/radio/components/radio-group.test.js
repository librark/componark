import { RadioButton } from './radio-button.js'
import './radio-group.js'

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
    <ark-radio-group></ark-radio-group>`
    
    const radioGroup = container.querySelector('ark-radio-group')
    expect(radioGroup).toBeTruthy
    expect(radioGroup).toBe(radioGroup.init())
  })

  it('can be instantiated with label attribute', () => {
    container.innerHTML = /* html */ `
    <ark-radio-group label="my group"></ark-radio-group>
    `
    const element = container.querySelector('ark-radio-group')
    const label = element.querySelector('[data-radio-group-label]')

    expect(label.textContent.trim()).toEqual('my group')
    expect(!element.value.trim().length).toBeTruthy()
  })

  it('returns selected values', () => {
    container.innerHTML = /* html */ `
      <ark-radio-group>
        <ark-radio-button value="op1">Option 1</ark-radio-button>
        <ark-radio-button value="op2">Option 2</ark-radio-button>
      </ark-radio-group>
    `

    const group = container.querySelector('ark-radio-group')
    const radioButtons = container.querySelectorAll('ark-radio-button')

    const radio1 = radioButtons[0]
    expect(radio1.value).toBe('op1')
    
    const radio2 = radioButtons[1]
    expect(radio2.value).toBe('op2')
    // @ts-ignore
    expect(!group.value.trim().length).toBeTruthy()
  })

  it('returns selected values Group', () => {
    container.innerHTML = /* html */ `
      <ark-radio-group>
        <ark-radio-button value="op1">Option 1</ark-radio-button>
        <ark-radio-button value="op2">Option 2</ark-radio-button>
        <ark-radio-button value="op3">Option 3</ark-radio-button>
      </ark-radio-group>
    `

    const radioGroup = container.querySelector('ark-radio-group')
    
    const radioButtons = container.querySelectorAll('ark-radio-button')
    
    const radio0 = /** @type {RadioButton} */ (
      radioButtons[0]
      )
    const radio1 = /** @type {RadioButton} */ (
      radioButtons[1]
      )
    const radio2 = /** @type {RadioButton} */ (
      radioButtons[2]
      )
          
    radioGroup['value'] = 'op2'
    expect(radioGroup.value).toEqual('op2')
    expect(radio1.checked).toBeTruthy
    
    radio0.click()
    expect(radioGroup.value).toEqual('op1')
    expect(radio0.checked).toBeTruthy
    
    radio1.click()
    expect(radioGroup.value).toEqual('op2')
    expect(radio1.checked).toBeTruthy
    
    radio2.click()
    expect(radioGroup.value).toEqual('op3')
    expect(radio2.checked).toBeTruthy
  })
  
  it('can handle values not in group',()=>{
    
    container.innerHTML = /* html */ `
      <ark-radio-group>
        <ark-radio-button value="op1">Option 1</ark-radio-button>
        <ark-radio-button value="op2">Option 2</ark-radio-button>
        <ark-radio-button value="op3">Option 3</ark-radio-button>
      </ark-radio-group>
    `

    const radioGroup = container.querySelector('ark-radio-group')
    
    const radioButtons = container.querySelectorAll('ark-radio-button')
    
    radioGroup['value'] = 'op4'
    
    for(let btn of radioButtons){
      expect(btn.checked).toBeFalsy
    }

  })
})
  
