import { Component } from "base/component"
import "./splitview.detail.js"

class MockMain extends Component {
  init(context = {}) {
    this.name = this.name || context.name || null
    return super.init(context)
  }

  render() {
    if (this.name) {
      this.content = `${this.name}`
    }
    return super.render()
  }
}
Component.define("mock-main", MockMain)

describe("SplitViewDetail", () => {
  let container = null
  beforeEach(() => {
    container = document.createElement("div")
    document.body.appendChild(container)
  })

  afterEach(() => {
    container.remove()
    container = null
  })

  it("can be instantiated", () => {
    container.innerHTML = `
    <ark-splitview-detail>
    </ark-splitview-detail>
    `
    const detail = container.querySelector("ark-splitview-detail")
    expect(detail).toBeTruthy()

    expect(detail).toBe(detail.init())
  })

  it("can be instantiated with an inner main Component", () => {
    container.innerHTML = /*html */`
    <ark-splitview-detail>
      <mock-main>MAIN CONTENT</mock-main>
    </ark-splitview-detail>
    `
    const detail = container.querySelector("ark-splitview-detail")

    expect(detail.firstElementChild.textContent).toEqual("MAIN CONTENT")
  })

  it("can initialize its main Component", () => {
    container.innerHTML = /* html */`
    <ark-splitview-detail>
      <mock-main></mock-main>
    </ark-splitview-detail>
    `
    const detail = container.querySelector("ark-splitview-detail")

    detail.init({ name: "Servagro" }).render()

    expect(detail.firstElementChild.textContent).toEqual("Servagro")
  })

  it("can manipulate its hidden attribute", () => {
    container.innerHTML = /* html */`
    <ark-splitview-detail>
      <mock-main></mock-main>
    </ark-splitview-detail>
    `
    const detail = container.querySelector("ark-splitview-detail")

    detail.show()
    expect(detail.hasAttribute("hidden")).toBeFalsy()

    detail.hide()
    expect(detail.hasAttribute("hidden")).toBeTruthy()
  })

  it("listens to close events to hide itself", () => {
    container.innerHTML = /* html */`
    <ark-splitview-detail>
      <mock-main></mock-main>
    </ark-splitview-detail>
    `
    const detail = container.querySelector("ark-splitview-detail")
    detail.dispatchEvent(new Event('close'))

    expect(detail.hasAttribute('hidden')).toBeTruthy()
  })
})
