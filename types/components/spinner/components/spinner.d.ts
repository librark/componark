/**
 * Configurable loading spinner component.
 */
export class Spinner extends Component {
    /** @param {object} context
     *  @returns {Spinner} */
    init(context?: object): Spinner;
    scale: any;
    type: any;
    /** @returns {Spinner} */
    render(): Spinner;
    /** @param {string} scale
     * @returns {void} */
    setScale(scale: string): void;
    /** @returns {HTMLElement} */
    get loader(): HTMLElement;
    /** @param {string} type
     * @returns {string} */
    spinnerType(type: string): string;
}
import { Component } from '#base/index.js';
//# sourceMappingURL=spinner.d.ts.map