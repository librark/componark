import { Component } from "base/component/index.js"

const tag = "demo-translate"
export class TranslateDemo extends Component {
  render() {
    const context = JSON.stringify({name: 'Esteban'})
    this.content = /* html */ `

    <section class="translate-demo_container">
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

      <a 
        target="_blank" 
        href="https://github.com/knowark/componark/blob/master/lib/components/translate/README.md">
        * Reference
      </a>
    </section>
    `

    return super.render()
  }

}
const styles = /* css */ `

.translate-demo_container {
  display: grid;
}


`

Component.define(tag, TranslateDemo, styles)
