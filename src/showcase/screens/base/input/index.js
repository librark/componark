import { InputDemo } from './inputDemo'

export function hub (parentResolver) {
	const resolver = parentResolver.forge({
		strategy: {
			InputDemo: {
				method: 'component'
			}
		},
		factory: new ComponentFactory()
	})

	return resolver.resolve('InputDemo')
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
		return new InputDemo()
	}
}
