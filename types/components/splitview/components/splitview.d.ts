export class SplitView extends Component {
    setDimensions(): void;
    get master(): Component;
    get detail(): SplitViewDetail;
    /** @param {Object} context */
    renderDetail(context?: any): void;
    /** @param {CustomEvent} event */
    onMasterChange(event: CustomEvent): void;
}
import { Component } from "#base/index.js";
import type { SplitViewDetail } from './splitview.detail.js';
//# sourceMappingURL=splitview.d.ts.map