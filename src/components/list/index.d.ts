import { Component } from "../component"

export class List extends Component {
  selected?: Object

  init (context?: { source: Array<any>; template?: () => void }): List

  delete (start: number, deleteCount?: number)
}

export class ListItem extends Component {
  index: string

  init (context?: { value: any; template?: () => void }): ListItem
}
