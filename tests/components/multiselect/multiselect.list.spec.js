
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
    const list = multiselect._list

    expect(list).toBeTruthy()
    expect(list).toEqual(list.init())
  })

  it('can render list items', () => {
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
    
    const list = multiselect.multiselectList
    expect(list.querySelectorAll('li').length).toBe(myItems.length)
  })

  
  it('can render list items with custom template',()=>{
      container.innerHTML = /* html */`
      <ark-multiselect></ark-multiselect>
      `
      const multiselect = container.querySelector('ark-multiselect') 
      
      const myItems = [
          { id: '101', name: 'Camila' },
          { id: '102', name: 'Luisa' },
          { id: '103', name: 'Andres' },
          { id: '104', name: 'Daniela' },
          { id: '105', name: 'Alejandro' },
        ]
        
        const field = "id"
        const template = (item) => `${item['id']} - ${item['name']}`
        
        multiselect.init({
            template: template,
            field: field,
            items: myItems
        }).render().load()
        
    })

  it('can select items', () => {
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
        
        
      const multiselectList = multiselect._list
      const items = multiselectList.querySelectorAll('li')

      items[0].click()
      items[0].click()

      expect(items[0].hasAttribute('selected')).toBeTruthy
  
    }) 

it('not li items cant be selected', () => {
      container.innerHTML = /* html */`
      <ark-multiselect></ark-multiselect>
      `
      const multiselect = container.querySelector('ark-multiselect')
     
      const list = multiselect.querySelector('ark-multiselect-list')

      list.querySelector('span').click()
  
    }) 


})
