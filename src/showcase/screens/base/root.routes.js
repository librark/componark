export function setRoutes (resolver, rootComponent, prefix) {
  /** @param {string} path @returns {{path, action}} */
  function getComponentRoute (path) {
    return {
      path: path,
      action: async () => {
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
    getComponentRoute('chart'),
    getComponentRoute('checkbox'),
    getComponentRoute('form'),
    getComponentRoute('grid'),
    getComponentRoute('icon'),
    getComponentRoute('input'),
    getComponentRoute('list'),
    getComponentRoute('location'),
    getComponentRoute('map'),
    getComponentRoute('modal'),
    getComponentRoute('multiselect'),
    getComponentRoute('navbar'),
    getComponentRoute('paginator'),
    getComponentRoute('pivot'),
    getComponentRoute('radio'),
    getComponentRoute('select'),
    getComponentRoute('sidebar'),
    getComponentRoute('signature'),
    getComponentRoute('spinner'),
    getComponentRoute('splitview'),
    getComponentRoute('table'),
    getComponentRoute('tabs'),
    getComponentRoute('tabulator'),
    getComponentRoute('tooltip'),
    getComponentRoute('treetable'),
    getComponentRoute('zone'),
  ])
}
