class MainComponent extends HTMLElement {
	connectedCallback () {
		this.render()
	}

	render () {
		this.innerHTML = /* html */ `
    <div>
      <p>ComponArk</p>
      <ul>
        <li><a href="/ark.html">ARK</a></li>
        <li><a href="/material.html">MATERIAL</a></li>
      </ul>
    </div>
    `
	}
}
customElements.define('app-main', MainComponent)
