/**
 * Master pane controller for split-view layout.
 */
export class SplitViewMaster extends Component {
    _onMasterEvent: any;
    _boundMasterEvent: any;
    masterEvent: any;
    /** @param {object} context
     *  @returns {SplitViewMaster} */
    init(context?: object): SplitViewMaster;
    /** @returns {void} */
    _syncMasterEventListener(): void;
    /** @returns {void} */
    _removeMasterEventListener(): void;
    /** @param {CustomEvent} event */
    onMasterEvent(event: CustomEvent): void;
}
import { Component } from "#base/index.js";
//# sourceMappingURL=splitview.master.d.ts.map