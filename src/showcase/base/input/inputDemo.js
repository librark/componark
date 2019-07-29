import { Component } from '../components'

export class InputDemo extends Component {
	init (context) {
		this.type = context['type'] || 'ark'
		return super.init()
	}

	render () {
		this.innerHTML = /* html */ `
      <!-- <div mobile><p>mobile (360px).</p></div>
      <div tablet><p>tablet (768px).</p></div>
      <div desktop><p>desktop (960px).</p></div> -->
      ${this._setupContent()}
      ${this.documentation}
    `
		// this._setupFrame('[mobile]', '360px')
		// this._setupFrame('[tablet]', '768px')
		// this._setupFrame('[desktop]', '960px')

		return super.render()
	}

	_setupFrame (selector, width) {
		const content = this._setupContent()
		const frame = document.createElement('iframe')
		frame.setAttribute('src', `/${this.type}.html`)
		frame.setAttribute('frameborder', '1')
		frame.setAttribute('width', width)
		frame.setAttribute('height', '640px')
		frame.onload = () => {
			const frameBody = frame.contentDocument.querySelector('body')
			const app = frameBody.querySelector('app-showcase-ark')
			const main = document.createElement('main')
			main.innerHTML = content

			app.parentNode.removeChild(app)
			frameBody.prepend(main)
		}

		this.querySelector(selector).appendChild(frame)
	}

	_setupContent () {
		return /* html */ `
      <ark-input type="text" label="Repite como loro"
        listen on-alter="inputText"></ark-input>

      <p>:: <span data-input-value></span></p>

      <hr/>
      <br/>

      <ark-input type="date" label="date"></ark-input>
      <ark-input type="datetime-local" label="datetime-local"></ark-input>
      <ark-input type="email" label="email"></ark-input>
      <ark-input type="hidden" label="hidden"></ark-input>
      <ark-input type="month" label="month"></ark-input>
      <ark-input type="number" label="number"></ark-input>
      <ark-input type="password" label="password"></ark-input>
      <ark-input type="search" label="search"></ark-input>
      <ark-input type="tel" label="tel"></ark-input>
      <ark-input type="text" label="text"></ark-input>
      <ark-input type="time" label="time"></ark-input>
      <ark-input type="url" label="url"></ark-input>
      <ark-input type="week" label="week"></ark-input>
    `
	}

	inputText (event) {
		const element = this.querySelector('[data-input-value]')
		if (element) {
			element.textContent = event.detail ? event.detail.value : ''
		}
	}

	get documentation () {
		return /* html */ `
      <br/>
      <hr/>
      <p>supported types</p>
      <ul>
        <li>date</li>
        <li>datetime-local</li>
        <li>email</li>
        <li>hidden</li>
        <li>month</li>
        <li>number</li>
        <li>password</li>
        <li>search</li>
        <li>tel</li>
        <li>text</li>
        <li>time</li>
        <li>url</li>
        <li>week</li>
      </ul>
    `
	}
}
customElements.define('demo-input', InputDemo)
