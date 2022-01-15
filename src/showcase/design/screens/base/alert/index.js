import { AlertDemo } from './alertDemo.js'

export function hub (parentResolver) {
  const resolver = parentResolver.forge({
    strategy: {},
    factory: new ComponentFactory()
  })

  return resolver.resolve('AlertDemo')
}

export class ComponentFactory {
  /** @param {string} method */
  extract (method) {
    return this[`${method}`]
  }

  alertDemo () {
    return new AlertDemo()
  }
}
