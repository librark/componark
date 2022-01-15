import { IconDemo } from './iconDemo.js'

export function hub (parentResolver) {
  const resolver = parentResolver.forge({
    factory: new ComponentFactory()
  })

  return resolver.resolve('IconDemo')
}

export class ComponentFactory {
  /** @param {string} method */
  extract (method) {
    return this[`${method}`]
  }

  iconDemo () {
    return new IconDemo()
  }
}
