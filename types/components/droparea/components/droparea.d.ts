export class Droparea extends Component {
    init(context?: {}): Component;
    fileList: any[];
    contextFiles: any;
    accept: any;
    single: boolean;
    maxSize: any;
    dragDropEvents: string[];
    dragEvents: string[];
    dropEvents: string[];
    _input: Component;
    openButton: Component;
    load(): Promise<void>;
    openInput(event: any): void;
    preventDefaults(event: any): void;
    highlight(event: any): void;
    unhighlight(event: any): void;
    handleDrop(event: any): void;
    onChange(event: any): void;
    handleFiles(files: any): void;
    validate(fileList: any): boolean;
    maxSizeValidate(file: any): boolean;
    _grabSlots(): void;
    fileInput: any;
    _buildFileInput(element: any): any;
    get dropZone(): Component;
    get preview(): DropareaPreview;
    get mediaList(): any[];
}
import { Component } from '#base/index.js';
import type { DropareaPreview } from './droparea-preview.js';
//# sourceMappingURL=droparea.d.ts.map