export class Icon extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  render () {
    this.innerHTML = /* html */`
      ${this.addFontawesome()}
    `
  }

  addFontawesome () {
    const fa = this.getAttribute('fa')
    if (fa) {
      return /* html */ `<i class="${fa}"></i>`
    }
  }
}
customElements.define('ark-icon', Icon)
