export class Audio extends Component {
    init(context?: {}): Component;
    status: string;
    dataURL: any;
    timerId: NodeJS.Timer;
    recorder: any;
    global: any;
    /** @param {Event} event */
    start(event: Event): Promise<void>;
    /** @param {Event} event */
    stop(event: Event): void;
    reset(): void;
    _time(): NodeJS.Timer;
    /** @param {any} event */
    _onData(event: any): void;
}
import { Component } from '#base/index.js';
//# sourceMappingURL=audio.d.ts.map