/**
 * Translation component.
 * @typedef {{key:string, namespace:string}} TranslatedKey
 * @typedef {Record<string, Record<string, string>>} DictionaryStore
 * @typedef {{language?:string, root?:string}} TransliterateOptions
 */
export class Translate extends Component {
    /** @param {object} context
     * @returns {Translate} */
    init(context?: object): Translate;
    languages: any;
    endpoint: any;
    namespace: any;
    root: any;
    /** @type {DictionaryStore} */
    dictionary: DictionaryStore;
    /** @returns {Translate} */
    render(): Translate;
    /** @param {Event} event
     * @returns {Promise<void>} */
    onLanguageChanged(event: Event): Promise<void>;
    /** @param {TransliterateOptions} options
     * @returns {Promise<void>} */
    transliterate(options?: TransliterateOptions): Promise<void>;
    /** @param {string} value
     * @returns {TranslatedKey} */
    parseKey(value: string): TranslatedKey;
    /** @param {string} language
     * @param {string} namespace
     * @returns {Promise<Record<string,string>>} */
    resolveDictionary(language: string, namespace: string): Promise<Record<string, string>>;
}
/**
 * Translation component.
 */
export type TranslatedKey = {
    key: string;
    namespace: string;
};
/**
 * Translation component.
 */
export type DictionaryStore = Record<string, Record<string, string>>;
/**
 * Translation component.
 */
export type TransliterateOptions = {
    language?: string;
    root?: string;
};
import { Component } from "#base/index.js";
//# sourceMappingURL=translate.d.ts.map