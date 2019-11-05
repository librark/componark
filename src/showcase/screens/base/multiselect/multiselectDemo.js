/**
 * @typedef {import('../../loader').Multiselect} Multiselect
 **/
import { Component } from '../../loader'

export class MultiselectDemo extends Component {
  init(context) {
    this.type = context['type'] || 'ark'
    return super.init(context)
  }

  render() {
    this.innerHTML = /* html */ `${this.styles}

			<ark-multiselect></ark-multiselect>
      <ark-input type="email" label="email"></ark-input>
      <ark-select listen on-alter="selectEventListener" label="my select">
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </ark-select>

			<span>Hello World</span>

			<br/>

			<p data-input-value style="padding-top: 15rem;"></p>
		`
    this.renderMultiselect()
    return super.render()
  }

  load() {
    this.addEventListener('ark-multiselect:alter', event => {
      this.querySelector('[data-input-value]').innerHTML = JSON.stringify(
        event.detail
      )
    })

    return super.load()
  }

  renderMultiselect() {
    const multiselect = /** @type {Multiselect} */ (this.select(
      'ark-multiselect'
    ))

    if (!multiselect) return

    multiselect.init({
      items: [
        '01 display',
        '02 max-width',
        '03 max-height',
        '04 width',
        '05 height',
        '06 margin',
        '07 padding',
        '08 background',
        '09 color',
        '10 font-weight',
        '11 border-radius',
        '12 outline',
        '13 border',
        '14 margin-left',
        '15 cursor',
        '16 justify-content',
        '17 align-items'
      ]
    })

    multiselect.render()
  }

  get styles() {
    return /* html */ `
      <style>
      </style>
    `
  }
}
customElements.define('demo-multiselect', MultiselectDemo)
