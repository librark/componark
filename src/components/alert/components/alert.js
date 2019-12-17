import { Component } from '../../component'

export class Alert extends Component {
  init (context = {}) {
    this.title = this._defaultvalue(this.title, context['title'])
    this.text = this._defaultvalue(this.text, context['text'])

    this.horizontal = this._defaultvalue(
      this.horizontal,
      context['horizontal'] || 'center'
    )

    this.vertical = this._defaultvalue(
      this.vertical,
      context['vertical'] || 'center'
    )

    let showConfirmButton = context['showConfirmButton']
    showConfirmButton =
      showConfirmButton === undefined ? true : showConfirmButton

    this.showConfirmButton = this._defaultvalue(
      this.showConfirmButton,
      showConfirmButton
    )

    this.confirmButtonText = this._defaultvalue(
      this.confirmButtonText,
      context['confirmButtonText'] || 'Aceptar'
    )

    this.confirmButtonBackground = this._defaultvalue(
      this.confirmButtonBackground,
      context['confirmButtonBackground'] || 'primary'
    )

    let showCancelButton = context['showCancelButton']
    showCancelButton = showCancelButton === undefined ? true : showCancelButton

    this.showCancelButton = this._defaultvalue(
      this.showCancelButton,
      showCancelButton
    )

    this.cancelButtonText = this._defaultvalue(
      this.cancelButtonText,
      context['cancelButtonText'] || 'Cancelar'
    )

    this.cancelButtonBackground = this._defaultvalue(
      this.cancelButtonBackground,
      context['cancelButtonBackground'] || 'light'
    )

    // local variables
    this.global = document

    return super.init()
  }

  reflectedProperties () {
    return [
      'title',
      'text',
      'horizontal',
      'vertical',
      'confirmButtonText',
      'confirmButtonBackground',
      'cancelButtonText',
      'cancelButtonBackground'
    ]
  }

  render () {
    this.innerHTML = /* html */ `
      <div class="ark-alert__content">
        <div class="ark-alert__header">
          ${this._renderTitle()}
          ${this._renderText()}
        </div>
        <div class="ark-alert__actions" data-alert-actions></div>
      </div>
      <div class="ark-alert__scrim" listen on-click="close"></div>
    `

    this._appendDefaultButtons()
    return super.render()
  }

  load () {
    this.querySelectorAll('[close]').forEach(element =>
      element.addEventListener('click', _ => this.close())
    )

    return super.load()
  }

  /** @param {Object} context @param {HTMLElement=} parent @return {Alert} */
  static launch (context, parent = document.body) {
    /** @type {Alert} */
    const alert = new Alert()
    alert.init(context)
    parent.appendChild(alert)
    return alert
  }

  close () {
    this.remove()
  }

  show () {
    this.removeAttribute('hidden')
  }

  hide () {
    this.setAttribute('hidden', '')
  }

  toggle () {
    this.hasAttribute('hidden') ? this.show() : this.hide()
  }

  // ---------------------------------------------------------------------------
  // renders
  // ---------------------------------------------------------------------------
  _defaultvalue (currentValue, newValue) {
    return newValue === undefined ? currentValue : newValue
  }

  _renderTitle () {
    return this.title.length
      ? /* html */ `
        <div>
          <strong class="ark-alert__title">
            ${this.title}
          </strong>
        </div>
      ` : ''
  }

  _renderText () {
    return this.text.length ? /* html */ `
      <div>
        <span>${this.text}</span>
      </div>
    ` : ''
  }

  _appendDefaultButtons () {
    const content = this.querySelector('[data-alert-actions]')

    const confirmButton = this._createConfirmButton()
    if (confirmButton) content.append(confirmButton)

    const cancelButton = this._createCancelButton()
    if (cancelButton) content.append(cancelButton)
  }

  /** @returns {HTMLElement} */
  _createConfirmButton (show, text) {
    if (
      !this._parseBooleanValue(this.showConfirmButton) ||
      (this._parseBooleanValue(this.showConfirmButton) &&
        !this.confirmButtonText.length)
    ) {
      return null
    }

    const button = this.global.createElement('button')
    button.setAttribute('listen', '')
    button.setAttribute('on-click', '_clickConfirmButton')
    button.setAttribute('alert-confirm-button', '')
    button.setAttribute('background', this.confirmButtonBackground)
    button.setAttribute('close', '')
    button.textContent = this.confirmButtonText

    return button
  }

  /** @param {Event} event */
  _clickConfirmButton (event) {
    event.stopPropagation()
    this.dispatchEvent(
      new CustomEvent('alert:confirm-button', {
        detail: {
          origin: event
        }
      })
    )
  }

  /** @returns {HTMLElement} */
  _createCancelButton () {
    if (
      !this._parseBooleanValue(this.showCancelButton) ||
      (this._parseBooleanValue(this.showCancelButton) &&
        !this.cancelButtonText.length)
    ) {
      return null
    }

    const button = this.global.createElement('button')
    button.setAttribute('listen', '')
    button.setAttribute('on-click', '_clickCancelButton')
    button.setAttribute('alert-cancel-button', '')
    button.setAttribute('background', this.cancelButtonBackground)
    button.setAttribute('close', '')
    button.textContent = this.cancelButtonText

    return button
  }

  /** @param {Event} event */
  _clickCancelButton (event) {
    event.stopPropagation()
    this.dispatchEvent(
      new CustomEvent('alert:cancel-button', {
        detail: {
          origin: event
        }
      })
    )
  }

  _parseBooleanValue (value) {
    if (value === true || value === 'true' || value === '') {
      return true
    } else {
      return false
    }
  }
}
customElements.define('ark-alert', Alert)
