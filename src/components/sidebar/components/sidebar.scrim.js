export class SidebarScrim extends HTMLElement {
    connectedCallback() {
        this.render()
    }

    get solid() {
        return this.hasAttribute('solid')
    }

    render() {
        const children = Array.from(this.children)

        this.innerHTML = /* html */``

        if (this.solid) {
            this.classList.add('ark-sidebar-scrim--solid')
        }
    }
}
customElements.define('ark-sidebar-scrim', SidebarScrim)
