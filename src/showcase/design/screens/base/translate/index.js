import { TranslateDemo } from './translateDemo.js'

export function hub (parentResolver) {
  const resolver = parentResolver.forge({
    factory: new ComponentFactory()
  })

  return resolver.resolve('TranslateDemo')
}

export class ComponentFactory {
  /** @param {string} method */
  extract (method) {
    return this[`${method}`]
  }

  translateDemo () {
    return new TranslateDemo()
  }
}
