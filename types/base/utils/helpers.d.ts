/**
 * Binds declarative event handlers in descendant nodes for a component.
 * @param {Component|HTMLElement} self
 * @returns {void}
 */
export function listen(self: Component | HTMLElement): void;
/** @param {HTMLElement} self @param {string[]} properties */
export function reflect(self: HTMLElement, properties: string[]): void;
/**
 * Sets a nested property value by object path.
 * @param {unknown} object
 * @param {string} path
 * @param {any} value
 * @returns {void}
 */
export function set(object: unknown, path: string, value: any): void;
/**
 * Reads a nested property value by path.
 * @param {unknown} object
 * @param {string} path
 * @param {any} fallback
 * @returns {any}
 */
export function get(object: unknown, path: string, fallback: any): any;
/** @param {object} object
 * @return {string}
 * @description Returns truthy CSS class names from object values.
 */
export function keys(object: object): string;
import type { Component } from '../component/component.js';
//# sourceMappingURL=helpers.d.ts.map