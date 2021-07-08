import { Component } from '../../../base/component'

const tag = 'ark-translate'
export class Translate extends Component {
  init (context = {}) {
    this.global = context.global || window
    this.language = context.language || this.language || 'es'
    this.namespace = context.namespace || this.namespace || 'default'
    this.root = context.root || this.root || 'body'
    const innerDictionary = JSON.parse(this.textContent.trim() || '{}')
    this.dictionary = context.dictionary || innerDictionary

    return super.init(context)
  }

  reflectedProperties() {
    return ['language', 'namespace', 'root']
  }

  translate(options = {}) {
    const language = options.language || this.language
    const root = this.global.document.querySelector(
      options.root || this.root)
    for (const node of root.querySelectorAll('[data-i18n]')) {
      const key = node.textContent.trim()
      const namespace = options.namespace || this.namespace
      const dictionary = ((this.dictionary[namespace]
        || {})[language] || {})

      node.textContent = dictionary[key] || key
    }
  }
}
Component.define(tag, Translate)
