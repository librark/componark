import { it } from 'node:test';
import assert from 'node:assert/strict';
import './paginator.js'

let container = null

const setup = () => {
  document.body.innerHTML = '';
  container = document.createElement('div')
  document.body.appendChild(container)
};

it('can be instantiated', () => {
  setup();
  container.innerHTML = /* html */ `
    <ark-paginator></ark-paginator>
  `
  const paginator = container.querySelector('ark-paginator')

  assert.strictEqual(paginator, paginator.init())
})

it('can be instantiated with parameters', () => {
  setup();
  container.innerHTML = /* html */ `
    <ark-paginator page-size="12" displayed-pages="5"></ark-paginator>
  `
  const paginator = container.querySelector('ark-paginator')
  paginator.init({ collectionSize: 120, currentPage: 4 })

  assert.strictEqual(paginator.pageSize, '12')
  assert.strictEqual(paginator.collectionSize, '120')
  assert.strictEqual(paginator.currentPage, '4')
  assert.strictEqual(paginator.displayedPages, '5')
  assert.strictEqual(paginator.totalPages, 10)

  paginator.init({ collectionSize: 120, pageSize: 10 })
  assert.strictEqual(paginator.totalPages, 12)
})

it('computes the current shown pages', () => {
  setup();
  container.innerHTML = /* html */ `
  <ark-paginator collection-size="120" page-size="12" 
    displayed-pages="5" current-page="1"></ark-paginator>
  `
  const paginator = container.querySelector('ark-paginator')

  assert.deepStrictEqual(paginator.currentPages, [1, 2, 3, 4, 5])
  assert.deepStrictEqual(paginator.totalPages, 10)

  paginator.init({ currentPage: 3 })
  assert.deepStrictEqual(paginator.currentPages, [1, 2, 3, 4, 5])

  paginator.init({ currentPage: 4 })
  assert.deepStrictEqual(paginator.currentPages, [2, 3, 4, 5, 6])

  paginator.init({ currentPage: 5 })
  assert.deepStrictEqual(paginator.currentPages, [3, 4, 5, 6, 7])

  paginator.init({ currentPage: 7 })
  assert.deepStrictEqual(paginator.currentPages, [5, 6, 7, 8, 9])

  paginator.init({ currentPage: 8 })
  assert.deepStrictEqual(paginator.currentPages, [6, 7, 8, 9, 10])

  paginator.init({ currentPage: 9 })
  assert.deepStrictEqual(paginator.currentPages, [6, 7, 8, 9, 10])

  paginator.init({ currentPage: 10 })
  assert.deepStrictEqual(paginator.currentPages, [6, 7, 8, 9, 10])

  paginator.init({ displayedPages: 6, currentPage: 5 })
  assert.deepStrictEqual(paginator.currentPages, [2, 3, 4, 5, 6, 7])

  paginator.init({ displayedPages: 6, currentPage: 7 })
  assert.deepStrictEqual(paginator.currentPages, [4, 5, 6, 7, 8, 9])

  paginator.init({ displayedPages: 6, currentPage: 9 })
  assert.deepStrictEqual(paginator.currentPages, [5, 6, 7, 8, 9, 10])
})

it('enables and notifies page changes', () => {
  setup();
  container.innerHTML = /* html */ `
  <ark-paginator collection-size="100" page-size="10" 
    displayed-pages="5" current-page="1"></ark-paginator>
  `
  const paginator = container.querySelector('ark-paginator')

  let pageChangedEvent = null
  paginator.addEventListener(
    'page-changed', (event) => pageChangedEvent = event)

  paginator._setCurrentPage(4)

  assert.deepStrictEqual(paginator.currentPage, '4')
  assert.ok(pageChangedEvent)
})

it('moves to the different pages', () => {
  setup();
  container.innerHTML = /* html */ `
  <ark-paginator collection-size="100" page-size="10" 
    displayed-pages="5" current-page="1"></ark-paginator>
  `
  const paginator = container.querySelector('ark-paginator')

  paginator.select('[data-page="4"]').click()
  assert.deepStrictEqual(paginator.currentPage, '4')

  paginator.select('[data-page="6"]').click()
  assert.deepStrictEqual(paginator.currentPage, '6')

  paginator.select('[on-click="_prev"]').click()
  assert.deepStrictEqual(paginator.currentPage, '5')

  paginator.select('[on-click="_next"]').click()
  assert.deepStrictEqual(paginator.currentPage, '6')

  paginator.select('[on-click="_first"]').click()
  assert.deepStrictEqual(paginator.currentPage, '1')

  paginator.select('[on-click="_last"]').click()
  assert.deepStrictEqual(paginator.currentPage, '10')

  paginator.select('[on-click="_next"]').click()
  assert.deepStrictEqual(paginator.currentPage, '10')
})

it('can be provided with custom styleable elements', () => {
  setup();
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

  assert.deepStrictEqual(
    paginator.querySelector('[data-first]').innerHTML.trim(),
    '<span style="pointer-events: none">FIRST</span>'
  )
  assert.deepStrictEqual(paginator.querySelector('[data-previous]').innerHTML.trim(), 'BACK')
  assert.ok(paginator.querySelector('[data-page-general]'))
  assert.ok(paginator.querySelector('[data-next]'))
  assert.ok(paginator.querySelector('[data-last]'))
})
