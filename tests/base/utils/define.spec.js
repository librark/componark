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

    const styledElement = document.createElement('new-element')
    expect(styledElement).toBeTruthy()
    const style = document.getElementById('styled-element-style')
    expect(style).toBeTruthy()
  })
})
