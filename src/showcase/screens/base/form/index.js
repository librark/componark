import { FormDemo } from './formDemo'

export function hub (parentResolver) {
  const resolver = parentResolver.forge({
    strategy: {
      FormDemo: {
        method: 'component'
      }
    },
    factory: new ComponentFactory()
  })

  return resolver.resolve('FormDemo')
}

export class ComponentFactory {
  /** @param {string} method */
  extract (method) {
    return this[`_${method}`]
  }

  _component () {
    return new FormDemo()
  }
}
