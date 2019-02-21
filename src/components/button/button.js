export class Button extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  render () {
    const content = this.firstChild ? this.firstChild.textContent : ''
    this.innerHTML = /* html */`
    <button class="${this.color}">${content}</button>
    `
  }

  get color () {
    const colors = {
      'primary': 'ark-button',
      'secondary': 'ark-button--secondary'
    }
    const color = this.getAttribute('color')
    return colors[color] || 'ark-button'
  }
}
customElements.define('ark-button', Button)
