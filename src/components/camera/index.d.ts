import { Component } from "../component"

export class Camera extends Component {
  start ()
  stop ()
  setCameraOrientation (facingMode: string)
  dataURL (width?, height?): string
}

