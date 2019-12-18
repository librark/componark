import { Component } from "../component"

export class Alert extends Component {
  static launch(context, parent?): Alert
  close(): void
  show(): void
  hide(): void
  toggle(): void
}
