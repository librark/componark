import { AccordionDemo } from './accordionDemo'

export function hub (parentResolver) {
  const resolver = parentResolver.forge({
    strategy: {
      AccordionDemo: {
        method: 'component'
      }
    },
    factory: new ComponentFactory()
  })

  return resolver.resolve('AccordionDemo')
}

export class ComponentFactory {
  /** @param {string} method */
  extract (method) {
    return this[`_${method}`]
  }

  _component () {
    return new AccordionDemo()
  }
}
