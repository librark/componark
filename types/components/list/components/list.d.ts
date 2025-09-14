export class List extends Component {
    source: any;
    template: any;
    /** @param {number} start @param {number?} deleteCount  */
    delete(start: number, deleteCount?: number | null): void;
    _format(template: any): (data: any) => any;
    /** @param {MouseEvent} event */
    _onSelected(event: MouseEvent): void;
    /** @param {MouseEvent} event */
    _onDeleted(event: MouseEvent): void;
}
import { Component } from '#base/index.js';
//# sourceMappingURL=list.d.ts.map