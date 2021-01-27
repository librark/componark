import { define } from 'base/utils'

describe('Define', () => {
  it('can define a custome element', () => {
    class NewElement extends HTMLElement {}
    define('new-element', NewElement)

    const newElement = document.createElement('new-element')
    expect(newElement).toBeTruthy()
  })

  it('can define a custome element with styles', () => {
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
    const style = document.getElementById('styled-element-style')
    expect(style).toBeTruthy()
  })

  it('ignores unsupported or incorrect rules', () => {
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
