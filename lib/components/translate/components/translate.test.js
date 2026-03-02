import { it } from 'node:test';
import assert from 'node:assert/strict';
import { Translate } from './translate.js'

let container = null

const setup = () => {
  document.body.innerHTML = '';
  container = document.createElement('div')
  document.body.appendChild(container)
};

it('can be instantiated', () => {
  setup();
  container.innerHTML = /* html */`
  <ark-translate>
  </ark-translate>
  `

  const translate = container.querySelector('ark-translate')

  assert.ok(translate)
  assert.strictEqual(translate, translate.init())
})

it('translates the marked text inside the given root', async () => {
  setup();
  const root = document.createElement('div')
  root.innerHTML = /* html */`
  <span data-i18n="hello">Hello</span>
  <p>
    <span data-i18n="happy">Happy</span>!!!
    <span data-i18n="world">World</span>!!!
  </p>
  `
  container.appendChild(root)
  const translateContainer = document.createElement('div')
  translateContainer.innerHTML = /* html */`
  <ark-translate>
    <template>{
      "en": {
        "default": {
          "hello": "Hello",
          "world": "World"
        }
      },
      "es": {
        "default": {
          "hello": "Hola",
          "world": "Mundo"
        }
      }
    }</template>
  </ark-translate>
  `
  container.appendChild(translateContainer)
  const translate = /** @type Translate **/ (
    translateContainer.querySelector('ark-translate'))

  await translate.transliterate()

  const expectedRoot = document.createElement('div')
  expectedRoot.innerHTML = /* html */`
  <span data-i18n="hello">Hola</span>
  <p>
    <span data-i18n="happy">Happy</span>!!!
    <span data-i18n="world">Mundo</span>!!!
  </p>
  `
  assert.deepStrictEqual(root, expectedRoot)
})

it('might use different translation languages and namespaces', async () => {
  setup();
  const root = document.createElement('div')
  root.innerHTML = /* html */`
  <span data-i18n="introModule:hello">hello</span>
  <p>
    <span data-i18n="introModule:happy">happy</span>!!!
    <span data-i18n="introModule:world">world</span>!!!
  </p>
  `
  container.appendChild(root)
  const translateContainer = document.createElement('div')
  translateContainer.innerHTML = /* html */`
  <ark-translate>
    <template>{
      "es": {
        "default": {
          "hello": "Hola",
          "world": "Mundo"
        },
        "introModule": {
          "hello": "Quiubo",
          "world": "Gente"
        }
      },
      "en": {
        "default": {
          "hello": "Hello",
          "world": "World"
        },
        "introModule": {
          "hello": "Hey",
          "world": "Folks"
        }
      }
    }</template>
  </ark-translate>
  `
  container.appendChild(translateContainer)
  const translate = /** @type Translate **/ (
    translateContainer.querySelector('ark-translate'))

  let options = { language: 'en' }
  await translate.transliterate(options)

  const expectedRoot = document.createElement('div')
  expectedRoot.innerHTML = /* html */`
  <span data-i18n="introModule:hello">Hey</span>
  <p>
    <span data-i18n="introModule:happy">happy</span>!!!
    <span data-i18n="introModule:world">Folks</span>!!!
  </p>
  `
  assert.deepStrictEqual(root, expectedRoot)

  // Unknown Namespace:

  root.innerHTML = /* html */`
  <span data-i18n="unknown:hello">Hello</span>
  <p>
    <span data-i18n="unknown:happy">Happy</span>!!!
    <span data-i18n="unknown:world">World</span>!!!
  </p>
  `

  options = { language: 'es' }
  await translate.transliterate(options)

  expectedRoot.innerHTML = /* html */`
  <span data-i18n="unknown:hello">Hello</span>
  <p>
    <span data-i18n="unknown:happy">Happy</span>!!!
    <span data-i18n="unknown:world">World</span>!!!
  </p>
  `
  assert.deepStrictEqual(root, expectedRoot)
})

