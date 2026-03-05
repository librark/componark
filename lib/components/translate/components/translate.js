import { Component } from "#base/index.js"

const tag = 'ark-translate'
 /**
 * Translation component.
 * @typedef {{key:string, namespace:string}} TranslatedKey
 * @typedef {Record<string, Record<string, Record<string, string>>>} DictionaryStore
 * @typedef {{language?:string, root?:string}} TransliterateOptions
 */
export class Translate extends Component {
  /** @type {DictionaryStore} */
  dictionary
  /** @param {object} context
   * @returns {this} */
  init (context = {}) {
    this.languages = this.languages
    this.global = context.global || window
    this.endpoint = context.endpoint || this.endpoint || '/locales'
    this.namespace = context.namespace || this.namespace || 'default'
    this.root = context.root || this.root || 'body'
    /** @type {DictionaryStore} */
    this.dictionary = context.dictionary || {}

    const dictionary = (
      /** @type {HTMLTemplateElement} */ (this.querySelector('template')))
    if (dictionary) {
      const content = dictionary.content.textContent
      try {
        this.dictionary = /** @type {DictionaryStore} */ (JSON.parse(content))
      } catch (error) {
        this.emit('error', error)
      }
    }

    return super.init(context)
  }

  /** @returns {string[]} */
  reflectedProperties () {
    return ['languages', 'endpoint', 'namespace', 'root']
  }

  /** @returns {this} */
  render () {
    const languages = this.languages.split(',').filter(
      item => Boolean(item) && item.trim())
    if (!languages.length) return super.render()

    this.content = `
    <select listen on-change="onLanguageChanged">
      ${languages.map(code => {
        const normalizedCode = code.trim()
        const language = LANGUAGE_LIST[normalizedCode]
        const name = language ? language.name : normalizedCode
        return `<option value="${normalizedCode}">${name}</option>`
      }).join('')}
    </select>
    `
    return super.render()
  }

  /** @param {Event} event
   * @returns {Promise<void>} */
  async onLanguageChanged (event) {
    event.stopPropagation()
    const target = /** @type {HTMLSelectElement|null} */ (event.target)
    const language = target?.value
    await this.transliterate({ language })
  }

  /** @param {TransliterateOptions} options
   * @returns {Promise<void>} */
  async transliterate (options = {}) {
    const language = options.language || 'es'
    const root = this.global.document.querySelector(
      options.root || this.root)
    if (!root) return

    const dictionaries = {}

    for (const node of root.querySelectorAll('[data-i18n]')) {
      const { key, namespace } = this.parseKey(node.dataset.i18n)
      dictionaries[namespace] || (
        dictionaries[namespace] = await this.resolveDictionary(
          language, namespace
        )
      )
      const dictionary = /** @type {Record<string, string>} */ (
        dictionaries[namespace])

      node.textContent = dictionary[key] || node.textContent
    }
  }

  /** @param {string} value
   * @returns {TranslatedKey} */
  parseKey (value) {
    let key = value
    let namespace = this.namespace

    const splitList = value.split(':')
    if (splitList.length > 1) {
      namespace = splitList[0]
      key = splitList[1]
    }

    return { key, namespace }
  }

  /** @param {string} language
   * @param {string} namespace
   * @returns {Promise<Record<string,string>>} */
  async resolveDictionary (language, namespace) {
    /** @type {DictionaryStore} */
    const translations = this.dictionary
    /** @type {Record<string, string>|null} */
    let dictionary = /** @type {Record<string, string>|null} */ (
      /** @type {unknown} */ (translations[language]?.[namespace]) || null)

    if (dictionary !== null) return dictionary

    if (!this.global.fetch) return /** @type {Record<string, string>} */ ({})

    const url = `${this.endpoint}/${language}/${namespace}.json`
    try {
      const response = await this.global.fetch(url)
      if (response.ok === false) return /** @type {Record<string, string>} */ ({})
      dictionary = /** @type {Record<string, string>} */ (
        await response.json())
    } catch (error) {
      this.emit('error', error)
      return /** @type {Record<string, string>} */ ({})
    }

    const cache = /** @type {Record<string, Record<string, Record<string, string>>>} */ (
      /** @type {unknown} */ (translations))
    cache[language] = cache[language] || {}
    cache[language][namespace] = /** @type {Record<string, string>} */ (
      /** @type {unknown} */ (dictionary || {}))

    return dictionary
  }
}
Component.define(tag, Translate)

const LANGUAGE_LIST = {
  es: { name: 'Español' },
  en: { name: 'English' },
  fr: { name: 'Français' },
  pt: { name: 'Português' }
}
