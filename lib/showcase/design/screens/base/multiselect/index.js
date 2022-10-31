import { MultiselectDemo } from './multiselectDemo.js'

export function hub (parentResolver) {
  const resolver = parentResolver.forge({
    strategy: {
      MultiselectDemo: {
        method: 'component'
      }
    },
    factory: new ComponentFactory()
  })

  return resolver.resolve('MultiselectDemo')
}

export class ComponentFactory {
  /** @param {string} method */
  extract (method) {
    return this[`_${method}`]
  }

  _component () {
    return new MultiselectDemo()
  }
}
