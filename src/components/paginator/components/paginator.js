import { Component } from '../../component'

export class Paginator extends Component {
	init (context = {}) {
		this.collectionSize = context['collectionSize']
		this.currentPage = context['currentPage'] || 1
		this.pageSize = context['pageSize'] || 24

		// Local Variables
		this.global = document

		return super.init()
	}

	render () {
		this.innerHTML = /* html */ `
      <div class="ark-paginator__body">
        <div class="ark-paginator__default-buttons">
          <button listen on-click="_prev"><</button>
          <button listen on-click="_first"><<</button>
        </div>
        <div class="ark-paginator__button-list" data-button-list></div>
        <div class="ark-paginator__default-buttons">
          <button listen on-click="_last">>></button>
          <button listen on-click="_next">></button>
        </div>
      </div>
      <div class="ark-paginator__footer">
        <small data-info></small>
      </div>
    `

		this._renderButtons()
		return super.render()
	}

	_renderButtons (init = this.currentPage) {
		const list = this.querySelector('[data-button-list]')
		while (list.firstChild) list.removeChild(list.firstChild)

		const numberButtons =
      this._collectionLength < 5 ? this._collectionLength : 5

		if (init - 2 <= 0) {
			init = 1
		} else if (init + 2 >= this._collectionLength) {
			init = this._collectionLength - numberButtons + 1
		} else {
			init = init - 2
		}

		for (let index = init; index < init + numberButtons; index++) {
			const button = this.global.createElement('button')
			button.innerText = index.toString()
			button.id = index.toString()
			button.addEventListener('click', event => {
				this._setCurrentPage(parseInt(event.target['id']))
			})
			if (index === this.currentPage) button.setAttribute('active', '')

			list.append(button)
		}

		this._setDataInfo()
		this._pageChange()
	}

	_setDataInfo () {
		const currentPage = this._collectionLength ? this.currentPage : 0
		this.querySelector('[data-info]').innerHTML = /* html */ `
      Página ${currentPage} de ${this._collectionLength}
    `
	}

	_pageChange () {
		const offset = (this.currentPage - 1) * this.pageSize

		this.dispatchEvent(
			new CustomEvent('page-change', {
				detail: {
					offset: offset,
					limit: offset + this.pageSize
				}
			})
		)
	}

	/** @param {number} currentPage */
	_setCurrentPage (currentPage) {
		if (currentPage > 0 && currentPage <= this._collectionLength) {
			this.currentPage = currentPage
			this._renderButtons()
		}
	}

	/** @param {Event} event */
	_first (event) {
		event.stopImmediatePropagation()
		this._setCurrentPage(1)
	}

	/** @param {Event} event */
	_prev (event) {
		event.stopImmediatePropagation()
		this._setCurrentPage(this.currentPage - 1)
	}

	/** @param {Event} event */
	_last (event) {
		event.stopImmediatePropagation()
		this._setCurrentPage(this._collectionLength)
	}

	/** @param {Event} event */
	_next (event) {
		event.stopImmediatePropagation()
		this._setCurrentPage(this.currentPage + 1)
	}

	get _collectionLength () {
		return Math.ceil(this.collectionSize / this.pageSize) || 0
	}
}
customElements.define('ark-paginator', Paginator)
