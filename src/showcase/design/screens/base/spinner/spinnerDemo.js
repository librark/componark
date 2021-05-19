import { Component } from "base/component"

const tag = "demo-spinner"
export class SpinnerDemo extends Component {
  init(context) {
    return super.init()
  }

  render() {
    this.content = /* html */ `
      <h1>spinner</h1>

      <div class="spinner-container">
        <ark-spinner></ark-spinner>
        <ark-spinner size="1.5" type="chase"></ark-spinner>
        <ark-spinner type="rect"></ark-spinner>
        <ark-spinner type="loader"></ark-spinner>
        <ark-spinner type="bounce"></ark-spinner>
        <ark-spinner type="round"></ark-spinner>
      </div>

      <a target="_blank" href="https://github.com/knowark/componark/blob/master/src/components/spinner/README.rst">
      * Reference
      </a>
    `
    return super.render()
  }
}

const styles = /* css */ `
.spinner-container{
  display: flex;
  gap:1.5rem;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.spinner-container > *{
  margin: 0.5rem;
}


`
Component.define(tag, SpinnerDemo, styles)
