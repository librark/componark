import { AccordionDemo } from './accordionDemo.js'

export function hub (parentResolver) {
  const resolver = parentResolver.forge({
    strategy: {},
    factory: new ComponentFactory()
  })

  return resolver.resolve('AccordionDemo')
}

export class ComponentFactory {
  extract (method = '') {
    return this[`${method}`]
  }

  accordionDemo () {
    return new AccordionDemo()
  }
}
