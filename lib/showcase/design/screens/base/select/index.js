import { SelectDemo } from './selectDemo.js'

export function hub (parentResolver) {
  const resolver = parentResolver.forge({
    strategy: {
      SelectDemo: {
        method: 'component'
      }
    },
    factory: new ComponentFactory()
  })

  return resolver.resolve('SelectDemo')
}

export class ComponentFactory {
  /** @param {string} method */
  extract (method) {
    return this[`_${method}`]
  }

  _component () {
    return new SelectDemo()
  }
}
