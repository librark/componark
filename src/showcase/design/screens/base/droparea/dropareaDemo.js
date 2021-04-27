import { Component } from "base/component"

const tag = "demo-droparea"

export class DropareaDemo extends Component {
  init(context) {
    return super.init(context)
  }

  render() {
    this.innerHTML = /* html */ `
        <h1 class="title">
            This is a drop area
        </h1>
        <div class="droparea-demo">
            <ark-droparea></ark-droparea>
        </div>
        
        `

    return super.render()
  }
}

const styles = /* css */ `
    .title{
        color: var(--primary);
    }
    .droparea-demo{
        width: 50%;
    }
`

Component.define(tag, DropareaDemo, styles)
