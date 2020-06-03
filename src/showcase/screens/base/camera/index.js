import { CameraDemo } from './cameraDemo'

export function hub (parentResolver) {
	const resolver = parentResolver.forge({
		strategy: {
			CameraDemo: {
				method: 'component'
			}
		},
		factory: new ComponentFactory()
	})

	return resolver.resolve('CameraDemo')
}

export class ComponentFactory {
	/** @param {string} method */
	extract (method) {
		return this[`_${method}`]
	}

	_component () {
		return new CameraDemo()
	}
}
