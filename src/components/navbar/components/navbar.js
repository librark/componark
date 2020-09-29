/** @typedef {import('./nav').Nav} Nav */
import { Component } from 'components/component'

export class Navbar extends Component {
  init (context = {}) {
    return super.init()
  }

  render () {
    return super.render()
  }

  load () {
    this.querySelectorAll('[navbar-toggler]').forEach(toggler => {
      toggler.addEventListener('click', this.onToggleContent.bind(this))
    })
  }

  /** @param {event} event */
  onToggleContent (event) {
    event.stopImmediatePropagation()
    this.selectAll('ark-nav[collapse]').forEach((/** @type {Nav} */ nav) => {
      nav.toggleHide()
    })
  }
}
customElements.define('ark-navbar', Navbar)
