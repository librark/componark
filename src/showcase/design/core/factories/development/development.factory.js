import { StandardFactory, standardStrategy } from '../standard.factory'

export class DevelopmentFactory extends StandardFactory { }

export const developmentStrategy = Object.assign({}, standardStrategy, {})
