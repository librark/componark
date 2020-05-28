/** @typedef {import('../../../src/components').List} List */
import { List } from '../../../src/components/list'

describe('List', () => {
	it('can be instantiated', () => {
		const list = new List()
		list.connectedCallback()
		expect(list.outerHTML).toEqual('<ark-list></ark-list>')

		list.init()
		list.render()

		const event = new CustomEvent('click')
		// @ts-ignore
		list._onSelected(event)

		list.setAttribute('click-disabled', '')

		// @ts-ignore
		list._onSelected(event)
	})

	it('can be instantiated with items', async () => {
		const context = {
			source: ['Colombia', 'Uruguay', 'Brasil', 'Perú']
		}

		const list = new List()
		await list.init(context).render()

		const items = list.selectAll('ark-list-item')

		expect(items.length).toEqual(4)
		expect(items[0].textContent.trim()).toEqual('Colombia')
		expect(items[1].textContent.trim()).toEqual('Uruguay')
		expect(items[2].textContent.trim()).toEqual('Brasil')
		expect(items[3].textContent.trim()).toEqual('Perú')
	})

	it('can be instantiated with items click-disabled', async () => {
		const context = {
			source: ['Colombia', 'Uruguay', 'Brasil', 'Perú']
		}

		const list = new List()
		list.setAttribute('click-disabled', '')
		list.init(context).render()

		const items = list.selectAll('ark-list-item')

		expect(items.length).toEqual(4)
		expect(items[0].textContent.trim()).toEqual('Colombia')
		expect(items[1].textContent.trim()).toEqual('Uruguay')
		expect(items[2].textContent.trim()).toEqual('Brasil')
		expect(items[3].textContent.trim()).toEqual('Perú')
	})

	it('can delete', async () => {
		const context = {
			source: ['Colombia', 'Uruguay', 'Brasil', 'Perú']
		}

		const list = new List()
		list.setAttribute('click-disabled', '')
		await list.init(context).render()

		let items = list.selectAll('ark-list-item')

		expect(items.length).toEqual(4)
		expect(items[0].textContent.trim()).toEqual('Colombia')
		expect(items[1].textContent.trim()).toEqual('Uruguay')
		expect(items[2].textContent.trim()).toEqual('Brasil')
		expect(items[3].textContent.trim()).toEqual('Perú')

		list.delete(1)
		items = list.selectAll('ark-list-item')
		expect(items.length).toEqual(3)
		expect(items[1].textContent.trim()).toEqual('Brasil')

		list.delete(0, 2)
		items = list.selectAll('ark-list-item')
		expect(items.length).toEqual(1)
		expect(items[0].textContent.trim()).toEqual('Perú')
	})

	it('can be instantiated with items', () => {
		const context = {
			source: ['Colombia', 'Uruguay', 'Brasil', 'Perú']
		}

		const list = new List()
		list.init(context).render()

		const items = list.selectAll('ark-list-item')
		expect(items.length).toEqual(4)

		list.addEventListener('list:selected', event => {
			expect(event.detail.data).toEqual('Brasil')
		})

		items[2].click()
	})

	it('can select an item when it is clicked', () => {
		const context = {
			source: ['Colombia', 'Uruguay', 'Brasil', 'Perú']
		}

		const list = new List()
		list.init(context).render()

		const items = list.selectAll('ark-list-item')
		expect(items.length).toEqual(4)

		list.addEventListener('list:selected', event => {
			expect(event.detail.data).toEqual('Brasil')
		})
		items[2].click()
	})
})
