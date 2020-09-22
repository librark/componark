import { Component } from '../../component'

export class Button extends Component {
  init (context = {}) {
    // local variables
    this.defaultContent = this.defaultContent || this.innerHTML
    return super.init()
  }

  render () {
    this.innerHTML = /* html */ `
      <${this._getType()} data-element>
        ${this.defaultContent}
      </${this._getType()}>
    `

    this._moveAttributes()
    return super.render()
  }

  load () {
    this._setVibration()
  }

  _isFab () {
    if (!this.hasAttribute('fab')) return

    if (!this.hasAttribute('horizontal')) {
      this.setAttribute('horizontal', 'end')
    }

    if (!this.hasAttribute('vertical')) {
      this.setAttribute('vertical', 'end')
    }
  }

  _getType () {
    return this.hasAttribute('href') ? 'a' : 'button'
  }

  _setVibration () {
    if (!this.hasAttribute('vibrate️')) {
      return
    }

    const value = this.getAttribute('vibrate️').trim()
    const duration = (
      value.length ? value.split(' ').map(item => parseInt(item)) : [200]
    )

    this.addEventListener('click', () => {
      navigator.vibrate(duration)
    })
  }

  _moveAttributes () {
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
