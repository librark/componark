import { DragZone } from '../../../src/components/zone/components/drag'

describe('Drag Zone', () => {
	it('dragstart', () => {
		const event = new CustomEvent('dragstart', {})
		event['dataTransfer'] = {
			types: []
		}

		const drag = new DragZone()
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

		drag._toggleSelected()
		expect(!drag.selected).toBeTruthy()

		drag._toggleSelected()
		expect(drag.selected).toBeTruthy()
	})

	it('generate Data Transfer', () => {
		const drag = new DragZone()
		drag.connectedCallback()

		const dataTransfer = drag.generateDataTransfer()
		expect(dataTransfer.id).toEqual(drag.id)
	})
})
