/**
 * @typedef {import('../../loader').List} List
 */
import { Component } from '../../loader'

export class ListDemo extends Component {
	init (context) {
		this.type = context['type'] || 'ark'
		return super.init({})
	}

	render () {
		this.innerHTML = /* html */ `
      <h1>Default List</h1>

      <ark-list data-default-list click-disabled></ark-list>

      <h1>Template List <span data-template-selected></span></h1>

      <ark-list data-template-list listen
        on-list:selected="onTemplateListSelected" default></ark-list>


      <p>Atributos:</p>
      <ul>
        <li>default</li>
        <li>no-borders</li>
      </ul>
    `

		return super.render()
	}

	load () {
		const sourceDefault = ['Colombia', 'Uruguay', 'Brasil', 'Perú']

		// DEFAULT LIST

		const defaultList = this.select('[data-default-list]')
		defaultList
			.init({
				source: sourceDefault
			})
			.render()

		// TEMPLATE LIST

		const sourceTemplate = [
			{ first: 'Colombia', second: 'Argentina', year: 2016 },
			{ first: 'Uruguay', second: 'Colombia', year: 2017 },
			{ first: 'Brasil', second: 'Argentina', year: 2018 },
			{ first: 'Perú', second: 'Bolivia', year: 2019 }
		]

		const template = item => /* html */ `
      <h1>${item.year}</h1>
      <span data-first>FIRST: ${item.first}</span>
      <span> | </span>
      <span data-second>SECOND: ${item.second}</span>
    `

		const templateList = /** @type {List} */ (this.select(
			'[data-template-list]'
		))
		templateList
			.init({
				source: sourceTemplate,
				template: template
			})
			.render()

		return super.load()
	}

	onTemplateListSelected (event) {
		const detail = event['detail']

		const index = detail.index
		const data = detail.data

		this.select('[data-template-selected]').innerText = `
      [${index}]    ${data.year} - ${data.first}
    `.trim()
	}
}
customElements.define('demo-list', ListDemo)