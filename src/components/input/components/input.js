import { Component } from "../../component"

export class Input extends Component {
  init(context = {}) {
    this.label = context["label"] || this.label
    this.value = context["value"] || this.value || ""

    // local variables
    this.defaultContent = this.defaultContent || this.innerHTML
    return super.init()
  }

  reflectedProperties() {
    return ["label", "value"]
  }

  render() {
    this.innerHTML = /* html */ `
      <div class="ark-input__label" ${this._isRequired()}>
        <small>${this.label}</small>
      </div>

      <div class="ark-input__input">
        <input data-input listen on-input="_change" value="${this.value}">
      </div>

      <div class="ark-input__alert">
        ${this.defaultContent}
      </div>
    `

    this._moveAttributes()
    return super.render()
  }

  // ---------------------------------------------------------------------------

  /** @param {Event} event */
  _change(event) {
    event.stopImmediatePropagation()
    this.value = this.select("[data-input]")["value"]
    this.dispatchEvent(
      new CustomEvent("alter", {
        detail: {
          value: this.value,
          origin: event
        }
      })
    )
  }

  _isRequired() {
    return this.hasAttribute("required") ? "required" : ""
  }

  _moveAttributes() {
    const element = this.querySelector("[data-input]")
    const attributes = Array.from(this.attributes)

    attributes.forEach(attribute => {
      if (this._defaultAttributes().find(item => item === attribute.name)) {
        element.setAttribute(attribute.name, attribute.value)
        this.removeAttribute(attribute.name)
      }
    })
  }

  /** @return {Array<string>} */
  _defaultAttributes() {
    return [
      "accept",
      "alt",
      "autocomplete",
      "autofocus",
      "checked",
      "dirname",
      "disabled",
      "form",
      "formaction",
      "formenctype",
      "formmethod",
      "formnovalidate",
      "formtarget",
      "list",
      "min",
      "multiple",
      "name",
      "pattern",
      "placeholder",
      "readonly",
      "required",
      "size",
      "src",
      "step",
      "type"
    ]
  }
}
customElements.define("ark-input", Input)
