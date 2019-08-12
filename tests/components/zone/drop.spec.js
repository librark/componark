import { DragZone } from '../../../src/components/zone/components/drag'
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

		expect(
			drop.classList.contains('ark-zone-drop--hover')
		).toBeTruthy()
	})

	it('dragleave', () => {
		const event = new CustomEvent('dragleave', {})
		event['dataTransfer'] = {
			types: []
		}

		const drop = new DropZone()
		drop.connectedCallback()

		drop.onDragleave(event)

		expect(
			!drop.classList.contains('ark-zone-drop--hover')
		).toBeTruthy()

		expect(
			!drop.classList.contains('ark-zone-drop--hover_disabled')
		).toBeTruthy()
	})

	it('drop', () => {
		const drag1 = new DragZone()
		const drag2 = new DragZone()

		const content = [
			drag1.generateDataTransfer(),
			drag2.generateDataTransfer()
		]

		const event = new CustomEvent('drop', {})
		event['dataTransfer'] = {
			types: [JSON.stringify(content)]
		}

		const drop = new DropZone()
		drop.append(drag1)
		drop.append(drag2)

		drop.addEventListener('zone:drop', event => {
			expect(event['detail'].drop.id === drop.id).toBeTruthy()
		})

		drop.connectedCallback()

		drop.onDrop(event)
	})

	it('_searchDragStart', () => {
		const drop = new DropZone()
		drop.connectedCallback()

		const drag = new DragZone()

		expect(
			!drop._searchDragStart({ id: drag.id }, [new DragZone()])
		).toBeTruthy()

		expect(
			drop._searchDragStart({ id: drag.id }, [drag])
		).toBeTruthy()
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

		dropLevel1.droppableEnter(
			[drag1, drag2]
		)

		expect(
			dropLevel1.classList.contains('ark-zone-drop--hover_disabled')
		).toBeTruthy()
	})
	it('can add style when entering', () => {
		const drop = new DropZone()
		drop.connectedCallback()

		const drag = new DragZone()
		drag.setAttribute('lavel', '-1')

		drop.droppableEnter([drag])
		expect(!drag.childElementCount).toBeTruthy()
	})
})
