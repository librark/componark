export function setRoutes(resolver, rootComponent, prefix) {
  /** @param {string} path @returns {{ path: string, action: function }} */
  function getComponentRoute(path, dependencies = []) {
    return {
      path: path,
      action: async () => {
        for (const dependency of dependencies) {
          await import(`components/${dependency}/index.js`)
        }
        await import(`components/${path}/index.js`)
        const module = await import(`./${path}/index.js`)
        rootComponent.setContentComponent(module.hub(resolver))
      },
    }
  }

  const router = resolver.resolve('Router')
  router.addRoutes(prefix, [
    getComponentRoute('alert'),
    getComponentRoute('audio'),
    getComponentRoute('camera'),
    getComponentRoute('droparea'),
    getComponentRoute('gallery'),
    getComponentRoute('list'),
    getComponentRoute('location'),
    getComponentRoute('multiselect'),
    getComponentRoute('paginator', ['list']),
    getComponentRoute('spinner'),
    getComponentRoute('splitview', ['list']),
    getComponentRoute('translate'),
  ])
}
