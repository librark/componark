import { Component } from 'base/component'

const tag = 'demo-input'

export class InputDemo extends Component {
  init(context) {
    this.data = {}
    return super.init()
  }

  render() {
    this.innerHTML = /* html */ `
    <section class="introduction">
      <h1 class="intro-title">Input</h1>
      <p class="intro-subtitle">User input component.</p>
    </section>

    <section class="implementation">
      <ark-input border-color="dark" data-input-text required
                 label="Enter some text:"
                 listen on-alter="onTextInput"
                 placeholder = "Take this text"
                 round="lg"></ark-input>
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
      <div class="code">${example}</div>
    </div>
  `
  }

  // Examples
  get firstExample() {
    return this.renderExample(`<ark-input label="Label"></ark-input>`)
  }

  get secondExample() {
    return this.renderExample(
      `
      <ark-input label="Inline Label" inline></ark-input>
      <ark-input label="Header Label"></ark-input>
    `
    )
  }

  get thirdExample() {
    return this.renderExample(/* html */ `
      <ark-input type="file"></ark-input>
      <ark-input label="Date" type="date"></ark-input>
      <ark-input type="text" label="Disabled" placeholder="Disabled input" disabled></ark-input>
      <ark-input type="search" label="Search"></ark-input>
    `)
  }

  // Handlers

  onTextInput(event) {
    const element = this.querySelector('[data-input-value]')
    if (element) {
      element.textContent = event.detail || ''
    }
  }
}

const styles = /* css */ `

* {
  box-sizing:border-box;
}

.intro-title {
  font-size:2rem;
  padding:0;
  margin:0;
}  
.intro-subtitle {
  padding:0;
  margin:0;
}

.html {
    display:block;
    background-color:rgb(212 235 230);
    padding: 5px;
    width:100%;
  }

.examples {
  margin-bottom:20px;
  width:100%;
}  

.example {
  background:var(--light);
  padding: 1rem;
}
`
Component.define(tag, InputDemo, styles)
