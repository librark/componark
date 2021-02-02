export function setRoutes (resolver, rootComponent, prefix) {
  /** @param {string} path @returns {{path, action}} */
  function getComponentRoute (path, dependencies = []) {
    return {
      path: path,
      action: async () => {
        for (const dependency of dependencies) {
          await import(`components/${dependency}`)
        }
        const component = await import(`components/${path}`)
        const module = await import(`./${path}`)
        rootComponent.setContentComponent(module.hub(resolver))
      }
    }
  }

  const router = resolver.resolve('Router')
  router.addRoutes(prefix, [
    getComponentRoute('accordion'),
    getComponentRoute('alert'),
    getComponentRoute('audio'),
    getComponentRoute('button'),
    getComponentRoute('camera'),
    getComponentRoute('card'),
    //getComponentRoute('chart'),
    getComponentRoute('checkbox'),
    //getComponentRoute('form'),
    //getComponentRoute('grid'),
    //getComponentRoute('icon'),
    getComponentRoute('list'),
    getComponentRoute('icon'),
    getComponentRoute('input'),
    //getComponentRoute('location'),
    //getComponentRoute('map'),
    getComponentRoute('modal'),
    //getComponentRoute('multiselect'),
    getComponentRoute('navbar', ['button', 'icon']),
    getComponentRoute('paginator', ['list']),
    getComponentRoute('radio'),
    //getComponentRoute('select'),
    getComponentRoute('sidebar', ['button']),
    getComponentRoute('signature', ['button']),
    //getComponentRoute('spinner'),
    getComponentRoute('splitview', ['icon', 'list']),
    //getComponentRoute('table'),
    getComponentRoute('tabs'),
    //getComponentRoute('tabulator'),
    //getComponentRoute('tooltip'),
    //getComponentRoute('treetable'),
    //getComponentRoute('zone'),
  ])
}
