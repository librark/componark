import { Component } from '../../component'

export class Button extends Component {
  init (context) {
    return super.init(context)
  }

  connectedCallback () {
    this.render()
  }

  render () {
    this.innerHTML = /* html */`
        <${this._getType()} data-element>
          ${this.innerHTML}
        </${this._getType()}>
    `

    this._moverAtributos()
    return super.render()
  }

  // ---------------------------------------------------------------------------
  _isFab () {
    if (this.hasAttribute('fab')) {
      if (!this.hasAttribute('horizontal')) {
        this.setAttribute('horizontal', 'end')
      }
      if (!this.hasAttribute('vertical')) {
        this.setAttribute('vertical', 'end')
      }
    }
  }

  _getType () {
    return this.hasAttribute('href') ? 'a' : 'button'
  }

  _moverAtributos () {
    this._isFab()

    const element = this.querySelector('[data-element]')
    const attributes = Array.from(this.attributes)

    attributes.forEach(attribute => {
      if (this._defaultAttributes().find(item => item === attribute.name)) {
        element.setAttribute(attribute.name, attribute.value)
        this.removeAttribute(attribute.name)
      }
    })
  }

  /** @return {Array<string>} */
  _defaultAttributes () {
    return [
      'autofocus',
      'disabled',
      'download',
      'form',
      'formaction',
      'formenctype',
      'formmethod',
      'formnovalidate',
      'formtarget',
      'href',
      'hreflang',
      'media',
      'name',
      'ping',
      'referrerpolicy',
      'rel',
      'target',
      'type',
      'value'
    ]
  }
}
customElements.define('ark-button', Button)
