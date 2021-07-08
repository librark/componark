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
    root = document.createElement('div')
    root.innerHTML = `
    <span data-i18n>hello</span>
    <p>
      <span data-i18n>world</span>!!!
    </p>
    `
    container.appendChild(root)
    translate = document.createElement('div')
    translate.innerHTML = `
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
    container.appendChild(translate)



    


  })
})
