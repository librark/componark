/** @param {HTMLElement} self */
export function listen(self: HTMLElement): void;
/** @param {HTMLElement} self @param {string[]} properties */
export function reflect(self: HTMLElement, properties: string[]): void;
/** @param {object} object @param {string} path @param {any} value */
export function set(object: object, path: string, value: any): void;
/** @param {object} object @param {string} path @param {any} fallback */
export function get(object: object, path: string, fallback: any): any;
/** @param {object} object @return {string} */
export function keys(object: object): string;
//# sourceMappingURL=helpers.d.ts.map