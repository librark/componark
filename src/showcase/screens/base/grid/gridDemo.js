import { Component } from "../../loader"

export class GridDemo extends Component {
  init(context) {
    this.type = context["type"] || "ark"
    return super.init(context)
  }

  render() {
    this.innerHTML = /* html */ `${this.styles}
      <div>
        <p>This is a Layout Grid.</p>
        <hr/>

        <ark-grid cols="3" gap="15px">
          <ark-grid-item cols="3">header</ark-grid-item>
          <ark-grid-item rows="2">menu</ark-grid-item>
          <ark-grid-item>main</ark-grid-item>
          <ark-grid-item>right</ark-grid-item>
          <ark-grid-item cols="2">footer</ark-grid-item>
        </ark-grid>

        <hr/>

        <ark-grid cols="3" no-gutters>
          <ark-grid-item cols="2">1</ark-grid-item>
          <ark-grid-item rows="2">2</ark-grid-item>
          <ark-grid-item>3</ark-grid-item>
          <ark-grid-item>4</ark-grid-item>
        </ark-grid>

        <hr/>

        <ark-grid cols="6">
          <ark-grid-item>1</ark-grid-item>
          <ark-grid-item cols="4" rows="4" vertical="center">
            <ark-button background="primary">center</ark-button>
          </ark-grid-item>
          <ark-grid-item>2</ark-grid-item>
          <ark-grid-item>3</ark-grid-item>
          <ark-grid-item>4</ark-grid-item>
          <ark-grid-item>5</ark-grid-item>
          <ark-grid-item>6</ark-grid-item>
          <ark-grid-item>7</ark-grid-item>
          <ark-grid-item>9</ark-grid-item>
          <ark-grid-item>10</ark-grid-item>
          <ark-grid-item>11</ark-grid-item>
          <ark-grid-item>12</ark-grid-item>
          <ark-grid-item horizontal="start">start</ark-grid-item>
          <ark-grid-item horizontal="end">end</ark-grid-item>
          <ark-grid-item horizontal="center">center</ark-grid-item>
        </ark-grid>

      </div>
    `

    return super.render()
  }

  get styles() {
    return /* html */ `
      <style>
        demo-grid ark-grid-item {
          text-align: center;
          background: rgba(0, 0, 255, 0.3) !important;
        }
      </style>
    `
  }
}
customElements.define("demo-grid", GridDemo)
