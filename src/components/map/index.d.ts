import { Component } from "../component"

export class Map extends Component {

  public map
  public mapLib

  init (context?: {
    lat?,
    lon?,
    zoom?,
    token?,
  }): this

  addMarker (lat, lon)
  updateSize ()
}
