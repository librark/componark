import { getSlots } from '../../../utils'

export class Alert extends HTMLElement {
  init (context) {
    this.title = context['title']
    this.text = context['text']

    // position
    this.horizontal = context['horizontal']
    this.vertical = context['vertical']

    // Buttons
    this.confirmButtonText = context['confirmButtonText']
    this.showCancelButton = context['showCancelButton']
    this.cancelButtonText = context['cancelButtonText']

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

          ${this._getSlots('general')}
        </div>
        <div class="ark-alert__actions">
          ${this._getSlots('action')}

          ${this.showCancelButton === true ? `
            <button close>${this.cancelButtonText}</button>
          ` : ''}

          <button close>${this.confirmButtonText}</button>
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

    const scrim = this.querySelector('.ark-alert__scrim')
    if (scrim) scrim.addEventListener('click', _ => this.close())
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
    this.getAttributeNode('hidden')
      ? this.removeAttribute('hidden')
      : this.setAttributeNode('hidden', '')
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
  get confirmButtonText () {
    return this._confirmButtonText || 'Aceptar'
  }

  set confirmButtonText (value) {
    this._confirmButtonText = value
  }

  // Cancel Button
  get showCancelButton () {
    return this.getAttribute('showCancelButton') || false
  }

  set showCancelButton (value) {
    return this.setAttribute('showCancelButton', value === 'true')
  }

  get cancelButtonText () {
    return this._cancelButtonText
  }

  set cancelButtonText (value) {
    this._cancelButtonText = value
  }
}
customElements.define('ark-alert', Alert)
