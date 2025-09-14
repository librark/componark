export class Camera extends Component {
    init(context?: {}): Component;
    width: any;
    height: any;
    facingMode: any;
    global: any;
    /** @returns {string} */
    dataURL(width?: any, height?: any): string;
    start(): Promise<void>;
    stop(): void;
    setCameraOrientation(facingMode: any): Promise<void>;
    /** @returns {HTMLVideoElement} */
    get video(): HTMLVideoElement;
    /** @returns {HTMLCanvasElement} */
    get canvas(): HTMLCanvasElement;
}
import { Component } from '#base/index.js';
//# sourceMappingURL=camera.d.ts.map