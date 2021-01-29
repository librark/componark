import { define } from 'base/utils'

describe('Define', () => {
  it('can define a custome element', () => {
    class NewElement extends HTMLElement {}
    define('new-element', NewElement)

    const newElement = document.createElement('new-element')
    expect(newElement).toBeTruthy()
  })

  it('can define a custom element using constructable CSSStyleSheet', () => {
    let definedStyles = null
    class MockCSSStyleSheet extends CSSStyleSheet {
      replaceSync = (styles) => {
        definedStyles = styles
      }
    }

    jest.spyOn(window, "CSSStyleSheet").mockReturnValue(
      new MockCSSStyleSheet())

    class CSSStyledElement extends HTMLElement {}
    const styles = `
    body {
      color: red;
    }

    div {
      margin: 5px;
    }
    `

    define('css-styled-element', CSSStyledElement, styles)

    const styledElement = document.createElement('css-styled-element')
    expect(styledElement).toBeTruthy()

    expect(styles).toEqual(definedStyles)
  })

  it('can define a custom element using an style fallback element', () => {
    class StyledElement extends HTMLElement {}
    const styles = `
    body {
      color: red;
    }

    div {
      margin: 5px;
    }
    `

    define('styled-element', StyledElement, styles)

    const styledElement = document.createElement('styled-element')
    expect(styledElement).toBeTruthy()
    const style = document.head.querySelector('style')
    expect(style).toBeTruthy()
  })

  xit('ignores unsupported or incorrect rules', () => {
    class MockStyle extends HTMLElement {
      sheet = {
        insertRule: (rule) => {throw new Error('Rule Error!')}
      }
    }
    customElements.define('mock-style', MockStyle)

    jest.spyOn(document, "createElement").mockReturnValue(new MockStyle())

    class BadElement extends HTMLElement {}
    const styles = `
    # {
      margin: 5px;
    }
    `

    define('bad-element', BadElement, styles)
    const style = document.getElementById('bad-element-style')
    expect(style).toBeTruthy()
  })
})
