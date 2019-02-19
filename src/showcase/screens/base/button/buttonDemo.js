
export class ButtonDemo extends HTMLElement {
  connectedCallback () {
    this.root = this
    this.render()
  }
  render () {
    this.root.innerHTML = /* html */`
        <div class="demo-button">
            <p>This is a button</p>
        </div>
        `
  }
}
customElements.define('demo-button', ButtonDemo)
