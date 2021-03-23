import {Multiselect} from '../../../src/components/multiselect/components/multiselect'

describe('Multiselect', () => {
  let container = null
  jest.useFakeTimers()

  
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

  it('tag can be removed',()=>{
    container.innerHTML = /* html */`
    <ark-multiselect></ark-multiselect>
    `
    const multiselect = container.querySelector('ark-multiselect')
    
    const myItems = [
      '01 display',
      '02 max-width',
      '03 max-height',
      '04 width',
      '05 height'
    ]
    
    multiselect.init({
      items:myItems
    }).render().load()
    
    const list = multiselect._list
    
    list.itemElements[1].click()
    list.itemElements[2].click()
    
    let removeButtons = multiselect.querySelectorAll('.ark-multiselect__tag-remove-button')
  
    
    removeButtons[0].click()
    removeButtons[1].click()
    
    expect(multiselect.querySelectorAll('.ark-multiselect__tag-remove-button')).not.toHaveLength
  })

  
  it('Click outside element close list',()=>{
    container.innerHTML = /* html */`
    <ark-multiselect></ark-multiselect>
    `
    const multiselect = container.querySelector('ark-multiselect')
    multiselect.addEventListener('focusout',multiselect.focusOut())
    
    multiselect.click()
    container.click()

    jest.runAllTimers()

    expect(setTimeout).toBeCalledTimes(1)
  })
  
  it('Clean button clean all tags from field',()=>{
    container.innerHTML = /* html */`
    <ark-multiselect></ark-multiselect>
    `
    const multiselect = container.querySelector('ark-multiselect')
    const myItems = [
      '01 display',
      '02 max-width',
    ]
    
    multiselect.init({
      items:myItems
    }).render().load()
  
  
    const list = multiselect._list
    const clean = multiselect._clean
    
    list.itemElements[0].click()
    list.itemElements[1].click()

    expect(multiselect.querySelectorAll('.ark-multiselect__tag').length).toBe(2)
    clean.click()

    expect(multiselect.querySelectorAll('.ark-multiselect__tag').length).toBe(0)

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
