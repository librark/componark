/**
 * @typedef {import(
 * '../../../../components/spinner/components/spinner').Spinner} Spinner
 * */
import { Component } from '../../loader'

export class SpinnerDemo extends Component {
	init (context) {
		return super.init()
	}

	render () {
		this.innerHTML = /* html */ `${this.styles}
      <h1>spinner</h1>

      <div class="spinner-container">
        <ark-spinner borde="0.5rem"></ark-spinner>
        <ark-spinner size='4rem' borde="0.5rem"></ark-spinner>
        <ark-spinner size='8rem' borde="0.5rem"></ark-spinner>
      </div>

      ${this._getDoc()}
    `
		return super.render()
	}

	_getDoc () {
		return /* html */ `
    `
	}

	get styles () {
		return /* html */`
      <style>
        .spinner-container{
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }

        .spinner-container > *{
          margin: 0.5rem;
        }
      </style>
    `
	}
}
customElements.define('demo-spinner', SpinnerDemo)
