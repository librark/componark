import { Component } from '../component'

export class SplitView extends Component {
  master: Component
  detail: Component
}

export class SplitViewMaster extends Component { }

export class SplitViewDetail extends Component {
  show ()

  hide ()

  toggle ()
}
