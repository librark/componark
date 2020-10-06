import { Component } from '../component'

export class SplitView extends Component {
  master: SplitViewMaster
  detail: SplitViewDetail

  renderDetail (context?: object)
}

export class SplitViewMaster extends Component { }

export class SplitViewDetail extends Component {
  show ()

  hide ()

  toggle ()
}
