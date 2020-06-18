import { Component } from "../component"

export class Checkbox extends Component {
  value: string
  checked: boolean

  check (): void
  unCheck (): void
  toggle (): void
}

export class CheckboxGroup extends Component {
  value: string[]
}
