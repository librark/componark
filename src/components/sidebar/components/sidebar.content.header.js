import "./sidebar.content.header.title"
import "./sidebar.content.header.subtitle"

export class SidebarContentHeader extends HTMLElement {
    connectedCallback() {
        this.render()
    }

    render() {
        const children = Array.from(this.children)
        this.innerHTML = /* html */`
            ${children.map((element) => element.outerHTML).join('')}
        `
    }
}
customElements.define('ark-sidebar-content-header', SidebarContentHeader)
