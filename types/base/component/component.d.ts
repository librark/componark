export class Component extends HTMLElement {
    /**
     * @param {string} tag
     * @param {CustomElementConstructor} element
     * @param {string} styles **/
    static define(tag: string, element: CustomElementConstructor, styles?: string): void;
    binding: string;
    local: {};
    /**
     * @param {object} styleMap
     * @return {string} **/
    styleNames(styleMap: object): string;
    /**
     * @param {object} context
     * @return {Component} */
    init(context?: object): Component;
    /** @return {string[]} */
    reflectedProperties(): string[];
    get slots(): {
        [x: string]: HTMLElement[];
    };
    /** @param {string} content */
    set content(content: string);
    /** @return {string} */
    get content(): string;
    connectedCallback(): void;
    /** @return {Component} */
    render(): Component;
    /** @param {object} context */
    load(context?: object): Promise<void>;
    /**
     * @param {string} selectors
     * @return {Component} */
    select(selectors: string): Component;
    /**
     * @param {string} selectors
     * @return {NodeListOf<Component>} */
    selectAll(selectors: string): NodeListOf<Component>;
    /**
     * @param {string} type
     * @param {any} detail */
    emit(type: string, detail: any): void;
    /**
     * @param {string} resource
     * @return {any} */
    resolve(resource: string): any;
}
//# sourceMappingURL=component.d.ts.map