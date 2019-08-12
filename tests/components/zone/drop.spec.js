import { DropZone } from '../../../src/components/zone/components/drop'

describe('Drop Zone', () => {
	it('dragover', () => {
		const event = new CustomEvent('dragover', {})
		event['dataTransfer'] = {
			types: []
		}

		const drop = new DropZone()
		drop.connectedCallback()

		drop.onDragover(event)
	})

	it('dragenter', () => {
		const event = new CustomEvent('dragenter', {})
		event['dataTransfer'] = {
			types: []
		}

		const drop = new DropZone()
		drop.connectedCallback()

		drop.onDragenter(event)
	})

	it('dragleave', () => {
		const event = new CustomEvent('dragleave', {})
		event['dataTransfer'] = {
			types: []
		}

		const drop = new DropZone()
		drop.connectedCallback()

		drop.onDragleave(event)
	})

	it('drop', () => {
		const event = new CustomEvent('drop', {})
		event['dataTransfer'] = {
			types: []
		}

		const drop = new DropZone()
		drop.connectedCallback()

		drop.onDrop(event)
	})
})
