/**
 * List component (array-driven rendering).
 */
export class List extends Component {
    /** @param {object} context
     *  @returns {List} */
    init(context?: object): List;
    source: any;
    template: any;
    /** @returns {List} */
    render(): List;
    /** @param {number} start
     *  @param {number} [deleteCount=1]
     *  @returns {void}
     */
    delete(start: number, deleteCount?: number): void;
    /** @param {string} template
     * @returns {(data: any)=>string} */
    _format(template: string): (data: any) => string;
    /** @param {MouseEvent} event
     * @returns {void} */
    _onSelected(event: MouseEvent): void;
    /** @param {MouseEvent} event
     * @returns {void} */
    _onDeleted(event: MouseEvent): void;
    /** @param {string|null} source
     * @returns {any[]|null} */
    _parseJSON(source: string | null): any[] | null;
}
import { Component } from '#base/index.js';
//# sourceMappingURL=list.d.ts.map