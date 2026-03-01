import { it } from 'node:test';
import assert from 'node:assert/strict';
import './list.js'

let container = null

const setup = () => {
  document.body.innerHTML = '';
  container = document.createElement('div')
  document.body.appendChild(container)
};

it('can be instantiated', () => {
  setup();
  container.innerHTML = `
  <ark-list></ark-list>
  `

  const list = container.querySelector('ark-list')
  assert.deepStrictEqual(list, list.init())
})

it('can be instantiated with items', async () => {
  setup();
  container.innerHTML = `
  <ark-list></ark-list>
  `

  const list = container.querySelector('ark-list')
  list.source = ['Colombia', 'Uruguay', 'Brasil', 'Perú']
  list.render()

  const items = list.selectAll('ark-list-item')

  assert.deepStrictEqual(items.length, 4)
  assert.deepStrictEqual(items[0].textContent.trim(), 'Colombia')
  assert.deepStrictEqual(items[1].textContent.trim(), 'Uruguay')
  assert.deepStrictEqual(items[2].textContent.trim(), 'Brasil')
  assert.deepStrictEqual(items[3].textContent.trim(), 'Perú')
})

it('can be instantiated with items click-disabled', () => {
  setup();
  container.innerHTML = `
  <ark-list click-disabled></ark-list
  `

  const list = container.querySelector('ark-list')
  list.source = ['Colombia', 'Uruguay', 'Brasil', 'Perú']
  list.render()
  const items = list.selectAll('ark-list-item')

  assert.deepStrictEqual(items.length, 4)
  assert.deepStrictEqual(items[0].textContent.trim(), 'Colombia')
  assert.deepStrictEqual(items[1].textContent.trim(), 'Uruguay')
  assert.deepStrictEqual(items[2].textContent.trim(), 'Brasil')
  assert.deepStrictEqual(items[3].textContent.trim(), 'Perú')

  list.addEventListener('list-selected', event => {
    assert.strictEqual(true, false) // never reached
  })
  items[0].click()
})

it('can delete', async () => {
  setup();
  container.innerHTML = `
  <ark-list click-disabled></ark-list
  `

  const list = container.querySelector('ark-list')
  list.source = ['Colombia', 'Uruguay', 'Brasil', 'Perú']
  list.render()

  list.delete(1)
  let items = list.selectAll('ark-list-item')
  assert.deepStrictEqual(items.length, 3)
  assert.deepStrictEqual(items[1].textContent.trim(), 'Brasil')

  list.delete(0, 2)
  items = list.selectAll('ark-list-item')
  assert.deepStrictEqual(items.length, 1)
  assert.deepStrictEqual(items[0].textContent.trim(), 'Perú')
})

it('can select an item when it is clicked', async () => {
  setup()
  container.innerHTML = `
  <ark-list></ark-list
  `

  const list = container.querySelector('ark-list')
  list.source = ['Colombia', 'Uruguay', 'Brasil', 'Perú']
  list.render()

  const items = list.selectAll('ark-list-item')
  assert.deepStrictEqual(items.length, 4)

  const selected = new Promise((resolve) => {
    list.addEventListener('list-selected', resolve, { once: true })
  })

  items[2].click()
  const event = await selected
  assert.deepStrictEqual(event.detail.data, 'Brasil')
})

it('can be declaratively instantiated with JSON source', async () => {
  setup();
  const source = ['Colombia', 'Uruguay', 'Brasil', 'Perú']

  container.innerHTML = `
  <ark-list>
    <data>${JSON.stringify(source)}</data>
  </ark-list>
  `

  const list = container.querySelector('ark-list')

  const items = list.selectAll('ark-list-item')

  assert.deepStrictEqual(items.length, 4)
  assert.deepStrictEqual(items[0].textContent.trim(), 'Colombia')
  assert.deepStrictEqual(items[1].textContent.trim(), 'Uruguay')
  assert.deepStrictEqual(items[2].textContent.trim(), 'Brasil')
  assert.deepStrictEqual(items[3].textContent.trim(), 'Perú')
})

