
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
      const items = multiselectList.itemElements

      items[0].click()
      items[0].click()

      expect(items[0].hasAttribute('selected')).toBeTruthy
  
    }) 

it('items thar arent li, cant be selected', () => {
      container.innerHTML = /* html */`
      <ark-multiselect></ark-multiselect>
      `
      const multiselect = container.querySelector('ark-multiselect')
      const list = multiselect._list
     
      list.click()
      list.childNodes[1].click()
      expect(list.childNodes[1].hasAttribute('selected')).toBeFalsy  
    }) 

it('Can create a tag',()=>{
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

  expect(list.itemElements.length).not.toBe(list.items.length)
  expect(multiselect.querySelectorAll('.ark-multiselect__tag').length).toBe(2)
})



})
