import { Component } from "../component"

export class Location extends Component {
  start ()
  stop ()
  getCurrentPosition (): {
    coords: {
      latitude,
      longitude,
      accuracy,
      altitude,
      altitudeAccuracy,
      heading,
      speed
    },
    timestamp
  }
}

