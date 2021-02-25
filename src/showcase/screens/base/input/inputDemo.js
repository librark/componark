import hljs from 'highlight.js/lib/core'
import { Component } from 'base/component'

const tag = 'demo-input'

export class InputDemo extends Component {
  init (context) {
    return super.init()
  }

  render () {
    this.innerHTML = /* html */ `
    <section class="introduction">
      <h1 class="intro-title">Input</h1>
      <p class="intro-subtitle">User input component.</p>
    </section>

    <section class="implementation">
      <ark-input background="light" color="primary" data-input-text required inline
                 label="Enter some text:"
                 listen on-alter="onTextInput"></ark-input>
      <p>Value: <span data-input-value></span></p>
    </section>

    <section class="examples">
      <h2>Examples</h2>
      ${this.firstExample}
      ${this.secondExample}
      ${this.thirdExample}
    </section>
    
    <a class="reference" target="_blank" href="https://github.com/knowark/componark/blob/master/src/components/input/README.rst">* Reference</a>
    `
    return super.render()
  }

  renderExample(example) {
    return `
    <div class="example">
      <div class="value">
        <pre><code class="html">${example.value}</code></pre>
      </div>
      <div class="code">${example.code}</div>
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
    return this.renderExample(hljs.highlight('html',/* html */ `
      <ark-input label="File" type="file"></ark-input>
      <ark-input label="Date" type="date"></ark-input>
    `))
  }

  // Handlers

  onTextInput (event) {
    const element = this.querySelector('[data-input-value]')
    if (element) {
      element.textContent = event.detail ? event.detail.value : ''
    }
  }
}

const styles = /* css */`

.intro-title{
  font-size:2rem;
  padding:0;
  margin:0;
}  
.intro-subtitle{
  padding:0;
  margin:0;
}

.html{
    display:block;
    background-color:rgb(212 235 230);
    padding: 5px;
    max-width:100%;
  }

.examples{
  margin-bottom:20px;
}  
.example{
  background:var(--light);
}

`
Component.define(tag, InputDemo, styles)