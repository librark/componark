import { Component } from 'base/component'

const tag = 'demo-spinner'
export class SpinnerDemo extends Component {
  init (context) {
    return super.init()
  }

  render () {
    this.content = /* html */ `
      <h1>spinner</h1>

      <div class="spinner-container">
        <ark-spinner border="0.4rem"></ark-spinner>
        <ark-spinner size='4rem' border="0.5rem"></ark-spinner>
        <ark-spinner size='8rem' border="0.5rem"></ark-spinner>
      </div>

      <a target="_blank" href="https://github.com/knowark/componark/blob/master/src/components/spinner/README.rst">
      * Reference
      </a>
    `
    return super.render()
  }
}

const styles = /* css */`
.spinner-container{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.spinner-container > *{
  margin: 0.5rem;
}


`
Component.define(tag, SpinnerDemo, styles)
