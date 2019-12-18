import { Component } from "../component"
import * as L from "leaflet"

export class Map extends Component {
  map: L.map
  api: L

  init(context?: { center?: number[]; token?: string }): Map
}
