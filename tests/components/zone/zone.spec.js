import { Zone } from '../../../src/components/zone/components/zone'

describe('Zone', () => {
	it('can be instantiated', () => {
		const zone = new Zone().init({
			rows: 3,
			cols: 4
		})

		let start = { x: 0, y: 1 }
		let end = { x: 2, y: 0 }

		let changePosition = zone._getChangePosition(start, end)
		expect(changePosition.x).toEqual(2)
		expect(changePosition.y).toEqual(-1)

		let absolutePosition = zone._getAbsolutePosition(
			{ x: 0, y: 1 },
			changePosition
		)

		expect(absolutePosition.x).toEqual(2)
		expect(absolutePosition.y).toEqual(0)

		absolutePosition = zone._getAbsolutePosition({ x: 0, y: 2 }, changePosition)

		expect(absolutePosition.x).toEqual(2)
		expect(absolutePosition.y).toEqual(1)

		// -------------------------------------------------------------------------
		// -------------------------------------------------------------------------

		start = { x: 1, y: 3 }
		end = { x: 0, y: 1 }

		changePosition = zone._getChangePosition(start, end)
		expect(changePosition.x).toEqual(-1)
		expect(changePosition.y).toEqual(-2)

		absolutePosition = zone._getAbsolutePosition({ x: 1, y: 3 }, changePosition)

		expect(absolutePosition.x).toEqual(0)
		expect(absolutePosition.y).toEqual(1)

		absolutePosition = zone._getAbsolutePosition({ x: 2, y: 3 }, changePosition)

		expect(absolutePosition.x).toEqual(1)
		expect(absolutePosition.y).toEqual(1)

		absolutePosition = zone._getAbsolutePosition({ x: 1, y: 2 }, changePosition)

		expect(absolutePosition.x).toEqual(0)
		expect(absolutePosition.y).toEqual(0)

		// -------------------------------------------------------------------------
		// -------------------------------------------------------------------------

		start = { x: 2, y: 1 }
		end = { x: 0, y: 0 }

		changePosition = zone._getChangePosition(start, end)
		expect(changePosition.x).toEqual(-2)
		expect(changePosition.y).toEqual(-1)

		// -------------------------------------------------------------------------
		// -------------------------------------------------------------------------

		start = { x: 2, y: 0 }
		end = { x: 0, y: 3 }

		changePosition = zone._getChangePosition(start, end)
		expect(changePosition.x).toEqual(-2)
		expect(changePosition.y).toEqual(3)
	})
})
