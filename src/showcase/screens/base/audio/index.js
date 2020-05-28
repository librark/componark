import { AudioDemo } from './audioDemo'

export function hub (parentResolver) {
	const resolver = parentResolver.forge({
		strategy: {
			AudioDemo: {
				method: 'component'
			}
		},
		factory: new ComponentFactory()
	})

	return resolver.resolve('AudioDemo')
}

export class ComponentFactory {
	constructor () {
		this._component.dependencies = []
	}

	/** @param {string} method */
	extract (method) {
		return this[`_${method}`]
	}

	_component () {
		return new AudioDemo()
	}
}
