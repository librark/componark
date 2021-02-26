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
    //console.log(multiselect.hasAttribute('label'))
    expect(multiselect).toBeTruthy()
    expect(multiselect).toBe(multiselect.init())
  }) 

  it('pop up can be open and closed', () => {
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

})
