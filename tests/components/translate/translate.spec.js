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

  it('translates the marked text inside the given root', () => {
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
        "default": {
          "en": {
            "hello": "Hello",
            "world": "World"
          },
          "es": {
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

    translate.transliterate()

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

  it('might use different translation languages and namespaces', () => {
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
        "default": {
          "es": {
            "hello": "Hola",
            "world": "Mundo"
          },
          "en": {
            "hello": "Hello",
            "world": "World"
          }
        },
        "introModule": {
          "es": {
            "hello": "Quiubo",
            "world": "Gente"
          },
          "en": {
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

    let options = { namespace: 'introModule', language: 'en' }
    translate.transliterate(options)

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
    translate.transliterate(options)

    expectedRoot.innerHTML = `
    <span data-i18n="hello">Hello</span>
    <p>
      <span data-i18n="happy">Happy</span>!!!
      <span data-i18n="world">World</span>!!!
    </p>
    `
    expect(root).toEqual(expectedRoot)
  })

  it('translates the page content on language changes', () => {
    const translateContainer = document.createElement('div')
    translateContainer.innerHTML = `
    <ark-translate>
      <template>{
        "default": {
          "es": {
            "hello": "Hola",
            "world": "Mundo"
          },
          "en": {
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
    translate.transliterate = (options) => { givenOptions = options }

    translate.onLanguageChanged(mockEvent)

    expect(givenOptions).toEqual({language: 'en'})
  })
})
