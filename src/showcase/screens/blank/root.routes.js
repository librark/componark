export function setRoutes(resolver, rootComponent, prefix) {
	/** @param {string} path
   *  @returns {{path, action}} */
  function setContentComponent(path) {
    return {
      path: path,
      action: async () => {
        const module = await import(`./${path}`)
        rootComponent.setContentComponent(module.hub(resolver))
      }
    }
  }

  const router = resolver.resolve('Router')
  router.addRoutes(prefix, [])
}
