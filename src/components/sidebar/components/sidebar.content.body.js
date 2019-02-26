export class SidebarContentBody extends HTMLElement {
    connectedCallback() {
        this.render()
    }

    render() {
        const children = Array.from(this.children)

        this.innerHTML = /* html */`
            ark-sidebar-content-body
        `
    }
}
customElements.define('ark-sidebar-content-body', SidebarContentBody)
