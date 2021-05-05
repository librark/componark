import {
  Component
} from "base/component"

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
            <p>Default(multi)</p>
            <ark-droparea></ark-droparea>
        </div>
        <div class="droparea-demo">
           <p>Single</p>
           <ark-droparea single accept="image"></ark-droparea>
       </div>

     <a class="reference" target="_blank" href="https://github.com/knowark/componark/tree/master/src/components/droparea/README.rst">
      * Reference
      </a>
        `
    return super.render()
  }
}

const styles = /* css */ `
    .title{
        color: var(--primary);
    }
    .droparea-demo{
        max-width: 80%;
        min-width: 250px;
    }
`

Component.define(tag, DropareaDemo, styles)