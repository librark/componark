export class Paginator extends Component {
    init(context?: {}): Component;
    collectionSize: any;
    pageSize: any;
    currentPage: any;
    displayedPages: any;
    global: any;
    get totalPages(): number;
    get currentPages(): number[];
    _notifyChange(): void;
    /** @param {number} currentPage */
    _setCurrentPage(currentPage: number): void;
    /** @param {Event} event */
    _first(event: Event): void;
    /** @param {Event} event */
    _prev(event: Event): void;
    /** @param {Event} event */
    _move(event: Event): void;
    /** @param {Event} event */
    _next(event: Event): void;
    /** @param {Event} event */
    _last(event: Event): void;
    _grabSlots(): void;
    pageButton: any;
    firstButton: any;
    previousButton: any;
    nextButton: any;
    lastButton: any;
    _buildButton(element: any, handler: any, content: any, attributes?: any[]): any;
}
import { Component } from '#base/index.js';
//# sourceMappingURL=paginator.d.ts.map