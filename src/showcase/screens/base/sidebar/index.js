import { SidebarDemo } from './sidebarDemo'

export function hub (parentResolver) {
  const resolver = parentResolver.forge({
    strategy: {
      SidebarDemo: {
        method: 'component'
      }
    },
    factory: new ComponentFactory()
  })

  return resolver.resolve('SidebarDemo')
}

export class ComponentFactory {
  /** @param {string} method */
  extract (method) {
    return this[`_${method}`]
  }

  _component () {
    return new SidebarDemo()
  }
}
