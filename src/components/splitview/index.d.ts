import { Component } from '../component'

export class SplitView extends Component {
  master: SplitViewMaster
  detail: SplitViewDetail

  renderDetail ()
}

export class SplitViewMaster extends Component { }

export class SplitViewDetail extends Component {
  show ()

  hide ()

  toggle ()
}
