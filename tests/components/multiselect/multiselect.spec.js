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
    <ark-multiselect"></ark-multiselect>
    `
    const multiselect = container.querySelector('ark-multiselect')
    //console.log(multiselect.hasAttribute('label'))
    expect(multiselect).toBeTruthy
    expect(multiselect).toBe(multiselect.init())
  }) 

  // it('can be required', () => {
  //   container.innerHTML = `<ark-multiselect required></ark-multiselect>`
  //   const component = container.querySelector('ark-label')
  //   const label = component.querySelector('label')
  //   expect(label.getAttribute('required')).not.toBeNull()
  // })

})
