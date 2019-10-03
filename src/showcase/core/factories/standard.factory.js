import { Routark } from '@knowark/routarkjs'

export class StandardFactory {
	/** @param {string} method */
	extract (method) {
		return this[`_${method}`]
	}

	_router () {
		return new Routark(window)
	}
}

export const standardStrategy = {
	Router: {
		method: 'router'
	}
}
