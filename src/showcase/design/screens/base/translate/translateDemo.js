import { Component } from "base/component"

const tag = "demo-translate"
export class TranslateDemo extends Component {
  render() {
    const context = JSON.stringify({name: 'Esteban'})
    this.content = /* html */ `

    <span>
      <ark-translate languages='en,es'>
        <template>
          {
            "default": {
              "es": {
                "world": "Mundo",
                "magic": "Mágico"
              },
              "en": {
                "world": "World",
                "magic": "Magic"
              },
              "fr": {
                "world": "Monde",
                "magic": "Magique"
              }
            }
          }
        </template>
      </ark-translate>
    </span>

    <span>
      Hello <span data-i18n="world">World</span>
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
