import { Component } from '../../component'

export class AccordionTab extends Component {
  properties () {
    return ['header', 'tab-index']
  }

  render () {
    if (!this['header']) {
      this.innerHTML = ''
      return
    }

    this.innerHTML = /* html */`
      <button class="ark-accordion-tab__btn-header" listen on-click="toggle">
        <span data-accordion-tab-header>${this['header']}</span>
      </button>
      <div id="ark-accordion-tab__content">
        ${this.innerHTML}
      </div>
    `

    return super.render()
  }

  open () {
    this.classList.add(`ark-accordion-tab--show`)
    this.setAttribute('active', '')
  }

  close () {
    this.classList.remove(`ark-accordion-tab--show`)
    this.removeAttribute('active')
  }

  toggle (event) {
    this.hasAttribute('active') ? this.close() : this.open()

    this.dispatchEvent(new CustomEvent('accordiontab:click', {
      detail: { 'tab-index': this['tab-index'] }
    }))
  }
}
customElements.define('ark-accordion-tab', AccordionTab)
