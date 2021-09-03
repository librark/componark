import { Component } from "../../../base/component"

const tag = "ark-accordion-tab"
export class AccordionTab extends Component {
  constructor() {
    super()
  }

  /** @param {Object} context */
  init(context = {}) {
    this.binding = "accordion-tab-listen"
    this.header = context.header
    
    this.background = context.background || this.background || "primary"
    this.color = context.color || this.color || "light"
    
    const slots = this.slots()
    
    const [icon] = slots['icon'] || []
    const [body] = slots['general']

    this.body = this.body || body || this.innerText
    this.icon = this.icon || icon || ''

    return super.init(context)
  }

  reflectedProperties() {
    return ["header", "index", "background", "color"]
  }

  render() {
    this.content = this.header
      ? /* html */ `
      <div background="${this.background}" 
           color="${this.color}" 
           class="ark-accordion-tab__header">
        <small data-accordion-tab-header>
        ${this.header}
        </small>
        </div>
        <div class="ark-accordion-tab__content">
        </div>
        `
        : ""

        this.tabContent = this.querySelector(".ark-accordion-tab__content")
        const header = this.select('[data-accordion-tab-header]')
        
        if(this.icon) {
          header.innerHTML = /* html */`
            <icon class="ark-accordion-tab__icon"></icon>
            ${this.header}
            `
            const icon = this.select('.ark-accordion-tab__icon')
            icon.append(this.icon)
        } 
        this.tabContent.append(this.body)
        return super.render()
      }
      
      async load() {
        this.tabContent
      ? this.tabContent.addEventListener("click", (event) => {
          event.stopImmediatePropagation()
        })
        : ""
      }

  open() {
    this.setAttribute("active", "true")
  }

  close() {
    this.removeAttribute("active")
  }

  toggle() {
    this.hasAttribute("active") ? this.close() : this.open()
  }
}
Component.define(tag, AccordionTab)
