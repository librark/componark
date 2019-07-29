import { SplitviewDetail } from '../../../src/components/splitview/components/detail'

describe('SplitviewDetail', () => {
	it('can be instantiated', () => {
		const detail = new SplitviewDetail()
		detail.init({})
		detail.connectedCallback()
		expect(detail.outerHTML.trim().length).toBeTruthy()
	})

	it('can be instantiated with defaultTemplate attribute', () => {
		const detail = new SplitviewDetail()
		detail.init({
			defaultTemplate: () => /* html */ `<span data-default>default</span>`
		})
		detail.connectedCallback()

		expect(detail.querySelector('[data-default]').textContent.trim()).toBe(
			'default'
		)
	})

	it('can be remove the hidden attribute', () => {
		const detail = new SplitviewDetail()
		detail.init({})
		detail.connectedCallback()

		detail.show()
		expect(!detail.hasAttribute('hidden')).toBeTruthy()

		detail.hide()
		expect(detail.hasAttribute('hidden')).toBeTruthy()

		detail.toggle()
		expect(!detail.hasAttribute('hidden')).toBeTruthy()

		detail.toggle()
		expect(detail.hasAttribute('hidden')).toBeTruthy()
	})

	it('can be instantiated with attribute', () => {
		const detail = new SplitviewDetail().init({
			title: 'my title',
			data: 'ok',
			template: data => /* html */ `<span data-data>${data}</span>`,
			backButtonIcon: () => /* html */ `<span data-button>icon</span>`
		})
		detail.render()

		expect(
			detail.querySelector('[data-master-title]').textContent.trim() ===
        'my title'
		).toBeTruthy()

		expect(
			detail.querySelector('[data-data]').textContent.trim() === 'ok'
		).toBeTruthy()

		expect(
			detail.querySelector('[data-button]').textContent.trim() === 'icon'
		).toBeTruthy()
	})
})
