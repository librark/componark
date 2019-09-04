import { Component } from '../../component'

export class Navbar extends Component {
	init (context = {}) {
		// local variables
		this.defaultContent = this.defaultContent || this.innerHTML
		return super.init()
	}

	render () {
		this.innerHTML = /* html */ `
      <div class="ark-navbar__content">
        ${this.defaultContent}
      </div>
    `
		return super.render()
	}

	load () {
		const navbar = this.querySelector('[ark-navbar-toggle]')
		if (navbar) {
			navbar.addEventListener('click', () => this.toggleContent())
		}

		return super.load()
	}

	toggleContent () {
		this.classList.toggle('ark-navbar--show')
	}
}
customElements.define('ark-navbar', Navbar)
