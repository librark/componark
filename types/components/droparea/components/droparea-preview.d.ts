export class DropareaPreview extends Component {
    init(_context?: {}): Component;
    previewFile(file: any): void;
    toggleVisibility(): void;
    enableDragSort(listClass: any): void;
    enableDragList(list: any): void;
    enableDragItem(item: any): void;
    handleDrag(item: any, event: any): void;
    handleDrop(item: any): void;
    dispatchAlterEvent(): void;
    createNewFileList(): void;
    fileExists(file: any): boolean;
    removeFile(file: any, event: any): void;
    fileIndex(file: any): number;
    get droparea(): Droparea;
    get mediaList(): any[];
    get files(): any[];
}
import { Component } from '#base/index.js';
import type { Droparea } from './droparea.js';
//# sourceMappingURL=droparea-preview.d.ts.map