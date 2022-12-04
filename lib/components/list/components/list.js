import { Component } from "../../../base/component/index.js"
import { ListItem } from "./list.item.js"
import styles from "../styles/index.js"

const tag = "ark-list"

export class List extends Component {
  /** @param {Object} context */
  init(context = {}) {
    this.source = /** @type {Array} */ (context.source) || []
    this.template = context.template || ((data) => `${data}`)

    return super.init()
  }

  render() {
    const script = this.select('script[type="text/json"]')
    const list = JSON.parse(script?.textContent || null)
    const source = list || this.source

    this.content = ""

    source.forEach((data, index) => {
      const item = new ListItem()

      if (this.hasAttribute("click-disabled")) {
        item.setAttribute("click-disabled", "")
      }
      
      this.appendChild(item)

      item.init({
          data: data,
          template: this.template,
          index: index,
        }).render()
    })

    return super.render()
  }

  async load() {
    this.addEventListener("click", this._onSelected.bind(this))
  }

  /** @param {number} start @param {number?} deleteCount  */
  delete(start, deleteCount = 1) {
    this.source.splice(start, deleteCount)

    for (let i = start; i < deleteCount + start; i++) {
      this.select(`[index="${i}"]`).remove()
    }

    this.render()
  }

  /** @param {MouseEvent} event */
  _onSelected(event) {
    event.stopImmediatePropagation()

    const target = /** @type {HTMLElement} */ (event.target)
    const item = /** @type {ListItem} */ (target.closest("ark-list-item"))

    if (!item || item.hasAttribute("click-disabled")) return

    this.dispatchEvent(
      new CustomEvent("list:selected", {
        bubbles: true,
        detail: {
          index: item.index,
          data: item.data,
          origin: event,
        },
      })
    )
  }
}
Component.define(tag, List, styles)
