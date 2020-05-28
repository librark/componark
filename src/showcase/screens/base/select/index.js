import { SelectDemo } from './selectDemo'

export function hub (parentResolver) {
	const resolver = parentResolver.forge({
		strategy: {
			SelectDemo: {
				method: 'component'
			}
		},
		factory: new ComponentFactory()
	})

	return resolver.resolve('SelectDemo')
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
		return new SelectDemo()
	}
}
