  import { Component } from 'base/component'

export class MultiselectDemo extends Component {
  init (context) {
    return super.init(context)
  }

  render () {
    this.innerHTML = /* html */ `${this.styles}
      <div>
        <ark-multiselect list listen on-alter="alterMultiselect">
        </ark-multiselect>

        <p>Value: <span data-multiselect></span></p>
      </div>

      <div>
        <ark-multiselect objectList listen on-alter="alterMultiselectObject">
        </ark-multiselect>

        <p>Value: <span data-multiselect-object></span></p>
      </div>
		`
    this.renderMultiselect()
    this.renderMultiselectObject()
    return super.render()
  }

  /** @param {CustomEvent} event */
  alterMultiselect (event) {
    event.stopImmediatePropagation()
    this.querySelector('[data-multiselect]').innerHTML = JSON.stringify(
      event.detail
    )
  }

  /** @param {CustomEvent} event */
  alterMultiselectObject (event) {
    event.stopImmediatePropagation()
    this.querySelector('[data-multiselect-object]').innerHTML = JSON.stringify(
      event.detail
    )
  }

  renderMultiselect () {
    const items = [
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

   

    const multiselect = /** @type {Multiselect} */(
      this.select('ark-multiselect[list]')
    )

    multiselect.init({
      label: "multiselect test",
      items: items
    }).render()
  }

  renderMultiselectObject () {
    const items = [
      { id: '101', name: 'Camila' },
      { id: '102', name: 'Luisa' },
      { id: '103', name: 'Andres' },
      { id: '104', name: 'Daniela' },
      { id: '105', name: 'Alejandro' },
    ]

    const field = "id"
    const template = (item) => `${item['id']} - ${item['name']}`

    const filter = (value) => {
      if (!value.length) return items
      return items.filter(item =>
        template(item).toLowerCase().indexOf(value.toLowerCase()) !== -1
      )
    }

    const multiselect = this.select('ark-multiselect[objectList]')

    multiselect.init({
      label: "multiselect objectList",
      field,
      template,
      filter
    }).render()
  }

  get styles () {
    return /* html */ `
      <style>
      </style>
    `
  }
}
Component.define('demo-multiselect', MultiselectDemo)
