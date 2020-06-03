import { Component } from "../component"

export class Alert extends Component {
  title: string
  text: string
  horizontal: string
  vertical: string
  showConfirmButton: boolean
  confirmButtonText: string
  confirmButtonBackground: string
  showCancelButton: boolean
  cancelButtonText: string
  cancelButtonBackground: string

  static launch (context, parent?): Alert
  close (): void
  show (): void
  hide (): void
  toggle (): void
}
