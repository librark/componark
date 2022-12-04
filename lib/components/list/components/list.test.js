import './list.js'

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
    list.render()
      
    const items = list.selectAll('ark-list-item')

    expect(items.length).toEqual(4)
    expect(items[0].textContent.trim()).toEqual('Colombia')
    expect(items[1].textContent.trim()).toEqual('Uruguay')
    expect(items[2].textContent.trim()).toEqual('Brasil')
    expect(items[3].textContent.trim()).toEqual('Perú')
  })

  it('can be instantiated with items click-disabled', () => {
    expect.assertions(5)
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

    list.addEventListener('list:selected', event => {
      expect(true).toBe(false) // never reached
    })
    items[0].click()
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


  it('can select an item when it is clicked', (done) => {
    expect.assertions(2)
    container.innerHTML = `
    <ark-list></ark-list
    `
    
    const list = container.querySelector('ark-list')
    list.source =  ['Colombia', 'Uruguay', 'Brasil', 'Perú']
    list.render()

    const items = list.selectAll('ark-list-item')
    expect(items.length).toEqual(4)

    list.addEventListener('list:selected', event => {
      expect(event['detail'].data).toEqual('Brasil')
      done()
    })

    items[2].click()
  })

  it('can be declaratively instantiated with JSON source', async () => {
    const source =  ['Colombia', 'Uruguay', 'Brasil', 'Perú']

    container.innerHTML = `
    <ark-list>
      <script type="text/json">${JSON.stringify(source)}</script>
    </ark-list>
    `
    
    const list = container.querySelector('ark-list')
      
    const items = list.selectAll('ark-list-item')

    expect(items.length).toEqual(4)
    expect(items[0].textContent.trim()).toEqual('Colombia')
    expect(items[1].textContent.trim()).toEqual('Uruguay')
    expect(items[2].textContent.trim()).toEqual('Brasil')
    expect(items[3].textContent.trim()).toEqual('Perú')
  })

  it('can be provided with a list item template', async () => {
    const source =  [
      { name: 'Colombia', code: 'CO' },
      { name: 'Uruguay', code: 'UY' },
      { name: 'Brasil', code: 'BR' },
      { name: 'Perú', code: 'PE' },
    ]

    container.innerHTML = `
    <ark-list>
      <script type="text/json">${JSON.stringify(source)}</script>
      <template>
        <dl>
          <div>
            <dt>Name</dt>
            <dd>\${this.name}</dd>
          </div>
          <div>
            <dt>Code</dt>
            <dd>\${this.code}</dd>
          </div>
        </dl>
      </template>
    </ark-list>
    `
    
    const list = container.querySelector('ark-list')
      
    const items = list.selectAll('ark-list-item')

    expect(items.length).toEqual(4)
    expect(items[0].innerHTML.replace(/\s/g, '')).toEqual(
      '<dl><div><dt>Name</dt><dd>Colombia</dd></div>' +
      '<div><dt>Code</dt><dd>CO</dd></div></dl>')
    expect(items[1].innerHTML.replace(/\s/g, '')).toEqual(
      '<dl><div><dt>Name</dt><dd>Uruguay</dd></div>' +
      '<div><dt>Code</dt><dd>UY</dd></div></dl>')
    expect(items[2].innerHTML.replace(/\s/g, '')).toEqual(
      '<dl><div><dt>Name</dt><dd>Brasil</dd></div>' +
      '<div><dt>Code</dt><dd>BR</dd></div></dl>')
    expect(items[3].innerHTML.replace(/\s/g, '')).toEqual(
      '<dl><div><dt>Name</dt><dd>Perú</dd></div>' +
      '<div><dt>Code</dt><dd>PE</dd></div></dl>')
  })
})
