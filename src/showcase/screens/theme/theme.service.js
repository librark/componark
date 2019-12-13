export class ThemeService {
  /** @param {String} style? */
  constructor(style = "") {
    this.localStorage = window.localStorage

    // -------------------------------------------------------------------------
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

    this.importStyle()
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

    this.importStyle()
  }

  currentStyle () {
    return this.get('style')
  }

  importStyle () {
    const currentStyle = this.get('style')

    if (currentStyle === 'material') {
      // @ts-ignore
      require('./styles/main-material.scss')
    } else if (currentStyle === 'bootstrap') {
      // @ts-ignore
      require('./styles/main-bootstrap.scss')
    } else {
      // @ts-ignore
      require('./styles/main-ark.scss')
    }

    return this
  }

  reload () {
    location.reload()
  }
}
