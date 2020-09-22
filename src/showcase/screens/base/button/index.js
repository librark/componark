import { ButtonDemo } from './buttonDemo'

export function hub (parentResolver) {
  const resolver = parentResolver.forge({
    strategy: {
      ButtonDemo: {
        method: 'component'
      }
    },
    factory: new ComponentFactory()
  })

  return resolver.resolve('ButtonDemo')
}

export class ComponentFactory {
  /** @param {string} method */
  extract (method) {
    return this[`_${method}`]
  }

  _component () {
    return new ButtonDemo()
  }
}
