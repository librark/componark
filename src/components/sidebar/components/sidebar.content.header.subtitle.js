export class SidebarContentHeaderSubtitle extends HTMLElement {
    connectedCallback() {
        this.render()
    }

    render() {
        const subtitle = this.innerText

        this.innerHTML = /* html */`
            <h4>${subtitle}</h4>
        `
    }
}
customElements.define('ark-sidebar-content-header-subtitle', SidebarContentHeaderSubtitle)
