import { Component } from "../component"

export class Map extends Component {
  init (context?: {
    lat?,
    lon?,
    zoom?,
    token?,
  }): this

  addMarker (lat, lon)
  updateSize ()
}
