/**
 * Renders file previews and drag-sort ordering.
 */
export class DropareaPreview extends Component {
    _objectUrls: Map<any, any>;
    _onDragEnd: any;
    /** @param {object} context
     *  @returns {DropareaPreview} */
    init(_context?: {}): DropareaPreview;
    /** @returns {DropareaPreview} */
    render(): DropareaPreview;
    /**
     * @param {File} file
     * @returns {void}
     */
    previewFile(file: File): void;
    /** @returns {void} */
    toggleVisibility(): void;
    /** @param {string} listClass
     *  @returns {void} */
    enableDragSort(listClass: string): void;
    /** @param {HTMLUListElement} list
     *  @returns {void} */
    enableDragList(list: HTMLUListElement): void;
    /** @param {HTMLElement} item
     *  @returns {void} */
    enableDragItem(item: HTMLElement): void;
    /** @param {HTMLLIElement} item
     * @param {DragEvent} event
     * @returns {void} */
    handleDrag(item: HTMLLIElement, event: DragEvent): void;
    /** @param {DragEvent} event
     * @returns {void} */
    handleDrop(event: DragEvent): void;
    /** @returns {void} */
    dispatchAlterEvent(): void;
    /** @returns {void} */
    createNewFileList(): void;
    /**
     * @param {File} file
     * @returns {boolean}
     */
    fileExists(file: File): boolean;
    /** @param {File} file
     * @returns {string} */
    getObjectURL(file: File): string;
    /** @param {File} file
     * @returns {void} */
    revokeFile(file: File): void;
    /** @returns {void} */
    revokeAllFiles(): void;
    /** @returns {void} */
    clearPreview(): void;
    /** @param {File} file
     * @param {MouseEvent} event
     * @returns {void} */
    removeFile(file: File, event: MouseEvent): void;
    /** @param {File} file
     * @returns {number} */
    fileIndex(file: File): number;
    /** @returns {Droparea} */
    get droparea(): Droparea;
    /** @returns {Array<{name:string,type:string,size:number,url:string}>} */
    get mediaList(): {
        name: string;
        type: string;
        size: number;
        url: string;
    }[];
    get files(): any[];
}
import { Component } from '#base/index.js';
import type { Droparea } from './droparea.js';
//# sourceMappingURL=droparea-preview.d.ts.map