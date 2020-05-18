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
		zone.disconnectedCallback()
	})

	it('EventAlterZone', () => {
		const eventAlterZone = new EventAlterZone('MOVE')

		const zone = new Zone()

		zone.addEventListener('zone:alter', event => {
			const detail = event.detail

			expect(!detail.value.length).toBeTruthy()
			expect(detail.action).toEqual('MOVE')
		})

		eventAlterZone.dispatch(zone)
	})

	it('EventAlterZone', () => {
		const eventAlterZone = new EventAlterZone('MOVE')

		const zone = new Zone()

		zone.addEventListener('zone:alter', event => {
			const detail = event.detail

			expect(detail.action).toEqual('MOVE')
			expect(detail.value.length).toBeTruthy()
			expect(detail.value[0].drags.length).toEqual(3)
			expect(detail.value[1].drags.length).toEqual(1)
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

	it('clean Selected Drops', () => {
		const zone = new Zone()

		const drop1 = new DropZone()
		drop1.fixed = true
		drop1.selected = true

		const drop2 = new DropZone()
		drop2.fixed = true
		drop2.selected = true

		const drop3 = new DropZone()

		zone.appendChild(drop1)
		zone.appendChild(drop2)
		zone.appendChild(drop3)

		expect(zone._getSelectedDrops().length).toEqual(2)

		zone._cleanSelectedDrops()

		expect(!zone._getSelectedDrops().length).toBeTruthy()
	})

	it('can Select Drops', () => {
		const zone = new Zone()

		const drag1 = new DragZone()
		drag1.setAttribute('value', '123')

		const drag2 = new DragZone()
		drag2.setAttribute('value', '123')

		const drag3 = new DragZone()

		zone.appendChild(drag1)
		zone.appendChild(drag2)
		zone.appendChild(drag3)

		expect(!zone.getSelectedDrags().length).toBeTruthy()

		zone.setSelectedDrags('[value="123"]', true)

		expect(zone.getSelectedDrags().length).toEqual(2)

		zone.setSelectedDrags('[value="123"]', false)

		expect(!zone.getSelectedDrags().length).toBeTruthy()
	})

	it('show Multiple Selection', () => {
		const zone = new Zone()

		const drop0 = new DropZone()
		drop0.cols = 3

		const drop1 = new DropZone()
		const drop2 = new DropZone()
		const drop3 = new DropZone()
		const drop4 = new DropZone()
		const drop5 = new DropZone()
		const drop6 = new DropZone()
		const drop7 = new DropZone()
		const drop8 = new DropZone()
		const drop9 = new DropZone()

		zone.appendChild(drop0)

		drop0.appendChild(drop1)
		drop0.appendChild(drop2)
		drop0.appendChild(drop3)

		drop0.appendChild(drop4)
		drop0.appendChild(drop5)
		drop0.appendChild(drop6)

		drop0.appendChild(drop7)
		drop0.appendChild(drop8)
		drop0.appendChild(drop9)

		drop0.init().render().load()
		drop1.init().render().load()
		drop2.init().render().load()
		drop3.init().render().load()
		drop4.init().render().load()
		drop5.init().render().load()
		drop6.init().render().load()
		drop7.init().render().load()
		drop8.init().render().load()
		drop9.init().render().load()

		zone.init().render().load()

		// -------------------------------------------------------------------------
		zone._showMultipleSelection()

		// -------------------------------------------------------------------------
		zone.dropStart = drop1
		zone.dropEnd = drop6

		zone._showMultipleSelection()

		let drops = zone._getSelectedDrops()
		expect(drops.length).toEqual(6)

		expect(drops.find(drop => drop === drop1)).toBeTruthy()
		expect(drops.find(drop => drop === drop2)).toBeTruthy()
		expect(drops.find(drop => drop === drop3)).toBeTruthy()
		expect(drops.find(drop => drop === drop4)).toBeTruthy()
		expect(drops.find(drop => drop === drop5)).toBeTruthy()
		expect(drops.find(drop => drop === drop6)).toBeTruthy()

		// -------------------------------------------------------------------------
		zone.dropStart = drop6
		zone.dropEnd = drop1

		zone._showMultipleSelection()

		drops = zone._getSelectedDrops()
		expect(drops.length).toEqual(6)

		expect(drops.find(drop => drop === drop1)).toBeTruthy()
		expect(drops.find(drop => drop === drop2)).toBeTruthy()
		expect(drops.find(drop => drop === drop3)).toBeTruthy()
		expect(drops.find(drop => drop === drop4)).toBeTruthy()
		expect(drops.find(drop => drop === drop5)).toBeTruthy()
		expect(drops.find(drop => drop === drop6)).toBeTruthy()

		// -------------------------------------------------------------------------
		zone.dropStart = drop3
		zone.dropEnd = drop7

		zone._showMultipleSelection()

		drops = zone._getSelectedDrops()
		expect(drops.length).toEqual(9)

		expect(drops.find(drop => drop === drop1)).toBeTruthy()
		expect(drops.find(drop => drop === drop2)).toBeTruthy()
		expect(drops.find(drop => drop === drop3)).toBeTruthy()
		expect(drops.find(drop => drop === drop4)).toBeTruthy()
		expect(drops.find(drop => drop === drop5)).toBeTruthy()
		expect(drops.find(drop => drop === drop6)).toBeTruthy()
		expect(drops.find(drop => drop === drop7)).toBeTruthy()
		expect(drops.find(drop => drop === drop8)).toBeTruthy()
		expect(drops.find(drop => drop === drop9)).toBeTruthy()

		// -------------------------------------------------------------------------
		zone.dropStart = drop7
		zone.dropEnd = drop3

		zone._showMultipleSelection()

		drops = zone._getSelectedDrops()
		expect(drops.length).toEqual(9)

		expect(drops.find(drop => drop === drop1)).toBeTruthy()
		expect(drops.find(drop => drop === drop2)).toBeTruthy()
		expect(drops.find(drop => drop === drop3)).toBeTruthy()
		expect(drops.find(drop => drop === drop4)).toBeTruthy()
		expect(drops.find(drop => drop === drop5)).toBeTruthy()
		expect(drops.find(drop => drop === drop6)).toBeTruthy()
		expect(drops.find(drop => drop === drop7)).toBeTruthy()
		expect(drops.find(drop => drop === drop8)).toBeTruthy()
		expect(drops.find(drop => drop === drop9)).toBeTruthy()

		// -------------------------------------------------------------------------
		zone.dropStart = drop2
		zone.dropEnd = drop8

		zone._showMultipleSelection()

		drops = zone._getSelectedDrops()
		expect(drops.length).toEqual(3)

		expect(drops.find(drop => drop === drop2)).toBeTruthy()
		expect(drops.find(drop => drop === drop5)).toBeTruthy()
		expect(drops.find(drop => drop === drop8)).toBeTruthy()

		// -------------------------------------------------------------------------
		zone.dropStart = drop8
		zone.dropEnd = drop2

		zone._showMultipleSelection()

		drops = zone._getSelectedDrops()
		expect(drops.length).toEqual(3)

		expect(drops.find(drop => drop === drop2)).toBeTruthy()
		expect(drops.find(drop => drop === drop5)).toBeTruthy()
		expect(drops.find(drop => drop === drop8)).toBeTruthy()

		// -------------------------------------------------------------------------
		zone.dropStart = drop4
		zone.dropEnd = drop6

		zone._showMultipleSelection()

		drops = zone._getSelectedDrops()
		expect(drops.length).toEqual(3)

		expect(drops.find(drop => drop === drop4)).toBeTruthy()
		expect(drops.find(drop => drop === drop5)).toBeTruthy()
		expect(drops.find(drop => drop === drop6)).toBeTruthy()

		// -------------------------------------------------------------------------
		zone.dropStart = drop6
		zone.dropEnd = drop4

		zone._showMultipleSelection()

		drops = zone._getSelectedDrops()
		expect(drops.length).toEqual(3)

		expect(drops.find(drop => drop === drop4)).toBeTruthy()
		expect(drops.find(drop => drop === drop5)).toBeTruthy()
		expect(drops.find(drop => drop === drop6)).toBeTruthy()

		zone.onMouseUp()
	})

	it('can copy and cut', () => {
		const zone = new Zone()

		const drop0 = new DropZone()
		drop0.cols = 3

		const drop1 = new DropZone()
		const drop2 = new DropZone()
		const drop3 = new DropZone()
		const drop4 = new DropZone()
		const drop5 = new DropZone()
		const drop6 = new DropZone()
		const drop7 = new DropZone()
		const drop8 = new DropZone()
		const drop9 = new DropZone()

		const drag1 = new DragZone()

		// ----------------------------------------

		zone.appendChild(drop0)

		drop0.appendChild(drop1)
		drop0.appendChild(drop2)
		drop0.appendChild(drop3)

		drop0.appendChild(drop4)
		drop0.appendChild(drop5)
		drop0.appendChild(drop6)

		drop0.appendChild(drop7)
		drop0.appendChild(drop8)
		drop0.appendChild(drop9)

		drop1.appendChild(drag1)

		// ----------------------------------------

		drop0.init().render().load()
		drop1.init().render().load()
		drop2.init().render().load()
		drop3.init().render().load()
		drop4.init().render().load()
		drop5.init().render().load()
		drop6.init().render().load()
		drop7.init().render().load()
		drop8.init().render().load()
		drop9.init().render().load()

		drag1.init().render().load()

		zone.init().render().load()

		// -------------------------------------------------------------------------

		expect(!drop3.selectAll('ark-zone-drag').length).toBeTruthy()

		zone._cutDrags(drop3, [drag1])

		expect(drop3.selectAll('ark-zone-drag').length).toEqual(1)

		// -------------------------------------------------------------------------

		expect(!drop1.selectAll('ark-zone-drag').length).toBeTruthy()

		zone._copyDrags(drop1, [drag1])

		expect(drop1.selectAll('ark-zone-drag').length).toEqual(1)

		expect(zone.selectAll('ark-zone-drag').length).toEqual(2)

		// -------------------------------------------------------------------------
		zone._pasteOption(null)

		zone._pasteOption('copy')
		expect(zone.selectAll('ark-zone-drag').length).toEqual(2)

		drag1.selected = true
		drop5.selected = true

		expect(!drop5.selectAll('ark-zone-drag').length).toBeTruthy()

		zone._pasteOption('copy')
		expect(zone.selectAll('ark-zone-drag').length).toEqual(3)
		expect(drop5.selectAll('ark-zone-drag').length).toEqual(1)
		expect(drop1.selectAll('ark-zone-drag').length).toEqual(1)

		// -------------------------------------------------------------------------
		drag1.selected = true
		drop8.selected = true

		expect(!drop8.selectAll('ark-zone-drag').length).toBeTruthy()

		zone._pasteOption('test')
		zone._pasteOption('cut')

		expect(drop8.selectAll('ark-zone-drag').length).toEqual(1)
		expect(zone.selectAll('ark-zone-drag').length).toEqual(3)
	})

	it('can copy and cut', () => {
		const zone = new Zone()

		const drop0 = new DropZone()
		drop0.cols = 1

		const drop1 = new DropZone()

		const drag1 = new DragZone()
		const drag2 = new DragZone()

		// ----------------------------------------

		zone.appendChild(drop0)

		drop0.appendChild(drop1)
		// drop1.appendChild(drag1)
		// drop1.appendChild(drag2)

		// ----------------------------------------

		drop0.init().render().load()
		drop1.init().render().load()

		drag1.init().render().load()
		drag2.init().render().load()

		zone.init().render().load()

		// ----------------------------------------
		expect(drop1.selectAll('ark-zone-drag').length).toEqual(0)

		drag1.selected = true
		drag1.x = 0
		drag1.y = 0

		drag2.selected = true
		drag2.x = 1
		drag2.y = 0

		zone._cutDrags(drop1, zone.getSelectedDrags())

		expect(drop1.selectAll('ark-zone-drag').length).toEqual(0)
	})

	it('onMouseDown', () => {
		const zone = new Zone()

		const drop0 = new DropZone()
		drop0.cols = 3

		const drop1 = new DropZone()
		const drag1 = new DragZone()

		zone.appendChild(drop0)
		drop0.appendChild(drop1)
		drop1.appendChild(drag1)

		drop0.init().render().load()
		drop1.init().render().load()
		drag1.init().render().load()

		zone.init().render().load()

		// -------------------------------------------------------------------------
		drag1.dispatchEvent(new MouseEvent('mousedown', {
			shiftKey: false,
			bubbles: true
		}))

		// -------------------------------------------------------------------------
		drop1.fixed = false
		drag1.dispatchEvent(new MouseEvent('mousedown', {
			shiftKey: true,
			bubbles: true
		}))
		expect(zone.dropStart && zone.dropEnd).toEqual(undefined)

		// -------------------------------------------------------------------------
		drop1.fixed = true

		drag1.dispatchEvent(new MouseEvent('mousedown', {
			shiftKey: true,
			bubbles: true
		}))

		expect(zone.dropStart).toEqual(zone.dropEnd)
	})

	it('onKeyUp', () => {
		const zone = new Zone()

		const drop0 = new DropZone()
		drop0.cols = 3

		const drop1 = new DropZone()
		const drag1 = new DragZone()

		zone.appendChild(drop0)
		drop0.appendChild(drop1)
		drop1.appendChild(drag1)

		drop0.init().render().load()
		drop1.init().render().load()
		drag1.init().render().load()

		zone.init().render().load()

		// -------------------------------------------------------------------------
		zone.onKeyUp(new KeyboardEvent('', { key: 'x' }))

		// -------------------------------------------------------------------------
		zone.onKeyUp(new KeyboardEvent('', { key: 'Shift' }))

		expect(drag1.hasAttribute('draggable')).toBeTruthy()
	})

	it('onkeyDown', () => {
		const zone = new Zone()

		const drop0 = new DropZone()
		drop0.cols = 3

		const drop1 = new DropZone()
		const drop2 = new DropZone()
		const drop3 = new DropZone()

		const drag1 = new DragZone()

		// ----------------------------------------

		zone.appendChild(drop0)

		drop0.appendChild(drop1)
		drop0.appendChild(drop2)
		drop0.appendChild(drop3)

		drop1.appendChild(drag1)

		// ----------------------------------------

		drop0.init().render().load()
		drop1.init().render().load()
		drop2.init().render().load()
		drop3.init().render().load()

		drag1.init().render().load()

		zone.init().render().load()

		// -------------------------------------------------------------------------
		zone.onkeyDown(new KeyboardEvent('', { key: 'Shift', shiftKey: true }))

		expect(!drag1.hasAttribute('draggable')).toBeTruthy()
		// -------------------------------------------------------------------------

		expect(!drop2.selectAll('ark-zone-drag').length).toBeTruthy()

		drag1.selected = true
		drop2.selected = true

		zone.onkeyDown(new KeyboardEvent('keydown', { ctrlKey: true, key: 'a' }))
		zone.onkeyDown(new KeyboardEvent('keydown', { ctrlKey: true, key: 'X' }))
		zone.onkeyDown(new KeyboardEvent('keydown', { ctrlKey: true, key: 'V' }))

		expect(drop2.selectAll('ark-zone-drag').length).toEqual(1)
		expect(zone.selectAll('ark-zone-drag').length).toEqual(1)

		// -------------------------------------------------------------------------
		drag1.selected = true
		drop3.selected = true

		expect(!drop3.selectAll('ark-zone-drag').length).toBeTruthy()

		zone.onkeyDown(new KeyboardEvent('keydown', { ctrlKey: true, key: 'C' }))
		zone.onkeyDown(new KeyboardEvent('keydown', { ctrlKey: true, key: 'V' }))

		expect(drop1.selectAll('ark-zone-drag').length).toEqual(0)
		expect(drop2.selectAll('ark-zone-drag').length).toEqual(1)
		expect(drop3.selectAll('ark-zone-drag').length).toEqual(1)
		expect(zone.selectAll('ark-zone-drag').length).toEqual(2)
	})

	it('onDragClicked', () => {
		const zone = new Zone()

		const drop0 = new DropZone()
		drop0.cols = 3

		const drop1 = new DropZone()
		const drop2 = new DropZone()
		const drop3 = new DropZone()

		const drag1 = new DragZone()

		// ----------------------------------------

		zone.appendChild(drop0)

		drop0.appendChild(drop1)
		drop0.appendChild(drop2)
		drop0.appendChild(drop3)

		drop1.appendChild(drag1)

		// ----------------------------------------

		drop0.init().render().load()
		drop1.init().render().load()
		drop2.init().render().load()
		drop3.init().render().load()

		drag1.init().render().load()

		zone.init().render().load()

		// -------------------------------------------------------------------------
		drag1.click()
		expect(drag1.selected).toBeTruthy()

		drag1.click()
		expect(!drag1.selected).toBeTruthy()

		drag1.dispatchEvent(new MouseEvent('click', { ctrlKey: true }))
	})

	it('onDragDragend', () => {
		const zone = new Zone()

		const drop0 = new DropZone()
		drop0.cols = 3

		const drop1 = new DropZone()
		const drop2 = new DropZone()
		const drop3 = new DropZone()

		const drag1 = new DragZone()

		// ----------------------------------------

		zone.appendChild(drop0)

		drop0.appendChild(drop1)
		drop0.appendChild(drop2)
		drop0.appendChild(drop3)

		drop1.appendChild(drag1)

		// ----------------------------------------

		drop0.init().render().load()
		drop1.init().render().load()
		drop2.init().render().load()
		drop3.init().render().load()

		drag1.init().render().load()

		zone.init().render().load()

		// -------------------------------------------------------------------------

		zone.addEventListener('zone:alter', event => {
			const value = event.detail.value

			expect(value.length).toEqual(1)

			const drop = value[0].drop
			const drags = value[0].drags

			expect(drags.length).toEqual(1)

			const drag = drags[0]

			expect(drop1.id).toEqual(drop.id)
			expect(drag.id).toEqual(drag1.id)
		})

		drag1.onDraggableEnd(new Event(''))
	})

	it('onDragDragenter', () => {
		const zone = new Zone()

		const drop0 = new DropZone()
		drop0.cols = 3

		const drop1 = new DropZone()
		const drop2 = new DropZone()
		const drop3 = new DropZone()

		const drag1 = new DragZone()
		const drag2 = new DragZone()

		// ----------------------------------------

		zone.appendChild(drop0)

		drop0.appendChild(drop1)
		drop0.appendChild(drop2)
		drop0.appendChild(drop3)

		drop1.appendChild(drag1)
		drop1.appendChild(drag2)

		// ----------------------------------------

		drop0.init().render().load()
		drop1.init().render().load()
		drop2.init().render().load()
		drop3.init().render().load()

		drag1.init().render().load()
		drag2.init().render().load()

		zone.init().render().load()

		// -------------------------------------------------------------------------
		let drags = drop1.selectAll('ark-zone-drag')

		expect(drag1.id).toEqual(drags[0].id)
		expect(drag2.id).toEqual(drags[1].id)

		drag2.selected = true
		drag1.onDraggableEnter(new Event(''))

		drags = drop1.selectAll('ark-zone-drag')
		expect(drag2.id).toEqual(drags[0].id)
		expect(drag1.id).toEqual(drags[1].id)

		drag2.selected = false
		drag1.onDraggableEnter(new Event(''))
	})

	it('onDragDragstart', () => {
		const zone = new Zone()

		const drop0 = new DropZone()
		drop0.cols = 3

		const drop1 = new DropZone()
		const drop2 = new DropZone()
		const drop3 = new DropZone()

		const drag1 = new DragZone()
		const drag2 = new DragZone()

		// ----------------------------------------

		zone.appendChild(drop0)

		drop0.appendChild(drop1)
		drop0.appendChild(drop2)
		drop0.appendChild(drop3)

		drop1.appendChild(drag1)
		drop1.appendChild(drag2)

		// ----------------------------------------

		drop0.init().render().load()
		drop1.init().render().load()
		drop2.init().render().load()
		drop3.init().render().load()

		drag1.init().render().load()
		drag2.init().render().load()

		zone.init().render().load()

		// -------------------------------------------------------------------------
		drag1.selected = true
		drag2.selected = true

		expect(zone.getSelectedDrags().length).toEqual(2)

		drag2.onDraggableStart(new Event(''))

		expect(zone.getSelectedDrags().length).toEqual(1)
	})

	it('onDropMouseover', () => {
		const zone = new Zone()

		const drop0 = new DropZone()
		drop0.cols = 3

		const drop1 = new DropZone()
		const drop2 = new DropZone()
		const drop3 = new DropZone()

		const drag1 = new DragZone()
		const drag2 = new DragZone()

		// ----------------------------------------

		zone.appendChild(drop0)

		drop0.appendChild(drop1)
		drop0.appendChild(drop2)
		drop0.appendChild(drop3)

		drop1.appendChild(drag1)
		drop1.appendChild(drag2)

		// ----------------------------------------

		drop0.init().render().load()
		drop1.init().render().load()
		drop2.init().render().load()
		drop3.init().render().load()

		drag1.init().render().load()
		drag2.init().render().load()

		zone.init().render().load()

		// -------------------------------------------------------------------------
		drop1.onMouseOver(new MouseEvent('', { shiftKey: true }))

		// -------------------------------------------------------------------------
		zone.dropStart = drop1
		drop1.onMouseOver(new MouseEvent('', { shiftKey: true }))

		// -------------------------------------------------------------------------
		zone.dropStart = drop2
		drop1.onMouseOver(new MouseEvent('', { shiftKey: true }))

		expect(zone.dropEnd).toEqual(drop1)
	})

	it('onDropClicked', () => {
		const zone = new Zone()

		const drop0 = new DropZone()
		drop0.cols = 3

		const drop1 = new DropZone()
		const drop2 = new DropZone()
		const drop3 = new DropZone()

		// ----------------------------------------

		zone.appendChild(drop0)

		drop0.appendChild(drop1)
		drop0.appendChild(drop2)
		drop0.appendChild(drop3)

		// ----------------------------------------

		drop0.init().render().load()
		drop1.init().render().load()
		drop2.init().render().load()
		drop3.init().render().load()

		zone.init().render().load()

		// -------------------------------------------------------------------------
		expect(!drop1.selected).toBeTruthy()

		drop1.onClick(new MouseEvent('click', { ctrlKey: true }))
		expect(drop1.selected).toBeTruthy()

		// ----------------------------------------

		drop1.onClick(new MouseEvent('click', { ctrlKey: true }))
		expect(!drop1.selected).toBeTruthy()

		// ----------------------------------------

		drop2.selected = true
		drop3.selected = true

		drop1.onClick(new MouseEvent('click', { ctrlKey: true }))
		expect(drop1.selected).toBeTruthy()
		expect(drop2.selected).toBeTruthy()
		expect(drop3.selected).toBeTruthy()

		// ----------------------------------------

		drop1.onClick(new MouseEvent('click'))
		expect(drop1.selected).toBeTruthy()
		expect(!drop2.selected).toBeTruthy()
		expect(!drop3.selected).toBeTruthy()

		// ----------------------------------------
		drop1.selected = true
		drop2.selected = true
		drop3.selected = true

		drop1.onClick(new MouseEvent('click', { ctrlKey: true }))
		expect(!drop1.selected).toBeTruthy()
		expect(drop2.selected).toBeTruthy()
		expect(drop3.selected).toBeTruthy()
	})

	it('onDropDragenter', () => {
		const zone = new Zone()

		const drop0 = new DropZone()
		drop0.cols = 3

		const drop1 = new DropZone()
		const drop2 = new DropZone()
		const drop3 = new DropZone()

		const drag1 = new DragZone()
		const drag2 = new DragZone()

		// ----------------------------------------

		zone.appendChild(drop0)

		drop0.appendChild(drop1)
		drop0.appendChild(drop2)
		drop0.appendChild(drop3)

		drop1.appendChild(drag1)
		drop1.appendChild(drag2)

		// ----------------------------------------

		drop0.init().render().load()
		drop1.init().render().load()
		drop2.init().render().load()
		drop3.init().render().load()

		drag1.init().render().load()
		drag2.init().render().load()

		zone.init().render().load()

		// -------------------------------------------------------------------------
		drag1.selected = true

		expect(drop1.selectAll('ark-zone-drag').length).toEqual(2)
		expect(drop2.selectAll('ark-zone-drag').length).toEqual(0)

		drop2.onDragenter(new CustomEvent(''))

		expect(drop2.selectAll('ark-zone-drag').length).toEqual(1)
	})
})
