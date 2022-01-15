import { CardDemo } from './cardDemo.js'

export function hub (parentResolver) {
  const resolver = parentResolver.forge({
    strategy: {},
    factory: new ComponentFactory()
  })

  return resolver.resolve('CardDemo')
}

export class ComponentFactory {
  /** @param {string} method */
  extract (method) {
    return this[`${method}`]
  }

  cardDemo () {
    return new CardDemo()
  }
}
