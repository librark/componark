import { DropareaDemo } from "./dropareaDemo"

export function hub(parentResolver) {
  const resolver = parentResolver.forge({
    strategy: {
      DropareaDemo: {
        method: "component",
      },
    },
    factory: new ComponentFactory(),
  })

  return resolver.resolve("DropareaDemo")
}

export class ComponentFactory {
  /** @param {string} method */
  extract(method) {
    return this[`_${method}`]
  }

  _component() {
    return new DropareaDemo()
  }
}
