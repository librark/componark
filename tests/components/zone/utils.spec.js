import { getDataTransfer, getElementsByDataTransfer, isValidLevel, parseData }
	from '../../../src/components/zone/components/utils'

import { DragZone } from '../../../src/components/zone/components/drag'
import { DropZone } from '../../../src/components/zone/components/drop'

describe('Utils Zone', () => {
	it('getDataTransfer', () => {
		const event = new CustomEvent('drag', {})
		event['dataTransfer'] = {
			types: []
		}

		expect(!getDataTransfer(event).length).toBeTruthy()
	})

	it('getDataTransfer', () => {
		const event = new CustomEvent('drag', {})
		event['dataTransfer'] = {
			types: [JSON.stringify(['abc', 'xyz'])]
		}

		const dataTransfer = getDataTransfer(event)

		expect(dataTransfer.length).toBeTruthy()
		expect(dataTransfer[0]).toEqual('abc')
		expect(dataTransfer[1]).toEqual('xyz')
	})

	it('getDataTransfer', () => {
		const data = JSON.stringify(['abc', 'xyz'])
		let parse = parseData(data)

		expect(parse.length).toBeTruthy()
		expect(parse[0]).toEqual('abc')
		expect(parse[1]).toEqual('xyz')

		parse = parseData("['abc', 'xyz']")

		expect(!parse).toBeTruthy()
	})

	it('getDataTransfer', () => {
		const parent = document.createElement('div')
		parent.innerHTML = /** html */`
      <p id="1">a</p>
      <p id="2">b</p>
      <p id="3">c</p>
    `

		const event = new CustomEvent('drag', {})
		event['dataTransfer'] = {
			types: [JSON.stringify([{ id: 1 }, { id: 2 }, { id: 3 }])]
		}

		const elements = getElementsByDataTransfer(parent, event)
		expect(elements.length).toEqual(3)
	})

	it('isValidLevel', () => {
		const drag = new DragZone()
		const drop = new DropZone()

		expect(isValidLevel(drop, drag)).toBeTruthy()

		drag.setAttribute('level', '1')

		expect(isValidLevel(drop, drag)).toBeTruthy()

		// @ts-ignore
		expect(isValidLevel(document.createElement('div'), drag)).toBeTruthy()
	})

	it('isValidLevel', () => {
		const drag = new DragZone()
		const drop = new DropZone().appendChild(
			new DragZone().appendChild(new DropZone())
		)

		drag.setAttribute('level', '1')

		expect(!isValidLevel(drop, drag)).toBeTruthy()
	})
})