it('can be provided with a list item template', async () => {
  setup();
  const source = [
    { name: 'Colombia', code: 'CO' },
    { name: 'Uruguay', code: 'UY' },
    { name: 'Brasil', code: 'BR' },
    { name: 'Perú', code: 'PE' }
  ]

  container.innerHTML = `
  <ark-list>
    <data hidden>${JSON.stringify(source)}</data>
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

  assert.deepStrictEqual(items.length, 4)
  assert.deepStrictEqual(
    items[0].innerHTML.replace(/\s/g, ''),
    '<dl><div><dt>Name</dt><dd>Colombia</dd></div>' +
    '<div><dt>Code</dt><dd>CO</dd></div></dl>'
  )
  assert.deepStrictEqual(
    items[1].innerHTML.replace(/\s/g, ''),
    '<dl><div><dt>Name</dt><dd>Uruguay</dd></div>' +
    '<div><dt>Code</dt><dd>UY</dd></div></dl>'
  )
  assert.deepStrictEqual(
    items[2].innerHTML.replace(/\s/g, ''),
    '<dl><div><dt>Name</dt><dd>Brasil</dd></div>' +
    '<div><dt>Code</dt><dd>BR</dd></div></dl>'
  )
  assert.deepStrictEqual(
    items[3].innerHTML.replace(/\s/g, ''),
    '<dl><div><dt>Name</dt><dd>Perú</dd></div>' +
    '<div><dt>Code</dt><dd>PE</dd></div></dl>'
  )
})

it('can be render simple lists with an item template', async () => {
  setup();
  const source = ['Colombia', 'Uruguay', 'Brasil', 'Perú']

  container.innerHTML = `
  <ark-list>
    <data hidden>${JSON.stringify(source)}</data>
    <template>
      <span><strong>\${this}</strong></span>
    </template>
  </ark-list>
  `

  const list = container.querySelector('ark-list')

  const items = list.selectAll('ark-list-item')

  assert.deepStrictEqual(items.length, 4)
  assert.deepStrictEqual(
    items[0].innerHTML.replace(/\s/g, ''),
    '<span><strong>Colombia</strong></span>'
  )
  assert.deepStrictEqual(
    items[1].innerHTML.replace(/\s/g, ''),
    '<span><strong>Uruguay</strong></span>'
  )
  assert.deepStrictEqual(
    items[2].innerHTML.replace(/\s/g, ''),
    '<span><strong>Brasil</strong></span>'
  )
  assert.deepStrictEqual(
    items[3].innerHTML.replace(/\s/g, ''),
    '<span><strong>Perú</strong></span>'
  )
})

it('can be rendered again given a new array through init', async () => {
  setup();
  let source = ['Colombia', 'Uruguay', 'Brasil', 'Perú']
  container.innerHTML = `
  <ark-list>
    <data hidden>${JSON.stringify(source)}</data>
    <template>
      <span><strong>\${this}</strong></span>
    </template>
  </ark-list>
  `
  const list = container.querySelector('ark-list')
  let items = list.selectAll('ark-list-item')
  assert.deepStrictEqual(items.length, 4)
  assert.deepStrictEqual(
    items[0].innerHTML.replace(/\s/g, ''),
    '<span><strong>Colombia</strong></span>'
  )
  assert.deepStrictEqual(
    items[1].innerHTML.replace(/\s/g, ''),
    '<span><strong>Uruguay</strong></span>'
  )
  assert.deepStrictEqual(
    items[2].innerHTML.replace(/\s/g, ''),
    '<span><strong>Brasil</strong></span>'
  )
  assert.deepStrictEqual(
    items[3].innerHTML.replace(/\s/g, ''),
    '<span><strong>Perú</strong></span>'
  )

  source = ['Ecuador', 'Panama', 'Venezuela', 'USA']
  list.init({ source }).render()
  items = list.selectAll('ark-list-item')

  assert.deepStrictEqual(items.length, 4)
  assert.deepStrictEqual(
    items[0].innerHTML.replace(/\s/g, ''),
    '<span><strong>Ecuador</strong></span>'
  )
  assert.deepStrictEqual(
    items[1].innerHTML.replace(/\s/g, ''),
    '<span><strong>Panama</strong></span>'
  )
  assert.deepStrictEqual(
    items[2].innerHTML.replace(/\s/g, ''),
    '<span><strong>Venezuela</strong></span>'
  )
  assert.deepStrictEqual(items[3].innerHTML.replace(/\s/g, ''), '<span><strong>USA</strong></span>')
})

it('listens to delete events to remove its items', () => {
  setup();
  const source = ['Colombia', 'Uruguay', 'Brasil', 'Perú']
  container.innerHTML = `
  <ark-list>
    <data hidden>${JSON.stringify(source)}</data>
    <template>
      <span>
        <strong>\${this}</strong></span>
        <button data-\${this}>
          DELETE
        </button>
    </template>
  </ark-list>
  `
  const list = container.querySelector('ark-list')
  let button = list.querySelector('[data-colombia]')

  let items = list.selectAll('ark-list-item')
  assert.deepStrictEqual(items.length, 4)

  button.dispatchEvent(new CustomEvent('delete', { bubbles: true }))

  button = list.querySelector('[data-colombia]')
  items = list.selectAll('ark-list-item')

  assert.deepStrictEqual(items.length, 3)
  assert.strictEqual(button, null)
})
