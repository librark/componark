import { DragZone } from '../../../src/components/zone/components/drag'
import { DropZone } from '../../../src/components/zone/components/drop'
import { Zone } from '../../../src/components/zone/components/zone'

describe('Zone', () => {
	it('can calculate the absolute position', () => {
		const zone = new Zone().init({
			rows: 3,
			cols: 4
		})

		let start = { x: 0, y: 1 }
		let end = { x: 2, y: 0 }

		// @ts-ignore
		let changePosition = zone._getChangePosition(start, end)
		expect(changePosition.x).toEqual(2)
		expect(changePosition.y).toEqual(-1)

		// @ts-ignore
		let absolutePosition = zone._getAbsolutePosition(
			{ x: 0, y: 1 },
			changePosition
		)

		expect(absolutePosition.x).toEqual(2)
		expect(absolutePosition.y).toEqual(0)

		// @ts-ignore
		absolutePosition = zone._getAbsolutePosition({ x: 0, y: 2 }, changePosition)

		expect(absolutePosition.x).toEqual(2)
		expect(absolutePosition.y).toEqual(1)

		// -------------------------------------------------------------------------
		// -------------------------------------------------------------------------

		start = { x: 1, y: 3 }
		end = { x: 0, y: 1 }

		// @ts-ignore
		changePosition = zone._getChangePosition(start, end)
		expect(changePosition.x).toEqual(-1)
		expect(changePosition.y).toEqual(-2)

		// @ts-ignore
		absolutePosition = zone._getAbsolutePosition({ x: 1, y: 3 }, changePosition)

		expect(absolutePosition.x).toEqual(0)
		expect(absolutePosition.y).toEqual(1)

		// @ts-ignore
		absolutePosition = zone._getAbsolutePosition({ x: 2, y: 3 }, changePosition)

		expect(absolutePosition.x).toEqual(1)
		expect(absolutePosition.y).toEqual(1)

		// @ts-ignore
		absolutePosition = zone._getAbsolutePosition({ x: 1, y: 2 }, changePosition)

		expect(absolutePosition.x).toEqual(0)
		expect(absolutePosition.y).toEqual(0)

		// -------------------------------------------------------------------------
		// -------------------------------------------------------------------------

		start = { x: 2, y: 1 }
		end = { x: 0, y: 0 }

		// @ts-ignore
		changePosition = zone._getChangePosition(start, end)
		expect(changePosition.x).toEqual(-2)
		expect(changePosition.y).toEqual(-1)

		// -------------------------------------------------------------------------
		// -------------------------------------------------------------------------

		start = { x: 2, y: 0 }
		end = { x: 0, y: 3 }

		// @ts-ignore
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

		const drag0 = new DragZone()
		drag0.selected = true

		const drag1 = new DragZone()

		const drop0 = new DropZone()
		drop0.append(drag0)
		drop0.append(drag1)

		const drop1 = new DropZone()

		const zone = new Zone()
		zone.append(drop0)
		zone.append(drop1)

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
		const zone = new Zone()

		const event = new CustomEvent('zone:selected', { detail: {
			zoneId: zone.id
		} })

		zone.connectedCallback()

		zone.onZoneSelected(event)
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

		zone.addEventListener('click', event => {
			zone.onDragClicked(event)
		})

		zone.click()
	})

	it('_selectDrop', () => {
		const zone = new Zone()
		const drop = new DropZone()

		zone.append(drop)
		zone.connectedCallback()

		const selectDrop = zone._selectDrop(0, 0)
		expect(selectDrop['id']).toEqual(drop.id)
	})

	it('_assignPosition', () => {
		const zone = new Zone()
		const drop0 = new DropZone()
		const drop1 = new DropZone()
		const drop2 = new DropZone()
		const drop3 = new DropZone()

		zone.append(drop0)
		zone.append(drop1)
		zone.append(drop2)
		zone.append(drop3)

		zone.setAttribute('cols', '2')
		zone.setAttribute('rows', '2')

		zone.connectedCallback()

		const drops = zone.selectAll('ark-zone-drop')

		expect(drops[0]['x']).toEqual('0')
		expect(drops[0]['y']).toEqual('0')

		expect(drops[1]['x']).toEqual('0')
		expect(drops[1]['y']).toEqual('1')

		expect(drops[2]['x']).toEqual('1')
		expect(drops[2]['y']).toEqual('0')

		expect(drops[3]['x']).toEqual('1')
		expect(drops[3]['y']).toEqual('1')
	})

	it('clearSelected', () => {
		const zone = new Zone()
		const drop0 = new DropZone()

		const drag0 = new DragZone()
		const drag1 = new DragZone()
		const drag2 = new DragZone()

		drop0.append(drag0)
		drop0.append(drag1)
		drop0.append(drag2)

		zone.append(drop0)

		zone.connectedCallback()

		drag0.selected = true
		expect(drag0.selected).toBeTruthy()

		drag1.selected = true
		expect(drag1.selected).toBeTruthy()

		expect(!drag2.selected).toBeTruthy()

		zone.clearSelected()

		expect(!drag0.selected).toBeTruthy()
		expect(!drag1.selected).toBeTruthy()
		expect(!drag2.selected).toBeTruthy()
	})

	it('can move drags', () => {
		const zone = new Zone()
		const event = new CustomEvent('click', { detail: {
			drop: new DropZone(),
			drags: [new DragZone(), new DragZone()],
			dragstart: new DragZone()
		} })
		zone.onZoneDrop(event)
	})

	it('can move onZoneDrag', () => {
		const zone = new Zone()

		const drop = new DropZone()
		zone.append(drop)

		const drag = new DragZone()
		drop.append(drag)

		const event = new CustomEvent('click', { detail: {
			drop: drop,
			drags: [new DragZone(), new DragZone()],
			referenceDrag: drag
		} })
		zone.onZoneDrag(event)
	})

	it('can move onZoneDrag', () => {
		const zone = new Zone()
		const event = new CustomEvent('click')
		zone.onZoneDrag(event)
		zone.onDragClicked(event)
	})

	it('can copy onZoneDrag', () => {
		const zone = new Zone()
		const event = new CustomEvent('click', { detail: {
			drop: new DropZone(),
			drags: [new DragZone(), new DragZone()],
			copy: true
		} })
		zone.onZoneDrag(event)
	})

	it('can move drags', () => {
		const zone = new Zone()

		const drop0 = new DropZone()
		const drop1 = new DropZone()
		const drop2 = new DropZone()
		const drop3 = new DropZone()

		const drag1 = new DragZone()
		const drag2 = new DragZone()
		const drag3 = new DragZone()

		drop0.append(drag1)
		drop0.append(drag2)
		drop0.append(drag3)

		zone.append(drop0)
		zone.append(drop1)
		zone.append(drop2)
		zone.append(drop3)

		zone.setAttribute('cols', '2')
		zone.setAttribute('rows', '2')

		zone.connectedCallback()

		drop0.updateDragPosition()

		const event = new CustomEvent('click', {})
		event['dataTransfer'] = {
			types: [],
			clearData: _ => {},
			setData: _ => {}
		}
		zone.onZoneDrop(event)

		zone.zoneDrop(drop1, [drag1, drag2], drag1)

		const drags = drop1.selectAll('ark-zone-drag')
		expect(drags[0].id).toEqual(drag1.id)
		expect(drags[1].id).toEqual(drag2.id)
	})

	it('can copy drags', () => {
		const zone = new Zone()

		const drop0 = new DropZone()
		const drop1 = new DropZone()
		const drop2 = new DropZone()
		const drop3 = new DropZone()

		const drag1 = new DragZone()
		const drag2 = new DragZone()
		const drag3 = new DragZone()

		drop0.append(drag1)
		drop0.append(drag2)
		drop0.append(drag3)

		zone.append(drop0)
		zone.append(drop1)
		zone.append(drop2)
		zone.append(drop3)

		zone.setAttribute('cols', '2')
		zone.setAttribute('rows', '2')

		zone.connectedCallback()

		drop0.updateDragPosition()

		const event = new CustomEvent('click', {})
		event['dataTransfer'] = {
			types: [],
			clearData: _ => {},
			setData: _ => {}
		}
		zone.onZoneDrop(event)

		expect(!drop1.selectAll('ark-zone-drag').length).toBeTruthy()

		zone.zoneDrop(drop1, [drag1, drag2], drag1, true)

		expect(drop1.selectAll('ark-zone-drag').length).toBeTruthy()
		expect(drop0.selectAll('ark-zone-drag').length).toEqual(3)
	})

	it('can copy drags', () => {
		const zone = new Zone()

		const drop0 = new DropZone()
		const drop1 = new DropZone()

		const drag1 = new DragZone()
		const drag2 = new DragZone()
		const drag3 = new DragZone()

		drop0.append(drag1)
		drop0.append(drag2)
		drop0.append(drag3)

		zone.append(drop0)
		zone.connectedCallback()

		drop0.updateDragPosition()

		expect(!drop1.selectAll('ark-zone-drag').length).toBeTruthy()

		zone.zoneDrop(drop1, [drag1, drag2], drag1, true)

		expect(drop0.selectAll('ark-zone-drag').length).toEqual(3)
		expect(!drop1.selectAll('ark-zone-drag').length).toBeTruthy()
	})

	it('can move drags', () => {
		const zone = new Zone()

		const drop0 = new DropZone()

		const drag1 = new DragZone()
		const drag2 = new DragZone()
		const drag3 = new DragZone()

		drop0.append(drag1)
		drop0.append(drag2)
		drop0.append(drag3)

		zone.append(drop0)
		zone.connectedCallback()

		drop0.updateDragPosition()

		let drags =	zone.selectAll('ark-zone-drag')

		expect(drags[0].id).toEqual(drag1.id)

		zone.zoneDrag(drop0, [drag2, drag3], drag1)
		drags =	zone.selectAll('ark-zone-drag')

		expect(drags[0].id).toEqual(drag2.id)
	})

	it('can copy drags', () => {
		const zone = new Zone()

		const drop0 = new DropZone()

		const drag1 = new DragZone()
		const drag2 = new DragZone()
		const drag3 = new DragZone()

		drop0.append(drag1)
		drop0.append(drag2)
		drop0.append(drag3)

		zone.append(drop0)
		zone.connectedCallback()

		drop0.updateDragPosition()

		let drags =	zone.selectAll('ark-zone-drag')
		expect(drags.length).toEqual(3)

		zone.zoneDrag(drop0, [drag2, drag3], drag1, true)
		drags =	zone.selectAll('ark-zone-drag')

		expect(drags.length).toEqual(5)

		drag1.setAttribute('level', '0')
		drag2.setAttribute('level', '-1')

		zone.zoneDrag(drop0, [drag2, drag3], drag1)
	})
})
