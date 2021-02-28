import { Component } from 'base/component'

const tag = 'demo-multiselect'
export class MultiselectDemo extends Component {
  init (context) {
    return super.init(context)
  }

  render () {
    this.innerHTML = /* html */ `
      <ark-multiselect list label='multiselect'></ark-multiselect>
		`
    this.renderMultiselect()
    

    return super.render()
  }

  renderMultiselect () {
    const myItems = [
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
      items: myItems
    }).render().load()
  }




}
Component.define(tag, MultiselectDemo)
