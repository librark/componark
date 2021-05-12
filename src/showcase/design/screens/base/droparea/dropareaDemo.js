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
            <p>Default(multi)</p>
            <ark-droparea listen on-alter="onFileList" ></ark-droparea>
            <span data-file-multi></span>
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

  onFileList(event) {
    const element = this.querySelector("[data-file-multi]")
    const nameList = []
    if (element) {
      event.detail.forEach((file, index) =>
        nameList.push(` ${index} : ${file.name} `)
      )
      element.textContent = nameList.join()
    }
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

