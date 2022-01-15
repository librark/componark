import { ZoneDemo } from './zoneDemo.js'

export function hub (parentResolver) {
  const resolver = parentResolver.forge({
    strategy: {
      ZoneDemo: {
        method: 'component'
      }
    },
    factory: new ComponentFactory()
  })

  return resolver.resolve('ZoneDemo')
}

export class ComponentFactory {
  /** @param {string} method */
  extract (method) {
    return this[`_${method}`]
  }

  _component () {
    return new ZoneDemo()
  }
}
