/** @typedef {import('../../loader').Input} Input */
import { Component } from "../../loader"

export class InputDemo extends Component {
  init(context) {
    return super.init()
  }

  render() {
    this.innerHTML = /* html */ `${this.styles}
      <div class="container">
        <ark-input data-input-text type="text" label="Repite como loro" required
        listen on-alter="inputText"></ark-input>

        <p>:: <span data-input-value></span></p>

        <hr/>

        <button listen on-click="defaultValue">Default value</button>

        <br/>

        <ark-input type="date" label="date"></ark-input>
        <ark-input type="datetime-local" label="datetime-local"></ark-input>
        <ark-input type="email" label="email"></ark-input>
        <ark-input type="hidden" label="hidden"></ark-input>
        <ark-input type="month" label="month"></ark-input>
        <ark-input type="number" label="number"></ark-input>
        <ark-input type="password" label="password"></ark-input>
        <ark-input type="search" label="search"></ark-input>
        <ark-input type="tel" label="tel"></ark-input>
        <ark-input type="text" label="text"></ark-input>
        <ark-input type="time" label="time"></ark-input>
        <ark-input type="url" label="url"></ark-input>
        <ark-input type="week" label="week"></ark-input>
      </div>

      ${this.documentation}
    `

    return super.render()
  }

  inputText(event) {
    const element = this.querySelector("[data-input-value]")
    if (element) {
      element.textContent = event.detail ? event.detail.value : ""
    }
  }

  defaultValue(event) {
    const input = /** @type {Input} */ (this.select("[data-input-text]"))
    input.value = "Hello World"
    input.render()
  }

  // --------------------------------------------------------------------------

  get styles() {
    return /* html */ `
      <style>
        demo-input .container{
          padding: 1rem;
        }
      </style>
    `
  }

  get documentation() {
    return /* html */ `
      <br/>
      <hr/>
      <p>supported types</p>
      <ul>
        <li>date</li>
        <li>datetime-local</li>
        <li>email</li>
        <li>hidden</li>
        <li>month</li>
        <li>number</li>
        <li>password</li>
        <li>search</li>
        <li>tel</li>
        <li>text</li>
        <li>time</li>
        <li>url</li>
        <li>week</li>
      </ul>
    `
  }
}
customElements.define("demo-input", InputDemo)
