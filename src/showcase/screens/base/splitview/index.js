import { SplitviewDemo } from './splitviewDemo'

export function hub (parentResolver) {
	const resolver = parentResolver.forge({
		strategy: {
			SplitviewDemo: {
				method: 'component'
			}
		},
		factory: new ComponentFactory()
	})

	return resolver.resolve('SplitviewDemo')
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
		return new SplitviewDemo()
	}
}
