import { CheckboxDemo } from './checkboxDemo'

export function hub (parentResolver) {
	const resolver = parentResolver.forge({
		strategy: {
			CheckboxDemo: {
				method: 'component'
			}
		},
		factory: new ComponentFactory()
	})

	return resolver.resolve('CheckboxDemo')
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
		return new CheckboxDemo()
	}
}
