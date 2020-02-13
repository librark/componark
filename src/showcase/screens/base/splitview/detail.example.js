import { Component } from '../../loader'

export class ArkDetailExample extends Component {
  init(context) {
    const data = context['data'] || {}

    this.first = data['first']
    this.second = data['second']
    this.year = data['year']

    return super.init()
  }

  render() {
    if (this.first) {
      this.innerHTML = /* html */ `${this.styles}
        <ark-map token="${this.token}"></ark-map>
        <h1>${this.year}</h1>
        <p>
          <span data-first>FIRST: ${this.first}</span>
          <span> | </span>
          <span data-second>SECOND: ${this.second}</span>
        </p>
      `
    } else {
      this.innerHTML = /* html */ `
        <h1>Ark Detail Example</h1>
      `
    }

    return super.render()
  }

  get token() {
    return 'pk.' +
      'eyJ1IjoiZXhhbXBsZXMiLCJhIjoiY2p0MG01MXRqMW45cjQzb2R6b2ptc3J4MSJ9.' +
      'zA2W0IkI0c6KaAhJfk9bWg'
  }

  get styles() {
    return /* html */`
      <style>
        ark-detail-example ark-map{
          height: 400px;
        }
      </style>
    `
  }
}
customElements.define('ark-detail-example', ArkDetailExample)
