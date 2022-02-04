import { Component } from 'base/component/index.js'

const tag = 'demo-tooltip'
export class TooltipDemo extends Component {
  init(context) {
    return super.init(context)
  }

  render() {
    this.content = /* html */ `
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
        <br>
        <a 
          target="_blank" 
          href="https://github.com/knowark/componark/blob/master/src/components/tooltip/README.md">
        * Reference
        </a>

    `

    return super.render()
  }

  load() {
    return super.load()
  }
}

const styles = /* css */ `

.demo-tooltip__content{
  display: grid;
  grid-auto-flow: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin-top: 100px;
}

.demo-tooltip__content ark-tooltip{
  margin: 1rem;
  padding:10px;
  border-radius: 10px;
}


`

Component.define(tag, TooltipDemo, styles)
