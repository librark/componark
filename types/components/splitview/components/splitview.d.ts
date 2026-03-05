/**
 * Master-detail split view orchestrator.
 */
export class SplitView extends Component {
    _onResize: any;
    _onMasterChange: any;
    _master: any;
    /** @returns {void} */
    setDimensions(): void;
    /** @returns {void} */
    _setMasterListener(): void;
    /** @returns {void} */
    _removeMasterListener(): void;
    /** @returns {(SplitViewMaster|null)} */
    get master(): SplitViewMaster;
    /** @returns {SplitViewDetail} */
    get detail(): SplitViewDetail;
    /** @returns {SplitView} */
    render(): SplitView;
    /** @param {object} context
     * @returns {void} */
    renderDetail(context?: object): void;
    /** @param {CustomEvent} event
     * @returns {void} */
    onMasterChange(event: CustomEvent): void;
}
import { Component } from "#base/index.js";
import type { SplitViewMaster } from './splitview.master.js';
import type { SplitViewDetail } from './splitview.detail.js';
//# sourceMappingURL=splitview.d.ts.map