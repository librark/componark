import { PaginatorDemo } from './paginatorDemo'

export function hub (parentResolver) {
	const resolver = parentResolver.forge({
		strategy: {
			PaginatorDemo: {
				method: 'component'
			}
		},
		factory: new ComponentFactory()
	})

	return resolver.resolve('PaginatorDemo')
}

export class ComponentFactory {
	/** @param {string} method */
	extract (method) {
		return this[`_${method}`]
	}

	_component () {
		return new PaginatorDemo()
	}
}
