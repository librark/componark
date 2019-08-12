import { Zone } from '../../../src/components/zone/components/zone'

describe('Zone', () => {
	it('can calculate the absolute position', () => {
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

	it('dragstart', () => {
		const event = new CustomEvent('dragstart', {})
		event['dataTransfer'] = {
			types: [],
			clearData: _ => {},
			setData: _ => {}
		}

		const zone = new Zone()
		zone.connectedCallback()

		zone.onDragstart(event)
	})

	it('zone:drop', () => {
		const event = new CustomEvent('zone:drop', {})
		event['dataTransfer'] = {
			types: [],
			clearData: _ => {},
			setData: _ => {}
		}

		const zone = new Zone()
		zone.connectedCallback()

		zone.onZoneDrop(event)
	})

	it('zone:selected', () => {
		const event = new CustomEvent('zone:selected', {})
		event['dataTransfer'] = {
			types: [],
			clearData: _ => {},
			setData: _ => {}
		}

		const zone = new Zone()
		zone.connectedCallback()

		zone.onZoneSelected(event)
	})

	it('click', () => {
		const event = new CustomEvent('click', {})
		event['dataTransfer'] = {
			types: [],
			clearData: _ => {},
			setData: _ => {}
		}

		const zone = new Zone()
		zone.connectedCallback()

		zone.onClick(event)
	})
})
