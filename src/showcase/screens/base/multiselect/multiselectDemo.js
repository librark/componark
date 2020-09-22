/**
 * @typedef {import('../../loader').Multiselect} Multiselect
 **/
import { Component } from '../../loader'

export class MultiselectDemo extends Component {
  init (context) {
    return super.init(context)
  }

  render () {
    this.innerHTML = /* html */ `${this.styles}

			<ark-multiselect></ark-multiselect>

      <br/>

			<p data-input-value style="padding-top: 15rem;"></p>
		`
    this.renderMultiselect()
    return super.render()
  }

  load () {
    this.addEventListener('ark-multiselect:alter', event => {
      this.querySelector('[data-input-value]').innerHTML = JSON.stringify(
        event.detail
      )
    })

    return super.load()
  }

  renderMultiselect () {
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

  get styles () {
    return /* html */ `
      <style>
      </style>
    `
  }
}
customElements.define('demo-multiselect', MultiselectDemo)
