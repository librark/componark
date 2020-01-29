import { TooltipDemo } from './tooltipDemo'

export function hub(parentResolver) {
  const resolver = parentResolver.forge({
    strategy: {
      TooltipDemo: {
        method: 'component'
      }
    },
    factory: new ComponentFactory()
  })

  return resolver.resolve('TooltipDemo')
}

export class ComponentFactory {
  constructor() {
    this._component['dependencies'] = []
  }

  /** @param {string} method */
  extract(method) {
    return this[`_${method}`]
  }

  _component() {
    return new TooltipDemo()
  }
}
