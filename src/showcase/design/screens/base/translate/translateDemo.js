import { Component } from "base/component/index.js"

const tag = "demo-translate"
export class TranslateDemo extends Component {
  render() {
    const context = JSON.stringify({name: 'Esteban'})
    this.content = /* html */ `

    <span>
      <ark-translate languages='en,es,fr'></ark-translate>
    </span>

    <span>
      <span data-i18n="hello">Hello</span>
      <span data-i18n="world">World</span>
      <span>
        <strong data-i18n="magic">Magic</strong>
      </span>
    </span>
    `

    return super.render()
  }

}
const styles = /* css */ `
`

Component.define(tag, TranslateDemo, styles)
