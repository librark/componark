import {Multiselect} from '../../../src/components/multiselect/components/multiselect'

describe('Multiselect', () => {
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
    <ark-multiselect></ark-multiselect>
    `
    const multiselect = container.querySelector('ark-multiselect')

    expect(multiselect).toBeTruthy()
    expect(multiselect).toEqual(multiselect.init())
  }) 

  it('popup can be open and closed', () => {
    container.innerHTML = /* html */`
    <ark-multiselect></ark-multiselect>
    `
    const multiselect = container.querySelector('ark-multiselect')
    const field = multiselect.querySelector('.ark-multiselect__field')
    const popup =  multiselect.querySelector('.ark-multiselect__popup')
    field.click()
    expect(popup.style.display).toBe('block')  
    expect(multiselect.isOpened).toBeTruthy()
    field.click()  
    expect(popup.style.display).toBe('none')  
    expect(multiselect.isOpened).toBeFalsy()
  })

  it('returns input value', () => {

    container.innerHTML = /* html */`
    <ark-multiselect></ark-multiselect>
    `
    const multiselect = container.querySelector('ark-multiselect')
    const input = multiselect._input
    
    input.value = "hello"
    expect(multiselect.inputValue()).toBe('hello')
  })
  
  xit('List item get tab index',()=>{
    container.innerHTML = /* html */`
    <ark-multiselect></ark-multiselect>
    `
    const multiselect = container.querySelector('ark-multiselect')
    






  })
  
  // it('Popup text change with value of input', () => {
  //   container.innerHTML = /* html */`
  //   <ark-multiselect></ark-multiselect>
  //   `
  //   const multiselect = container.querySelector('ark-multiselect')
  //   const input = multiselect._input
  
  //   input.value = "hello"

  //   multiselect.popupChange()
  //   expect(multiselect._popup.innerText).toBe('hello')
  // })


})
