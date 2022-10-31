import { TableDemo } from './tableDemo.js'

export function hub (parentResolver) {
  const resolver = parentResolver.forge({
    strategy: {
      TableDemo: {
        method: 'component'
      }
    },
    factory: new ComponentFactory()
  })

  return resolver.resolve('TableDemo')
}

export class ComponentFactory {
  /** @param {string} method */
  extract (method) {
    return this[`_${method}`]
  }

  _component () {
    return new TableDemo()
  }
}
