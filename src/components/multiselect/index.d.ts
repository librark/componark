import { Component } from "../component"

export class Multiselect extends Component {
  init (context?: {
    label?: string
    value?: string
    field?: string
    template?: Function
    filter?: Function
  }): this

  value: string
}