it('translates the page content on language changes', async () => {
  setup();
  const translateContainer = document.createElement('div')
  translateContainer.innerHTML = /* html */`
  <ark-translate languages="es,en">
    <template>{
      "es": {
        "default": {
          "hello": "Hola",
          "world": "Mundo"
        }
      },
      "en": {
        "default": {
          "hello": "Hello",
          "world": "World"
        }
      }
    }</template>
  </ark-translate>
  `
  container.appendChild(translateContainer)
  const translate = /** @type Translate **/ (
    translateContainer.querySelector('ark-translate'))
  const mockEvent = { target: { value: 'en' }, stopPropagation: () => {} }
  let givenOptions = null
  translate.transliterate = async (options) => {
    givenOptions = options
  }

  await translate.onLanguageChanged(mockEvent)

  assert.deepStrictEqual(givenOptions, { language: 'en' })
})

it('fetches its translation files from the server', async () => {
  setup();
  const root = document.createElement('div')
  root.innerHTML = /* html */`
  <span data-i18n="hello">hello</span>
  <p>
    <span data-i18n="happy">happy</span>!!!
    <span data-i18n="world">world</span>!!!
  </p>
  `
  container.appendChild(root)
  const translateContainer = document.createElement('div')
  translateContainer.innerHTML = `
  <ark-translate languages="es,en"></ark-translate>
  `
  container.appendChild(translateContainer)
  const translate = /** @type Translate **/ (
    translateContainer.querySelector('ark-translate'))

  const mockFetch = async (url) => ({
    json: async () => ({
      hello: 'Hola',
      world: 'Mundo',
      happy: 'Feliz'
    })
  })
  translate.init({
    global: { fetch: mockFetch, document }
  })

  await translate.transliterate({ language: 'es' })

  const expectedRoot = document.createElement('div')
  expectedRoot.innerHTML = /* html */`
  <span data-i18n="hello">Hola</span>
  <p>
    <span data-i18n="happy">Feliz</span>!!!
    <span data-i18n="world">Mundo</span>!!!
  </p>
  `
  assert.deepStrictEqual(root, expectedRoot)
})

it('renders unknown language codes without crashing', () => {
  setup()
  const translateContainer = document.createElement('div')
  translateContainer.innerHTML = `
  <ark-translate languages="es,de"></ark-translate>
  `
  container.appendChild(translateContainer)
  const translate = /** @type Translate **/ (
    translateContainer.querySelector('ark-translate'))

  const option = translate.querySelector('option[value="de"]')
  assert.ok(option)
  assert.deepStrictEqual(option.textContent, 'de')
})

it('emits error when inline dictionary JSON is invalid', () => {
  setup()
  const translateContainer = document.createElement('div')
  translateContainer.innerHTML = /* html */`
  <ark-translate>
    <template>{ invalid json }</template>
  </ark-translate>
  `
  container.appendChild(translateContainer)
  const translate = /** @type Translate **/ (
    translateContainer.querySelector('ark-translate'))
  let errorEvent = null

  translate.addEventListener('error', (event) => {
    errorEvent = event
  })
  translate.init()

  assert.ok(errorEvent)
})

it('emits error when dictionary fetch fails', async () => {
  setup()
  const root = document.createElement('div')
  root.innerHTML = /* html */`
  <span data-i18n="hello">hello</span>
  `
  container.appendChild(root)
  const translateContainer = document.createElement('div')
  translateContainer.innerHTML = `
  <ark-translate></ark-translate>
  `
  container.appendChild(translateContainer)
  const translate = /** @type Translate **/ (
    translateContainer.querySelector('ark-translate'))
  let errorEvent = null
  translate.addEventListener('error', (event) => {
    errorEvent = event
  })

  translate.init({
    global: {
      document,
      fetch: async () => {
        throw new Error('Network failed')
      }
    }
  })

  await translate.transliterate({ language: 'es' })

  assert.ok(errorEvent)
  assert.deepStrictEqual(errorEvent.detail.message, 'Network failed')
})
