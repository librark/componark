import { getSlots } from '../../../utils'
import { Component } from '../../component'

export class Alert extends Component {
  init (context) {
    this.title = context['title']
    this.text = context['text']
    this.horizontal = context['horizontal'] || this.horizontal || 'center'
    this.vertical = context['vertical'] || this.vertical || 'center'
    this.showConfirmButton = (
      context['showConfirmButton'] || this.showConfirmButton || 'false')
    this.confirmButtonText = (
      context['confirmButtonText'] || this.confirmButtonText || 'Aceptar')
    this.confirmButtonBackground = (
      context['confirmButtonBackground'] || this.confirmButtonBackground ||
      'primary')
    this.showCancelButton = (
      context['showCancelButton'] || this.showCancelButton || true)
    this.cancelButtonText = (
      context['cancelButtonText'] || this.cancelButtonText || 'Cancelar')
    this.cancelButtonBackground = (
      context['cancelButtonBackground'] || this.cancelButtonBackground ||
      'light')

    return super.init(context)
  }

  reflectedProperties () {
    return [
      'title',
      'text',
      'horizontal',
      'vertical',
      'showConfirmButton',
      'confirmButtonText',
      'confirmButtonBackground',
      'showCancelButton',
      'cancelButtonText',
      'cancelButtonBackground'
    ]
  }

  render () {
    this.slots = getSlots(this)
    this.innerHTML = /* html */`
      <div class="ark-alert__body">
        <div class="ark-alert__content">
          ${this._renderTitle()}
          ${this._renderText()}
          ${this._getSlots('general')}
        </div>
        ${this._renderActions()}
      </div>
      <div class="ark-alert__scrim" listen on-click="close"></div>
    `
    return super.render()
  }

  load () {
    this.querySelectorAll('[close]').forEach(element =>
      element.addEventListener('click', _ => this.close())
    )
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

  // ---------------------------------------------------------
  // renders
  // ---------------------------------------------------------

  _renderTitle () {
    return this.title
      ? /* html */ `<h4 class="ark-alert__title">${this.title}</h4>` : ''
  }

  _renderText () {
    return this.text ? /* html */ `<p>${this.text}</p>` : ''
  }

  _renderActions () {
    let content = ''
    content += this._getSlots('action')
    content += this._renderCancelButton()
    content += this._renderConfirmButton()

    return content.trim().length ? /* html */`
      <div class="ark-alert__actions">${content}</div>
    ` : ''
  }

  _renderConfirmButton () {
    if (!this._parseBooleanValue(this.showConfirmButton)) return ''

    return this.confirmButtonText.length ? /* html */`
        <button close alert-confirm-button
        background="${this.confirmButtonBackground}">
          ${this.confirmButtonText}
        </button>
      ` : ''
  }

  _renderCancelButton () {
    if (!this._parseBooleanValue(this.showCancelButton)) return ''

    return this.cancelButtonText.length ? /* html */`
        <button close alert-cancel-button
        background="${this.cancelButtonBackground}">
          ${this.cancelButtonText}
        </button>
      ` : ''
  }

  _parseBooleanValue (value) {
    switch (value) {
      case true: case 'true': case '':
        return true
      case false: case 'false':
        return false
    }
    return false
  }

  _getSlots (key) {
    if (!this.slots || !this.slots[key]) return ''

    return /* html */`
        ${this.slots[key].map(element => `${element.outerHTML}`).join('')}
      `
  }
}
customElements.define('ark-alert', Alert)
