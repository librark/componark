import { Component } from "../component"

export class Form extends Component {

  values: {}

  init ({ values: object })

  setItemValue (key: string, value: string)
  getItemValue (key: string): string
}
