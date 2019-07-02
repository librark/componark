import { Component } from "../component";

export class Checkbox extends Component {
    value: string

    checked(): void
    unchecked(): void
    toggel(): void
    isChecked(): boolean
}

export class CheckboxGroup extends Component {
    value: string[]
}