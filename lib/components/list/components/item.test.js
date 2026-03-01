import { it } from 'node:test';
import assert from 'node:assert/strict';
import './list.js'
import { ListItem } from './item.js'

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
  list.source = ['Colombia', 'Uruguay', 'Brasil', 'Perú']
  list.render()
  const item = list.querySelector('ark-list-item')

  assert.deepStrictEqual(item, item.init())
})

it('can be rendered with data', () => {
  setup();
  container.innerHTML = `
    <ark-list></ark-list>
  `

  const list = container.querySelector('ark-list')
  list.source = ['Colombia']
  list.render()
  const item = list.querySelector('ark-list-item')

  item.data = 'my data'
  item.render()

  assert.deepStrictEqual(item.innerHTML.trim(), 'my data')
})

it('can be rendered with template', () => {
  setup();
  container.innerHTML = `
    <ark-list data-template-list></ark-list>
  `

  const list = container.querySelector('[data-template-list]')
  list.source = ['Colombia']
  list.render()
  const item = list.querySelector('ark-list-item')

  item.data = 'my data'
  item.template = data => /* html */ `<span>${data}</span>`
  item.render()

  assert.deepStrictEqual(item.innerHTML.trim(), '<span>my data</span>')
})

it('can be rendered with template', () => {
  setup();
  container.innerHTML = `
    <ark-list data-template-list></ark-list>
  `

  const list = container.querySelector('[data-template-list]')
  list.source = ['Colombia']
  list.render()
  const item = list.querySelector('ark-list-item')

  item.data = 'my data'
  item.template = data => /* html */ `<span>${data}</span>`
  item.render()

  item.addEventListener('list-item:selected', event => {
    assert.deepStrictEqual(event.detail.data, 'my data')
  })
  item.click()
})

it('can be rendered without template', () => {
  setup();
  const item = new ListItem()
  item.init({
    data: 'my data'
  }).render()

  assert.deepStrictEqual(item.innerHTML.trim(), 'my data')
})
