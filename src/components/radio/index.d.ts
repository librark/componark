import { Component } from "../component";

export class RadioButton extends Component {
    value: string

    checked(): void
    unchecked(): void
    toggel(): void
    isChecked(): boolean
}

export class RadioGroup extends Component {
    value: string
}


