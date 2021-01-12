export class ThemeService {
  /** @param {String} style? */
  constructor (style = '') {
    this.localStorage = window.localStorage

    if (style.length) {
      this.set('style', style)
    } else {
      this._setup()
    }
  }

  _setup () {
    if (!this.get('style').length) {
      return this.set('style', 'material')
    }

    this.styleImport()
  }

  /**
   * @param {string} key
   * @return {string} */
  get (key) {
    return this.localStorage[`local:${key}`] || ''
  }

  /**
   * @param {string} key
   * @param {string} value */
  set (key, value) {
    this.localStorage[`local:${key}`] = value

    this.styleImport()
  }

  currentStyle () {
    return this.get('style')
  }

  styleImport () {
    const currentStyle = this.get('style')

    if (currentStyle === 'material') {
      // @ts-ignore
      require('screens/theme/styles/main-material.scss')
      // import('./styles/main-material.scss')
    } else if (currentStyle === 'bootstrap') {
      // @ts-ignore
      require('screens/theme/styles/main-bootstrap.scss')
      // import('./styles/main-bootstrap.scss')
    } else {
      // @ts-ignore
      require('screens/theme/styles/main-ark.scss')
      // import('./styles/main-ark.scss')
    }

    return this
  }

  reload () {
    location.reload()
  }
}
