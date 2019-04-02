export class IconDemo extends HTMLElement {
  init (context) {
    this.type = context['type'] || 'ark'
    return this
  }

  connectedCallback () {
    this.render()
  }

  render () {
    this.innerHTML = /* html */`
      <p>Icon:</p>
      <hr/><br/>
      <div>
        <span>fas fa-address-book</span>
        <p style="font-size: 100px; margin: 10px auto;" >
          <ark-icon name="fas fa-address-book"></ark-icon>
        </p>
      </div>
      <div>
        <span>far fa-address-book</span>
        <p style="font-size: 100px; margin: 10px auto;" >
          <ark-icon name="far fa-address-book"></ark-icon>
        </p>
      </div>
    `
  }
}
customElements.define('demo-icon', IconDemo)
