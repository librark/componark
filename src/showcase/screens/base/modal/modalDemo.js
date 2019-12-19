/**
 * @typedef {import('../../loader').Modal} Modal
 */
import { Component } from "../../loader"

export class ModalDemo extends Component {
  init(context) {
    this.type = context["type"] || "ark"
    return super.init(context)
  }

  render() {
    this.innerHTML = /* html */ `${this.styles}
      <div>
        <p>This is a modal.</p>
        <button btn-open>open</button>
        <button btn-toggle>toggle</button>
      </div>

      <ark-modal title="My Title" subtitle="My Subtitle" horizontal="center"
        vertical="center">

        <div>
          <p>Contenido Parrafo 1</p>
          <p>Contenido Parrafo 2</p>
          <p>Contenido Parrafo 3</p>
        </div>

        <div>
          <p>Contenido2 Parrafo 1</p>
          <p>Contenido2 Parrafo 2</p>
          <p>Contenido2 Parrafo 3</p>
        </div>

        <ark-button slot="action">Aceptar</ark-button>
        <ark-button slot="action" close>Cerrar</ark-button>
      </ark-modal>

      <!-- DOCUMENTATION -->

      <div>
        <h3>ark-button</h3>
        <small>Attributes:</small>
        <hr />
        <p>Size of a new modal window</p>
        <ul>
          <li>360px [default]</li>
          <li>lg => 960px</li>
        </ul>
      </div>
    `

    return super.render()
  }

  load() {
    const open = this.querySelector("[btn-open]")
    open.addEventListener("click", _ => this.modal.open())

    const toggle = this.querySelector("[btn-toggle]")
    toggle.addEventListener("click", _ => this.modal.toggle())

    return super.load()
  }

  /** @returns {Modal} */
  get modal() {
    return /** @type {Modal} */ (this.select("ark-modal"))
  }

  get styles() {
    return /* html */ `
      <style>
        demo-modal ark-modal p{
          margin: 0;
        }
      </style>
    `
  }
}
customElements.define("demo-modal", ModalDemo)
