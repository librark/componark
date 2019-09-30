import { ModalDemo } from './modalDemo'

export function hub (parentResolver) {
	const resolver = parentResolver.forge({
		strategy: {
			modalDemo: {
				method: 'component'
			}
		},
		factory: new ComponentFactory()
	})

	return resolver.resolve('modalDemo')
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
		return new ModalDemo()
	}
}
