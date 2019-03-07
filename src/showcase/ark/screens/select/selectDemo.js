import '../../../../components/select'

export class SelectDemo extends HTMLElement {
  connectedCallback () {
    this.render()
  }
  render () {
    this.innerHTML = /* html */`
    <div style="width: 300px;">
      <p>SelectDemo</p>
      <hr/>
      <ark-select>
        <ark-select-option>ok</ark-select-option>
      </ark-select>
    </div>
    `
  }
}
customElements.define('demo-select', SelectDemo)
