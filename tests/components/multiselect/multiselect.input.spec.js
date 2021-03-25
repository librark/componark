
import { template } from '@babel/core'
import {Multiselect} from '../../../src/components/multiselect/components/multiselect'

describe('MultiselectList', () => {
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
    const input = multiselect.querySelector('ark-multiselect-input')

    expect(input).toBeTruthy()
    expect(input).toEqual(input.init())
  })

  it('Return value',()=>{
    container.innerHTML = /* html */`
    <ark-multiselect></ark-multiselect>
    `
    const multiselect = container.querySelector('ark-multiselect')
    const input = multiselect.querySelector('ark-multiselect-input')
    input.value = 'This works'
    expect(input.value).toBe('This works')
  })

})
