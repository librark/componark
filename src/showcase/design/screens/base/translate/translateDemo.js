import { Component } from "base/component"

const tag = "demo-translate"
export class TranslateDemo extends Component {
  render() {
    const context = JSON.stringify({name: 'Esteban'})
    this.content = /* html */ `
    <ark-translate>
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
    <div>
      Hello <span data-i18n="world">World</span>
      <p>
        <strong data-i18n="magic">Magic</strong>
      </p>
    </div>
    `

    return super.render()
  }

}
const styles = /* css */ `
`

Component.define(tag, TranslateDemo, styles)
