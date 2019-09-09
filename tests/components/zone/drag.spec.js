import { DragZone } from '../../../src/components/zone/components/drag'
import { DropZone } from '../../../src/components/zone/components/drop'

describe('Drag Zone', () => {
	it('dragstart', () => {
		const event = new CustomEvent('dragstart', {})
		event['dataTransfer'] = {
			types: []
		}

		const drag = new DragZone()
		drag.init()
		drag.connectedCallback()

		drag.onDraggableStart(event)
		expect(drag.classList.contains('ark-zone-drag--dragging')).toBeTruthy()
	})

	it('dragend', () => {
		const event = new CustomEvent('dragend', {})
		event['dataTransfer'] = {
			types: []
		}

		const drag = new DragZone()
		drag.connectedCallback()

		drag.onDraggableEnd(event)
		expect(!drag.selected).toBeTruthy()
	})

	it('dragenter', () => {
		const event = new CustomEvent('dragenter', {})
		event['dataTransfer'] = {
			types: []
		}

		const drag = new DragZone()
		drag.connectedCallback()

		drag.onDraggableEnter(event)
		// expect(!drag.selected).toBeTruthy()
	})

	it('dragleave', () => {
		const event = new CustomEvent('dragleave', {})
		event['dataTransfer'] = {
			types: []
		}

		const drag = new DragZone()
		drag.connectedCallback()

		drag.onDraggableLeave(event)
		// expect(!drag.selected).toBeTruthy()
	})

	it('drop', () => {
		const event = new CustomEvent('drop', {})
		event['dataTransfer'] = {
			types: []
		}

		const drag = new DragZone()
		drag.connectedCallback()

		drag.onDraggableDrop(event)
		// expect(!drag.selected).toBeTruthy()
	})

	it('click', () => {
		const event = new CustomEvent('click', {})

		const drag = new DragZone()
		drag.connectedCallback()

		drag.onClick(event)
		expect(!drag.selected).toBeTruthy()

		event['shiftKey'] = true
		drag.onClick(event)
		expect(drag.selected).toBeTruthy()
	})

	it('toggle Selected', () => {
		const drag = new DragZone()
		drag.connectedCallback()

		drag.selected = true
		expect(drag.selected).toBeTruthy()

		drag.toggleSelected()
		expect(!drag.selected).toBeTruthy()

		drag.toggleSelected()
		expect(drag.selected).toBeTruthy()
	})

	it('generate Data Transfer', () => {
		const drag = new DragZone()
		drag.connectedCallback()

		const dataTransfer = drag.generateDataTransfer()
		expect(dataTransfer.id).toEqual(drag.id)
	})

	it('can add items at startup', () => {
		const drop = new DropZone()
		drop.connectedCallback()

		const drag = new DragZone()
		drag.connectedCallback()
		drop.appendChild(drag)

		drag.draggableDrop([new DragZone(), new DragZone(), new DragZone()])

		expect(drop.lastChild['id'] === drag.id).toBeTruthy()
	})

	it('can add items at startup', () => {
		const drop = new DropZone()
		drop.connectedCallback()

		const drag = new DragZone()
		drag.connectedCallback()
		drop.appendChild(drag)

		const drag0 = new DragZone()
		drag0.setAttribute('level', '-1')

		drag.draggableDrop([drag0])

		expect(drop.childElementCount).toEqual(1)
	})

	it('can add style when entering', () => {
		const drop = new DropZone()
		drop.connectedCallback()
		drop.setAttribute('direction', 'row')

		const drag = new DragZone()
		drag.connectedCallback()
		drop.appendChild(drag)

		const drag1 = new DragZone()
		drag1.connectedCallback()

		const drag2 = new DragZone()
		drag2.connectedCallback()

		drag.draggableEnter(
			[drag1, drag2],
			[drag1.generateDataTransfer(), drag2.generateDataTransfer()]
		)

		expect(drag.classList.contains('ark-zone-drag--enter')).toBeTruthy()
	})

	it('can add style when entering', () => {
		const drop = new DropZone()
		drop.connectedCallback()
		drop.setAttribute('direction', 'column')

		const drag = new DragZone()
		drag.connectedCallback()
		drop.appendChild(drag)

		const drag1 = new DragZone()
		drag1.connectedCallback()

		const drag2 = new DragZone()
		drag2.connectedCallback()

		drag.draggableEnter(
			[drag1, drag2],
			[drag1.generateDataTransfer(), drag2.generateDataTransfer()]
		)

		expect(drag.classList.contains('ark-zone-drag--enter')).toBeTruthy()
	})

	it('can add style when entering', () => {
		const dropLevel1 = new DropZone()
		dropLevel1.connectedCallback()

		const dragLevel1 = new DragZone()
		dragLevel1.connectedCallback()
		dropLevel1.appendChild(dragLevel1)

		const dropLevel0 = new DropZone()
		dropLevel1.connectedCallback()
		dropLevel0.appendChild(dragLevel1)

		const drag1 = new DragZone()
		drag1.connectedCallback()
		drag1.setAttribute('level', '0')

		const drag2 = new DragZone()
		drag2.connectedCallback()
		drag2.setAttribute('level', '0')

		dragLevel1.draggableEnter(
			[drag1, drag2],
			[drag1.generateDataTransfer(), drag2.generateDataTransfer()]
		)

		expect(
			dragLevel1.classList.contains('ark-zone-drag--enter_disabled')
		).toBeTruthy()
	})

	it('can add style when entering', () => {
		const drop = new DropZone()
		drop.connectedCallback()

		const drag = new DragZone()
		drag.connectedCallback()
		drop.appendChild(drag)

		const drag1 = new DragZone()
		drag1.connectedCallback()

		const drag2 = new DragZone()
		drag2.connectedCallback()

		drag.draggableEnter([drag1, drag2], [])

		expect(drag.classList.contains('ark-zone-drag--enter')).toBeTruthy()
	})
})
