import { Component } from "../../component"

export class Checkbox extends Component {
  /**
   * @param {{ value:string, checked:boolean } | {}} context?
   */
  init(context = {}) {
    this.value = context["value"]
    this.checked = context["checked"]

    // local variables
    this.defaultContent = this.defaultContent || this.innerHTML

    return super.init()
  }

  reflectedProperties() {
    return ["value"]
  }

  render() {
    this.innerHTML = /* html */ `
      <div class="ark-checkbox__input">
        <input data-input type="checkbox">
      </div>
      <div class="ark-checkbox__label">
        <small>${this.defaultContent}</small>
      </div>
    `

    this._moveAttributes()
    return super.render()
  }

  load() {
    this.addEventListener("click", this.onAlter.bind(this))

    return super.load()
  }

  // ---------------------------------------------------------------------------

  check() {
    this.checked = true
  }

  uncheck() {
    this.checked = false
  }

  toggle() {
    this.checked = !this.checked
  }

  // ---------------------------------------------------------------------------
  /** @returns {Boolean} */
  get checked() {
    return this.hasAttribute("checked")
  }

  /** @param {Boolean} value */
  set checked(value) {
    const input = this.querySelector("[data-input]")
    if (!input) return

    input["checked"] = value

    if (value) {
      this.setAttribute("checked", "")
      input.setAttribute("checked", "checked")
    } else {
      this.removeAttribute("checked")
      input.removeAttribute("checked")
    }
  }

  /** @param {Event} event */
  onAlter(event) {
    event.stopImmediatePropagation()

    this.toggle()

    this.dispatchEvent(
      new CustomEvent("checkbox:alter", {
        bubbles: true,
        detail: {
          value: this.value,
          checked: this.checked,
          origin: event
        }
      })
    )
  }

  // ---------------------------------------------------------------------------

  _moveAttributes() {
    this.checked = this.hasAttribute("checked")
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
      "dirname",
      "disabled",
      "form",
      "formaction",
      "formenctype",
      "formmethod",
      "formnovalidate",
      "formtarget",
      "height",
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
      "width"
    ]
  }
}
customElements.define("ark-checkbox", Checkbox)
