import { RadioButton, RadioGroup } from '../../../src/components/radio'

describe('RadioGroup', () => {
	it('can be instantiated', () => {
		const radio1 = new RadioButton()
		radio1.connectedCallback()
		radio1.innerHTML = 'op1'
		radio1.init().render()

		const radio2 = new RadioButton()
		radio2.connectedCallback()
		radio2.innerHTML = 'op2'
		radio2.init().render()

		const radio3 = new RadioButton()
		radio3.connectedCallback()
		radio3.innerHTML = 'op3'
		radio3.init().render()

		const group = new RadioGroup()
		group.innerHTML = ''
		group.appendChild(radio1)
		group.appendChild(radio2)
		group.appendChild(radio3)
		// group.init().render().load()

		radio1.click()
	})

	// it('can be instantiated', () => {
	// 	const element = /** @type {RadioGroup} */ (
	// 		document.createElement('ark-radio-group'))
	// 	expect(element).toBeTruthy()

	// 	// var init = element.init({})
	// 	// expect(element === init).toBeTruthy()
	// })

	// it('can be instantiated', () => {
	// 	const element = new RadioGroup()
	// 	element.setAttribute('label', 'my group')
	// 	element.connectedCallback()

	// 	const label = element.querySelector('[data-radio-group-label]')
	// 	expect(label.textContent.trim()).toEqual('my group')
	// 	expect(!element.value.trim().length).toBeTruthy()
	// })

	// it('returns selected values', () => {
	// 	const group = new RadioGroup()

	// 	const radio1 = new RadioButton()
	// 	radio1.value = 'op1'
	// 	radio1.init().render().load()

	// 	const radio2 = new RadioButton()
	// 	radio2.value = 'op2'
	// 	radio2.init().render().load()

	// 	// @ts-ignore
	// 	group.defaultContent = null
	// 	group.appendChild(radio1)
	// 	group.appendChild(radio2)
	// 	group.load()

	// 	expect(!group.value.trim().length).toBeTruthy()

	// 	// @ts-ignore
	// 	group._checkButtons('op1')
	// 	expect(group.value).toEqual('op1')

	// 	radio2.click()
	// 	expect(group.value).toEqual('op2')
	// })
})
