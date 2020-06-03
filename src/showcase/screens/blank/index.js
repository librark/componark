/** @typedef {import('./root.component').RootComponent} RootComponent */
import './root.component'

import { setRoutes } from './root.routes.js'

export function hub (parentResolver, prefix) {
	const resolver = parentResolver.forge({
		strategy: {
			RootComponent: {
				method: 'rootComponent'
			}
		},
		factory: new RootFactory(prefix)
	})

	const rootComponent = resolver.resolve('RootComponent')
	setRoutes(resolver, rootComponent, prefix)

	return rootComponent
}

export class RootFactory {
	/** @param {string} prefix */
	constructor (prefix) {
		RootFactory.prefix = prefix
		// @ts-ignore
		this._rootComponent.prefix = prefix
		// @ts-ignore
		this._rootComponent.dependencies = []
	}

	/** @param {string} method */
	extract (method) {
		return this[`_${method}`]
	}

	/** @returns {RootComponent} */
	_rootComponent () {
		const rootComponent = /** @type {RootComponent} */ (
			document.createElement('app-root')
		)

		return rootComponent.init({ path: RootFactory.prefix })
	}
}
RootFactory.prefix = undefined
RootFactory.dependencies = undefined
