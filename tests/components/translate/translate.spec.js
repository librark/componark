import { Translate } from '../../../src/components/translate'

describe('Translate', () => {
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
    <ark-translate>
    </ark-translate>
    `

    const translate = container.querySelector('ark-translate')

    expect(translate).toBeTruthy()
    expect(translate).toBe(translate.init())
  })

  it('translates the marked text inside the given root', async () => {
    const root = document.createElement('div')
    root.innerHTML = `
    <span data-i18n="hello">Hello</span>
    <p>
      <span data-i18n="happy">Happy</span>!!!
      <span data-i18n="world">World</span>!!!
    </p>
    `
    container.appendChild(root)
    const translateContainer = document.createElement('div')
    translateContainer.innerHTML = `
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
    const translate = /** @type Translate **/  (
      translateContainer.querySelector('ark-translate'))

    await translate.transliterate()

    const expectedRoot = document.createElement('div')
    expectedRoot.innerHTML = `
    <span data-i18n="hello">Hola</span>
    <p>
      <span data-i18n="happy">Happy</span>!!!
      <span data-i18n="world">Mundo</span>!!!
    </p>
    `
    expect(root).toEqual(expectedRoot)
  })

  it('might use different translation languages and namespaces', async () => {
    const root = document.createElement('div')
    root.innerHTML = `
    <span data-i18n="hello">hello</span>
    <p>
      <span data-i18n="happy">happy</span>!!!
      <span data-i18n="world">world</span>!!!
    </p>
    `
    container.appendChild(root)
    const translateContainer = document.createElement('div')
    translateContainer.innerHTML = `
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

    let options = { language: 'en', namespace: 'introModule' }
    await translate.transliterate(options)

    const expectedRoot = document.createElement('div')
    expectedRoot.innerHTML = `
    <span data-i18n="hello">Hey</span>
    <p>
      <span data-i18n="happy">happy</span>!!!
      <span data-i18n="world">Folks</span>!!!
    </p>
    `
    expect(root).toEqual(expectedRoot)

    root.innerHTML = `
    <span data-i18n="hello">Hello</span>
    <p>
      <span data-i18n="happy">Happy</span>!!!
      <span data-i18n="world">World</span>!!!
    </p>
    `

    options = { namespace: 'unknown', language: 'es' }
    await translate.transliterate(options)

    expectedRoot.innerHTML = `
    <span data-i18n="hello">Hello</span>
    <p>
      <span data-i18n="happy">Happy</span>!!!
      <span data-i18n="world">World</span>!!!
    </p>
    `
    expect(root).toEqual(expectedRoot)
  })

  it('translates the page content on language changes', async () => {
    const translateContainer = document.createElement('div')
    translateContainer.innerHTML = `
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
    const mockEvent = {target: {value: 'en'}}
    let givenOptions = null
    translate.transliterate = async (options) => {
      givenOptions = options }

    await translate.onLanguageChanged(mockEvent)

    expect(givenOptions).toEqual({language: 'en'})
  })


  it('fetches its translation files from the server', async () => {
    const root = document.createElement('div')
    root.innerHTML = `
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
        "hello": "Hola",
        "world": "Mundo",
        "happy": "Feliz"
      })
    })
    translate.init({ global: {
      fetch: mockFetch, document: document } })

    await translate.transliterate({language: 'es'})

    const expectedRoot = document.createElement('div')
    expectedRoot.innerHTML = `
    <span data-i18n="hello">Hola</span>
    <p>
      <span data-i18n="happy">Feliz</span>!!!
      <span data-i18n="world">Mundo</span>!!!
    </p>
    `
    expect(root).toEqual(expectedRoot)
  })
})
