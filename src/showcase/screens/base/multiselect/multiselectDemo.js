import { Component } from 'base/component'

export class MultiselectDemo extends Component {
  init (context) {
    return super.init(context)
  }

  render () {
    this.innerHTML = /* html */ `${this.styles}
		`
    return super.render()
  }

}
Component.define('demo-multiselect', MultiselectDemo)
