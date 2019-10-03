import { AlertDemo } from './alertDemo'

export function hub (parentResolver) {
	const resolver = parentResolver.forge({
		strategy: {
			AlertDemo: {
				method: 'component'
			}
		},
		factory: new ComponentFactory()
	})

	return resolver.resolve('AlertDemo')
}

export class ComponentFactory {
	constructor () {
		this._component['dependencies'] = []
	}

	/** @param {string} method */
	extract (method) {
		return this[`_${method}`]
	}

	_component () {
		return new AlertDemo()
	}
}
