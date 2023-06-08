import { StandardFactory, standardStrategy } from '../standard.factory.js'

export class DevelopmentFactory extends StandardFactory { }

export const developmentStrategy = Object.assign({}, standardStrategy, {})
