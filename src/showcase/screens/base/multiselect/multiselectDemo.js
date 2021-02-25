import { Component } from 'base/component'

const tag = 'demo-multiselect'
export class MultiselectDemo extends Component {
  init (context) {
    return super.init(context)
  }

  render () {
    this.innerHTML = /* html */ `
      <ark-multiselect label='multiselect'></ark-multiselect>
		`
    return super.render()
  }

}
Component.define(tag, MultiselectDemo)
