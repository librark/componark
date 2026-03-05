/**
 * Audio recorder component.
 * Emits:
 * - `error` with `Error` detail on capture/rendering issues.
 */
export class Audio extends Component {
    /** @param {object} context
     *  @returns {Audio} */
    init(context?: object): Audio;
    /** @type {'idle'|'recording'|'done'} */
    status: "idle" | "recording" | "done";
    dataURL: string | ArrayBuffer;
    timerId: NodeJS.Timeout;
    recorder: MediaRecorder;
    objectURL: string;
    /** @param {Event} event
     *  @returns {Promise<void>} */
    start(event: Event): Promise<void>;
    /** @param {Event} event
     *  @returns {void} */
    stop(event: Event): void;
    /** @returns {void} */
    reset(): void;
    /** @returns {ReturnType<typeof setInterval>} Interval handle. */
    _time(): ReturnType<typeof setInterval>;
    /** @param {any} event */
    _onData(event: any): void;
    /** @returns {void} */
    _revokeObjectURL(): void;
}
import { Component } from '#base/index.js';
//# sourceMappingURL=audio.d.ts.map