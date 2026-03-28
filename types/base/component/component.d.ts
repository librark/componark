/**
 * Base composable UI component.
 * @extends {globalThis.HTMLElement}
 */
export class Component extends HTMLElement {
    /**
     * Register a custom element and optional CSS for the same tag.
     * @param {string} tagName
     * @param {CustomElementConstructor} element
     * @param {string} [styles]
     * @returns {void}
     */
    static define(tagName: string, element: CustomElementConstructor, styles?: string): void;
    binding: string;
    local: Record<string, any>;
    _isConnected: boolean;
    _cleanupCallbacks: any[];
    _needsBinding: boolean;
    global: typeof globalThis;
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
    get slots(): Record<string, HTMLElement[]>;
    /** @param {string} content */
    set content(content: string);
    /** @return {string} */
    get content(): string;
    /** @returns {void} */
    connectedCallback(): void;
    /** @returns {void} */
    disconnectedCallback(): void;
    /**
     * @param {Function} callback
     * @return {Function} */
    registerCleanup(callback: Function): Function;
    /** @return {Component} */
    render(): Component;
    /** @param {object} context
     * @returns {void | Promise<void>} */
    load(context?: object): void | Promise<void>;
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
    /**
     * @param {any} detail
     * @param {string} phase
     * @return {Error} */
    _enhanceError(detail: any, phase: string): Error;
    /** @returns {void} */
    _cleanup(): void;
    /**
     * Creates an event object for dispatch.
     * @param {string} type
     * @param {any} detail
     * @param {{ bubbles?: boolean, cancelable?: boolean }} [options]
     * @returns {CustomEvent}
     */
    _createEvent(type: string, detail: any, options?: {
        bubbles?: boolean;
        cancelable?: boolean;
    }): CustomEvent;
}
//# sourceMappingURL=component.d.ts.map