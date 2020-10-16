import { Map as MapOL } from 'ol'
import { Component } from "../component"

export class Map extends Component {
  map: MapOL

  init (context?: {
    lat?,
    lon?,
    zoom?,
    token?,
  }): this

  addMarker (lat, lon)
  updateSize ()
}
