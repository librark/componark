import { DevelopmentFactory, developmentStrategy } from './development'

/** @param {string} target */
export function buildInjector (target) {
  return {
    strategy: developmentStrategy,
    factory: new DevelopmentFactory()
  }
}
