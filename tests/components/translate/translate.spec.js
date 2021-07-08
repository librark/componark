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
    <span data-i18n>hello</span>
    <p>
      <span data-i18n>happy</span>!!!
      <span data-i18n>world</span>!!!
    </p>
    `
    container.appendChild(root)
    const translateContainer = document.createElement('div')
    translateContainer.innerHTML = `
    <ark-translate>{
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
    }</ark-translate>
    `
    container.appendChild(translateContainer)
    const translate = translateContainer.querySelector('ark-translate')

    translate.translate()

    const expectedRoot = document.createElement('div')
    expectedRoot.innerHTML = `
    <span data-i18n>Hola</span>
    <p>
      <span data-i18n>happy</span>!!!
      <span data-i18n>Mundo</span>!!!
    </p>
    `
    expect(root).toEqual(expectedRoot)
  })

  it('might use different translation languages and namespaces', () => {
    const root = document.createElement('div')
    root.innerHTML = `
    <span data-i18n>hello</span>
    <p>
      <span data-i18n>happy</span>!!!
      <span data-i18n>world</span>!!!
    </p>
    `
    container.appendChild(root)
    const translateContainer = document.createElement('div')
    translateContainer.innerHTML = `
    <ark-translate>{
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
    }</ark-translate>
    `
    container.appendChild(translateContainer)
    const translate = translateContainer.querySelector('ark-translate')

    let options = { namespace: 'introModule', language: 'en' }
    translate.translate(options)

    const expectedRoot = document.createElement('div')
    expectedRoot.innerHTML = `
    <span data-i18n>Hey</span>
    <p>
      <span data-i18n>happy</span>!!!
      <span data-i18n>Folks</span>!!!
    </p>
    `
    expect(root).toEqual(expectedRoot)

    root.innerHTML = `
    <span data-i18n>hello</span>
    <p>
      <span data-i18n>happy</span>!!!
      <span data-i18n>world</span>!!!
    </p>
    `
    options = { namespace: 'unknown', language: 'es' }
    translate.translate(options)

    expectedRoot.innerHTML = `
    <span data-i18n>hello</span>
    <p>
      <span data-i18n>happy</span>!!!
      <span data-i18n>world</span>!!!
    </p>
    `
    expect(root).toEqual(expectedRoot)
  })
})
