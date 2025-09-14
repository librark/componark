export class Translate extends Component {
    init(context?: {}): Component;
    languages: any;
    global: any;
    endpoint: any;
    namespace: any;
    root: any;
    dictionary: any;
    onLanguageChanged(event: any): Promise<void>;
    transliterate(options?: {}): Promise<void>;
    parseKey(value: any): {
        key: any;
        namespace: any;
    };
    resolveDictionary(language: any, namespace: any): Promise<any>;
}
import { Component } from "#base/index.js";
//# sourceMappingURL=translate.d.ts.map