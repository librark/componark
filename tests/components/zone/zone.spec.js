import {
	EventAlterZone,
	Zone
} from '../../../src/components/zone/components/zone'

import {
	DragZone
} from '../../../src/components/zone/components/drag'
import {
	DropZone
} from '../../../src/components/zone/components/drop'

describe('Zone', () => {
	it('can calculate the absolute position', () => {
		const zone = new Zone()
		zone.init().render().load()
	})

	it('EventAlterZone', () => {
		const eventAlterZone = new EventAlterZone('MOVE')

		const zone = new Zone()

		zone.addEventListener('zone:alter', event => {
			const detail = event.detail

			expect(!detail['value'].length).toBeTruthy()
			expect(detail['type']).toEqual('MOVE')
		})

		eventAlterZone.dispatch(zone)
	})

	it('EventAlterZone', () => {
		const eventAlterZone = new EventAlterZone('MOVE')

		const zone = new Zone()

		zone.addEventListener('zone:alter', event => {
			const detail = event.detail

			expect(detail['type']).toEqual('MOVE')
			expect(detail['value'].length).toBeTruthy()
			expect(detail['value'][0].drags.length).toEqual(3)
			expect(detail['value'][1].drags.length).toEqual(1)
		})

		const drop1 = new DropZone()

		eventAlterZone.setItem(drop1, new DragZone())
		eventAlterZone.setItem(drop1, new DragZone())
		eventAlterZone.setItem(drop1, new DragZone())

		const drop2 = new DropZone()
		eventAlterZone.setItem(drop2, new DragZone())

		eventAlterZone.dispatch(zone)
	})

	it('get Parent Drop', () => {
		const zone = new Zone()

		const div = document.createElement('div')
		const drag = new DragZone()
		drag.appendChild(div)

		expect(!zone._getParentDrop(div)).toBeTruthy()

		const drop = new DropZone()
		drop.appendChild(drag)

		expect(zone._getParentDrop(div).id).toEqual(drop.id)

		expect(!zone._getParentDrop(null)).toBeTruthy()

		expect(zone._getParentDrop(drop).id).toEqual(drop.id)
	})

	it('clean Drop StartDropEnd', () => {
		const zone = new Zone()
		const drop = new DropZone()
		zone.dropStart = zone.dropEnd = drop

		expect(zone.dropStart.id).toEqual(drop.id)
		expect(zone.dropEnd.id).toEqual(drop.id)

		zone._cleanDropStartDropEnd()
		expect(!zone.dropStart).toBeTruthy()
		expect(!zone.dropEnd).toBeTruthy()
	})

	it('clean Selected Drags', () => {
		const zone = new Zone()

		const drag1 = new DragZone()
		drag1.selected = true

		const drag2 = new DragZone()
		drag2.selected = true

		const drag3 = new DragZone()
		drag3.selected = true

		const drag4 = new DragZone()

		zone.appendChild(drag1)
		zone.appendChild(drag2)
		zone.appendChild(drag3)
		zone.appendChild(drag4)

		expect(zone.getSelectedDrags().length).toBeTruthy()

		zone._cleanSelectedDrags()

		expect(!zone.getSelectedDrags().length).toBeTruthy()
	})
})
