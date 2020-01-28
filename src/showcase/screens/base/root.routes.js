export function setRoutes(resolver, rootComponent, prefix) {
  /** @param {string} path @returns {{path, action}} */
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
  router.addRoutes(prefix, [
    setContentComponent('accordion'),
    setContentComponent('alert'),
    setContentComponent('button'),
    setContentComponent('card'),
    setContentComponent('chart'),
    setContentComponent('checkbox'),
    setContentComponent('grid'),
    setContentComponent('icon'),
    setContentComponent('input'),
    setContentComponent('list'),
    setContentComponent('map'),
    setContentComponent('modal'),
    setContentComponent('multiselect'),
    setContentComponent('navbar'),
    setContentComponent('paginator'),
    setContentComponent('radio'),
    setContentComponent('select'),
    setContentComponent('sidebar'),
    setContentComponent('spinner'),
    setContentComponent('splitview'),
    setContentComponent('table'),
    setContentComponent('tabs'),
    setContentComponent('treetable'),
    setContentComponent('zone')
  ])
}
