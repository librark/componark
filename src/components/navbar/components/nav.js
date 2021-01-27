import { Component } from 'base/component'

const tag = 'ark-nav'
export class Nav extends Component {
  render () {
    //if (!(this.hasAttribute('brand') || this.hasAttribute('toggler'))) {
      //this.setAttribute('collapse', 'true')
    //}

    return super.render()
  }

  toggleVisibility () {
    if (!(this.hasAttribute('brand') || this.hasAttribute('toggler'))) {
      this.toggleAttribute('collapse')
    }
  }
}
Component.define(tag, Nav)
