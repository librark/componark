import { Component } from 'base/component'

const tag = 'ark-nav'
export class Nav extends Component {
  toggleVisibility () {
    if (!(this.hasAttribute('brand') || this.hasAttribute('toggler'))) {
      this.toggleAttribute('collapse')
    }
  }
}
Component.define(tag, Nav)
