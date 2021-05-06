import { GalleryDemo } from "./galleryDemo"

export function hub(parentResolver) {
  const resolver = parentResolver.forge({
    strategy: {
      GalleryDemo: {
        method: "component",
      },
    },
    factory: new ComponentFactory(),
  })

  return resolver.resolve("GalleryDemo")
}

export class ComponentFactory {
  /** @param {string} method */
  extract(method) {
    return this[`_${method}`]
  }

  _component() {
    return new GalleryDemo()
  }
}
