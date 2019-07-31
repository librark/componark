import { Component } from '../../base/components'

class MainComponent extends Component {
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
		return super.render()
	}
}
customElements.define('app-main', MainComponent)
