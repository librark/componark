/**
 * @typedef {import('../../loader').Modal} Modal
 */
import { Component } from '../../loader'

export class ModalDemo extends Component {
	init (context) {
		return super.init(context)
	}

	render () {
		this.innerHTML = /* html */ `${this.styles}
      <div>
        <p>This is a modal.</p>
        <button btn-open>open</button>
        <button btn-toggle>toggle</button>
      </div>

      <ark-modal title="My Title" subtitle="My Subtitle" horizontal="center"
        vertical="center">
        <div style="margin: 1rem;">

          <div>
            <p>Contenido Párrafo A-1</p>
            <p>Contenido Párrafo A-2</p>
            <p>Contenido Párrafo A-3</p>
          </div>

          <div>
            <p>Contenido Párrafo A-4</p>
            <p>Contenido Párrafo A-5</p>
            <p>Contenido Párrafo A-6</p>
          </div>

          <div>
            <p>Contenido Párrafo A-7</p>
            <p>Contenido Párrafo A-8</p>
            <p>Contenido Párrafo A-9</p>
          </div>

          <div>
            <p>Contenido Párrafo B-1</p>
            <p>Contenido Párrafo B-2</p>
            <p>Contenido Párrafo B-3</p>
          </div>

          <div>
            <p>Contenido Párrafo B-4</p>
            <p>Contenido Párrafo B-5</p>
            <p>Contenido Párrafo B-6</p>
          </div>

          <div>
            <p>Contenido Párrafo B-7</p>
            <p>Contenido Párrafo B-8</p>
            <p>Contenido Párrafo B-9</p>
          </div>

          <div>
            <p>Contenido Párrafo C-1</p>
            <p>Contenido Párrafo C-2</p>
            <p>Contenido Párrafo C-3</p>
          </div>

          <div>
            <p>Contenido Párrafo C-4</p>
            <p>Contenido Párrafo C-5</p>
            <p>Contenido Párrafo C-6</p>
          </div>

          <div>
            <p>Contenido Párrafo C-7</p>
            <p>Contenido Párrafo C-8</p>
            <p>Contenido Párrafo C-9</p>
          </div>

        </div>



        <ark-button slot="action">Aceptar</ark-button>
        <ark-button slot="action" close>Cerrar</ark-button>
      </ark-modal>

      <!-- DOCUMENTATION -->

      <div>
        <h3>ark-button</h3>
        <small>Attributes:</small>
        <hr />
        <p>Modal show: </p>
          <ul>
            <li>onHiddenModal:<span data-hidden> hidden: false</span></li>
          </ul>

        <p>Size of a new modal window</p>
        <ul>
          <li>360px [default]</li>
          <li>lg => 960px</li>
        </ul>
      </div>
    `

		this.addEventListener('onHiddenModal', (/** @type {Event} */ event) => {
			event.stopImmediatePropagation()
			this.select('[data-hidden]').innerHTML = /* html */` hidden:
        ${event['detail'].hidden}
      `
		})

		return super.render()
	}

	load () {
		const open = this.querySelector('[btn-open]')
		open.addEventListener('click', _ => this.modal.open())

		const toggle = this.querySelector('[btn-toggle]')
		toggle.addEventListener('click', _ => this.modal.toggle())

		return super.load()
	}

	/** @returns {Modal} */
	get modal () {
		return /** @type {Modal} */ (this.select('ark-modal'))
	}

	get styles () {
		return /* html */ `
      <style>
        demo-modal ark-modal p{
          margin: 0;
        }
      </style>
    `
	}
}
customElements.define('demo-modal', ModalDemo)
