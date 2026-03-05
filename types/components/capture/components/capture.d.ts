/** Template-driven renderer component. */
export class Capture extends Component {
    receive: string;
    /** @param {object} context
     *  @returns {Capture} */
    init(context?: object): Capture;
    source: any;
    template: any;
    /** @param {{detail:any}} event */
    handle(event: {
        detail: any;
    }): void;
    /**
     * @param {string} template
     * @returns {(data: any) => string}
     */
    _format(template: string): (data: any) => string;
    /**
     * @param {string} selector
     * @returns {HTMLElement|null}
     */
    _pop(selector: string): HTMLElement | null;
    /**
     * @param {string|null} source
     * @returns {object|null}
     */
    _parseJSON(source: string | null): object | null;
}
import { Component } from "#base/index.js";
//# sourceMappingURL=capture.d.ts.map