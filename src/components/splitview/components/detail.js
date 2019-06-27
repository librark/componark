import { Component } from '../../component'

export class SplitviewDetail extends Component {
  init (context) {
    this.item = context['item'] || this.item || null
    this.title = context['title'] || this.title || ''
    this.template = context['template'] || this.template || null

    this.defaultTemplate = context['defaultTemplate'] || this.defaultTemplate
    this.backButtonIcon = context['backButtonIcon'] || this.backButtonIcon
    return super.init(context)
  }

  render () {
    if (this.template && this.item) {
      this.innerHTML = /* html */`
        <header class="ark-splitview-detail__header">
          <button listen on-click="hide"
            class="ark-splitview-detail__button--close">
            ${this._renderBackButtonIcon()}
          </button>
          <div class="ark-splitview-detail__title">
            ${this.title}
          </div>
        </header>
        <div class="ark-splitview-detail__body">
          ${this.template(this.item)}
        </div>
      `
      this.show()
    } else {
      this.innerHTML = this._innerHtmlDefaultTemplate()
    }

    return super.render()
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
  _innerHtmlDefaultTemplate () {
    const template = this.defaultTemplate ? this.defaultTemplate : ''

    return /* html */`
      <div class='ark-splitview-detail__default-template'>
        ${template}
      </div>
    `
  }

  _renderBackButtonIcon () {
    return this.backButtonIcon ? this.backButtonIcon : '&times;'
  }
}
customElements.define('ark-splitview-detail', SplitviewDetail)
