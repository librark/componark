import { RadioDemo } from './radioDemo'

export function hub (parentResolver) {
  const resolver = parentResolver.forge({
    strategy: {
      RadioDemo: {
        method: 'component'
      }
    },
    factory: new ComponentFactory()
  })

  return resolver.resolve('RadioDemo')
}

export class ComponentFactory {
  /** @param {string} method */
  extract (method) {
    return this[`_${method}`]
  }

  _component () {
    return new RadioDemo()
  }
}
