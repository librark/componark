import { Component } from "../component"

export class Treetable extends Component {
  init (context?: {
    rows: string
    cols: string
    headers: { header: string; key: string }[]
    data: Object
  }): this
}
