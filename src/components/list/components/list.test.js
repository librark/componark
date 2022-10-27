import { List } from './list.js'

describe('List', () => {
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
    expect(list).toEqual(list.init())
    
  })
  
  it('can be instantiated with items', async () => {
     container.innerHTML = `
      <ark-list></ark-list>
    `

    
    const list =  container.querySelector('ark-list')
    list.source =  ['Colombia', 'Uruguay', 'Brasil', 'Perú']
    await list.update()
      
    const items = list.selectAll('ark-list-item')

    expect(items.length).toEqual(4)
    expect(items[0].textContent.trim()).toEqual('Colombia')
    expect(items[1].textContent.trim()).toEqual('Uruguay')
    expect(items[2].textContent.trim()).toEqual('Brasil')
    expect(items[3].textContent.trim()).toEqual('Perú')

    items[0].click()
    list.click()
  })

  it('can be instantiated with items click-disabled', async () => {
    container.innerHTML = `
    <ark-list click-disabled></ark-list
    `

    const list = container.querySelector('ark-list')
    list.source = ['Colombia', 'Uruguay', 'Brasil', 'Perú']
    list.render()
    const items = list.selectAll('ark-list-item')
    
    expect(items.length).toEqual(4)
    expect(items[0].textContent.trim()).toEqual('Colombia')
    expect(items[1].textContent.trim()).toEqual('Uruguay')
    expect(items[2].textContent.trim()).toEqual('Brasil')
    expect(items[3].textContent.trim()).toEqual('Perú')
  })
  
  it('can delete', async () => {
    container.innerHTML = `
    <ark-list click-disabled></ark-list
    `
  
    const list = container.querySelector('ark-list')
    list.source =  ['Colombia', 'Uruguay', 'Brasil', 'Perú']
    list.render()

    list.delete(1)
    let items = list.selectAll('ark-list-item')
    expect(items.length).toEqual(3)
    expect(items[1].textContent.trim()).toEqual('Brasil')

    list.delete(0, 2)
    items = list.selectAll('ark-list-item')
    expect(items.length).toEqual(1)
    expect(items[0].textContent.trim()).toEqual('Perú')
  })

  it('can be instantiated with items', () => {
    container.innerHTML = `
    <ark-list click-disabled></ark-list
    `

    
    const list = container.querySelector('ark-list')
    list.source =  ['Colombia', 'Uruguay', 'Brasil', 'Perú']
    list.render()

    const items = list.selectAll('ark-list-item')
    expect(items.length).toEqual(4)

    list.addEventListener('list:selected', event => {
      expect(event['detail'].data).toEqual('Brasil')
    })

    items[2].click()
  })

  it('can select an item when it is clicked', () => {
    container.innerHTML = `
    <ark-list click-disabled></ark-list
    `
    
    const list = container.querySelector('ark-list')
    list.source =  ['Colombia', 'Uruguay', 'Brasil', 'Perú']
    list.render()

    const items = list.selectAll('ark-list-item')
    expect(items.length).toEqual(4)

    list.addEventListener('list:selected', event => {
      expect(event['detail'].data).toEqual('Brasil')
    })
    items[2].click()
  })
})
