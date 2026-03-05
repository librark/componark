/**
 * Camera capture component.
 */
export class Camera extends Component {
    /** @param {object} context
     *  @returns {Camera} */
    init(context?: object): Camera;
    width: any;
    height: any;
    facingMode: any;
    /** @returns {string} */
    dataURL(width?: any, height?: any): string;
    /** @returns {Promise<void>} */
    start(): Promise<void>;
    /** @returns {void} */
    stop(): void;
    /** @param {string} facingMode
     *  @returns {Promise<void>} */
    setCameraOrientation(facingMode: string): Promise<void>;
    /** @returns {HTMLVideoElement} */
    get video(): HTMLVideoElement;
    /** @returns {HTMLCanvasElement} */
    get canvas(): HTMLCanvasElement;
}
import { Component } from '#base/index.js';
//# sourceMappingURL=camera.d.ts.map