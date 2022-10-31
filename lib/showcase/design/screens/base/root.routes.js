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
    getComponentRoute('accordion', ['icon']),
    getComponentRoute('alert', ['button']),
    getComponentRoute('audio', ['button']),
    getComponentRoute('button', ['icon']),
    getComponentRoute('camera', ['button']),
    getComponentRoute('card', ['button', 'icon']),
    getComponentRoute('checkbox'),
    getComponentRoute('droparea'),
    getComponentRoute('gallery'),
    getComponentRoute('icon'),
    getComponentRoute('list'),
    getComponentRoute('icon'),
    getComponentRoute('input'),
    getComponentRoute('location', ['button']),
    getComponentRoute('modal', ['button']),
    getComponentRoute('multiselect', ['input']),
    getComponentRoute('paginator', ['list', 'button']),
    getComponentRoute('radio'),
    getComponentRoute('select'),
    getComponentRoute('sidebar', ['button']),
    getComponentRoute('spinner'),
    getComponentRoute('splitview', ['icon', 'list']),
    getComponentRoute('switch'),
    getComponentRoute('table'),
    getComponentRoute('tabs', ['icon']),
    getComponentRoute('translate'),
    getComponentRoute('tooltip'),
  ])
}
