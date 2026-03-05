/**
 * Pagination control component.
 */
export class Paginator extends Component {
    /** @param {object} context
     *  @returns {Paginator} */
    init(context?: object): Paginator;
    collectionSize: any;
    pageSize: any;
    currentPage: any;
    displayedPages: any;
    /** @returns {Paginator} */
    render(): Paginator;
    /** @returns {number} */
    get totalPages(): number;
    /** @returns {number[]} */
    get currentPages(): number[];
    /** @returns {void} */
    _notifyChange(): void;
    /** @param {number} currentPage */
    /** @param {number} currentPage
     * @returns {void} */
    _setCurrentPage(currentPage: number): void;
    /** @param {Event} event
     * @returns {void} */
    _first(event: Event): void;
    /** @param {Event} event
     * @returns {void} */
    _prev(event: Event): void;
    /** @param {Event} event
     * @returns {void} */
    _move(event: Event): void;
    /** @param {Event} event
     * @returns {void} */
    _next(event: Event): void;
    /** @param {Event} event
     * @returns {void} */
    _last(event: Event): void;
    /** @returns {void} */
    _grabSlots(): void;
    pageButton: any;
    firstButton: any;
    previousButton: any;
    nextButton: any;
    lastButton: any;
    /**
     * @param {HTMLButtonElement|null} element
     * @param {string|null} handler
     * @param {string} content
     * @param {Array<[string,string]>} attributes
     * @returns {HTMLButtonElement}
     */
    _buildButton(element: HTMLButtonElement | null, handler: string | null, content: string, attributes?: Array<[string, string]>): HTMLButtonElement;
}
import { Component } from '#base/index.js';
//# sourceMappingURL=paginator.d.ts.map