/** @typedef {import('../../loader').Input} Input */
import hljs from 'highlight.js/lib/core'
import { Component } from '../../loader'

export class InputDemo extends Component {
  init (context) {
    return super.init()
  }

  render () {
    this.innerHTML = /* html */ `${this.styles}
    <section class="introduction">
      <h1><code>Input</code></h1>
      <p>User input component.</p>
    </section>
    <section class="implementation">
      <ark-input data-input-text required inline
                 label="Enter some text..."
                 listen on-alter="onTextInput"></ark-input>
      <p>Value: <span data-input-value></span></p>
    </section>
    <section class="examples">
      <h2>Examples</h2>
      <label>Label <input></input></label>
      ${this.firstExample}
      ${this.secondExample}
      ${this.thirdExample}
    </section>
    <section class="reference">
      <h2>Reference</h2>
      <p>
      The <code>ark-input</code> element supports all the types of the default
      <a href="https://www.w3schools.com/html/html_form_input_types.asp">
        <code>input</code> web component.
      </a>
      Additionally, the following options are available:
      </p>
      <h3>Attributes</h3>
      ${this.attributes}
      <h3>Properties</h3>
      ${this.properties}
      <h3>Methods</h3>
      ${this.methods}
    </section>
  `

    return super.render()
  }

  renderExample(example) {
    return `
    <div class="example">
      <span class="value">
        <pre><code class="html">${example.value}</code></pre>
      </span>
      <span class="code">${example.code}</span>
    </div>
  `
  }

  renderTable(values) {
    return `
      <table class="notranslate">
        <tr>
          <th>${values[0][0]}</th>
          <th>${values[0][1]}</th>
          <th>${values[0][2]}</th>
          <th>${values[0][3]}</th>
        </tr>
        ${values.slice(1).map((value) => `
        <tr>
          <td><i>${value[0]}</i></td>
          <td>${value[1]}</td>
          <td>${value[2]}</td>
          <td class="translate">${value[3]}</td>
        </tr>
        `).join('')}
      </table>
    `
  }

  // Examples

  get firstExample() {
    return this.renderExample(hljs.highlight('html', `
      <ark-input label="Label"></ark-input>
    `))
  }

  get secondExample() {
    return this.renderExample(hljs.highlight('html', `
      <ark-input label="Inline Label" inline></ark-input>
      <ark-input label="Header Label"></ark-input>
    `))
  }

  get thirdExample() {
    return this.renderExample(hljs.highlight('html', `
      <ark-input type="file"></ark-input>
    `))
  }


  // Documentation

  get attributes() {
    return this.renderTable([
      ['Name', 'Type', 'Defaul', 'Description'],
      ['type', 'string', 'text', 'Type of input.'],
      ['label', 'string', 'null', "Input's accompanying label."]
    ])
  }

  get properties() {
    return this.renderTable([
      ['Name', 'Type', 'Defaul', 'Description'],
      ['label', 'string', 'null', "Input's accompanying label."]
    ])
  }

  get methods() {
    return this.renderTable([
      ['Name', 'Type', 'Defaul', 'Description'],
      ['label', 'string', 'null', 'Input accompanying label.']
    ])
  }

  // Handlers

  onTextInput (event) {
    const element = this.querySelector('[data-input-value]')
    if (element) {
      element.textContent = event.detail ? event.detail.value : ''
    }
  }

  get styles () {
    return ``
  }
}
customElements.define('demo-input', InputDemo)
