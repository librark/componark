import { CardDemo } from './cardDemo'

export function hub (parentResolver) {
	const resolver = parentResolver.forge({
		strategy: {
			CardDemo: {
				method: 'component'
			}
		},
		factory: new ComponentFactory()
	})

	return resolver.resolve('CardDemo')
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
		return new CardDemo()
	}
}
