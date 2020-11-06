import { TabulatorDemo } from './tabulatorDemo'

export function hub (parentResolver) {
  const resolver = parentResolver.forge({
    strategy: {
      TabulatorDemo: {
        method: 'component'
      }
    },
    factory: new ComponentFactory()
  })

  return resolver.resolve('TabulatorDemo')
}

export class ComponentFactory {
  /** @param {string} method */
  extract (method) {
    return this[`_${method}`]
  }

  _component () {
    return new TabulatorDemo()
  }
}
