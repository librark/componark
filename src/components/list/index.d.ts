import { Component } from "../component";


export class List extends Component {
  selected?: Object

  init(context: { source: () => void, template: () => void}) : List
}

export class ListItem extends Component {
  index: string

  init(context: { data: {}, template: () => void}) : ListItem
}