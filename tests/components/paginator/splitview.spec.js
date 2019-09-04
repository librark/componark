import { Paginator } from '../../../src/components/paginator'

/**
 * @typedef {import('../../../src/components').Paginator} Paginator
 **/

describe('Paginator', () => {
	it('get collection Length', () => {
		const paginator = new Paginator()
		paginator.init()

		paginator.init({
			collectionSize: 100,
			pageSize: 10
		})

		// @ts-ignore
		expect(paginator._collectionLength).toBe(10)

		paginator.init({
			collectionSize: 105,
			pageSize: 10
		})

		// @ts-ignore
		expect(paginator._collectionLength).toBe(11)

		paginator.init({
			collectionSize: 96,
			pageSize: 10
		})

		// @ts-ignore
		expect(paginator._collectionLength).toBe(10)

		paginator
			.init({
				collectionSize: 0,
				pageSize: 10
			})
			.render()

		// @ts-ignore
		expect(paginator._collectionLength).toBe(0)

		paginator
			.init({
				collectionSize: 3,
				pageSize: 10
			})
			.render()

		// @ts-ignore
		expect(paginator._collectionLength).toBe(1)
	})

	it('can render buttons', () => {
		const paginator = new Paginator()

		paginator
			.init({
				collectionSize: 101,
				pageSize: 10
			})
			.render()

		// @ts-ignore
		expect(paginator._collectionLength).toBe(11)

		let buttons = paginator.querySelectorAll('[data-button-list] button')
		expect(buttons[0].id).toBe('1')
		expect(buttons[buttons.length - 1].id).toBe('5')

		// @ts-ignore
		paginator._setCurrentPage(2)
		buttons = paginator.querySelectorAll('[data-button-list] button')
		expect(buttons[0].id).toBe('1')
		expect(buttons[buttons.length - 1].id).toBe('5')

		// @ts-ignore
		paginator._setCurrentPage(5)
		buttons = paginator.querySelectorAll('[data-button-list] button')
		expect(buttons[0].id).toBe('3')
		expect(buttons[buttons.length - 1].id).toBe('7')

		// @ts-ignore
		paginator._setCurrentPage(10)
		buttons = paginator.querySelectorAll('[data-button-list] button')
		expect(buttons[0].id).toBe('7')
		expect(buttons[buttons.length - 1].id).toBe('11')
	})

	it('can change buttons', () => {
		const paginator = new Paginator()

		paginator
			.init({
				collectionSize: 101,
				pageSize: 10
			})
			.render()

		// @ts-ignore
		expect(paginator._collectionLength).toBe(11)

		// @ts-ignore
		paginator._setCurrentPage(12)
		expect(paginator['currentPage']).toBe(1)

		let buttons = paginator.querySelectorAll('[data-button-list] button')
		expect(buttons[0].id).toBe('1')
		expect(buttons[buttons.length - 1].id).toBe('5')

		// @ts-ignore
		buttons[buttons.length - 1].click()

		buttons = paginator.querySelectorAll('[data-button-list] button')
		expect(buttons[0].id).toBe('3')
		expect(buttons[buttons.length - 1].id).toBe('7')
	})

	it('can change with default buttons', () => {
		const paginator = new Paginator()

		paginator
			.init({
				collectionSize: 101,
				pageSize: 10
			})
			.render()

		// @ts-ignore
		expect(paginator._collectionLength).toBe(11)

		// @ts-ignore
		paginator._last(new CustomEvent('click'))
		let button = paginator.querySelector('[data-button-list] [active]')
		expect(button.id).toBe('11')

		// @ts-ignore
		paginator._next(new CustomEvent('click'))
		button = paginator.querySelector('[data-button-list] [active]')
		expect(button.id).toBe('11')

		// @ts-ignore
		paginator._prev(new CustomEvent('click'))
		button = paginator.querySelector('[data-button-list] [active]')
		expect(button.id).toBe('10')

		// @ts-ignore
		paginator._first(new CustomEvent('click'))
		button = paginator.querySelector('[data-button-list] [active]')
		expect(button.id).toBe('1')

		// @ts-ignore
		paginator._prev(new CustomEvent('click'))
		button = paginator.querySelector('[data-button-list] [active]')
		expect(button.id).toBe('1')

		// @ts-ignore
		paginator._next(new CustomEvent('click'))
		button = paginator.querySelector('[data-button-list] [active]')
		expect(button.id).toBe('2')
	})
})
