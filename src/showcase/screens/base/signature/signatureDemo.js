import { Component, Signature } from "../../loader"

import { uuidv4 } from "../../../../utils"

export class SignatureDemo extends Component {
  init(context) {
    return super.init(context)
  }

  render() {
    this.innerHTML = /* html */ `${this.styles}
      <div class="signature-container">
        <ark-signature width="300" height="300"></ark-signature>
      </div>
      <div>
        <ark-button background="primary" listen on-click="_onSave">
          Guardar
        </ark-button>
        <ark-button background="primary" listen on-click="_onClear">
          Borra
        </ark-button>
      </div>
    `
    return super.render()
  }

  // ---------------------------------------------------------------------------

  _onSave() {
    const src = this.signature.getSrc()
    const fileName = uuidv4()
    const link = document.createElement('a')
    link.download = fileName + '.jpg'
    link.href = src
    link.click()
  }

  _onClear() {
    this.signature.clear()
  }

  // ---------------------------------------------------------------------------

  /** @returns {Signature} */
  get signature() {
    return /** @type {Signature} */ (this.select('ark-signature'))
  }

  // ---------------------------------------------------------------------------

  get styles() {
    return /* html */ `
      <style>
        .signature-container{
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 1rem;
        }
        .signature-container ark-signature{
          border: 1px solid;
          background: red;
        }
      </style>
    `
  }
}
customElements.define("demo-signature", SignatureDemo)
