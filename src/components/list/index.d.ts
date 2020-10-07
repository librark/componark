import { Component } from "../component"

export class List extends Component {
  selected?: Object

  init (context?: { source: any[]; template?: () => void }): this

  delete (start: number, deleteCount?: number)
}

export class ListItem extends Component {
  index: string

  init (context?: { data: any; template?: () => void }): this
}
