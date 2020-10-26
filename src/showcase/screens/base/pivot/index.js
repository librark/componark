import { PivotDemo } from './pivotDemo'

export function hub (parentResolver) {
  const resolver = parentResolver.forge({
    strategy: {
      PivotDemo: {
        method: 'component'
      }
    },
    factory: new ComponentFactory()
  })

  return resolver.resolve('PivotDemo')
}

export class ComponentFactory {
  /** @param {string} method */
  extract (method) {
    return this[`_${method}`]
  }

  _component () {
    return new PivotDemo()
  }
}
