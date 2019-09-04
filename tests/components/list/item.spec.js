/** @typedef {import('../../../src/components').ListItem} ListItem */
import { ListItem } from '../../../src/components/list'

describe('List item', () => {
	it('can be instantiated', () => {
		const item = new ListItem()
		item.init()
		item.connectedCallback()
	})
	it('can be rendered with data', function () {
		const item = new ListItem()
		item.init({ data: 'my data' }).render()
		expect(item.innerHTML.trim()).toEqual('my data')

		item.setAttribute('click-disabled', '')

		const event = new CustomEvent('click')
		// @ts-ignore
		item._onSelected(event)
	})
	it('can be rendered with template', function () {
		const item = new ListItem()
		item
			.init({
				data: 'my data',
				template: data => /* html */ `<span>${data}</span>`
			})
			.render()
		expect(item.innerHTML.trim()).toEqual('<span>my data</span>')
	})
	it('can be rendered with template', function () {
		const item = new ListItem()
		item
			.init({
				data: 'my data',
				template: data => /* html */ `<span>${data}</span>`
			})
			.render()

		item.addEventListener('list-item:selected', event => {
			expect(event.detail.data).toEqual('my data')
		})
		item.click()
	})
})
