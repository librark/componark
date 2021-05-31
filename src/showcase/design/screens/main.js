import { Injectark } from '@knowark/injectarkjs'
import { buildInjector } from '../core/factories'
import { setMainRoutes } from './screens.routes'

/** @param {string} target */
export function main (target) {
  const { strategy, factory } = buildInjector(target)
  const resolver = new Injectark({ strategy: strategy, factory: factory })
  const mainComponent = document.querySelector('main')
  const prefix = '/'
  setMainRoutes(mainComponent, resolver, prefix)
}
