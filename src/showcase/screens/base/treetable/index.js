import { TreetableDemo } from './treetableDemo'

export function hub (parentResolver) {
  const resolver = parentResolver.forge({
    strategy: {
      TabsDemo: {
        method: 'component'
      }
    },
    factory: new ComponentFactory()
  })

  return resolver.resolve('TabsDemo')
}

export class ComponentFactory {
  constructor() {
    this._component['dependencies'] = []
  }

  /** @param {string} method */
  extract (method) {
    return this[`_${method}`]
  }

  _component () {
    return new TreetableDemo()
  }
}
