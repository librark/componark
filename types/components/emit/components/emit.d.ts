/**
 * Declarative event forwarding component.
 */
export class Emit extends Component {
    bind: string;
    receive: string;
    dispatch: string;
    source: string;
    /** @param {CustomEvent} event
     * @returns {void} */
    handle(event: CustomEvent): void;
    /** @param {string} selector
     * @returns {Element|null} */
    _pop(selector: string): Element | null;
    /** @returns {any|null} */
    _resolveBoundData(): any | null;
    /** @param {string} source
     * @returns {object|null} */
    _parseJSON(source: string): object | null;
}
import { Component } from "#base/index.js";
//# sourceMappingURL=emit.d.ts.map