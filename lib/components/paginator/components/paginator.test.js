import './paginator.js'

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

  it('can be instantiated', () => {
    container.innerHTML = /* html */ `
      <ark-paginator></ark-paginator>
    `
    const paginator = container.querySelector('ark-paginator')

    expect(paginator).toBe(paginator.init())
  })

  it('can be instantiated with parameters', () => {
    container.innerHTML = /* html */ `
      <ark-paginator page-size="12" displayed-pages="5"></ark-paginator>
    `
    const paginator = container.querySelector('ark-paginator')
    paginator.init({ collectionSize: 120, currentPage: 4 })

    expect(paginator.pageSize).toBe('12')
    expect(paginator.collectionSize).toBe('120')
    expect(paginator.currentPage).toBe('4')
    expect(paginator.displayedPages).toBe('5')
    expect(paginator.totalPages).toBe(10)

    paginator.init({ collectionSize: 120, pageSize: 10 })
    expect(paginator.totalPages).toBe(12)
  })

  it('computes the current shown pages', () => {
    container.innerHTML = /* html */ `
    <ark-paginator collection-size="120" page-size="12" 
      displayed-pages="5" current-page="1"></ark-paginator>
    `
    const paginator = container.querySelector('ark-paginator')

    expect(paginator.currentPages).toEqual([1, 2, 3, 4, 5])
    expect(paginator.totalPages).toEqual(10)

    paginator.init({ currentPage: 3 })
    expect(paginator.currentPages).toEqual([1, 2, 3, 4, 5])

    paginator.init({ currentPage: 4 })
    expect(paginator.currentPages).toEqual([2, 3, 4, 5, 6])

    paginator.init({ currentPage: 5 })
    expect(paginator.currentPages).toEqual([3, 4, 5, 6, 7])

    paginator.init({ currentPage: 7 })
    expect(paginator.currentPages).toEqual([5, 6, 7, 8, 9])

    paginator.init({ currentPage: 8 })
    expect(paginator.currentPages).toEqual([6, 7, 8, 9, 10])

    paginator.init({ currentPage: 9 })
    expect(paginator.currentPages).toEqual([6, 7, 8, 9, 10])

    paginator.init({ currentPage: 10 })
    expect(paginator.currentPages).toEqual([6, 7, 8, 9, 10])

    paginator.init({ displayedPages: 6, currentPage: 5 })
    expect(paginator.currentPages).toEqual([2, 3, 4, 5, 6, 7])

    paginator.init({ displayedPages: 6, currentPage: 7 })
    expect(paginator.currentPages).toEqual([4, 5, 6, 7, 8, 9])

    paginator.init({ displayedPages: 6, currentPage: 9 })
    expect(paginator.currentPages).toEqual([5, 6, 7, 8, 9, 10])
  })

  it('enables and notifies page changes', () => {
    container.innerHTML = /* html */ `
    <ark-paginator collection-size="100" page-size="10" 
      displayed-pages="5" current-page="1"></ark-paginator>
    `
    const paginator = container.querySelector('ark-paginator')

    let pageChangedEvent = null
    paginator.addEventListener(
      'page-changed', (event) => pageChangedEvent = event)

    paginator._setCurrentPage(4)

    expect(paginator.currentPage).toEqual('4')
    expect(pageChangedEvent).toBeTruthy()
  })

  it('moves to the different pages', () => {
    container.innerHTML = /* html */ `
    <ark-paginator collection-size="100" page-size="10" 
      displayed-pages="5" current-page="1"></ark-paginator>
    `
    const paginator = container.querySelector('ark-paginator')

    paginator.select('[data-page="4"]').click()
    expect(paginator.currentPage).toEqual('4')

    paginator.select('[data-page="6"]').click()
    expect(paginator.currentPage).toEqual('6')

    paginator.select('[on-click="_prev"]').click()
    expect(paginator.currentPage).toEqual('5')

    paginator.select('[on-click="_next"]').click()
    expect(paginator.currentPage).toEqual('6')

    paginator.select('[on-click="_first"]').click()
    expect(paginator.currentPage).toEqual('1')

    paginator.select('[on-click="_last"]').click()
    expect(paginator.currentPage).toEqual('10')

    paginator.select('[on-click="_next"]').click()
    expect(paginator.currentPage).toEqual('10')
  })

  it('can be provided with custom styleable elements', () => {
    container.innerHTML = /* html */ `
      <ark-paginator page-size="12" displayed-pages="5">
        <button data-first slot="first">
          <span style="pointer-events: none">FIRST</span>
        </button>
        <button data-previous slot="previous">BACK</button>
        <button data-page-general slot="page"></button>
        <button data-next slot="next"></button>
        <button data-last slot="last"></button>
      </ark-paginator>
    `

    const paginator = container.querySelector('ark-paginator')

    expect(paginator.querySelector('[data-first]').innerHTML.trim()).toEqual(
      '<span style="pointer-events: none">FIRST</span>')
    expect(paginator.querySelector('[data-previous]').innerHTML.trim()).toEqual(
      'BACK')
    expect(paginator.querySelector('[data-page-general]')).toBeTruthy()
    expect(paginator.querySelector('[data-next]')).toBeTruthy()
    expect(paginator.querySelector('[data-last]')).toBeTruthy()
  })
})
