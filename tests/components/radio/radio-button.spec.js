import '../../../src/components/radio/index.js'

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
        <ark-radio-group>
          <ark-radio-button value="op1">Option 1</ark-radio-button>
        </ark-radio-group>
    `
    const radioButton = container.querySelector('ark-radio-button')
    
    expect(radioButton).toBeTruthy()
    expect(radioButton).toBe(radioButton.init({}))
  })

  
  it('can return selected values',()=> {
    container.innerHTML = /* html */ `
    <ark-radio-group">
    <ark-radio-button value="op1">Option 1</ark-radio-button>
    <ark-radio-button value="op2">Option 1</ark-radio-button>
    <ark-radio-button value="op3">Option 1</ark-radio-button>
      </ark-radio-group>
      `
    const element = container.querySelectorAll('ark-radio-button')
    
    expect(element[0].value).toBe("op1")
    expect(element[1].value).toBe("op2")
    expect(element[2].value).toBe("op3")
  })

  it('It does not allow changing the type of element.', () => {
    
    container.innerHTML = /* html */ `
    <ark-radio-group">
    <ark-radio-button value="op1">Option 1</ark-radio-button>
    </ark-radio-group>
    `
    
    const element = container.querySelector('ark-radio-button')
    element.setAttribute('type', 'text')
    expect(element.querySelector('[data-input]').type).toBe('radio')
  })
  
  it('can be checked', () => {
    container.innerHTML = /* html */ `
      <ark-radio-group>
        <ark-radio-button value="op1">Option 1</ark-radio-button>
      </ark-radio-group>
    `
    const radioButton = container.querySelector('ark-radio-button')

    radioButton.check()
    expect(radioButton.hasAttribute('checked')).toBeTruthy()

    radioButton.unCheck()
    expect(!radioButton.hasAttribute('checked')).toBeTruthy()

    radioButton.toggle()
    expect(radioButton.hasAttribute('checked')).toBeTruthy()
    
    radioButton.toggle()
    expect(!radioButton.hasAttribute('checked')).toBeTruthy()
  })

  it('input childs can be checked',()=>{

    container.innerHTML = /* html */ `
      <ark-radio-group>
        <ark-radio-button value="op1">Option 1</ark-radio-button>
        <ark-radio-button value="op2">Option 2</ark-radio-button>
        <ark-radio-button value="op3">Option 3</ark-radio-button>
      </ark-radio-group>
    `
    const radioButtons = container.querySelectorAll('ark-radio-button')

    radioButtons[0].click()
    expect(radioButtons[0].input.checked).toBeTruthy

    radioButtons[1].click()
    expect(radioButtons[1].input.checked).toBeTruthy
    
    radioButtons[2].click()
    expect(radioButtons[2].input.checked).toBeTruthy
    expect(radioButtons[0].input.checked).toBeFalsy
    expect(radioButtons[1].input.checked).toBeFalsy

  })

})
