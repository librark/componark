import { Component } from '../../component'

export class List extends Component {
  init (context) {
    return this
  }

  connectedCallback () { }
}
customElements.define('ark-list', List)
