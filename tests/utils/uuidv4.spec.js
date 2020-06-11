import { uuidv4 } from '../../src/utils/uuidv4'

describe('Slots', () => {
	it('groups separated by dashes', () => {
		const uuid = uuidv4()
		expect(uuid.split('-').length === 5).toBeTruthy()
	})

	it('total digits == 32', () => {
		const uuid = uuidv4()

		let digits = ''
		uuid.split('-').forEach(element => {
			digits += element
		})

		expect(digits.length === 32).toBeTruthy()
	})
})
