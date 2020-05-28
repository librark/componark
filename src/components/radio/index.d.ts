import { Component } from "../component"

export class RadioButton extends Component {
  value: string
  checked: boolean

  check (): void
  uncheck (): void
  toggle (): void
}

export class RadioGroup extends Component {
  value: string
}
