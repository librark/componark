import './sidebar.content'
import './sidebar.scrim'

export class Sidebar extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  get opened () {
    return this.hasAttribute('opened')
  }

  render () {
    this.innerHTML = /* html */`
      ${this._getContent()}
      ${this._getScrim()}
    `

    if (this.opened) this.open()

    this._listen()
  }

  _listen () {
    this.querySelector('ark-sidebar-scrim').addEventListener(
      'click', _ => this.close()
    )
  }

  _getContent () {
    return this.querySelector('ark-sidebar-content')
      ? this.querySelector('ark-sidebar-content').outerHTML : null
  }

  _getScrim () {
    let scrim = /* html */`
      <ark-sidebar-scrim></ark-sidebar-scrim>
    `
    return this.querySelector('ark-sidebar-scrim')
      ? this.querySelector('ark-sidebar-scrim').outerHTML : scrim
  }

  open () {
    this.classList.add('ark-sidebar--opened')
  }

  close () {
    this.classList.remove('ark-sidebar--opened')
  }

  toggle () {
    this.classList.toggle('ark-sidebar--opened')
  }
}
customElements.define('ark-sidebar', Sidebar)
