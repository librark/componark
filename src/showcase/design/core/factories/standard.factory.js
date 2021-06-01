import { Routark } from '@knowark/routarkjs'

export class StandardFactory {
  /** @param {string} method */
  extract (method) {
    return this[`_${method}`]
  }

  _router () {
    const design = process.env.ARK_DESIGN
    return new Routark(window, `/${design}/`)
  }
}

export const standardStrategy = {
  Router: {
    method: 'router'
  }
}
