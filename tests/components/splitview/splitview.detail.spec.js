import { Button } from '../../../src/components/button'
import {
	SplitviewDetail
} from '../../../src/components/splitview/components/detail'

describe('SplitviewDetail', () => {
	it('can be instantiated', () => {
		const detail = new SplitviewDetail()
		detail.init()
		detail.connectedCallback()
		expect(detail.outerHTML.trim().length).toBeTruthy()
	})

	it('can be instantiated with elements', () => {
		const detail = new SplitviewDetail()

		const button = new Button()
		button.connectedCallback()

		detail.append(button)
		detail.init({}).render()
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
			backButtonIcon: () => /* html */ `<span data-button>icon</span>`
		})
		detail.render()

		expect(
			detail.querySelector(
				'[data-master-title]'
			).textContent.trim() === 'my title'
		).toBeTruthy()

		expect(
			detail.querySelector('[data-button]').textContent.trim() === 'icon'
		).toBeTruthy()
	})
})
