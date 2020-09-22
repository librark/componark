import { Component } from '../../loader'

export class TooltipDemo extends Component {
  init (context) {
    return super.init(context)
  }

  render () {
    this.innerHTML = /* html */`${this.styles}
      <div class="demo-tooltip__content">
        <ark-tooltip position="top" text="tooltip Top">
          <span>Top</span>
        </ark-tooltip>

        <ark-tooltip position="right" text="tooltip Right">
          <span>Right</span>
        </ark-tooltip>

        <ark-tooltip position="bottom" text="tooltip Bottom">
          <span>Bottom</span>
        </ark-tooltip>

        <ark-tooltip position="left" text="tooltip Left">
          <span>Left</span>
        </ark-tooltip>
      </div>
    `

    return super.render()
  }

  load () {
    return super.load()
  }

  get styles () {
    return /* html */`
      <style>
        demo-tooltip{
          display: flex !important;
        }

        .demo-tooltip__content{
          display: flex;
          justify-content: space-around;
          align-items: center;
          width: 100%;
        }

        .demo-tooltip__content ark-tooltip{
          margin: 1rem;
        }
      </style>
    `
  }
}
customElements.define('demo-tooltip', TooltipDemo)
