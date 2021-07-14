import { Component } from '../../../base/component'

const tag = 'ark-translate'
export class Translate extends Component {
  init (context = {}) {
    this.global = context.global || window
    this.endpoint = context.endpoint || this.endpoint || '/locales'
    this.namespace = context.namespace || this.namespace || 'default'
    this.root = context.root || this.root || 'body'
    this.dictionary = context.dictionary || {}

    const dictionary = this.select('template')
    if (dictionary) {
      const content = dictionary.content['textContent']
      this.dictionary = JSON.parse(content) 
    }

    return super.init(context)
  }

  reflectedProperties() {
    return ['languages', 'endpoint', 'namespace', 'root']
  }

  render () {
    const languages = this.languages.split(',').filter(
      item => Boolean(item) && item.trim())
    if (!languages.length) return super.render()

    this.content = `
    <select listen on-change="onLanguageChanged">
      ${languages.map(code => `
        <option value="${code}">${LANGUAGE_LIST[code]['name']}</option>
      `)}
    </select>
    `
    return super.render()
  }

  async onLanguageChanged(event) {
    const language = event.target.value
    await this.transliterate({ language })
  }

  async transliterate(options = {}) {
    const language = options.language || 'es'
    const root = this.global.document.querySelector(
      options.root || this.root)
    for (const node of root.querySelectorAll('[data-i18n]')) {
      const key = node.dataset.i18n
      const namespace = options.namespace || this.namespace
      const dictionary = await this.resolveDictionary(language, namespace) 

      node.textContent = dictionary[key] || node.textContent
    }
  }

  async resolveDictionary(language, namespace) {
    let dictionary = ((this.dictionary[language]
        || {})[namespace] || null)

    if (dictionary !== null) return dictionary

    if (!this.global.fetch) return {}
    
    const url = `${this.endpoint}/${language}/${namespace}.json`
    const response = await this.global.fetch(url)
    
    dictionary = await response.json()

    return dictionary
  }

}
Component.define(tag, Translate)


const LANGUAGE_LIST = {
  es: {name: 'Español'},
  en: {name: 'English'},
  fr: {name: 'Français'},
  pt: {name: 'Português'}
}
