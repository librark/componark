/**
 * Drag-and-drop and file input area.
 * Emits:
 * - `alter` with current media list details.
 */
export class Droparea extends Component {
    _onChange: any;
    _onOpenInput: any;
    /** @param {object} context
     *  @returns {Droparea} */
    init(context?: object): Droparea;
    fileList: any[];
    contextFiles: any;
    accept: any;
    single: boolean;
    maxSize: any;
    /** @returns {Droparea} */
    render(): Droparea;
    dragDropEvents: string[];
    dragEvents: string[];
    dropEvents: string[];
    _input: Component;
    openButton: Component;
    /** @returns {Promise<void>} */
    load(): Promise<void>;
    /** @returns {void} */
    _detachListeners(): void;
    /** @param {Event} event
     *  @returns {void} */
    openInput(event: Event): void;
    /** @param {Event} event
     *  @returns {void} */
    preventDefaults(event: Event): void;
    /** @param {Event} event
     *  @returns {void} */
    highlight(event: Event): void;
    /** @param {Event} event
     *  @returns {void} */
    unhighlight(event: Event): void;
    /** @param {DragEvent} event
     *  @returns {void} */
    handleDrop(event: DragEvent): void;
    /** @param {Event} event
     *  @returns {void} */
    onChange(event: Event): void;
    /** @param {FileList|File[]} files
     *  @returns {void} */
    handleFiles(files: FileList | File[]): void;
    /**
     * @param {File[]|FileList} fileList
     * @returns {boolean}
     */
    validate(fileList: File[] | FileList): boolean;
    /** @param {File} file
     * @returns {boolean} */
    maxSizeValidate(file: File): boolean;
    /** @returns {void} */
    _grabSlots(): void;
    fileInput: any;
    /** @param {HTMLInputElement|undefined} element
     * @returns {HTMLInputElement} */
    _buildFileInput(element: HTMLInputElement | undefined): HTMLInputElement;
    /** @returns {HTMLFormElement} */
    get dropZone(): HTMLFormElement;
    /** @returns {DropareaPreview} */
    get preview(): DropareaPreview;
    /** @returns {Array<{name:string,type:string,size:number,url:string}>} */
    get mediaList(): {
        name: string;
        type: string;
        size: number;
        url: string;
    }[];
}
import { Component } from '#base/index.js';
import type { DropareaPreview } from './droparea-preview.js';
//# sourceMappingURL=droparea.d.ts.map