import './checkbox.js'

describe('Checkbox', () => {
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
    container.innerHTML = /* html */`
    <ark-checkbox.group>
          <ark-checkbox value="1"></ark-checkbox>
    </ark-checkbox-group>`

    const element = container.querySelector('ark-checkbox')
    
    expect(element).toBe(element.init())
  })

  it('can return values and be checked.', () => {
    container.innerHTML = /* html */`
      <ark-checkbox-group>
            <ark-checkbox value="1" checked></ark-checkbox>
            <ark-checkbox value="2"></ark-checkbox>
            <ark-checkbox value="3"></ark-checkbox>
      </ark-checkbox-group>
    
    `
    const checkbox = container.querySelector('ark-checkbox')
    checkbox.checked = false
    checkbox.value = ''

    expect(checkbox.value).toEqual('')
    expect(checkbox.checked).toEqual(false)


    checkbox.value = '123'
    checkbox.checked = true
    
    expect(checkbox.value).toEqual('123')
    expect(checkbox.checked).toEqual(true)
    expect(checkbox.hasAttribute('checked')).toBeTruthy()
    
    checkbox.value = '456'
    checkbox.checked = false
    
    expect(checkbox.value).toEqual('456')
    expect(checkbox.checked).toEqual(false)
    expect(!checkbox.hasAttribute('checked')).toBeTruthy()

})

it('functions can be applied',()=>{
  
  container.innerHTML = /* html */`
  <ark-checkbox-group>
  <ark-checkbox value="1" checked></ark-checkbox>
  <ark-checkbox value="2"></ark-checkbox>
  <ark-checkbox value="3"></ark-checkbox>
  </ark-checkbox-group>
  
  `
  const checkbox = container.querySelector('ark-checkbox')
  
  checkbox.check()
  expect(checkbox.checked).toEqual(true)
  
  checkbox.unCheck()
  expect(checkbox.checked).toEqual(false)
  
  checkbox.toggle()
  expect(checkbox.checked).toEqual(true)
  
  checkbox.toggle()
  expect(checkbox.checked).toEqual(false)
  
  })

  it('It does not allow changing the type of element.', () => {
    container.innerHTML = /* html */`
    <ark-checkbox-group>
          <ark-checkbox value="1" checked></ark-checkbox>
          <ark-checkbox value="2"></ark-checkbox>
          <ark-checkbox value="3"></ark-checkbox>
    </ark-checkbox-group>`

    const element = container.querySelector('ark-checkbox')
    element.setAttribute('type', 'text')
    element.setAttribute('value', '')
    element.setAttribute('data-valid', '')
    element.setAttribute('autofocus', 'autofocus')
    element.connectedCallback()

    expect(element.hasAttribute('type')).toBeTruthy()
    expect(element.hasAttribute('value')).toBeTruthy()
  })

})
