import { 
  DevelopmentFactory, developmentStrategy 
} from './development/index.js'

/** @param {string} target */
export function buildInjector (target) {
  return {
    strategy: developmentStrategy,
    factory: new DevelopmentFactory()
  }
}
