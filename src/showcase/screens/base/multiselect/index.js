import { MultiselectDemo } from './multiselectDemo'

export function hub(parentResolver) {
	const resolver = parentResolver.forge({
		strategy: {
			MultiselectDemo: {
				method: 'component',
			},
		},
		factory: new ComponentFactory(),
	})

	return resolver.resolve('MultiselectDemo')
}

export class ComponentFactory {
	constructor() {
		this._component['dependencies'] = []
	}

	/** @param {string} method */
	extract(method) {
		return this[`_${method}`]
	}

	_component() {
		return new MultiselectDemo()
	}
}