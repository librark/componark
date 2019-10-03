import { ChartDemo } from './chartDemo'

export function hub (parentResolver) {
	const resolver = parentResolver.forge({
		strategy: {
			ChartDemo: {
				method: 'component'
			}
		},
		factory: new ComponentFactory()
	})

	return resolver.resolve('ChartDemo')
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
		return new ChartDemo()
	}
}
