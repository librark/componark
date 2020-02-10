import { Component } from '../../component'

export class Audio extends Component {
  init(context = {}) {
    return super.init()
  }

  render() {
    this.innerHTML = /* html */`
      {{{{{{audio}}}}}}
    `
    return super.render()
  }

  load() {
    return super.load()
  }
}
customElements.define('ark-audio', Audio)
