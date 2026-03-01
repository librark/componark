import { it, mock } from 'node:test'
import assert from 'node:assert/strict'
import { define } from './define.js'

it('can define a custome element', () => {
  class NewElement extends globalThis.HTMLElement {}
  define('new-element', NewElement)

  const newElement = document.createElement('new-element')
  assert.ok(newElement)
})

it('can define a custom element using constructable CSSStyleSheet', () => {
  let definedStyles = null
  class MockCSSStyleSheet extends globalThis.CSSStyleSheet {
    replaceSync (styles) {
      definedStyles = styles
    }
  }

  const cssStyleSheetSpy = mock.method(
    globalThis,
    'CSSStyleSheet',
    function () {
      return new MockCSSStyleSheet()
    }
  )

  class CSSStyledElement extends globalThis.HTMLElement {}
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
  assert.ok(styledElement)

  assert.deepStrictEqual(styles, definedStyles)
  cssStyleSheetSpy.mock.restore()
})

it('can define a custom element using an style fallback element', () => {
  class StyledElement extends globalThis.HTMLElement {}
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
  assert.ok(styledElement)
  const style = document.head.querySelector('style')
  assert.ok(style)
})
