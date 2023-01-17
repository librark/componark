import { Component } from "base/component/index.js"

export class ModalDemo extends Component {
  init(context) {
    return super.init(context)
  }

  render() {
    this.content = /* html */ `
      <div>
        <h1>This is a modal.</h1>
        <button background="primary" btn-open>open</button>
        <button background="secondary" color="dark" btn-toggle>toggle</button>
      </div>

      <ark-modal 
        round="md" 
        title="My Title" 
        subtitle="My Subtitle"
        width="clamp(15.625rem, 50vw - 6.2rem, 25rem);" 
        height="50vh">

        <div style="margin: 1rem;">
          <div>
            <p>Contenido Párrafo A-1</p>
            <p>Contenido Párrafo A-2</p>
            <p>Contenido Párrafo A-3</p>
          </div>

          <div>
            <p>Contenido Párrafo A-4</p>
            <p>Contenido Párrafo A-5</p>
            <p>Contenido Párrafo A-6</p>
          </div>

          <div>
            <p>Contenido Párrafo A-7</p>
            <p>Contenido Párrafo A-8</p>
            <p>Contenido Párrafo A-9</p>
          </div>

          <div>
            <p>Contenido Párrafo B-1</p>
            <p>Contenido Párrafo B-2</p>
            <p>Contenido Párrafo B-3</p>
          </div>

          <div>
            <p>Contenido Párrafo B-4</p>
            <p>Contenido Párrafo B-5</p>
            <p>Contenido Párrafo B-6</p>
          </div>

          <div>
            <p>Contenido Párrafo B-7</p>
            <p>Contenido Párrafo B-8</p>
            <p>Contenido Párrafo B-9</p>
          </div>

          <div>
            <p>Contenido Párrafo C-1</p>
            <p>Contenido Párrafo C-2</p>
            <p>Contenido Párrafo C-3</p>
          </div>

          <div>
            <p>Contenido Párrafo C-4</p>
            <p>Contenido Párrafo C-5</p>
            <p>Contenido Párrafo C-6</p>
          </div>

          <div>
            <p>Contenido Párrafo C-7</p>
            <p>Contenido Párrafo C-8</p>
            <p>Contenido Párrafo C-9</p>
          </div>
        </div>

        <button background="success" color="dark" slot="action">Accept</button>
        <button background="primary" slot="action" close>Close</button>
        <button 
          fab
          size="small"
          background="light" 
          color="dark"
          vertical="center"
          slot="header" close>
          <i slot="icon" class="fas fa-times"></i></button>
        
      </ark-modal>
      <br>
      <a target="_blank" href="https://github.com/knowark/componark/blob/master/lib/components/modal/README.md">
      * Reference
      </a>
    `

    this.modal.render()

    return super.render()
  }

  load() {
    this.addEventListener("onHiddenModal", (
      /** @type {CustomEvent} */ event
    ) => {
      event.stopImmediatePropagation()
      this.select("[data-hidden]").innerHTML = /* html */ `
        hidden: ${event.detail.hidden}
      `
    })

    const open = this.querySelector("[btn-open]")
    open.addEventListener("click", (_) => this.modal["open"]())

    const toggle = this.querySelector("[btn-toggle]")
    toggle.addEventListener("click", (_) => this.modal["toggle"]())

    return super.load()
  }

  get modal() {
    return this.select("ark-modal")
  }
}

const styles = /* css */ `
:root{
  --primary: #1c1c3d;
}


`
Component.define("demo-modal", ModalDemo, styles)
