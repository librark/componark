import { ModalDemo } from './modalDemo.js'

export function hub (parentResolver) {
  const resolver = parentResolver.forge({
    strategy: {
      modalDemo: {
        method: 'component'
      }
    },
    factory: new ComponentFactory()
  })

  return resolver.resolve('modalDemo')
}

export class ComponentFactory {
  /** @param {string} method */
  extract (method) {
    return this[`_${method}`]
  }

  _component () {
    return new ModalDemo()
  }
}
