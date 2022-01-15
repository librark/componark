import { LocationDemo } from './locationDemo.js'

export function hub (parentResolver) {
  const resolver = parentResolver.forge({
    factory: new ComponentFactory()
  })

  return resolver.resolve('LocationDemo')
}

export class ComponentFactory {
  /** @param {string} method */
  extract (method) {
    return this[`${method}`]
  }

  locationDemo () {
    return new LocationDemo()
  }
}
