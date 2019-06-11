import { getSlots } from '../../../utils'

export class Alert extends HTMLElement {
  init (context) {
    this.title = context['title']
    this.text = context['text']

    // position
    this.horizontal = context['horizontal']
    this.vertical = context['vertical']

    // Buttons
    // confirmButton
    this.showConfirmButton = context['showConfirmButton']
    this.confirmButtonText = context['confirmButtonText']
    this.confirmButtonBackground = context['confirmButtonBackground']

    // CancelButton
    this.showCancelButton = context['showCancelButton']
    this.cancelButtonText = context['cancelButtonText']
    this.cancelButtonBackground = context['cancelButtonBackground']

    return this
  }

  connectedCallback () {
    this.render()
  }

  render () {
    this.slots = getSlots(this)

    this.innerHTML = /* html */`
      <div class="ark-alert__body">
        <div class="ark-alert__content">

          ${this.title}
          ${this.text}

          ${this._getSlots('title')}
          ${this._getSlots('text')}
          ${this._getSlots('general')}
        </div>
        <div class="ark-alert__actions">
          ${this._getSlots('action')}

          ${this._getCancelButtonHtml()}
          ${this._getConfirmButtonHtml()}
        </div>
      </div>
      <div class="ark-alert__scrim"></div>
    `

    this._listen()
  }

  static launch (context, parent = document.body) {
    const alert = new Alert().init(context)
    parent.appendChild(alert)
    return alert
  }

  _getSlots (key) {
    if (!this.slots || !this.slots[key]) { return '' }

    return /* html */`
        ${this.slots[key].map((element, index) => `
          ${element.outerHTML}
        `).join('')}
      `
  }

  _listen () {
    const btns = Array.from(this.querySelectorAll('[close]'))
    btns.forEach(btn => btn.addEventListener('click', _ =>
      this.close()
    ))

    this.querySelector('.ark-alert__scrim').addEventListener(
      'click', _ => this.close()
    )
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
    this.hasAttribute('hidden')
      ? this.removeAttribute('hidden')
      : this.setAttribute('hidden', '')
  }

  // ---------------------------------------------------------
  // Get & Set
  // ---------------------------------------------------------

  get title () {
    const value = this.getAttribute('title')
    return value ? /* html */`<h4 class="ark-alert__title">${value}</h4>` : ''
  }

  set title (value) {
    this.setAttribute('title', value)
  }

  get text () {
    const value = this.getAttribute('text')
    return value ? /* html */`<p>${value}</p>` : ''
  }

  set text (value) {
    this.setAttribute('text', value)
  }

  get horizontal () {
    return this.getAttribute('horizontal')
  }

  set horizontal (value) {
    this.setAttribute('horizontal', value || 'center')
  }

  get vertical () {
    return this.getAttribute('vertical')
  }

  set vertical (value) {
    this.setAttribute('vertical', value || 'center')
  }

  // Buttons

  // Confirm Button
  get showConfirmButton () {
    return this.getAttribute('showConfirmButton') || false
  }

  set showConfirmButton (value) {
    return this.setAttribute('showConfirmButton', value)
  }

  get confirmButtonText () {
    return this._confirmButtonText || 'Aceptar'
  }

  set confirmButtonText (value) {
    this._confirmButtonText = value
  }

  get confirmButtonBackground () {
    return this._confirmButtonBackground || 'primary'
  }

  set confirmButtonBackground (value) {
    this._confirmButtonBackground = value
  }

  _getConfirmButtonHtml () {
    return this.showConfirmButton ? /* html */`
      <button background="${this.confirmButtonBackground}" close confirmButton>
        ${this.confirmButtonText}
      </button>
    ` : ''
  }

  // Cancel Button
  get showCancelButton () {
    return this.hasAttribute('showCancelButton')
      ? this.getAttribute('showCancelButton') === 'true'
      : false
  }

  set showCancelButton (value) {
    return this.setAttribute('showCancelButton', value)
  }

  get cancelButtonText () {
    return this._cancelButtonText
  }

  set cancelButtonText (value) {
    this._cancelButtonText = value || 'Cancelar'
  }

  get cancelButtonBackground () {
    return this._cancelButtonBackground || 'light'
  }

  set cancelButtonBackground (value) {
    this._cancelButtonBackground = value
  }

  _getCancelButtonHtml () {
    return this.showCancelButton ? /* html */`
      <button background="${this.cancelButtonBackground}" close cancelButton>
        ${this.cancelButtonText}
      </button>
    ` : ''
  }
}
customElements.define('ark-alert', Alert)
