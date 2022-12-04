import './list.js'
import { ListItem } from './list.item.js'

describe('List item', () => {
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
     container.innerHTML = `
      <ark-list></ark-list>
    `

    const list = container.querySelector('ark-list')
    list.source =  ['Colombia', 'Uruguay', 'Brasil', 'Perú']
    list.render()
    const item = list.querySelector('ark-list-item')

    expect(item).toEqual(item.init())
  })

  it('can be rendered with data', () => {
     container.innerHTML = `
      <ark-list></ark-list>
    `

    const list = container.querySelector('ark-list')
    list.source =  ['Colombia']
    list.render()
    const item = list.querySelector('ark-list-item')

    item.data = 'my data'
    item.render()

    expect(item.innerHTML.trim()).toEqual('my data')
  })

  it('can be rendered with template', () => {
    container.innerHTML = `
      <ark-list data-template-list></ark-list>
    `

    const list = container.querySelector('[data-template-list]')
    list.source =  ['Colombia']
    list.render()
    const item = list.querySelector('ark-list-item')
    
    item.data = 'my data'
    item.template = data => /* html */ `<span>${data}</span>` 
    item.render()

    expect(item.innerHTML.trim()).toEqual('<span>my data</span>')
  })
  
  it('can be rendered with template', () => {
    container.innerHTML = `
      <ark-list data-template-list></ark-list>
    `

    const list = container.querySelector('[data-template-list]')
    list.source =  ['Colombia']
    list.render()
    const item = list.querySelector('ark-list-item')

    item.data = 'my data'
    item.template = data => /* html */ `<span>${data}</span>`
    item.render()

    item.addEventListener('list-item:selected', event => {
      expect(event['detail'].data).toEqual('my data')
    })
    item.click()
  })
  
  it('can be rendered without template', () => {
    const item = new ListItem()
    item.init({
      data:'my data'
    }).render()

    expect(item.innerHTML.trim()).toEqual('my data')

  })

})
