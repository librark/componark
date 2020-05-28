import { ListDemo } from './listDemo'

export function hub (parentResolver) {
	const resolver = parentResolver.forge({
		strategy: {
			ListDemo: {
				method: 'component'
			}
		},
		factory: new ComponentFactory()
	})

	return resolver.resolve('ListDemo')
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
		return new ListDemo()
	}
}
