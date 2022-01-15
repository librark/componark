import { SwitchDemo } from './switchDemo.js'

export function hub (parentResolver) {
  const resolver = parentResolver.forge({
    strategy: {
      SwitchDemo: {
        method: 'component'
      }
    },
    factory: new ComponentFactory()
  })

  return resolver.resolve('SwitchDemo')
}

export class ComponentFactory {
  /** @param {string} method */
  extract (method) {
    return this[`_${method}`]
  }

  _component () {
    return new SwitchDemo()
  }
}
