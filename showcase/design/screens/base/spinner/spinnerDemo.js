import { Component } from 'base/component/index.js'

const tag = 'demo-spinner'
export class SpinnerDemo extends Component {
  init(context) {
    return super.init()
  }

  render() {
    this.content = /* html */ `
      <h1>spinner</h1>

      <div class="spinner-container">
        <div>
          <ark-spinner></ark-spinner>
          <p style="margin-top:16px">circle</p>
        </div>
        <div>
          <ark-spinner scale="1.5" type="chase"></ark-spinner>
          <p style="margin-top:16px">chase</p>
        </div>
        <div>
          <ark-spinner type="rect"></ark-spinner>
          <p style="margin-top:16px">rect</p>
        </div>
        <div>
          <ark-spinner type="bounce"></ark-spinner>
          <p style="margin-top:16px">bounce</p>
        </div>
        <div>
          <ark-spinner type="loader"></ark-spinner>
          <p style="margin-top:16px">loader</p>
        </div>
      </div>

      <a 
        target="_blank" href="https://github.com/knowark/componark/blob/master/lib/components/spinner/README.md">
      * Reference
      </a>
    `
    return super.render()
  }
}

const styles = /* css */`
.spinner-container{
  display: flex;
  gap:1.5rem;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
}
`
Component.define(tag, SpinnerDemo, styles)
