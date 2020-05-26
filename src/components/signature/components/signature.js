import { Component } from '../../component'
import SignaturePad from 'signature_pad/dist/signature_pad'

export class Signature extends Component {
	init (context = {}) {
		this.width = this.width || context.width
		this.height = this.height || context.height

		// -------------------------------------------------------------------------
		// Local
		// -------------------------------------------------------------------------

		this.global = context.global || window
		this._dirty = false

		return super.init()
	}

	reflectedProperties () {
		return ['width', 'height']
	}

	render () {
		this.innerHTML = /* html */`
      <canvas data-signature-pad class="ark-signature--pad"></canvas>
    `

		this.signaturePad = new SignaturePad(this.canvas, {
			backgroundColor: 'rgba(255, 255, 255, 1)',
			penColor: 'rgb(0, 0, 0)'
		})

		if (this.width) this.style.width = this.width
		if (this.height) this.style.height = this.height

		return super.render()
	}

	load () {
		this.global.addEventListener('resize', _ => this.resizeCanvas())

		this.canvas.addEventListener('touchend', _ => this.isDirty())

		this.canvas.addEventListener('mouseup', _ => this.isDirty())

		setTimeout(_ => { this.resizeCanvas(true) }, 800)

		return super.load()
	}

	disconnectedCallback () {
		this.global.removeEventListener('resize', _ => this.resizeCanvas())
	}

	// --------------------------------------------------------------------------

	/** @returns {string} */
	dataURL (width = this.offsetWidth, height = this.offsetHeight) {
		/** @type {HTMLCanvasElement} */
		const dupCanvas = (this.canvas.cloneNode(true))

		dupCanvas.width = width
		dupCanvas.height = height
		dupCanvas.getContext('2d').drawImage(
			this.canvas,
			0, 0, this.canvas.width, this.canvas.height,
			0, 0, width, height
		)

		return dupCanvas.toDataURL('image/jpg')
	}

	clear (dirty = false) {
		this.signaturePad.clear()
		this._dirty = dirty
		this.dispatchDirtyEvent()
	}

	isDirty () {
		this._dirty = true
		this.dispatchDirtyEvent()
	}

	resizeCanvas (isResponsive = this._isResponsive) {
		if (!isResponsive) return

		const ratio = Math.max(this.global.devicePixelRatio || 1, 1)
		const width = this.offsetWidth * ratio
		const height = this.offsetHeight * ratio
		const dataURL = this.dataURL(width, height)

		this.canvas.width = width
		this.canvas.height = height
		this.canvas.getContext('2d').scale(ratio, ratio)
		this.clear(this.dirty)

		this.signaturePad.fromDataURL(dataURL)
	}

	// --------------------------------------------------------------------------
	/** @returns {boolean} */
	get dirty () {
		return this._dirty
	}

	/** @returns {boolean} */
	get _isResponsive () {
		return this.hasAttribute('responsive')
	}

	dispatchDirtyEvent () {
		this.dispatchEvent(
			new CustomEvent('signature:dirty', {
				bubbles: true,
				detail: {
					dirty: this.dirty
				}
			})
		)
	}

	/** @returns {HTMLCanvasElement} */
	get canvas () {
		return this.querySelector('[data-signature-pad]')
	}
}
customElements.define('ark-signature', Signature)
