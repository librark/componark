import { LocationDemo } from './locationDemo'

export function hub (parentResolver) {
	const resolver = parentResolver.forge({
		strategy: {
			LocationDemo: {
				method: 'component'
			}
		},
		factory: new ComponentFactory()
	})

	return resolver.resolve('LocationDemo')
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
		return new LocationDemo()
	}
}
