import { SpinnerDemo } from './spinnerDemo'

export function hub (parentResolver) {
  const resolver = parentResolver.forge({
    strategy: {
      SpinnerDemo: {
        method: 'component'
      }
    },
    factory: new ComponentFactory()
  })

  return resolver.resolve('SpinnerDemo')
}

export class ComponentFactory {
  /** @param {string} method */
  extract (method) {
    return this[`_${method}`]
  }

  _component () {
    return new SpinnerDemo()
  }
}
