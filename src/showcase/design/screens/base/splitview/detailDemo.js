import { Component } from "base/component"

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
}
Component.define(tag, SplitviewDetailDemo)
