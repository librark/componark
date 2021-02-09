import { Paginator } from '../../../src/components/paginator'

describe('Paginator', () => {
  let container = null

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    container.remove()
    container = null
  })

  it('can be instantiated',()=>{
    container.innerHTML = /* html */ `
      <ark-paginator></ark-paginator>
    `
    const paginator = container.querySelector('ark-paginator')

    expect(paginator).toBe(paginator.init())
  })


  it('get collection Length', () => {
    container.innerHTML = /* html */ `
      <ark-paginator></ark-paginator>
    `
    const paginator = container.querySelector('ark-paginator')

    paginator.collectionSize = 100
    paginator.pageSize = 10
    
    // @ts-ignore
    expect(paginator._collectionLength).toBe(10)
    
    paginator.collectionSize = 105
    paginator.pageSize = 10
    
    // @ts-ignore
    expect(paginator._collectionLength).toBe(11)
    
    paginator.collectionSize = 96
    paginator.pageSize = 10
    
    // @ts-ignore
    expect(paginator._collectionLength).toBe(10)
    
    paginator.collectionSize = 0
    paginator.pageSize = 10
    
    // @ts-ignore
    expect(paginator._collectionLength).toBe(0)
    
    paginator.collectionSize = 3
    paginator.pageSize = 10

    // @ts-ignore
    expect(paginator._collectionLength).toBe(1)
  })

  it('can render buttons', () => {
    container.innerHTML = /* html */ `
      <ark-paginator></ark-paginator>
    `
    const paginator = container.querySelector('ark-paginator')

    paginator.collectionSize = 101
    paginator.pageSize = 10
    paginator.render()

    // @ts-ignore
    expect(paginator._collectionLength).toBe(11)

    let buttons = paginator.querySelectorAll('[data-button-list] button')
    expect(buttons[0].id).toBe('1')
    expect(buttons[buttons.length - 1].id).toBe('5')

    // @ts-ignore
    paginator._setCurrentPage(2)
    buttons = paginator.querySelectorAll('[data-button-list] button')
    expect(buttons[0].id).toBe('1')
    expect(buttons[buttons.length - 1].id).toBe('5')

    // @ts-ignore
    paginator._setCurrentPage(5)
    buttons = paginator.querySelectorAll('[data-button-list] button')
    expect(buttons[0].id).toBe('3')
    expect(buttons[buttons.length - 1].id).toBe('7')

    // @ts-ignore
    paginator._setCurrentPage(10)
    buttons = paginator.querySelectorAll('[data-button-list] button')
    expect(buttons[0].id).toBe('7')
    expect(buttons[buttons.length - 1].id).toBe('11')
  })

  it('can change buttons', () => {
      container.innerHTML = /* html */ `
      <ark-paginator></ark-paginator>
    `
    const paginator = container.querySelector('ark-paginator')

    paginator.collectionSize = 101
    paginator.pageSize = 10
    paginator.render()

    // @ts-ignore
    expect(paginator._collectionLength).toBe(11)

    // @ts-ignore
    paginator._setCurrentPage(12)
    expect(paginator.currentPage).toBe(1)

    let buttons = paginator.querySelectorAll('[data-button-list] button')
    expect(buttons[0].id).toBe('1')
    expect(buttons[buttons.length - 1].id).toBe('5')

    // @ts-ignore
    buttons[buttons.length - 1].click()

    buttons = paginator.querySelectorAll('[data-button-list] button')
    expect(buttons[0].id).toBe('3')
    expect(buttons[buttons.length - 1].id).toBe('7')
  })

  it('can change with default buttons', () => {
      container.innerHTML = /* html */ `
      <ark-paginator></ark-paginator>
    `
    const paginator = container.querySelector('ark-paginator')

    paginator.collectionSize = 101
    paginator.pageSize = 10
    paginator.render()
  
    // @ts-ignore
    expect(paginator._collectionLength).toBe(11)

    // @ts-ignore
    paginator._last(new CustomEvent('click'))
    let button = paginator.querySelector('[data-button-list] [active]')
    expect(button.id).toBe('11')

    // @ts-ignore
    paginator._next(new CustomEvent('click'))
    button = paginator.querySelector('[data-button-list] [active]')
    expect(button.id).toBe('11')

    // @ts-ignore
    paginator._prev(new CustomEvent('click'))
    button = paginator.querySelector('[data-button-list] [active]')
    expect(button.id).toBe('10')

    // @ts-ignore
    paginator._first(new CustomEvent('click'))
    button = paginator.querySelector('[data-button-list] [active]')
    expect(button.id).toBe('1')

    // @ts-ignore
    paginator._prev(new CustomEvent('click'))
    button = paginator.querySelector('[data-button-list] [active]')
    expect(button.id).toBe('1')

    // @ts-ignore
    paginator._next(new CustomEvent('click'))
    button = paginator.querySelector('[data-button-list] [active]')
    expect(button.id).toBe('2')
  })
})
