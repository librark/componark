import { SplitViewDemo } from './splitViewDemo'

export function hub (parentResolver) {
  const resolver = parentResolver.forge({
    strategy: {
      SplitViewDemo: {
        method: 'component'
      }
    },
    factory: new ComponentFactory()
  })

  return resolver.resolve('SplitViewDemo')
}

export class ComponentFactory {
  /** @param {string} method */
  extract (method) {
    return this[`_${method}`]
  }

  _component () {
    return new SplitViewDemo()
  }
}
