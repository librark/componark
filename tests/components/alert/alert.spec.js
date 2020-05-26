/** @typedef {import('../../../src/components').Alert} Alert */
import { Alert } from '../../../src/components/alert'

describe('Alert', () => {
	it('can be instantiated', () => {
		const alert = new Alert()
		alert.init()
		expect(alert).toBeTruthy()

		const init = alert.init({})
		expect(alert === init).toBeTruthy()

		expect(!alert['title']).toBeTruthy()
		expect(!alert['text']).toBeTruthy()
		expect(alert['horizontal']).toEqual('center')
		expect(alert['vertical']).toEqual('center')
		expect(alert['showConfirmButton']).toBeTruthy()
		expect(alert['confirmButtonText']).toEqual('Aceptar')
		expect(alert['confirmButtonBackground']).toEqual('primary')
		expect(alert['showCancelButton']).toBeTruthy()
		expect(alert['cancelButtonText']).toEqual('Cancelar')
		expect(alert['cancelButtonBackground']).toEqual('light')
	})

	it('can be instantiated', () => {
		const alert = new Alert()
		alert.connectedCallback()

		alert.init({
			title: 'Hola mundo',
			text: 'Contenido',
			horizontal: 'end',
			vertical: 'left',
			showConfirmButton: false,
			confirmButtonText: 'confirmButtonText',
			confirmButtonBackground: 'red',
			showCancelButton: false,
			cancelButtonText: 'cancelButtonText',
			cancelButtonBackground: 'blue'
		})

		expect(alert['title']).toEqual('Hola mundo')
		expect(alert['text']).toEqual('Contenido')
		expect(alert['horizontal']).toEqual('end')
		expect(alert['vertical']).toEqual('left')
		expect(!alert['showConfirmButton']).toBeTruthy()
		expect(alert['confirmButtonText']).toEqual('confirmButtonText')
		expect(alert['confirmButtonBackground']).toEqual('red')
		expect(!alert['showCancelButton']).toBeTruthy()
		expect(alert['cancelButtonText']).toEqual('cancelButtonText')
		expect(alert['cancelButtonBackground']).toEqual('blue')
	})

	it('parse Boolean Value', function () {
		const alert = new Alert()
		// @ts-ignore
		expect(alert._parseBooleanValue('')).toBeTruthy()
		// @ts-ignore
		expect(alert._parseBooleanValue('true')).toBeTruthy()
		// @ts-ignore
		expect(alert._parseBooleanValue(true)).toBeTruthy()
		// @ts-ignore
		expect(!alert._parseBooleanValue('false')).toBeTruthy()
		// @ts-ignore
		expect(!alert._parseBooleanValue(false)).toBeTruthy()
		// @ts-ignore
		expect(!alert._parseBooleanValue(undefined)).toBeTruthy()
		// @ts-ignore
		expect(!alert._parseBooleanValue(123)).toBeTruthy()
		// @ts-ignore
		expect(!alert._parseBooleanValue('123')).toBeTruthy()
	})

	it('can close from scrim event', function () {
		const div = document.createElement('div')

		/** @type {Alert} */
		const alert = Alert.launch({}, div)
		alert.render()

		alert.close()
		expect(!alert.hasAttribute('hidden')).toBeTruthy()

		alert.toggle()
		expect(alert.hasAttribute('hidden')).toBeTruthy()

		alert.toggle()
		expect(!alert.hasAttribute('hidden')).toBeTruthy()
	})

	it('can close from scrim event', function () {
		/** @type {Alert} */
		const alert = Alert.launch({
			title: 'hello',
			text: 'word',
			showCancelButton: true,
			showConfirmButton: true
		})
		alert.render()

		const cancel = alert.querySelector('[alert-cancel-button]')
		const confirm = alert.querySelector('[alert-confirm-button]')

		cancel.click()
		confirm.click()
	})

	it('can close from scrim event', function () {
		/** @type {Alert} */
		let alert = Alert.launch({
			title: 'hello',
			text: 'word',
			showCancelButton: true,
			showConfirmButton: true
		})
		alert.render()

		// @ts-ignore
		expect(alert._createConfirmButton()).toBeTruthy()

		alert = Alert.launch({
			title: 'hello',
			text: 'word',
			showCancelButton: false,
			showConfirmButton: false
		})
		alert.render()

		// @ts-ignore
		expect(!alert._createConfirmButton()).toBeTruthy()
	})
})
