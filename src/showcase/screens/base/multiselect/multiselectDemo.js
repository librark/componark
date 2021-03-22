import { Component } from 'base/component'

const tag = 'demo-multiselect'
export class MultiselectDemo extends Component {
  init (context) {
    return super.init(context)
  }

  render () {
    this.innerHTML = /* html */ `
    <div class="multi-container">
      <ark-multiselect list label='multiselect list'></ark-multiselect>
      <br>
      <ark-multiselect list-object label='multiselect object'></ark-multiselect>
      <ark-multiselect label='multi none'></ark-multiselect>
    </div>
		`
    this.renderMultiselect()
    this.renderMultiselectObject()
    

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
  
  renderMultiselectObject () {
    const myItems = [
      { id: '101', name: 'Camila' },
      { id: '102', name: 'Luisa' },
      { id: '103', name: 'Andres' },
      { id: '104', name: 'Daniela' },
      { id: '105', name: 'Alejandro' },
    ]
    
    const field = "id"
    const template = (item) => `${item['id']} - ${item['name']}`
    
    const multiselect =(
      this.select('ark-multiselect[list-object]')
    )

    multiselect.init({
        template: template,
        field: field,
        items: myItems
    }).render().load()


}
}

const styles = /* css */`

  div.multi-container{
    width:50%:
  }

`

Component.define(tag, MultiselectDemo, styles)
