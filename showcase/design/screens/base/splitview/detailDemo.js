import { Component } from "base/component/index.js"

const tag = "demo-splitview-detail"

export class SplitviewDetailDemo extends Component {
  init(context = {}) {
    if (!context.data) return super.init()

    const data = context.data
    this.first = data.first
    this.second = data.second
    this.year = data.year
    return super.init()
  }

  render() {
    this.content = this.first
      ? /* html */ `
      <button listen on-click="onClick"
        style="margin:8px; --display-large:none;"
        >Close</button>
        <h1>${this.year}</h1>
        <p>
          <span data-first>FIRST: ${this.first}</span>
          <span> | </span>
          <span data-second>SECOND: ${this.second}</span>
        </p>
      `
      : /* html */ `
        <h1>Ark Detail Example</h1>
      `
    return super.render()
  }

  onClick (event) {
    event.stopPropagation()
    this.emit('close')
  }
}
Component.define(tag, SplitviewDetailDemo)