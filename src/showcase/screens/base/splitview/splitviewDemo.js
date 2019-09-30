/**
 * @typedef {import('../../loader').Splitview} Splitview
 * @typedef {import('../../loader').List} List
 **/

import './detail.example'

import { Component } from '../../loader'

export class SplitviewDemo extends Component {
	init (context) {
		this.type = context['type'] || 'ark'
		return super.init()
	}

	render () {
		this.innerHTML = /* html */ `
      <ark-splitview detail-percentage="30">

        <ark-splitview-master master-event="list:selected">
          <ark-list></ark-list>
        </ark-splitview-master>

        <ark-splitview-detail>
          <ark-detail-example></ark-detail-example>
        </ark-splitview-detail>

      </ark-splitview>
    `

		this.initSplitview()
		this.initList()

		return super.render()
	}

	get splitview () {
		return /** @type {Splitview} */ (this.select('ark-splitview'))
	}

	initSplitview () {
		this.splitview.init({
			title: 'Resultados',
			backButtonIcon: () => {
				return /* html */ `<ark-icon name='fas fa-ad'></ark-icon>`
			}
		}).render()
	}

	initList () {
		const template = item => /* html */ `
      <h1>${item.year}</h1>
      <span data-first>FIRST: ${item.first}</span>
      <span> | </span>
      <span data-second>SECOND: ${item.second}</span>
    `

		const source = [
			{ first: 'Colombia', second: 'Argentina', year: 2016 },
			{ first: 'Uruguay', second: 'Colombia', year: 2017 },
			{ first: 'Brasil', second: 'Argentina', year: 2018 },
			{ first: 'Perú', second: 'Bolivia', year: 2019 }
		]

		const list = /** @type {List} */ (this.splitview.master.select('ark-list'))
		list
			.init({
				source: source,
				template: template
			})
			.render()
	}
}
customElements.define('demo-splitview', SplitviewDemo)
