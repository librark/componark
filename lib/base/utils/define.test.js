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
  const cssStyleSheetSpy = mock.method(
    globalThis,
    'CSSStyleSheet',
    function () {
      throw new Error('Constructable stylesheets are unavailable')
    }
  )

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
  cssStyleSheetSpy.mock.restore()

  const styledElement = document.createElement('styled-element')
  assert.ok(styledElement)
  const style = Array.from(document.head.querySelectorAll('style')).find(
    (item) => item.textContent.includes('color: red;')
  )
  assert.ok(style)
})

it('does not throw when defining an already defined custom element', () => {
  class DuplicateElement extends globalThis.HTMLElement {}
  define('duplicate-element', DuplicateElement)

  assert.doesNotThrow(() => {
    define('duplicate-element', DuplicateElement)
  })
})

it('reuses fallback styles for repeated definitions of the same tag', () => {
  const cssStyleSheetSpy = mock.method(
    globalThis,
    'CSSStyleSheet',
    function () {
      throw new Error('Constructable stylesheets are unavailable')
    }
  )

  class ReusedStyledElement extends globalThis.HTMLElement {}

  define('reused-styled-element', ReusedStyledElement, 'body { color: red; }')
  define('reused-styled-element', ReusedStyledElement, 'body { color: blue; }')

  cssStyleSheetSpy.mock.restore()

  const styles = Array.from(
    document.head.querySelectorAll('style[data-componark-tag="reused-styled-element"]')
  )
  assert.deepStrictEqual(styles.length, 1)
  assert.ok(styles[0].textContent.includes('color: blue;'))
})
