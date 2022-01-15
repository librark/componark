import { ButtonDemo } from './buttonDemo.js'

export function hub (parentResolver) {
  const resolver = parentResolver.forge({
    factory: new ComponentFactory()
  })

  return resolver.resolve('ButtonDemo')
}

export class ComponentFactory {
  /** @param {string} method */
  extract (method) {
    return this[`${method}`]
  }

  buttonDemo () {
    return new ButtonDemo()
  }
}
