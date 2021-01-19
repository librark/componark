import { Component } from 'base/component'
import { styles } from '../styles'


export class Alert extends Component {
  init (context = {}) {
    this.title = context.title || this.title || ''
    this.text = context.text || this.text || ''

    this.horizontal = context.horizontal || this.horizontal || 'center'
    this.vertical = context.vertical || this.vertical || 'center'

    this.showConfirmButton = context.showConfirmButton ?? true

    this.confirmButtonText = (
      context.confirmButtonText || this.confirmButtonText || 'Aceptar')

    this.confirmButtonBackground = (
      context.confirmButtonBackground || 
      this.confirmButtonBackground || 'primary')

    this.showCancelButton = context.showCancelButton ?? true

    this.cancelButtonText = (
      context.cancelButtonText || this.cancelButtonText || 'Cancelar')

    this.cancelButtonBackground = (
      context.cancelButtonBackground ||
      this.cancelButtonBackground || 'light')

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
        <div class="ark-alert__actions" data-alert-actions>
          ${this._renderConfirmButton()}
          ${this._renderCancelButton()}
        </div>
      </div>
      <div class="ark-alert__scrim" listen on-click="close"></div>
    `

    return super.render()
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

  _renderTitle () {
    return this.title.length
      ? /* html */ `
        <div>
          <strong class="ark-alert__title">
            ${this.title}
          </strong>
        </div>
      `
      : ''
  }

  _renderText () {
    return this.text.length
      ? /* html */ `
      <div>
        <span>${this.text}</span>
      </div>
    `
      : ''
  }

  _renderConfirmButton () {
    if (String(this.showConfirmButton).toLowerCase() !== 'true') return ''
    return `
      <button class="ark-alert__confirm" listen on-click="_onConfirm"
        background="${this.confirmButtonBackground}" close>
        ${this.confirmButtonText}
      </button>
    `
  }

  /** @param {Event} event */
  _onConfirm (event) {
    event.stopPropagation()
    this.emit('alert:confirm', {origin: event})
    this.close()
  }

  _renderCancelButton () {
    if (String(this.showCancelButton).toLowerCase() !== 'true') return ''
    return `
      <button class="ark-alert__cancel" listen on-click="_onCancel"
        background="${this.cancelButtonBackground}" close>
        ${this.cancelButtonText}
      </button>
    `
  }

  /** @param {Event} event */
  _onCancel (event) {
    event.stopPropagation()
    this.emit('alert:cancel', {origin: event})
    this.close()
  }

}
Component.define('ark-alert', Alert, styles)
