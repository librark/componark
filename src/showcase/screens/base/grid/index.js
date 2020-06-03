import { GridDemo } from './gridDemo'

export function hub (parentResolver) {
	const resolver = parentResolver.forge({
		strategy: {
			GridDemo: {
				method: 'component'
			}
		},
		factory: new ComponentFactory()
	})

	return resolver.resolve('GridDemo')
}

export class ComponentFactory {
	/** @param {string} method */
	extract (method) {
		return this[`_${method}`]
	}

	_component () {
		return new GridDemo()
	}
}
